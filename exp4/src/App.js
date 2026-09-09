import { useEffect, useState, useCallback } from "react";
import Calendar from "./components/Calendar";

function App() {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Design review",
            date: "Monday",
            time: "10:00",
            category: "Meeting"
        },
        {
            id: 2,
            title: "Ship v2.3",
            date: "Monday",
            time: "16:00",
            category: "Deadline"
        },
        {
            id: 3,
            title: "1:1 with Sam",
            date: "Tuesday",
            time: "09:30",
            category: "Meeting"
        },
        {
            id: 4,
            title: "Write proposal",
            date: "Wednesday",
            time: "13:00",
            category: "Focus block"
        },
        {
            id: 5,
            title: "Client demo",
            date: "Thursday",
            time: "15:00",
            category: "Meeting"
        },
        {
            id: 6,
            title: "Portfolio review",
            date: "Thursday",
            time: "18:00",
            category: "Focus block"
        },
        {
            id: 7,
            title: "Grocery run",
            date: "Saturday",
            time: "10:00",
            category: "Personal"
        },
        {
            id: 8,
            title: "Sprint planning",
            date: "Sunday",
            time: "11:00",
            category: "Meeting"
        }
    ]);

    const [memoEnabled, setMemoEnabled] = useState(true);
    const [callbackEnabled, setCallbackEnabled] = useState(true);
    const [memoFilterEnabled, setMemoFilterEnabled] = useState(true);
    const [liveClock, setLiveClock] = useState(false);

    const [clock, setClock] = useState(
        new Date().toLocaleTimeString()
    );

    const [renderTotal, setRenderTotal] = useState(0);
    const [renderCounts, setRenderCounts] = useState({});

    useEffect(() => {
        if (!liveClock) return;

        const interval = setInterval(() => {
            setClock(new Date().toLocaleTimeString());
        }, 450);

        return () => clearInterval(interval);
    }, [liveClock]);

    const handleRender = useCallback((id) => {
        setRenderTotal((previous) => previous + 1);

        setRenderCounts((previous) => ({
            ...previous,
            [id]: (previous[id] || 0) + 1
        }));
    }, []);

    const resetCounters = () => {
        setRenderTotal(0);
        setRenderCounts({});
    };

    const toggleLiveClock = () => {
        setLiveClock((previous) => !previous);
    };

    return (
        <main className="app">

            <header className="page-header">
                <h1>Interactive Calendar</h1>

                <p>
                    Drag events between days, then flip the switches below to see,
                    in real time, what React.memo, useCallback, and useMemo
                    actually do to re-renders.
                </p>
            </header>

            {/* PERFORMANCE CONTROLS */}
            <section className="performance-card">

                <div className="performance-options">

                    <div className="option">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={memoEnabled}
                                onChange={() =>
                                    setMemoEnabled(!memoEnabled)
                                }
                            />
                            <span className="slider"></span>
                        </label>

                        <div>
                            <strong>React.memo on cards</strong>
                            <span>
                                Skip a card's re-render when its own props haven't changed.
                            </span>
                        </div>
                    </div>

                    <div className="option">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={callbackEnabled}
                                onChange={() =>
                                    setCallbackEnabled(!callbackEnabled)
                                }
                            />
                            <span className="slider"></span>
                        </label>

                        <div>
                            <strong>useCallback for handlers</strong>
                            <span>
                                Keep drag handlers referentially stable so memo isn't fooled.
                            </span>
                        </div>
                    </div>

                    <div className="option">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={memoFilterEnabled}
                                onChange={() =>
                                    setMemoFilterEnabled(!memoFilterEnabled)
                                }
                            />
                            <span className="slider"></span>
                        </label>

                        <div>
                            <strong>useMemo for agenda filter</strong>
                            <span>
                                Cache the filtered list; recompute only when events or day change.
                            </span>
                        </div>
                    </div>

                </div>

                <div className="performance-bottom">

                    <div className="option">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={liveClock}
                                onChange={toggleLiveClock}
                            />
                            <span className="slider"></span>
                        </label>

                        <div>
                            <strong>Live clock</strong>
                            <span>
                                Ticks every 450ms to simulate unrelated state elsewhere in the app.
                            </span>
                        </div>
                    </div>

                    <button
                        className="reset-button"
                        onClick={resetCounters}
                    >
                        Reset counters
                    </button>

                </div>

            </section>

            {/* CALENDAR + RENDER MONITOR */}
            <section className="main-grid">

                <Calendar
                    events={events}
                    setEvents={setEvents}
                    memoEnabled={memoEnabled}
                    callbackEnabled={callbackEnabled}
                    memoFilterEnabled={memoFilterEnabled}
                    liveClock={liveClock}
                    clock={clock}
                    onRender={handleRender}
                    renderCounts={renderCounts}
                />

                <aside className="render-monitor">

                    <h2>RENDER MONITOR</h2>

                    <div className="monitor-stats">

                        <div>
                            <strong>{renderTotal}</strong>
                            <span>total renders logged</span>
                        </div>

                        <div>
                            <strong>
                                {
                                    Object.keys(renderCounts).length
                                }/8
                            </strong>
                            <span>cards that have rendered</span>
                        </div>

                    </div>

                    <div className="render-list">

                        {events.map((event) => {

                            const count =
                                renderCounts[event.id] || 0;

                            return (
                                <div
                                    className="render-row"
                                    key={event.id}
                                >
                                    <span>
                                        {event.title}
                                    </span>

                                    <div className="render-bar">
                                        <div
                                            className="render-fill"
                                            style={{
                                                width: `${Math.min(
                                                    count * 25,
                                                    100
                                                )}%`
                                            }}
                                        ></div>
                                    </div>

                                    <b>{count}</b>
                                </div>
                            );
                        })}

                    </div>

                </aside>

            </section>

        </main>
    );
}

export default App;