const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { execFile } = require("child_process");

const labPath = path.resolve(__dirname, "../lab-package");

function runDocker(args, timeout = 300000) {
    return new Promise((resolve, reject) => {
        execFile(
            "docker",
            ["compose", ...args],
            {
                cwd: labPath,
                timeout,
                windowsHide: true
            },
            (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(stderr || error.message));
                    return;
                }

                resolve(stdout || stderr || "Command completed successfully.");
            }
        );
    });
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1250,
        height: 850,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, "../website/dist/index.html"));
}

ipcMain.handle("lab-start", async () => {
    try {
        const output = await runDocker(["up", "--build", "-d"]);
        return { success: true, output };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle("lab-stop", async () => {
    try {
        const output = await runDocker(["down"]);
        return { success: true, output };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle("lab-reset", async () => {
    try {
        await runDocker(["down", "--volumes", "--remove-orphans"]);
        const output = await runDocker(["up", "--build", "-d"]);

        return { success: true, output };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle("lab-status", async () => {
    try {
        const output = await runDocker(["ps"]);
        return { success: true, output };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

app.whenReady().then(createWindow);