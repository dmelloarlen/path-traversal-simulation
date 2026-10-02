export default function FeedbackSection() {
    return (
        <div className="document">
            <div className="document-label">
                PATH TRAVERSAL LAB · FEEDBACK
            </div>
            <h1>Feedback</h1>
            <p className="subtitle">Lab Feedback & Evaluation</p>
            <div className="section-body">
                <p>Thank you for completing the Path Traversal Virtual Lab module!</p>
                <p>How would you rate your understanding of path traversal vulnerabilities after completing this lab?</p>
                <div className="feedback-form">
                    <label>
                        <input type="radio" name="feedback" value="5" /> Excellent - Clear understanding of attack and defense
                    </label>
                    <label>
                        <input type="radio" name="feedback" value="4" /> Good - Understood most concepts
                    </label>
                    <label>
                        <input type="radio" name="feedback" value="3" /> Average - Needs more practice examples
                    </label>
                    <button className="submit-feedback-btn" onClick={() => alert("Thank you for your feedback!")}>Submit Feedback</button>
                </div>
            </div>
        </div>
    );
}
