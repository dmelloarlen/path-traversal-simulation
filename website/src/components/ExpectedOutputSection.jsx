export default function ExpectedOutputSection() {
    return (
        <div className="document">
            <div className="document-label">
                PATH TRAVERSAL LAB · EXPECTED OUTPUT
            </div>
            <h1>Expected Output</h1>
            <p className="subtitle">Lab Execution Results</p>
            <div className="section-body">
                <h2>Vulnerable Mode Output</h2>
                <div className="code-block">
                    <pre><code>HTTP/1.1 200 OK
Content-Type: text/plain

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
user:x:1000:1000:LabUser:/home/user:/bin/bash</code></pre>
                </div>

                <h2>Secure Mode Output</h2>
                <div className="code-block">
                    <pre><code>{`HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": "Access Denied",
  "message": "Path traversal sequence detected. Access outside root directory is restricted."
}`}</code></pre>
                </div>
            </div>
        </div>
    );
}
