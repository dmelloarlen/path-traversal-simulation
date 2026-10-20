import { useState } from "react";
import ExperimentContent from "./components/ExperimentContent";
import "./App.css";

const tabs = ["Simulation", "Quiz / Assessment"];

export default function App() {
    const [activeTab, setActiveTab] = useState("Simulation");
    const isQuiz = activeTab === "Quiz / Assessment";

    return (
        <div className="app">
            <nav className="lab-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`lab-tab ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <main
                className={`main-content ${isQuiz ? "quiz-main-content" : ""}`}
                style={isQuiz ? { "--sidebar-height": "80vh" } : undefined}
            >
                <ExperimentContent activeTab={activeTab} />
            </main>
        </div>
    );
}