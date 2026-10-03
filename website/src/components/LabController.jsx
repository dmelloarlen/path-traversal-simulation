import { useState } from "react";

export default function LabController() {
    const [status, setStatus] = useState("Ready");
    const [logs, setLogs] = useState("Lab is ready to start.");
    const [loading, setLoading] = useState(false);

    const electronAvailable = Boolean(window.lab);

    async function runAction(action, label) {
        if (!window.lab) {
            setStatus("Unavailable");
            setLogs(
                "Electron connection not found. Open the application through Electron instead of the Vite browser."
            );
            return;
        }

        setLoading(true);
        setStatus(label);
        setLogs(`${label} in progress...`);

        try {
            const result = await action();

            if (result.success) {
                setLogs(result.output || "Operation completed.");
                setStatus(
                    label === "Starting"
                        ? "Running"
                        : label === "Stopping"
                            ? "Stopped"
                            : "Ready"
                );
            } else {
                setStatus("Error");
                setLogs(result.error || "Operation failed.");
            }
        } catch (error) {
            setStatus("Error");
            setLogs(error.message || "Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    async function checkStatus() {
        if (!window.lab) {
            setStatus("Unavailable");
            setLogs("Electron connection not found. Launch through Electron.");
            return;
        }

        setLoading(true);
        setStatus("Checking...");
        setLogs("Checking Docker container status...");

        try {
            const result = await window.lab.status();

            if (!result.success) {
                setStatus("Error");
                setLogs(result.error);
                return;
            }

            setLogs(result.output);

            if (result.output.includes("Up")) {
                setStatus("Running");
            } else if (
                result.output.includes("NAME") &&
                !result.output.includes("path-traversal-target")
            ) {
                setStatus("Stopped");
            } else {
                setStatus("Stopped");
            }
        } catch (error) {
            setStatus("Error");
            setLogs(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="lab-status">
            <div className="status-heading">
                <strong>Lab Controller</strong>
                <span className="status-indicator" style={{ color: status === "Running" ? "green" : status === "Error" ? "red" : "orange" }}>
                    ● {status}
                </span>
            </div>

            {!electronAvailable && (
                <p className="controller-warning">
                    Electron is not connected. Start the application using the Electron manager.
                </p>
            )}

            <div className="controller-buttons">
                <button
                    disabled={loading || !electronAvailable}
                    onClick={() => runAction(window.lab.start, "Starting")}
                >
                    Start
                </button>

                <button
                    disabled={loading || !electronAvailable}
                    onClick={() => runAction(window.lab.stop, "Stopping")}
                >
                    Stop
                </button>

                <button
                    disabled={loading || !electronAvailable}
                    onClick={() => runAction(window.lab.reset, "Resetting")}
                >
                    Reset
                </button>

                <button
                    disabled={loading || !electronAvailable}
                    onClick={checkStatus}
                    className="check-status"
                >
                    Check Status
                </button>
            </div>

            <small>Target: localhost:3000</small>

            {loading && <p className="controller-loading">Please wait...</p>}

            {logs && (
                <pre className="controller-log">{logs}</pre>
            )}
        </div>
    );
}