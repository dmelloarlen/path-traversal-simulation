export default function ReferencesSection() {
    return (
        <div className="document">
            <div className="document-label">
                PATH TRAVERSAL LAB · REFERENCES
            </div>
            <h1>References</h1>
            <p className="subtitle">Standards & Recommended Reading</p>
            <div className="section-body">
                <ul>
                    <li><a href="https://owasp.org/www-community/attacks/Path_Traversal" target="_blank" rel="noreferrer">OWASP Path Traversal Community Guide</a></li>
                    <li><a href="https://cwe.mitre.org/data/definitions/22.html" target="_blank" rel="noreferrer">CWE-22: Improper Limitation of a Pathname to a Restricted Directory</a></li>
                    <li><a href="https://portswigger.net/web-security/file-path-traversal" target="_blank" rel="noreferrer">PortSwigger Web Security Academy - File Path Traversal</a></li>
                    <li><a href="https://nodejs.org/api/path.html" target="_blank" rel="noreferrer">Node.js Official Documentation - Path Module</a></li>
                </ul>
            </div>
        </div>
    );
}
