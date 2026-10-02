import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ExperimentContent from "./components/ExperimentContent";
import "./App.css";
import LabController from "./components/LabController";

export default function App() {
    const [activeTab, setActiveTab] = useState("Aim, Objectives");

    return (
        <div className="app">
            <Header />
            <LabController />
            <div className="workspace">
                  <Sidebar
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                  />
                <main className="main-content">

                    <ExperimentContent activeTab={activeTab} />
                </main>

            </div>
        </div>
    );
}