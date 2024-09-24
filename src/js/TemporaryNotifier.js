import "../css/TemporaryNotifier.css"

export default function TemporaryNotifier ({ status, text  }) {
    return (
        <div className="temporary-notifier">
            <div className={`temporary-${status}`}>
                <p className="temporary-text">{text}</p>
            </div>
        </div>
    )
}