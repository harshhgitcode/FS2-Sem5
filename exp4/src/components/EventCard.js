import React, { useEffect } from "react";

function EventCard({
    event,
    onUpdate,
    onRender,
    memoEnabled,
    renderCount
}) {
    /*
     * Count this card when its actual event data changes.
     * This avoids the infinite render loop that happened
     * when onRender() was called after every render.
     */
    useEffect(() => {
        onRender(event.id);
    }, [
        event.id,
        event.title,
        event.time,
        event.date,
        onRender
    ]);

    const handleDragStart = (e) => {
        e.dataTransfer.setData(
            "eventId",
            event.id.toString()
        );
    };

    const handleEdit = () => {
        const newTitle = window.prompt(
            "Edit Post Title",
            event.title
        );

        if (
            newTitle === null ||
            newTitle.trim() === ""
        ) {
            return;
        }

        const newTime = window.prompt(
            "Edit Post Time",
            event.time
        );

        if (
            newTime === null ||
            newTime.trim() === ""
        ) {
            return;
        }

        onUpdate(
            event.id,
            newTitle,
            newTime
        );
    };

    const categoryClass = event.category
        .toLowerCase()
        .replace(" ", "-");

    return (
        <article
            className={`event-card ${categoryClass}`}
            draggable
            onDragStart={handleDragStart}
        >
            <div className="event-time">
                {event.time}
            </div>

            <div className="event-title">
                {event.title}
            </div>

            <div className="event-footer">
                <span className="event-category">
                    {event.category}
                </span>

                <span className="card-render-count">
                    {renderCount}
                </span>
            </div>

            <button
                className="edit-button"
                onClick={handleEdit}
            >
                ✎ Edit
            </button>
        </article>
    );
}


/*
 * React.memo prevents unnecessary re-renders
 * when the event's own data has not changed.
 */
const MemoizedEventCard = React.memo(
    EventCard,
    (previous, next) => {
        // If optimization is disabled,
        // always allow the component to render.
        if (!next.memoEnabled) {
            return false;
        }

        return (
            previous.event === next.event &&
            previous.onUpdate === next.onUpdate &&
            previous.onRender === next.onRender &&
            previous.memoEnabled === next.memoEnabled
        );
    }
);

export default MemoizedEventCard;