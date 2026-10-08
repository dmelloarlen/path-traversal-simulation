import React from "react";

export default function ProcedureSection() {
    return (
        <div className="document">
            <div className="document-label">
                PATH TRAVERSAL LAB · PROCEDURE
            </div>

            <h1>Procedure</h1>

            <p className="subtitle">
                Follow the steps below to perform the controlled path traversal experiment.
            </p>

            <div className="section-body">

                <h2>1. Start the Lab</h2>

                <ol>
                    <li>Click <strong>Start Lab</strong>.</li>
                    <li>Wait until the lab status changes to <strong>Running</strong>.</li>
                    <li>Confirm that the target is available at <code>http://localhost:3000</code>.</li>
                </ol>

                <h2>2. Observe Normal File Access</h2>

                <ol>
                    <li>Open the <strong>Simulation</strong> tab.</li>
                    <li>Select <strong>Normal File</strong>.</li>
                    <li>Use <code>report.txt</code> as the requested file.</li>
                    <li>Select <strong>Vulnerable Mode</strong>.</li>
                    <li>Click <strong>Run Experiment</strong>.</li>
                    <li>Observe the returned file content and HTTP response.</li>
                </ol>

                <div className="procedure-note">
                    <strong>Expected:</strong> The file is inside the permitted
                    directory, so normal file access succeeds.
                </div>

                <h2>3. Perform the Controlled Traversal Test</h2>

                <ol>
                    <li>Select <strong>Directory Traversal</strong>.</li>
                    <li>Use <code>../private/users.txt</code>.</li>
                    <li>Select <strong>Vulnerable Mode</strong>.</li>
                    <li>Click <strong>Run Experiment</strong>.</li>
                    <li>Observe the response and path analysis.</li>
                </ol>

                <div className="procedure-note">
                    <strong>Expected:</strong> Vulnerable Mode demonstrates how
                    a user-controlled path can move outside the intended directory.
                </div>

                <h2>4. Understand the Root Cause</h2>

                <p>
                    The vulnerability occurs when an application accepts a
                    user-controlled file path without correctly enforcing the
                    boundary of the permitted directory.
                </p>

                <p>
                    The <code>..</code> path component can be used to move to
                    a parent directory. If the application does not validate
                    the resulting path, files outside the intended directory
                    may become accessible.
                </p>

                <h2>5. Test the Secure Implementation</h2>

                <ol>
                    <li>Keep the same path: <code>../private/users.txt</code>.</li>
                    <li>Switch to <strong>Secure Mode</strong>.</li>
                    <li>Click <strong>Run Experiment</strong> again.</li>
                    <li>Compare the result with Vulnerable Mode.</li>
                </ol>

                <div className="procedure-note">
                    <strong>Expected:</strong> Secure Mode detects that the
                    resolved path is outside the permitted directory and blocks
                    the request.
                </div>

                <h2>6. Compare the Results</h2>

                <table className="procedure-table">
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Mode</th>
                            <th>Expected Result</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><code>report.txt</code></td>
                            <td>Vulnerable</td>
                            <td>Normal file is returned</td>
                        </tr>

                        <tr>
                            <td><code>../private/users.txt</code></td>
                            <td>Vulnerable</td>
                            <td>Controlled traversal demonstration</td>
                        </tr>

                        <tr>
                            <td><code>../private/users.txt</code></td>
                            <td>Secure</td>
                            <td>Access is blocked</td>
                        </tr>
                    </tbody>
                </table>

                <h2>7. Complete the Experiment</h2>

                <ol>
                    <li>Review the observed results and explanation.</li>
                    <li>Open <strong>Quiz / Assessment</strong>.</li>
                    <li>Complete the assessment.</li>
                    <li>Use <strong>Reset Lab</strong> to restore a clean state if required.</li>
                    <li>Click <strong>Stop Lab</strong> when the experiment is complete.</li>
                </ol>

                <div className="procedure-note">
                    <strong>Learning outcome:</strong> You should be able to
                    explain the path traversal vulnerability, its root cause,
                    the effect of crossing a directory boundary, and how secure
                    path validation prevents unauthorized file access.
                </div>

            </div>
        </div>
    );
}