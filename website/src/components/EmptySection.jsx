import AimObjectivesSection from "./AimObjectivesSection";
import TheorySection from "./TheorySection";
import ProcedureSection from "./ProcedureSection";
import QuizSection from "./QuizSection";
import TestCasesSection from "./TestCasesSection";
import ExpectedOutputSection from "./ExpectedOutputSection";
import ReferencesSection from "./ReferencesSection";
import FeedbackSection from "./FeedbackSection";

export default function EmptySection({ title }) {
    switch (title) {
        case "Aim, Objectives":
            return <AimObjectivesSection />;
        case "Theory":
            return <TheorySection />;
        case "Procedure":
            return <ProcedureSection />;
        case "Quiz / Assessment":
            return <QuizSection />;
        case "Test Cases":
            return <TestCasesSection />;
        case "Expected Output":
            return <ExpectedOutputSection />;
        case "References":
            return <ReferencesSection />;
        case "Feedback":
            return <FeedbackSection />;
        default:
            return (
                <div className="document">
                    <div className="document-label">
                        PATH TRAVERSAL LAB · {title ? title.toUpperCase() : "LAB SECTION"}
                    </div>
                    <h1>{title}</h1>
                    <div className="empty-content">
                        <div className="empty-icon">▤</div>
                        <strong>{title}</strong>
                        <p>Content for this section will be updated shortly.</p>
                    </div>
                </div>
            );
    }
}