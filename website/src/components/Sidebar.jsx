import LabController from "./LabController";

const tabs = [
    "Aim, Objectives",
    "Theory",
    "Procedure",
    "Simulation",
    // "References",
    // "Feedback",
    "Test Cases",
    "Expected Output",
    "Quiz / Assessment"
];

export default function Sidebar({ activeTab, setActiveTab, sidebarRef }) {
    return (
        <aside ref={sidebarRef} className="resources">

            <div className="resource-title">
                <strong>Experiment Sections</strong>
            </div>

            <div className="resource-list">
                {tabs.map((tab, index) => (
                    <button
                        key={tab}
                        className={`resource-card ${activeTab === tab ? "selected" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        <span className="resource-icon">{index + 1}</span>

                        <span>
                            <small>Section {index + 1}</small>
                            <strong>{tab}</strong>
                        </span>
                    </button>
                ))}
            </div>
        </aside>
    );
}