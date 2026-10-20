import { useState } from "react";

const questionBank = [
    {
        id: 1,
        difficulty: "Intermediate",
        question: "In the lab, a request for report.txt succeeds in Vulnerable mode. What does this establish?",
        options: [
            "Every file on the server is accessible",
            "The application can serve the requested normal file",
            "Path traversal is definitely exploitable",
            "The server is running as root"
        ],
        answer: 1,
        explanation: "A successful normal-file request establishes the baseline. You must test a traversal path to assess whether access controls can be bypassed."
    },
    {
        id: 2,
        difficulty: "Advanced",
        question: "A traversal-style request returns HTTP 200. What is the strongest conclusion you can draw from the status code alone?",
        options: [
            "The requested sensitive file was disclosed",
            "The application is definitely vulnerable",
            "The server returned a successful HTTP response, but its content must be examined",
            "The secure mode has been bypassed"
        ],
        answer: 2,
        explanation: "HTTP 200 indicates a successful HTTP response, not necessarily successful access to the intended file. Inspect the response body and compare it with the lab's expected behavior."
    },
    {
        id: 3,
        difficulty: "Intermediate",
        question: "In the lab's file tree, which target is outside the public directory and is intended to demonstrate traversal?",
        options: [
            "report.txt",
            "welcome.txt",
            "private/users.txt",
            "A file placed directly inside public"
        ],
        answer: 2,
        explanation: "The private/users.txt target is outside the public directory in the lab's conceptual file tree."
    },
    {
        id: 4,
        difficulty: "Advanced",
        question: "You request ../private/users.txt in Vulnerable mode and receive the expected private file contents. What does this demonstrate?",
        options: [
            "The application may be allowing access outside its intended public directory",
            "The application correctly blocked traversal",
            "The file extension is invalid",
            "The browser automatically grants filesystem access"
        ],
        answer: 0,
        explanation: "If the response contains the expected outside-directory file contents, the result is evidence that the path restriction can be bypassed in that lab scenario."
    },
    {
        id: 5,
        difficulty: "Intermediate",
        question: "Why should you compare the same traversal request in Vulnerable and Secure modes?",
        options: [
            "To determine whether the browser cached the response",
            "To observe how the lab's security mode changes the outcome",
            "To make the request use HTTPS",
            "To prove that all real-world servers behave identically"
        ],
        answer: 1,
        explanation: "Comparing the same input across modes helps isolate the effect of the lab's security behavior."
    },
    {
        id: 6,
        difficulty: "Advanced",
        question: "The same traversal input returns HTTP 403 in Secure mode. What is the best interpretation?",
        options: [
            "The server has crashed",
            "The lab has denied the request",
            "The file definitely does not exist",
            "The response proves every possible traversal technique is blocked"
        ],
        answer: 1,
        explanation: "HTTP 403 indicates the request was forbidden. It does not prove the file is absent or that every possible bypass is prevented."
    },
    {
        id: 7,
        difficulty: "Intermediate",
        question: "Why does the lab encode the filename using encodeURIComponent when constructing its request?",
        options: [
            "To encrypt the filename so nobody can read it",
            "To encode characters safely for use as a URL query-parameter value",
            "To authenticate the user",
            "To guarantee that traversal is blocked"
        ],
        answer: 1,
        explanation: "URL encoding represents special characters appropriately in a query parameter. It is not encryption and does not replace server-side validation."
    },
    {
        id: 8,
        difficulty: "Advanced",
        question: "A developer blocks input only when it starts with ../. Which issue remains?",
        options: [
            "No issue remains if the check is case-sensitive",
            "Other path forms or normalization behavior may evade the simplistic check",
            "The check automatically verifies filesystem permissions",
            "The check prevents all absolute paths by definition"
        ],
        answer: 1,
        explanation: "Checking one string prefix is not a robust containment strategy. Validate the canonical resolved path against the intended base directory."
    },
    {
        id: 9,
        difficulty: "Advanced",
        question: "Why is checking resolvedPath.startsWith(allowedBaseDirectory) alone potentially unsafe?",
        options: [
            "startsWith cannot compare strings",
            "A sibling path such as /safe/base-evil can share the prefix /safe/base",
            "It always follows symbolic links incorrectly",
            "It only works for URL paths"
        ],
        answer: 1,
        explanation: "String-prefix checks can accept sibling paths with a shared textual prefix. Use canonical paths and a path-aware containment check with proper directory boundaries."
    },
    {
        id: 10,
        difficulty: "Intermediate",
        question: "What should a secure file-download endpoint ideally accept when users only need a limited set of files?",
        options: [
            "Any absolute path supplied by the user",
            "A filename or identifier from an allowlist",
            "Any path after removing one occurrence of ../",
            "A path supplied through a hidden form field"
        ],
        answer: 1,
        explanation: "An allowlist of permitted filenames or opaque file identifiers reduces reliance on arbitrary user-controlled paths."
    },
    {
        id: 11,
        difficulty: "Advanced",
        question: "A developer removes ../ from the input exactly once. Why is this not a reliable defense?",
        options: [
            "The string becomes too short",
            "Repeated or transformed patterns may remain after a single replacement",
            "The operating system ignores every dot",
            "The browser always converts the input to an absolute path"
        ],
        answer: 1,
        explanation: "One-time string replacement is brittle. Resolve and validate the final canonical path against a trusted base directory instead."
    },
    {
        id: 12,
        difficulty: "Intermediate",
        question: "Which statement best distinguishes input validation from authorization?",
        options: [
            "They are identical controls",
            "Validation checks whether input is acceptable; authorization checks whether access is permitted",
            "Authorization only applies to browsers",
            "Validation guarantees that the requested file belongs to the user"
        ],
        answer: 1,
        explanation: "Both controls matter: validate the input and independently enforce which files the requester is allowed to access."
    },
    {
        id: 13,
        difficulty: "Advanced",
        question: "The lab shows a 403 response in Secure mode, but you have not inspected the response body. What should you do before writing your conclusion?",
        options: [
            "Assume all file paths are secure",
            "Inspect the response and compare it with the expected lab behavior",
            "Conclude that the server is offline",
            "Change the request to an unrelated file"
        ],
        answer: 1,
        explanation: "Record both the HTTP status and response content. Base the conclusion on the observed behavior rather than the status code alone."
    },
    {
        id: 14,
        difficulty: "Intermediate",
        question: "Which item is the strongest evidence that a traversal test exposed a file?",
        options: [
            "The URL contains ../",
            "The response contains the expected contents of the outside-directory target",
            "The submit button changes color",
            "The browser displays a loading indicator"
        ],
        answer: 1,
        explanation: "The returned content, interpreted alongside the status code and expected target, is stronger evidence than the request string alone."
    },
    {
        id: 15,
        difficulty: "Advanced",
        question: "A server resolves a user-supplied path and checks that the result is inside /srv/app/public. What additional detail matters for a robust check?",
        options: [
            "Whether the filename contains uppercase letters",
            "Whether the check uses canonical paths and a correct directory-boundary comparison",
            "Whether the browser has JavaScript enabled",
            "Whether the URL ends in .txt"
        ],
        answer: 1,
        explanation: "The server must compare normalized/canonical paths safely and enforce a real directory boundary, rather than relying on a raw prefix."
    },
    {
        id: 16,
        difficulty: "Advanced",
        question: "Why should a file-serving service run with least filesystem privilege?",
        options: [
            "It makes every request return HTTP 200",
            "It limits the damage if a path restriction is bypassed",
            "It eliminates the need for validation",
            "It hides all filenames from the browser"
        ],
        answer: 1,
        explanation: "A low-privilege service account limits which files an attacker could read even if another control fails."
    },
    {
        id: 17,
        difficulty: "Intermediate",
        question: "In the lab, a normal file works in both modes but an outside-directory path is denied in Secure mode. What is the most reasonable conclusion?",
        options: [
            "The lab's secure behavior permits the normal file while restricting the tested traversal path",
            "All files on the machine are protected from every attack",
            "The browser is responsible for file authorization",
            "The file tree is irrelevant to the test"
        ],
        answer: 0,
        explanation: "This comparison is consistent with the intended lab behavior. It does not establish that every possible attack or path form is blocked."
    },
    {
        id: 18,
        difficulty: "Advanced",
        question: "Why should the server not trust a filename merely because it was submitted by a logged-in user?",
        options: [
            "Logged-in users cannot send special characters",
            "Authentication identifies the user but does not automatically authorize access to every file",
            "Authentication encrypts all paths",
            "A login session disables path traversal syntax"
        ],
        answer: 1,
        explanation: "Authentication and file authorization are different. The server must still restrict access to permitted resources."
    },
    {
        id: 19,
        difficulty: "Intermediate",
        question: "Which request input is most relevant to the lab's file-selection behavior?",
        options: [
            "The filename value sent in the name query parameter",
            "The browser window title",
            "The user's screen resolution",
            "The color of the selected tab"
        ],
        answer: 0,
        explanation: "The simulation sends the chosen filename through the name query parameter, along with the selected mode."
    },
    {
        id: 20,
        difficulty: "Advanced",
        question: "A request for ../config/database.txt is denied in Secure mode. Which conclusion is too strong?",
        options: [
            "This tested request was denied",
            "The observed behavior matches the lab's intended secure-mode restriction",
            "Every encoding, operating system path format, and possible bypass has been ruled out",
            "The response should be recorded as part of the test"
        ],
        answer: 2,
        explanation: "One test only supports a conclusion about the tested input and observed environment. Broader security claims require broader testing and code review."
    },
    {
        id: 21,
        difficulty: "Advanced",
        question: "Which approach provides the strongest defense for a feature that serves files from one designated directory?",
        options: [
            "Remove ../ once and trust the result",
            "Accept user paths and rely on a WAF",
            "Map allowed identifiers to known files, enforce canonical path containment, and use least privilege",
            "Hide the file path field using CSS"
        ],
        answer: 2,
        explanation: "Use layered controls: allowlisted identifiers, canonical path containment, and restricted filesystem permissions. A WAF or UI change is not a substitute."
    },
    {
        id: 22,
        difficulty: "Intermediate",
        question: "What does the lab's conceptual file tree help you do?",
        options: [
            "See the relationship between the public directory and outside targets",
            "Read arbitrary files on your own computer",
            "Change the server's filesystem permissions",
            "Confirm the operating system used by every server"
        ],
        answer: 0,
        explanation: "The tree illustrates which files are inside the intended public area and which targets are outside it."
    },
    {
        id: 23,
        difficulty: "Advanced",
        question: "A test returns HTTP 200, but the body says access denied. How should you record the result?",
        options: [
            "Definitely successful file disclosure",
            "A successful HTTP status with a body that appears to deny access; investigate the application's response semantics",
            "A confirmed server crash",
            "Proof that the path does not exist"
        ],
        answer: 1,
        explanation: "HTTP status and application-level content can disagree. Record both and investigate how the application represents denial or errors."
    },
    {
        id: 24,
        difficulty: "Advanced",
        question: "What is the best way to report a finding from this lab?",
        options: [
            "Say 'the website is insecure' without evidence",
            "Record the mode, input, status code, relevant response content, and expected-versus-observed behavior",
            "Report only the URL",
            "Assume the result applies to all operating systems"
        ],
        answer: 1,
        explanation: "A reproducible finding includes the test conditions, request input, status, response evidence, and a carefully scoped conclusion."
    }
];

