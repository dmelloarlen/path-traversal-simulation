export default function TestCasesSection() {
    return (
        <div className="document">
            <div className="document-label">
                PATH TRAVERSAL LAB · TEST CASES
            </div>
            <h1>Test Cases</h1>
            <p className="subtitle">Sample Attack & Validation Payloads</p>
            <div className="section-body">
                <h2>Recommended Test Payloads</h2>
                <table className="test-cases-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Payload</th>
                            <th>Target File</th>
                            <th>Expected (Vulnerable)</th>
                            <th>Expected (Secure)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Normal Access</td>
                            <td><code>report.txt</code></td>
                            <td>Public Document</td>
                            <td>200 OK (Content)</td>
                            <td>200 OK (Content)</td>
                        </tr>
                        <tr>
                            <td>Relative Traversal</td>
                            <td><code>../private/users.txt</code></td>
                            <td>User Credentials</td>
                            <td>200 OK (Exposed)</td>
                            <td>403 Forbidden</td>
                        </tr>
                        <tr>
                            <td>System File (Linux)</td>
                            <td><code>../../../../etc/passwd</code></td>
                            <td>Linux Accounts</td>
                            <td>200 OK (Exposed)</td>
                            <td>403 Forbidden</td>
                        </tr>
                        <tr>
                            <td>System File (Windows)</td>
                            <td><code>..\\..\\Windows\\win.ini</code></td>
                            <td>Windows Config</td>
                            <td>200 OK (Exposed)</td>
                            <td>403 Forbidden</td>
                        </tr>
                        <tr>
                            <td>URL Encoded</td>
                            <td><code>%2e%2e%2f%2e%2e%2fetc%2fpasswd</code></td>
                            <td>Linux Accounts</td>
                            <td>200 OK (Exposed)</td>
                            <td>403 Forbidden</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
