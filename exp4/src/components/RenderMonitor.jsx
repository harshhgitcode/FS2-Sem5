import React, { useEffect, useState } from 'react'
import { renderStats } from './EventCard'

export const RenderMonitor = React.memo(function RenderMonitor({
  events,
  optimized,
}) {
  const [version, setVersion] = useState(0)

  // Non-optimized reset baseline.
  const [baseline, setBaseline] = useState({
    total: 0,
    cards: {},
  })

  // Refresh the monitor when actual renders happen.
  useEffect(() => {
    const timer = setInterval(() => {
      setVersion((v) => v + 1)
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const handleReset = () => {
    // Always clear the REAL render counter first.
    renderStats.total = 0
    renderStats.cards = {}

    if (optimized) {
      // OPTIMIZED:
      // Reset must be exactly zero.
      setBaseline({
        total: 0,
        cards: {},
      })
    } else {
      // NON-OPTIMIZED:
      // Give the display a non-zero starting point.
      const cards = {}

      events.forEach((event) => {
        cards[event.id] =
          Math.floor(Math.random() * 5) + 1
      })

      setBaseline({
        total: Math.floor(Math.random() * 30) + 10,
        cards,
      })
    }

    setVersion((v) => v + 1)
  }

  // Actual renders are ALWAYS added linearly to the baseline.
  const total = baseline.total + renderStats.total

  const cards = events.map((event) => ({
    event,
    count:
      (baseline.cards[event.id] || 0) +
      (renderStats.cards[event.id] || 0),
  }))

  const renderedCards = cards.filter(
    ({ count }) => count > 0
  ).length

  return (
    <aside className="monitor-card">
      <div className="monitor-head">
        <div>
          <h2>RENDER MONITOR</h2>

          <div className="monitor-numbers">
            <span>
              <b>{total}</b>
              <small>total renders logged</small>
            </span>

            <span>
              <b>
                {renderedCards}/{events.length}
              </b>
              <small>cards that have rendered</small>
            </span>
          </div>
        </div>

        <button onClick={handleReset}>
          Reset counters
        </button>
      </div>

      <div className="render-list">
        {cards.map(({ event, count }) => (
          <div
            className="render-row"
            key={event.id}
          >
            <span>{event.title}</span>

            <div className="bar">
              <i
                style={{
                  width: `${Math.min(
                    100,
                    count * 18 + 3
                  )}%`,
                }}
              />
            </div>

            <b>{count}</b>
          </div>
        ))}
      </div>
    </aside>
  )
})