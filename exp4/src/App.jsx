import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useCalendar } from './hooks/useCalendar'
import { Toggle } from './components/Toggle'
import { WeekView } from './components/WeekView'
import { MonthView } from './components/MonthView'
import { DayView } from './components/DayView'
import { RenderMonitor } from './components/RenderMonitor'
import { EventModal } from './components/EventModal'
import { actions } from './store/store'
import { resetRenderStats } from './components/EventCard'

const types = [
  ['meeting', 'Meeting'],
  ['deadline', 'Deadline'],
  ['focus', 'Focus block'],
  ['personal', 'Personal']
]

const pad = n => String(n).padStart(2, '0')

const iso = d =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

const moveDate = (isoDate, amount) => {
  const d = new Date(`${isoDate}T12:00:00`)
  d.setDate(d.getDate() + amount)
  return iso(d)
}

const titleDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric'
})

export default function App() {
  const {
    calendar,
    visibleEvents,
    now,
    moveEvent,
    selectEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleSetting,
    toggleFilter,
    resetCounters,
    dispatch
  } = useCalendar()

  const [modalOpen, setModalOpen] = useState(false)

  const selected =
    calendar.events.find(
      e => e.id === calendar.selectedEventId
    ) || null

  /*
   * ============================================================
   * CURSOR-REACTIVE GLASS EFFECT
   * ============================================================
   *
   * Updates CSS variables:
   * --mouse-x
   * --mouse-y
   *
   * The glass panels in styles.css use these variables to create
   * a soft light that follows the cursor.
   */

  useEffect(() => {
    const handlePointerMove = e => {
      document.documentElement.style.setProperty(
        '--mouse-x',
        `${e.clientX}px`
      )

      document.documentElement.style.setProperty(
        '--mouse-y',
        `${e.clientY}px`
      )
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      )
    }
  }, [])

  /*
   * ============================================================
   * MODAL
   * ============================================================
   */

  useEffect(() => {
    if (calendar.selectedEventId) {
      setModalOpen(true)
    }
  }, [calendar.selectedEventId])

  /*
   * ============================================================
   * CALENDAR NAVIGATION
   * ============================================================
   */

  const go = useCallback(
    amount =>
      dispatch(
        actions.setAnchorDate(
          moveDate(calendar.anchorDate, amount)
        )
      ),
    [dispatch, calendar.anchorDate]
  )

  const today = useCallback(
    () =>
      dispatch(
        actions.setAnchorDate(
          iso(new Date())
        )
      ),
    [dispatch]
  )

  /*
   * ============================================================
   * CREATE / EDIT / DELETE
   * ============================================================
   */

  const openCreate = useCallback(
    () => setModalOpen(true),
    []
  )

  const handleCreate = useCallback(
    event => {
      createEvent(event)
      setModalOpen(false)
    },
    [createEvent]
  )

  const handleSave = useCallback(
    event => {
      if (
        calendar.events.some(
          e => e.id === event.id
        )
      ) {
        updateEvent(event)
      } else {
        createEvent(event)
      }

      setModalOpen(false)

      dispatch(
        actions.selectEvent(null)
      )
    },
    [
      calendar.events,
      updateEvent,
      createEvent,
      dispatch
    ]
  )

  const handleDelete = useCallback(
    id => {
      deleteEvent(id)
      setModalOpen(false)
    },
    [deleteEvent]
  )

  /*
   * ============================================================
   * LIVE CLOCK
   * ============================================================
   */

  const clock = useMemo(
    () =>
      now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
    [now]
  )

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <main className="app-shell">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="topbar">

        <div>
          <div className="eyebrow">
            SCHEDULER LAB / REACT PERFORMANCE
          </div>

          <h1>
            Interactive Calendar
          </h1>

          <p>
            Drag events between days, then flip the
            switches below to see, in real time, what{' '}
            <b>React.memo</b>,{' '}
            <b>useCallback</b>, and{' '}
            <b>useMemo</b> actually do to re-renders.
          </p>
        </div>

        <button
          className="new-post"
          onClick={openCreate}
        >
          ＋ New post
        </button>

      </header>


      {/* ======================================================
          PERFORMANCE SETTINGS
      ====================================================== */}

      <section className="settings-card">

        <div className="setting-grid">

          <Toggle
            checked={calendar.settings.memo}
            onChange={() =>
              toggleSetting('memo')
            }
            label="React.memo on cards"
            description="Skip a card's re-render when its own props haven't changed."
          />

          <Toggle
            checked={calendar.settings.callback}
            onChange={() =>
              toggleSetting('callback')
            }
            label="useCallback for handlers"
            description="Keep drag handlers referentially stable so memo isn't fooled."
          />

          <Toggle
            checked={calendar.settings.memoFilter}
            onChange={() =>
              toggleSetting('memoFilter')
            }
            label="useMemo for agenda filter"
            description="Cache the filtered list; recompute only when events or day change."
          />

          <div className="live-row">

            <Toggle
              checked={calendar.settings.liveClock}
              onChange={() =>
                toggleSetting('liveClock')
              }
              label="Live clock"
              description="Ticks every 450ms to simulate unrelated state elsewhere in the app."
            />

            <div className="clock">
              {calendar.settings.liveClock
                ? clock
                : 'Paused'}
            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="content-grid">

        <section className="calendar-wrap">

          {/* ==================================================
              CALENDAR TOOLBAR
          ================================================== */}

          <div className="toolbar">

            <div className="toolbar-left">

              <button
                className="square"
                onClick={() => go(-1)}
              >
                ‹
              </button>

              <button
                className="today"
                onClick={today}
              >
                Today
              </button>

              <button
                className="square"
                onClick={() => go(1)}
              >
                ›
              </button>

              <h2>
                {calendar.view === 'day'
                  ? new Date(
                      `${calendar.anchorDate}T12:00:00`
                    ).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      }
                    )
                  : titleDate.format(
                      new Date(
                        `${calendar.anchorDate}T12:00:00`
                      )
                    )}
              </h2>

            </div>


            {/* ==================================================
                VIEW SWITCHER
            ================================================== */}

            <div className="views">

              {['day', 'week', 'month'].map(
                v => (
                  <button
                    key={v}
                    className={
                      calendar.view === v
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      dispatch(
                        actions.setView(v)
                      )
                    }
                  >
                    {v}
                  </button>
                )
              )}

            </div>

          </div>


          {/* ==================================================
              FILTERS
          ================================================== */}

          <div className="legend">

            {types.map(
              ([type, label]) => (
                <button
                  key={type}
                  className={`chip ${type} ${
                    calendar.filters[type]
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() =>
                    toggleFilter(type)
                  }
                >
                  <i />
                  {label}
                </button>
              )
            )}

          </div>


          {/* ==================================================
              WEEK VIEW
          ================================================== */}

          {calendar.view === 'week' && (
            <WeekView
              anchorDate={
                calendar.anchorDate
              }
              events={visibleEvents}
              settings={
                calendar.settings
              }
              onSelect={selectEvent}
              onMove={moveEvent}
              onCreate={handleCreate}
            />
          )}


          {/* ==================================================
              DAY VIEW
          ================================================== */}

          {calendar.view === 'day' && (
            <DayView
              anchorDate={
                calendar.anchorDate
              }
              events={visibleEvents}
              settings={
                calendar.settings
              }
              onSelect={selectEvent}
              onMove={moveEvent}
              onCreate={handleCreate}
            />
          )}


          {/* ==================================================
              MONTH VIEW
          ================================================== */}

          {calendar.view === 'month' && (
            <MonthView
              anchorDate={
                calendar.anchorDate
              }
              events={visibleEvents}
              onSelect={selectEvent}
              onMove={moveEvent}
            />
          )}

        </section>


        {/* ======================================================
            RENDER MONITOR
        ====================================================== */}

        <RenderMonitor
  events={calendar.events}
  optimized={
    calendar.settings.memo &&
    calendar.settings.callback &&
    calendar.settings.memoFilter
  }
  onReset={() => {
    if (
      calendar.settings.memo &&
      calendar.settings.callback &&
      calendar.settings.memoFilter
    ) {
      resetRenderStats()
      resetCounters()
    }
  }}
/>

      </div>


      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer className="footer-note">

        <span>
          <b>CO3 · BT3</b>{' '}
          Calendar & interaction design
        </span>

        <span>
          <b>CO4 · BT4</b>{' '}
          Performance optimization
        </span>

        <span>
          <b>CO5 · BT5</b>{' '}
          Testing & reliability
        </span>

        <span className="status-dot">
          ● Local state synced with Redux Toolkit
        </span>

      </footer>


      {/* ======================================================
          EVENT MODAL
      ====================================================== */}

      {modalOpen && (
        <EventModal
          event={selected}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => {
            setModalOpen(false)

            dispatch(
              actions.selectEvent(null)
            )
          }}
        />
      )}

    </main>
  )
}