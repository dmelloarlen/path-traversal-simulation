**PATH TRAVERSAL LAB · AIM & OBJECTIVES**

# Aim, Objectives

*Lab Purpose & Key Takeaways*

## Aim of the Experiment

To understand how **Path Traversal (Directory Traversal)** vulnerabilities occur when web applications fail to sanitize user-supplied file path inputs, and to learn how to mitigate them using secure coding patterns.

## Key Learning Objectives

- Identify vulnerable code patterns that concatenate directory paths with user parameters.
- Analyze how `../` (dot-dot-slash) sequences step up directory hierarchies to access restricted files.
- Explore common bypass techniques including URL encoding (`%2e%2e%2f`) and nested traversal sequences.
- Implement robust defenses using path canonicalization (`path.resolve`, `path.basename`) and base directory verification.
