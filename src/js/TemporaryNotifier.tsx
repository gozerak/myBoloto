import React from "react"
import "../css/TemporaryNotifier.css"

export default function TemporaryNotifier ({ status, text  }: {
    status: string;
    text: string;
}) {
    return (
        <div className="temporary-notifier">
            <div className={`temporary-${status}`}>
                <p className="temporary-text">{text}</p>
            </div>
        </div>
    )
}