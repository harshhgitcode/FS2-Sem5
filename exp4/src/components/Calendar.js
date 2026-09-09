import React, {
    useCallback,
    useMemo
} from "react";

import EventCard from "./EventCard";

function Calendar({
    events,
    setEvents,
    memoEnabled,
    callbackEnabled,
    memoFilterEnabled,
    onRender,
    renderCounts
}) {
    const dates = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];


    /*
     * useCallback
     *
     * The same drag-over function is reused
     * between renders.
     */
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);


    /*
     * useCallback
     *
     * Keeps the drag-and-drop handler stable.
     */
    const handleDrop = useCallback(
        (e, newDate) => {
            e.preventDefault();

            const eventId = Number(
                e.dataTransfer.getData("eventId")
            );

            setEvents((previousEvents) =>
                previousEvents.map((event) =>
                    event.id === eventId
                        ? {
                              ...event,
                              date: newDate
                          }
                        : event
                )
            );
        },
        [setEvents]
    );


    /*
     * useCallback
     *
     * Keeps the edit/update handler stable.
     */
    const handleUpdate = useCallback(
        (id, newTitle, newTime) => {
            setEvents((previousEvents) =>
                previousEvents.map((event) =>
                    event.id === id
                        ? {
                              ...event,
                              title: newTitle,
                              time: newTime
                          }
                        : event
                )
            );
        },
        [setEvents]
    );


    /*
     * useMemo
     *
     * Creates a cached function for filtering
     * events according to their day.
     */
    const getEventsForDay = useMemo(() => {
        return (date) =>
            events.filter(
                (event) =>
                    event.date === date
            );
    }, [events]);


    /*
     * When useMemo is enabled, use the
     * memoized filtering function.
     *
     * When disabled, perform the filtering
     * directly.
     */
    const agenda = memoFilterEnabled
        ? getEventsForDay
        : (date) =>
              events.filter(
                  (event) =>
                      event.date === date
              );


    return (
        <div className="calendar-section">

            {/* HEADER */}
            <div className="calendar-title-row">

                <h2>WEEK VIEW</h2>

                <div className="category-list">

                    <span className="category meeting">
                        Meeting
                    </span>

                    <span className="category deadline">
                        Deadline
                    </span>

                    <span className="category focus">
                        Focus block
                    </span>

                    <span className="category personal">
                        Personal
                    </span>

                </div>

            </div>


            {/* WEEK CALENDAR */}
            <div className="calendar">

                {dates.map((date) => {

                    const dayEvents =
                        agenda(date);

                    return (
                        <div
                            key={date}
                            className="day-column"

                            onDragOver={
                                callbackEnabled
                                    ? handleDragOver
                                    : (e) =>
                                          e.preventDefault()
                            }

                            onDrop={
                                callbackEnabled
                                    ? (e) =>
                                          handleDrop(
                                              e,
                                              date
                                          )
                                    : (e) =>
                                          handleDrop(
                                              e,
                                              date
                                          )
                            }
                        >

                            <div className="day-name">
                                {date.slice(0, 3)}
                            </div>


                            <div className="day-events">

                                {dayEvents.map(
                                    (event) => (

                                        <EventCard
                                            key={event.id}
                                            event={event}

                                            onUpdate={
                                                handleUpdate
                                            }

                                            onRender={
                                                onRender
                                            }

                                            memoEnabled={
                                                memoEnabled
                                            }

                                            renderCount={
                                                renderCounts[
                                                    event.id
                                                ] || 0
                                            }
                                        />

                                    )
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}


/*
 * Memoize the Calendar component itself.
 */
export default React.memo(Calendar);