function getRandomQuestions() {
    const shuffledQuestions = [...questionBank];

    for (let i = shuffledQuestions.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[randomIndex]] = [
            shuffledQuestions[randomIndex],
            shuffledQuestions[i]
        ];
    }

    return shuffledQuestions.slice(0, 20);
}

export default function QuizSection() {
    const [quizQuestions, setQuizQuestions] = useState(() => getRandomQuestions());
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleSelectOption = (qId, optionIdx) => {
        if (submitted) return;
        setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    };

    const calculateScore = () => {
        let score = 0;
        quizQuestions.forEach(q => {
            if (userAnswers[q.id] === q.answer) {
                score += 1;
            }
        });
        return score;
    };

    const handleResetQuiz = () => {
        setUserAnswers({});
        setSubmitted(false);
        setQuizQuestions(getRandomQuestions());
    };

    const handleSubmitQuiz = () => {
        const confirmed = window.confirm(
            "Are you sure you want to submit the quiz? Unanswered questions will be marked incorrect."
        );
        if (confirmed) {
            setSubmitted(true);
        }
    };

    const score = calculateScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
        <div className="document quiz-document">
            <div className="document-label">
                PATH TRAVERSAL LAB · QUIZ ASSESSMENT
            </div>
            <h1>Path Traversal Assessment</h1>
            <div className="quiz-progress-track" aria-label="Quiz completion">
                <div
                    className="quiz-progress-fill"
                    style={{
                        width: `${(Object.keys(userAnswers).length / quizQuestions.length) * 100
                            }%`
                    }}
                />
            </div>
            <div className="quiz-summary-card">
                <div>
                    <strong>Progress:</strong> {Object.keys(userAnswers).length} of {quizQuestions.length} answered
                </div>
                {submitted ? (
                    <div className="score-badge">
                        Score: <strong>{score} / {quizQuestions.length}</strong> ({percentage}%)
                    </div>
                ) : (
                    <button
                        className="submit-quiz-btn"
                        disabled={Object.keys(userAnswers).length === 0}
                        onClick={handleSubmitQuiz}
                    >
                        Submit & Grade Quiz
                    </button>
                )}
                {submitted && (
                    <button className="reset-quiz-btn" onClick={handleResetQuiz}>
                        Retake Quiz
                    </button>
                )}
            </div>

            <div className="quiz-questions-list">
                {quizQuestions.map((q, idx) => {
                    const isCorrect = userAnswers[q.id] === q.answer;

                    let statusClass = "";
                    if (submitted) {
                        statusClass = isCorrect ? "correct" : "incorrect";
                    }

                    return (
                        <div key={q.id} className={`quiz-card ${statusClass}`}>
                            <div className="quiz-header">
                                <span className="q-number">Q{idx + 1}</span>

                                <span className="q-text">{q.question}</span>

                                <span
                                    className={`difficulty-badge ${q.difficulty === "Advanced" ? "advanced" : "intermediate"
                                        }`}
                                >
                                    {q.difficulty}
                                </span>
                            </div>
                            <div className="quiz-options">
                                {q.options.map((opt, optIdx) => {
                                    const checked = userAnswers[q.id] === optIdx;
                                    let optClass = "quiz-opt";
                                    if (submitted) {
                                        if (optIdx === q.answer) optClass += " correct-opt";
                                        else if (checked && optIdx !== q.answer) optClass += " wrong-opt";
                                    } else if (checked) {
                                        optClass += " selected-opt";
                                    }

                                    return (
                                        <label key={optIdx} className={optClass}>
                                            <input
                                                type="radio"
                                                name={`q_${q.id}`}
                                                checked={checked}
                                                onChange={() => handleSelectOption(q.id, optIdx)}
                                                disabled={submitted}
                                            />
                                            <span className="opt-letter">{String.fromCharCode(65 + optIdx)}.</span>
                                            <span className="opt-label">{opt}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            {submitted && (
                                <div className="quiz-explanation">
                                    <strong>{isCorrect ? "✓ Correct!" : "✗ Incorrect."}</strong> {q.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
