import EmptySection from "./EmptySection";
import PathTraversalSimulation from "./PathTraversalSimulation";

export default function ExperimentContent({ activeTab }) {
    const simulationSections = [
        "Simulation",
        "Normal File",
        "Directory Traversal",
        "Configuration File",
        "Vulnerable vs Secure"
    ];

    if (simulationSections.includes(activeTab)) {
        return <PathTraversalSimulation selectedSection={activeTab} />;
    }

    return <EmptySection title={activeTab} />;
}