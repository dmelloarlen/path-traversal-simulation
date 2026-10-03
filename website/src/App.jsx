import { useLayoutEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ExperimentContent from "./components/ExperimentContent";
import "./App.css";
import LabController from "./components/LabController";

export default function App() {
    const [activeTab, setActiveTab] = useState("Aim, Objectives");
    const sidebarRef = useRef(null);
    const mainContentRef = useRef(null);

    useLayoutEffect(() => {
        if (activeTab !== "Quiz / Assessment") return undefined;

        const sidebar = sidebarRef.current;
        const mainContent = mainContentRef.current;
        if (!sidebar || !mainContent) return undefined;

        const syncSidebarHeight = () => {
            mainContent.style.setProperty(
                "--sidebar-height",
                `${sidebar.getBoundingClientRect().height}px`
            );
        };

        syncSidebarHeight();
        const resizeObserver = new ResizeObserver(syncSidebarHeight);
        resizeObserver.observe(sidebar);

        return () => {
            resizeObserver.disconnect();
            mainContent.style.removeProperty("--sidebar-height");
        };
    }, [activeTab]);

    return (
        <div className="app">
            <Header />
            <LabController />
            <div className="workspace">
                  <Sidebar
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      sidebarRef={sidebarRef}
                  />
                <main
                    ref={mainContentRef}
                    className={`main-content ${activeTab === "Quiz / Assessment" ? "quiz-main-content" : ""}`}
                >

                    <ExperimentContent activeTab={activeTab} />
                </main>

            </div>
        </div>
    );
}