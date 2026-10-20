import PathTraversalSimulation from "./PathTraversalSimulation";
import QuizSection from "./QuizSection";

export default function ExperimentContent({ activeTab }) {
    if (activeTab === "Quiz / Assessment") {
        return <QuizSection />;
    }

    return <PathTraversalSimulation selectedSection={activeTab} />;
}