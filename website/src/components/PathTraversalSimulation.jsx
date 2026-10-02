
import { useEffect, useState } from "react";

const scenarios = {
    "Normal File": {
        path: "report.txt",
        description: "Request a file located inside the application's permitted public directory.",
        question: "Why is this request allowed?",
        answer: "The requested file is inside the permitted public directory."
    },
    "Directory Traversal": {
        path: "../private/users.txt",
        description: "Attempt to move outside the public directory and access a file in the private folder.",
        question: "What does ../ do in this path?",
        answer: "../ moves one directory level upward. From public, it reaches the target directory, allowing access to the private folder."
    },
    "Configuration File": {
        path: "../config/database.txt",
        description: "Request a simulated configuration file located outside the public directory.",
        question: "Why should an application prevent this access?",
        answer: "Configuration files may contain sensitive settings. A file-serving application should restrict access to its permitted directory."
    },
    "Custom Path": {
        path: "welcome.txt",
        description: "Enter your own relative file path and observe how the application handles it.",
        question: "What happens when your requested path leaves the public directory?",
        answer: "The vulnerable application may read a file outside public. The secure application should reject paths that escape the permitted directory."
    }
};

export default function PathTraversalSimulation({ selectedSection }) {
    const initialCategory = scenarios[selectedSection]
        ? selectedSection
        : "Normal File";

    const [category, setCategory] = useState(initialCategory);
    const [filename, setFilename] = useState(scenarios[initialCategory].path);
    const [mode, setMode] = useState("vulnerable");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        if (scenarios[selectedSection]) {
            setCategory(selectedSection);
            setFilename(scenarios[selectedSection].path);
            setResponse(null);
            setAnswer("");
            setShowExplanation(false);
        }
    }, [selectedSection]);

    const hasTraversal = filename.split("/").includes("..");

    const isOutsidePublic =
        filename.startsWith("../") ||
        filename === ".." ||
        filename.startsWith("../../");

    function changeScenario(value) {
        setCategory(value);
        setFilename(scenarios[value].path);
        setResponse(null);
        setAnswer("");
        setShowExplanation(false);
    }

    async function sendRequest() {
        if (!filename.trim()) {
            setResponse({
                status: "Invalid Input",
                data: { message: "Enter a file path before sending the request." }
            });
            return;
        }

        setLoading(true);
        setResponse(null);
        setShowExplanation(false);

        try {
            const url =
                `http://localhost:3000/files?name=${encodeURIComponent(filename)}&mode=${mode}`;

            const result = await fetch(url);
            const data = await result.json();

            setResponse({
                status: result.status,
                data
            });
        } catch {
            setResponse({
                status: "Connection Error",
                data: {
                    message: "The target is unavailable. Start the lab using the Lab Controller."
                }
            });
        } finally {
            setLoading(false);
        }
    }

    const successful = response?.status === 200;
    const blocked = response?.status === 403;

    return (
        <div className="learning-lab">

            {/* INTRODUCTION */}
            <section className="lab-intro">

                <h2>Reading Arbitrary Files via Path Traversal</h2>

                <p>
                    Investigate how an application that accepts file names
                    can accidentally expose files outside its intended directory.
                    Perform a controlled experiment and compare vulnerable
                    and secure behavior.
                </p>
            </section>

            {/* CONCEPT */}
            <section className="learning-card">
                <div className="learning-card-heading">
                    <span className="step-number">01</span>
                    <div>
                        <h3>Understand the Concept</h3>
                        <p>First, understand what the application is supposed to do.</p>
                    </div>
                </div>

                <div className="concept-box">
                    <div className="concept-icon">📂</div>
                    <div>
                        <strong>Imagine a file download application</strong>
                        <p>
                            A user requests a file such as <code>report.txt</code>.
                            The server searches for that file inside its public folder
                            and returns its contents.
                        </p>
                    </div>
                </div>

                <div className="concept-grid">
                    <div className="concept-item">
                        <span className="concept-label">INTENDED BEHAVIOR</span>
                        <strong>Read permitted files</strong>
                        <p>Only files inside the allowed directory should be served.</p>
                    </div>

                    <div className="concept-item">
                        <span className="concept-label">VULNERABILITY</span>
                        <strong>Path Traversal</strong>
                        <p>Manipulating a file path to access locations outside the intended directory.</p>
                    </div>
                </div>

                <div className="path-definition">
                    <code>../</code>
                    <span>
                        Means move one directory level upward in a relative path.
                    </span>
                </div>
            </section>

            {/* FILE SYSTEM */}
            <section className="learning-card">
                <div className="learning-card-heading">
                    <span className="step-number">02</span>
                    <div>
                        <h3>Explore the File System</h3>
                        <p>Understand where the files are located before making a request.</p>
                    </div>
                </div>

                <div className="filesystem">
                    <div className="filesystem-root">
                        <span>▣</span> target/
                        <span className="root-note">Application root</span>
                    </div>

                    <div className={`filesystem-folder ${category === "Normal File" ? "folder-active" : ""}`}>
                        <span>📁</span> public/
                        <span className="folder-permission">Allowed directory</span>
                    </div>

                    <div className={`filesystem-file`}>
                        <span>📄</span> report.txt
                    </div>

                    <div className="filesystem-file">
                        <span>📄</span> welcome.txt
                    </div>

                    <div className={`filesystem-folder ${category === "Directory Traversal" ? "folder-active" : ""}`}>
                        <span>📁</span> private/
                        <span className="folder-restricted">Outside public</span>
                    </div>

                    <div className={`filesystem-file ${category === "Directory Traversal" ? "file-active" : ""}`}>
                        <span>📄</span> users.txt
                    </div>

                    <div className={`filesystem-folder ${category === "Configuration File" ? "folder-active" : ""}`}>
                        <span>📁</span> config/
                        <span className="folder-restricted">Outside public</span>
                    </div>

                    <div className={`filesystem-file ${category === "Configuration File" ? "file-active" : ""}`}>
                        <span>📄</span> database.txt
                    </div>
                </div>

                <div className="filesystem-legend">
                    <span><i className="legend-allowed" /> Permitted location</span>
                    <span><i className="legend-restricted" /> Outside permitted location</span>
                </div>
            </section>

            {/* EXPERIMENT */}
            <section className="learning-card experiment-card">
                <div className="learning-card-heading">
                    <span className="step-number">03</span>
                    <div>
                        <h3>Perform the Experiment</h3>
                        <p>Choose a scenario, modify the request, and observe the result.</p>
                    </div>
                </div>

                <label className="lab-label">Select Experiment</label>

                <select
                    className="lab-select"
                    value={category}
                    onChange={(e) => changeScenario(e.target.value)}
                >
                    {Object.keys(scenarios).map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>

                <div className="scenario-info">
                    <strong>{category}</strong>
                    <p>{scenarios[category].description}</p>
                </div>

                <label className="lab-label">Requested File Path</label>

                <div className="path-input-wrapper">
                    <span className="path-prefix">name=</span>
                    <input
                        className="lab-input"
                        value={filename}
                        onChange={(e) => {
                            setFilename(e.target.value);
                            setResponse(null);
                            setShowExplanation(false);
                        }}
                        placeholder="Enter a file path..."
                    />
                </div>

                <div className="path-hint">
                    You can enter your own relative path. Use only the simulated
                    files available in this lab.
                </div>

                <div className="quick-paths">
                    <span>Try an example:</span>
                    <button onClick={() => setFilename("report.txt")}>Normal file</button>
                    <button onClick={() => setFilename("../private/users.txt")}>Private file</button>
                    <button onClick={() => setFilename("../config/database.txt")}>Configuration</button>
                </div>

                <label className="lab-label">Application Security Mode</label>

                <div className="mode-selector">
                    <button
                        className={mode === "vulnerable" ? "mode-active mode-vulnerable" : ""}
                        onClick={() => {
                            setMode("vulnerable");
                            setResponse(null);
                        }}
                    >
                        
                        <strong><span>⚠</span> Vulnerable</strong>
                        <small>Without path restriction</small>
                    </button>

                    <button
                        className={mode === "secure" ? "mode-active mode-secure" : ""}
                        onClick={() => {
                            setMode("secure");
                            setResponse(null);
                        }}
                    >
                        
                        <strong><span>✓</span> Secure</strong>
                        <small>With path validation</small>
                    </button>
                </div>

                {/* PATH EXPLANATION */}
                <div className="path-analysis">
                    <h4>Path Analysis</h4>

                    <div className="path-step">
                        <span className="path-step-dot">1</span>
                        <div>
                            <strong>Starting directory</strong>
                            <code>target/public/</code>
                        </div>
                    </div>

                    <div className="path-step">
                        <span className="path-step-dot">2</span>
                        <div>
                            <strong>Requested path</strong>
                            <code>{filename || "(empty)"}</code>
                        </div>
                    </div>

                    <div className="path-step">
                        <span className="path-step-dot">3</span>
                        <div>
                            <strong>Path behavior</strong>
                            <p>
                                {hasTraversal
                                    ? "The path contains '..', which moves upward from the current directory."
                                    : "The path does not contain a '..' traversal segment."}
                            </p>
                        </div>
                    </div>

                    <div className={`path-destination ${isOutsidePublic ? "destination-warning" : "destination-safe"}`}>
                        {isOutsidePublic
                            ? "Potential access outside public directory"
                            : "Path begins inside the public directory"}
                    </div>
                    <p className="path-analysis-note">
                        This is a conceptual preview. The actual resolved path
                        and access decision are determined by the server.
                    </p>
                </div>

                <button
                    className="run-experiment-button"
                    onClick={sendRequest}
                    disabled={loading}
                >
                    {loading ? "Running Experiment..." : "▶ Run Experiment"}
                </button>
            </section>

            {/* RESULT */}
            <section className="learning-card">
                <div className="learning-card-heading">
                    <span className="step-number">04</span>
                    <div>
                        <h3>Observe the Result</h3>
                        <p>Inspect the actual response returned by the target application.</p>
                    </div>
                </div>

                <div className="http-request">
                    <span className="http-method">GET</span>
                    <code>/files?name={filename}&mode={mode}</code>
                </div>

                {!response && (
                    <div className="result-empty">
                        <div className="result-empty-icon">⌁</div>
                        <strong>Waiting for experiment</strong>
                        <p>Run the experiment to see the HTTP response and analysis.</p>
                    </div>
                )}

                {response && (
                    <div className="experiment-result">
                        <div className={`result-status ${successful ? "result-ok" : blocked ? "result-blocked" : "result-failed"}`}>
                            <div>
                                <span className="result-status-label">HTTP RESPONSE</span>
                                <strong>{response.status}</strong>
                            </div>
                            <span>
                                {successful
                                    ? "File returned"
                                    : blocked
                                        ? "Access denied"
                                        : "Request failed"}
                            </span>
                        </div>

                        <div className="response-content">
                            <div className="response-content-heading">
                                Server Response
                            </div>
                            <pre>{JSON.stringify(response.data, null, 2)}</pre>
                        </div>

                        <div className="result-interpretation">
                            <strong>What does this result mean?</strong>

                            <p>
                                {successful && mode === "vulnerable" && isOutsidePublic
                                    ? "The server returned a file outside the intended public directory. This demonstrates the path traversal vulnerability."
                                    : successful
                                        ? "The server successfully returned the requested file. Check whether the file belongs to the permitted public directory."
                                        : blocked
                                            ? "The secure application detected that the requested path was outside the permitted directory and denied access."
                                            : response.status === "Connection Error"
                                                ? "The target could not be reached. Start the Docker lab and try again."
                                                : "The requested operation did not return a successful file response. Examine the status and message above."}
                            </p>
                        </div>

                        <button
                            className="explanation-button"
                            onClick={() => setShowExplanation(!showExplanation)}
                        >
                            {showExplanation ? "Hide Technical Explanation ↑" : "Understand Why This Happened ↓"}
                        </button>

                        {showExplanation && (
                            <div className="technical-explanation">
                                <h4>Root Cause</h4>
                                <p>
                                    The vulnerable application resolves the user-supplied
                                    path relative to the public directory and reads the
                                    resulting file without enforcing the intended directory boundary.
                                </p>

                                <h4>Security Control</h4>
                                <p>
                                    The secure mode calculates the resolved path and checks
                                    whether it escapes the allowed public directory.
                                    If it does, the application returns HTTP 403.
                                </p>

                                <h4>Key Learning</h4>
                                <p>
                                    Accepting a file name from a user is not inherently
                                    unsafe. The risk occurs when the application trusts
                                    that input without enforcing filesystem access boundaries.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* LEARNING CHECKPOINT */}
            <section className="learning-card checkpoint-card">
                <div className="learning-card-heading">
                    <span className="step-number">05</span>
                    <div>
                        <h3>Learning Checkpoint</h3>
                        <p>Test whether you understood the experiment.</p>
                    </div>
                </div>

                <p className="checkpoint-question">
                    {scenarios[category].question}
                </p>

                <textarea
                    className="checkpoint-input"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your observation in your own words..."
                    rows={3}
                />

                <button
                    className="explanation-button"
                    onClick={() => setShowExplanation(!showExplanation)}
                >
                    {showExplanation ? "Hide Learning Explanation" : "Reveal Learning Explanation"}
                </button>

                {showExplanation && (
                    <div className="checkpoint-answer">
                        <strong>Expected understanding</strong>
                        <p>{scenarios[category].answer}</p>
                    </div>
                )}
            </section>

        </div>
    );
}