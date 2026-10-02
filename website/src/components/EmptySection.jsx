export default function EmptySection({ title }) {

    return (
        <div className="document">
            <div className="document-label">
                PATH TRAVERSAL LAB · {title.toUpperCase()}
            </div>
            <h1>{title}</h1>

            <div className="empty-content">
                <div className="empty-icon">▤</div>
                <strong>Empty for now</strong>
                <p>Content for this section will be added later.</p>
            </div>
        </div>
    );
}