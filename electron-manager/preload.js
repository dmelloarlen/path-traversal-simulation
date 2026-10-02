const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("lab", {
    start: () => ipcRenderer.invoke("lab-start"),
    stop: () => ipcRenderer.invoke("lab-stop"),
    reset: () => ipcRenderer.invoke("lab-reset"),
    status: () => ipcRenderer.invoke("lab-status")
});