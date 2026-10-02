export default function AimObjectivesSection() {
    return (
        <div className="document">
            <div className="document-label">
                PATH TRAVERSAL LAB · AIM & OBJECTIVES
            </div>
            <h1>Aim, Objectives</h1>
            <p className="subtitle">Lab Purpose & Key Takeaways</p>
            <div className="section-body">
                <h2>Aim of the Experiment</h2>
                <p>
                    To understand how <strong>Path Traversal (Directory Traversal)</strong> vulnerabilities occur when web applications fail to sanitize user-supplied file path inputs, and to learn how to mitigate them using secure coding patterns.
                </p>
                <h2>Key Learning Objectives</h2>
                <ul>
                    <li>Identify vulnerable code patterns that concatenate directory paths with user parameters.</li>
                    <li>Analyze how <code>../</code> (dot-dot-slash) sequences step up directory hierarchies to access restricted files.</li>
                    <li>Explore common bypass techniques including URL encoding (<code>%2e%2e%2f</code>) and nested traversal sequences.</li>
                    <li>Implement robust defenses using path canonicalization (<code>path.resolve</code>, <code>path.basename</code>) and base directory verification.</li>
                </ul>
            </div>
        </div>
    );
}
