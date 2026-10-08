const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const root = __dirname;
const publicDir = path.join(root, "public");

app.use(express.json());

app.use(express.static(path.join(root, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(root, "dist", "index.html"));
});

app.get("/files", (req, res) => {
    const filename = req.query.name || "";
    const mode = req.query.mode || "vulnerable";

    const requestedPath = path.resolve(publicDir, filename);

    if (mode === "secure") {
        const relative = path.relative(publicDir, requestedPath);

        if (relative.startsWith("..") || path.isAbsolute(relative)) {
            return res.status(403).json({
                status: "blocked",
                message: "Access denied: path is outside the public directory"
            });
        }
    }

    if (!fs.existsSync(requestedPath)) {
        return res.status(404).json({
            status: "error",
            message: "File not found"
        });
    }

    res.json({
        status: "success",
        file: filename,
        content: fs.readFileSync(requestedPath, "utf8")
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Path Traversal Lab running on port ${PORT}`);
});