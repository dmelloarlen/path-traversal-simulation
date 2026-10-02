import { useState } from "react";

const tabs = [
    "Aim, Objectives",
    "Theory",
    "Procedure",
    "Simulation",
    "Quiz / Assessment",
    "References",
    "Feedback",
    "Test Cases",
    "Expected Output"
];

export default function ExperimentTabs({ activeTab, setActiveTab }) {
    const [simulationOpen, setSimulationOpen] = useState(true);

    return (
        <div className="experiment-tabs">
            {tabs.map((tab) => (
                <div key={tab}>
                    <button
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab(tab);
                            if (tab === "Simulation") {
                                setSimulationOpen(!simulationOpen);
                            }
                        }}
                    >
                        {tab}
                        {tab === "Simulation" && (
                            <span className="dropdown-arrow">
                                {simulationOpen ? "⌄" : "›"}
                            </span>
                        )}
                    </button>

                    {tab === "Simulation" && simulationOpen && (
                        <div className="simulation-submenu">
                            {[
                                "Normal File",
                                "Directory Traversal",
                                "Configuration File",
                                "Vulnerable vs Secure"
                            ].map((item) => (
                                <button
                                    key={item}
                                    className="simulation-subitem"
                                    onClick={() => setActiveTab(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}