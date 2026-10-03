export default function TheorySection() {
  return (
    <div className="document">
      <div className="document-label">PATH TRAVERSAL LAB · THEORY</div>
      <h1>Theory</h1>
      <p className="subtitle">Path Traversal Mechanics & Defense-in-Depth</p>
      <div className="section-body">
        <h2>1. What is Path Traversal?</h2>
        <p>
          Path Traversal (also known as Directory Traversal or CWE-22) is an
          access control vulnerability that allows an attacker to read or write
          arbitrary files on the server running an application.
        </p>

        <h2>2. How the Attack Works</h2>
        <p>
          Consider a web application that retrieves user profile images using a
          query parameter:
        </p>
        <div className="code-block">
          <pre>
            <code>GET /image?filename=profile.png HTTP/1.1</code>
          </pre>
        </div>
        <p>If the server code concatenates this input without validation:</p>
        <div className="code-block">
          <pre>
            <code>
              const filePath = "/var/www/app/public/" + req.query.filename;
              fs.readFile(filePath, ...);
            </code>
          </pre>
        </div>
        <p>
          An attacker can pass <code>filename=../../../../etc/passwd</code>. The
          operating system resolves{" "}
          <code>/var/www/app/public/../../../../etc/passwd</code> directly to{" "}
          <code>/etc/passwd</code>, exposing sensitive system credentials!
        </p>

        <h2>3. Evasion & Bypass Vectors</h2>
        <ul>
          <li>
            <strong>Nested Sequences:</strong> <code>....//</code> (bypasses
            simple non-recursive string replacement).
          </li>
          <li>
            <strong>URL Percent Encoding:</strong> <code>..%2f</code> or{" "}
            <code>%2e%2e%2f</code> (bypasses raw string match before URL
            decoding).
          </li>
          <li>
            <strong>Double URL Encoding:</strong> <code>%252e%252e%252f</code>{" "}
            (bypasses double-decoding application pipelines).
          </li>
          <li>
            <strong>Windows Backslashes:</strong>{" "}
            <code>..\\..\\Windows\\win.ini</code>.
          </li>
        </ul>

        <h2>4. Secure Remediation Pattern</h2>
        <div className="code-block">
          <pre>
            <code>{`const path = require('path');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

function getSafeFilePath(userInput) {
    // 1. Strip directory prefixes using path.basename
    const safeFilename = path.basename(userInput);
    const targetPath = path.resolve(PUBLIC_DIR, safeFilename);

    // 2. Verify resolved path stays inside allowed root
    if (!targetPath.startsWith(PUBLIC_DIR)) {
        throw new Error("Access Denied: Path Traversal Detected");
    }
    return targetPath;
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
