import { useState } from "react";

const questionBank = [
    {
        id: 1,
        question: "What is the primary cause of a Path Traversal vulnerability?",
        options: [
            "Unrestricted file upload sizes",
            "Insufficient validation of user-controlled file paths",
            "Lack of HTTPS encryption",
            "Using SQL databases instead of NoSQL"
        ],
        answer: 1,
        explanation: "Path traversal occurs when user input is used to construct file paths without proper sanitization or validation."
    },
    {
        id: 2,
        question: "Which sequence of characters is standard for ascending to a parent directory in POSIX and Windows filesystems?",
        options: [
            "./",
            "../",
            "//",
            "~~/"
        ],
        answer: 1,
        explanation: "The '../' sequence instructs the operating system filesystem navigator to step up one directory level."
    },
    {
        id: 3,
        question: "What is another common name for a Path Traversal vulnerability?",
        options: [
            "Directory Traversal",
            "Cross-Site Scripting",
            "Buffer Overflow",
            "Remote Code Execution"
        ],
        answer: 0,
        explanation: "Path Traversal is frequently referred to as Directory Traversal or dot-dot-slash vulnerability."
    },
    {
        id: 4,
        question: "Which system file is frequently targeted on Linux systems to verify a read-based path traversal vulnerability?",
        options: [
            "/etc/passwd",
            "C:\\Windows\\System32\\config\\SAM",
            "/var/log/nginx/access.log",
            "/boot/grub/grub.cfg"
        ],
        answer: 0,
        explanation: "/etc/passwd is readable by default on Unix/Linux systems and confirms arbitrary file read capability."
    },
    {
        id: 5,
        question: "What critical Windows system file is often targeted in path traversal demonstrations?",
        options: [
            "C:\\boot.ini or C:\\Windows\\win.ini",
            "/etc/shadow",
            "/proc/version",
            "/sys/class/net"
        ],
        answer: 0,
        explanation: "C:\\Windows\\win.ini and C:\\boot.ini are standard target paths on Windows to verify file disclosure."
    },
    {
        id: 6,
        question: "Which HTTP request component is most commonly exploited to perform path traversal?",
        options: [
            "User-Agent header",
            "URL path or GET query parameters",
            "Host header",
            "Accept-Encoding header"
        ],
        answer: 1,
        explanation: "Query parameters (e.g. ?filename=...) and URI path segments are the most common vectors."
    },
    {
        id: 7,
        question: "What risk does a successful read-only Path Traversal attack pose?",
        options: [
            "Denial of Service",
            "Information Disclosure of sensitive configuration or system files",
            "Altering administrative passwords in memory",
            "Defacing the database schema"
        ],
        answer: 1,
        explanation: "Read-only traversal exposes sensitive source code, passwords, configuration files, and tokens."
    },
    {
        id: 8,
        question: "If an application appends '.pdf' to user input, which historic technique was used to truncate the extension in older platforms?",
        options: [
            "Space padding",
            "Null byte injection (%00 or \\0)",
            "Double slash //",
            "URL hash #"
        ],
        answer: 1,
        explanation: "Null bytes (%00) caused C-based file APIs to terminate the string early, ignoring appended extensions."
    },
    {
        id: 9,
        question: "How does URL encoding '../' appear in standard percent-encoding?",
        options: [
            "%2e%2e%2f",
            "%25%25%25",
            "%fe%fe%fd",
            "%90%90%90"
        ],
        answer: 0,
        explanation: "Dot '.' is %2e and forward slash '/' is %2f, making '../' equivalent to %2e%2e%2f."
    },
    {
        id: 10,
        question: "What is Double URL encoding for '../'?",
        options: [
            "%252e%252e%252f",
            "%2e%2e%2f",
            "..%2f",
            "%252f%252f"
        ],
        answer: 0,
        explanation: "In double encoding, '%' (%25) is encoded again: %2e becomes %252e and %2f becomes %252f."
    },
    {
        id: 11,
        question: "Why might nested sequences like '....//' bypass basic blacklists that replace '../' with empty strings?",
        options: [
            "The web server automatically strips numbers.",
            "Removing '../' once collapses '....//' into '../'.",
            "'....//' triggers a 404 error before validation.",
            "It causes an infinite loop in Regex."
        ],
        answer: 1,
        explanation: "A single non-recursive replace of '../' in '....//' removes the inner '../', leaving behind '../'."
    },
    {
        id: 12,
        question: "Which Unicode / UTF-8 representation might bypass poorly written input filters checking for '/'?",
        options: [
            "Overlong UTF-8 sequences like %c0%af or %c1%9c",
            "%20",
            "\\n",
            "\\t"
        ],
        answer: 0,
        explanation: "Overlong UTF-8 encodings like %c0%af decode to '/' after security checks if IIS/Apache decodes prematurely."
    },
    {
        id: 13,
        question: "On Windows operating systems, which directory separator character is valid in file paths alongside '/'?",
        options: [
            "\\ (Backslash)",
            ": (Colon only)",
            "| (Pipe)",
            "> (Greater than)"
        ],
        answer: 0,
        explanation: "Windows accepts both forward slash '/' and backslash '\\' as directory path separators."
    },
    {
        id: 14,
        question: "How can absolute path traversal bypass prefix prepending logic like '/var/www/uploads/' + user_input?",
        options: [
            "Passing an absolute path like '/etc/passwd' if the path resolver ignores the base path.",
            "Passing a single dot .",
            "Using upper case characters.",
            "Changing HTTP method to OPTIONS."
        ],
        answer: 0,
        explanation: "In some languages, passing an absolute path (e.g. '/etc/passwd') overrides relative root joins."
    },
    {
        id: 15,
        question: "What is the impact of an arbitrary file write path traversal vulnerability?",
        options: [
            "Remote Code Execution by overwriting executable binaries or configuration scripts",
            "SQL Injection",
            "Cross-Site Request Forgery",
            "Memory leak in the client browser"
        ],
        answer: 0,
        explanation: "Writing files outside intended locations allows overwriting SSH keys, cron jobs, or web shells leading to RCE."
    },
    {
        id: 16,
        question: "Which Node.js built-in module function strips directory path prefixes and returns only the filename portion?",
        options: [
            "path.basename()",
            "path.join()",
            "path.resolve()",
            "fs.readFileSync()"
        ],
        answer: 0,
        explanation: "path.basename('/etc/passwd') returns 'passwd', effectively stripping directory traversal sequences."
    },
    {
        id: 17,
        question: "What does path.resolve('/var/www/html', '../../etc/passwd') return in Node.js?",
        options: [
            "/etc/passwd",
            "/var/www/html/../../etc/passwd",
            "null",
            "An error throw"
        ],
        answer: 0,
        explanation: "path.resolve evaluates relative segments ('..') and outputs the absolute normalized path '/etc/passwd'."
    },
    {
        id: 18,
        question: "What is canonicalization in the context of file path handling?",
        options: [
            "Converting a relative path with symlinks, '..', and encodings into its unique absolute path.",
            "Encrypting the file path with AES-256.",
            "Compressing the path string using gzip.",
            "Converting the path into base64 format."
        ],
        answer: 0,
        explanation: "Canonicalization resolves symbolic links, relative references, and encodings into an absolute canonical path."
    },
    {
        id: 19,
        question: "Which defense technique restricts a process's root directory access at the operating system level?",
        options: [
            "chroot jail or containerization (Docker/namespaces)",
            "CORS policies",
            "Content Security Policy (CSP)",
            "Web Application Firewall (WAF) rule only"
        ],
        answer: 0,
        explanation: "Chroot jails and container isolation restrict the filesystem environment visible to the application process."
    },
    {
        id: 20,
        question: "How should an application securely verify if a resolved file path is permitted?",
        options: [
            "Check that resolvedPath.startsWith(allowedBaseDirectory) returns true.",
            "Check if the filename contains .txt.",
            "Check if the string length is under 50 characters.",
            "Use String.includes('../')."
        ],
        answer: 0,
        explanation: "Canonicalizing both paths and checking that the target path begins with the base directory guarantees containment."
    },
    {
        id: 21,
        question: "Why is relying solely on client-side path validation insecure?",
        options: [
            "Client-side controls can be easily bypassed by intercepting or sending direct HTTP requests.",
            "Browsers do not support JavaScript regex.",
            "Client validation slows down server response times.",
            "Server logs will fail to record client events."
        ],
        answer: 0,
        explanation: "Attackers can bypass browser JS validations using tools like cURL, Burp Suite, or Postman."
    },
    {
        id: 22,
        question: "In Java, what method on java.io.File retrieves the canonical path?",
        options: [
            "file.getCanonicalPath()",
            "file.getAbs()",
            "file.toCleanString()",
            "file.sanitize()"
        ],
        answer: 0,
        explanation: "java.io.File.getCanonicalPath() resolves relative paths and symlinks to determine true filesystem location."
    },
    {
        id: 23,
        question: "In Python, which standard module function resolves absolute canonical paths?",
        options: [
            "os.path.realpath() or Path.resolve()",
            "os.path.split()",
            "os.getcwd()",
            "sys.path.append()"
        ],
        answer: 0,
        explanation: "os.path.realpath() eliminates symlinks and relative path indicators like '..' in Python."
    },
    {
        id: 24,
        question: "In PHP, which function returns the canonicalized absolute pathname?",
        options: [
            "realpath()",
            "basename()",
            "file_exists()",
            "pathinfo()"
        ],
        answer: 0,
        explanation: "PHP's realpath() function expands symbolic links and relative path references and returns false if file missing."
    },
    {
        id: 25,
        question: "What is an indirect file reference pattern (whitelist mapping)?",
        options: [
            "Mapping user choices (e.g. id=1) to fixed internal filenames in a server dictionary rather than taking file paths directly.",
            "Using 302 redirects for all files.",
            "Storing files on external S3 buckets without access keys.",
            "Renaming all files with numbers."
        ],
        answer: 0,
        explanation: "Indirect reference prevents users from specifying any path characters, enforcing strict lookup maps."
    },
    {
        id: 26,
        question: "Which vulnerability scanner tool is widely used to automatically detect Path Traversal flaws?",
        options: [
            "OWASP ZAP / Burp Suite / Nmap",
            "Wireshark",
            "Hashcat",
            "John the Ripper"
        ],
        answer: 0,
        explanation: "Web security scanners like Burp Suite and OWASP ZAP include automated payloads to test path traversal."
    },
    {
        id: 27,
        question: "In a web server access log, what log entry signature indicates a potential path traversal attempt?",
        options: [
            "GET /download?file=..%2F..%2F..%2Fetc%2Fpasswd HTTP/1.1",
            "POST /login HTTP/1.1 200",
            "GET /favicon.ico HTTP/1.1 304",
            "OPTIONS /api HTTP/1.1"
        ],
        answer: 0,
        explanation: "Frequent percent-encoded or raw dot-dot-slash patterns target system files in GET parameters indicate probes."
    },
    {
        id: 28,
        question: "Which of the following paths represents a Windows UNC path bypass attempt?",
        options: [
            "\\\\attacker-server\\share\\file.txt",
            "C:\\Users\\Public",
            "/dev/null",
            "http://localhost:3000"
        ],
        answer: 0,
        explanation: "UNC paths (\\\\host\\share) can trick Windows file APIs into loading remote SMB files or leaking NTLM hashes."
    },
    {
        id: 29,
        question: "What type of encoding is %252e%252e%252f?",
        options: [
            "Double URL encoding",
            "HTML Entity encoding",
            "Base64 encoding",
            "Hexadecimal binary encoding"
        ],
        answer: 0,
        explanation: "%252e double URL encodes '.' and %252f double URL encodes '/'."
    },
    {
        id: 30,
        question: "Why is blacklisting dangerous as a primary security control against path traversal?",
        options: [
            "Attackers can use alternative encodings, alternate slashes, or nested sequences to bypass the list.",
            "Blacklists consume too much RAM.",
            "Blacklists require database indexing.",
            "Blacklists break valid user passwords."
        ],
        answer: 0,
        explanation: "Blacklists fail because it is nearly impossible to enumerate all possible bypass combinations and encodings."
    },
    {
        id: 31,
        question: "What is the recommended principle of least privilege regarding web server user accounts?",
        options: [
            "Run the web server process under a dedicated low-privilege user account with read access strictly restricted to required web directories.",
            "Run the server as root or SYSTEM to ensure high availability.",
            "Grant write access to /etc/ for error logging.",
            "Disable all user permissions."
        ],
        answer: 0,
        explanation: "Limiting web process OS permissions restricts damage even if path traversal reads sensitive system files."
    },
    {
        id: 32,
        question: "If a web application serves files using an ID parameter (e.g. file_id=42), how does this protect against path traversal?",
        options: [
            "User input is never used directly as a file system path; the server looks up file ID 42 in a secure database/mapping.",
            "It encrypts the user session.",
            "It forces HTTPS communication.",
            "It prevents cross-site scripting."
        ],
        answer: 0,
        explanation: "Indirect identifiers disconnect request parameters from filesystem path resolution completely."
    },
    {
        id: 33,
        question: "Which HTTP Status Code is appropriate when a path traversal attempt outside the allowed directory is blocked by server validation?",
        options: [
            "403 Forbidden or 400 Bad Request",
            "200 OK",
            "302 Found",
            "500 Internal Server Error"
        ],
        answer: 0,
        explanation: "HTTP 403 Forbidden signals unauthorized resource access attempt, while 400 Bad Request flags malformed input."
    },
    {
        id: 34,
        question: "What is a 'Zip Slip' vulnerability?",
        options: [
            "A path traversal vulnerability during archive extraction where filenames inside a zip archive contain '../' sequences to overwrite system files.",
            "A compression algorithm flaw causing memory exhaustion.",
            "A WiFi packet sniffing exploit.",
            "An SSL certificate revocation issue."
        ],
        answer: 0,
        explanation: "Zip Slip occurs when extracted archive entries contain unvalidated relative paths like '../../shell.sh'."
    },
    {
        id: 35,
        question: "Which HTTP header can be combined with file uploads to prevent path traversal in destination filenames?",
        options: [
            "Content-Disposition sanitization",
            "Keep-Alive",
            "Accept-Language",
            "Server-Timing"
        ],
        answer: 0,
        explanation: "Extracting filename from Content-Disposition requires stripping path prefixes (e.g. using path.basename)."
    },
    {
        id: 36,
        question: "In Docker containerized applications, how do containers mitigate host file access via path traversal?",
        options: [
            "Container root filesystem isolation prevents path traversal from escaping the container filesystem to the host OS filesystem.",
            "Docker automatically deletes '../' from HTTP headers.",
            "Containers turn off file system permissions.",
            "Docker converts all files into SQL databases."
        ],
        answer: 0,
        explanation: "Container namespaces isolate the root mount table so traversal cannot reach host host files outside mounts."
    },
    {
        id: 37,
        question: "Which vulnerability classification framework categorizes Path Traversal under CWE-22?",
        options: [
            "Common Weakness Enumeration (CWE)",
            "Common Vulnerability Scoring System (CVSS)",
            "National Vulnerability Database (NVD)",
            "OWASP Top 10 API Security"
        ],
        answer: 0,
        explanation: "CWE-22 is the specific Common Weakness Enumeration ID for Path Traversal."
    },
    {
        id: 38,
        question: "What does CWE-22 stand for?",
        options: [
            "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
            "SQL Injection in Dynamic Queries",
            "Cross-Site Scripting (XSS)",
            "Broken Object Level Authorization"
        ],
        answer: 0,
        explanation: "CWE-22 defines weaknesses involving improper limitation of file path parameters."
    },
    {
        id: 39,
        question: "What OWASP Top 10 (2021) category includes Path Traversal vulnerabilities?",
        options: [
            "A01:2021 – Broken Access Control",
            "A02:2021 – Cryptographic Failures",
            "A03:2021 – Injection",
            "A05:2021 – Security Misconfiguration"
        ],
        answer: 0,
        explanation: "OWASP Top 10 2021 categorizes Path Traversal under A01: Broken Access Control."
    },
    {
        id: 40,
        question: "What is the most robust combination of defenses against Path Traversal vulnerabilities?",
        options: [
            "Use indirect file identifiers (whitelisting), canonicalize & check path prefixes, run under low-privilege service accounts, and use isolated container environments.",
            "Rely on WAF rules and client-side JavaScript validation.",
            "Strip '../' once and convert all filenames to uppercase.",
            "Disable file downloads on the website entirely."
        ],
        answer: 0,
        explanation: "Defense-in-depth combining canonical path verification, least privilege, and container isolation is most effective."
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
