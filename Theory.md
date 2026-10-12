**PATH TRAVERSAL LAB · THEORY**

# Theory

*Path Traversal Mechanics & Defense-in-Depth*

## 1. What is Path Traversal?

Path Traversal (also known as Directory Traversal or CWE-22) is an access control vulnerability that allows an attacker to read or write arbitrary files on the server running an application.

## 2. How the Attack Works

Consider a web application that retrieves user profile images using a query parameter:

```
GET /image?filename=profile.png HTTP/1.1
```

If the server code concatenates this input without validation:

```
const filePath = "/var/www/app/public/" + req.query.filename;
fs.readFile(filePath, ...);
```

An attacker can pass `filename=../../../../etc/passwd`. The operating system resolves `/var/www/app/public/../../../../etc/passwd` directly to `/etc/passwd`, exposing sensitive system credentials!

## 3. Evasion & Bypass Vectors

- **Nested Sequences:** `....//` (bypasses simple non-recursive string replacement).
- **URL Percent Encoding:** `..%2f` or `%2e%2e%2f` (bypasses raw string match before URL decoding).
- **Double URL Encoding:** `%252e%252e%252f` (bypasses double-decoding application pipelines).
- **Windows Backslashes:** `..\\..\\Windows\\win.ini`.

## 4. Secure Remediation Pattern

```js
const path = require('path');
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
}
```
