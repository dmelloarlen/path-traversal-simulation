export default function ProcedureSection() {
    return (
        <div className="document">
            <div className="document-label">
                PATH TRAVERSAL LAB · PROCEDURE
            </div>
            <h1>Procedure</h1>
            <p className="subtitle">Lab Walkthrough Steps</p>
            <div className="section-body">
                <h2>Step-by-Step Experimentation</h2>
                <ol>
                    <li>Click on the <strong>Simulation</strong> tab in the navigation menu.</li>
                    <li>Select <strong>Normal File</strong> from the dropdown menu to test legitimate file access (e.g. <code>report.txt</code>).</li>
                    <li>Switch to <strong>Directory Traversal</strong> mode and examine the request payload containing relative path references (<code>../private/users.txt</code>).</li>
                    <li>Toggle between <strong>Vulnerable Mode</strong> (which directly reads the file path) and <strong>Secure Mode</strong> (which sanitizes input).</li>
                    <li>Observe the server HTTP status code and response payload difference between vulnerable and secure handling.</li>
                </ol>
            </div>
        </div>
    );
}
