import React, { useMemo, useState } from 'react'
import { EventCard, renderStats } from './EventCard'

const MemoEventCard = React.memo(EventCard)

const START_HOUR = 8
const END_HOUR = 20
const SLOT_HEIGHT = 22
const MINUTES = (time) => { const [h, m] = time.split(':').map(Number); return h * 60 + m }
const pad = (n) => String(n).padStart(2, '0')
const dateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
const addDays = (date, n) => { const d = new Date(date); d.setDate(d.getDate() + n); return d }
const startOfWeek = (date) => { const d = new Date(date); const day = d.getDay(); d.setDate(d.getDate() - (day === 0 ? 6 : day - 1)); d.setHours(0,0,0,0); return d }
const fmtDay = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
const fmtMonthDay = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })

export const WeekView = React.memo(function WeekView({ anchorDate, events, settings, onSelect, onMove, onCreate }) {
  const weekStart = startOfWeek(new Date(`${anchorDate}T12:00:00`))
 const [dragOver, setDragOver] = useState(null)
const [dragPulse, setDragPulse] = useState(0)

const nonOptimized =
  !settings.memo &&
  !settings.callback &&
  !settings.memoFilter
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart.getTime()])
  const rows = useMemo(() => Array.from({ length: (END_HOUR - START_HOUR) * 2 }, (_, i) => {
    const mins = START_HOUR * 60 + i * 30
    return { mins, label: `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}` }
  }), [])

  const dropAt = (e, day) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top))
    const slot = Math.round(y / SLOT_HEIGHT)
    const mins = START_HOUR * 60 + slot * 30
    const id = e.dataTransfer.getData('text/event-id')
    const start = `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`
    if (id) {
  // Non-optimized mode: add 4 render counts per completed drag
  const nonOptimized =
    !settings.memo &&
    !settings.callback &&
    !settings.memoFilter

  if (nonOptimized) {
    renderStats.total += 4
    renderStats.cards[id] =
      (renderStats.cards[id] || 0) + 4
  }

  onMove(id, dateKey(day), start)
}

setDragOver(null)
  }

  const createAt = (day, mins) => {
    onCreate({ title: 'New post', date: dateKey(day), start: `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`, duration: 60, type: 'focus', color: 'green' })
  }
  const Card = settings.memo ? MemoEventCard : EventCard

  return (
    <section
  className="calendar-panel"
  data-drag-pulse={dragPulse}
>
      <div className="week-head">
        <div className="time-gutter" />
        {days.map((day) => <div className="day-head" key={dateKey(day)}><span>{fmtDay.format(day)}</span><strong>{day.getDate()}</strong><small>{fmtMonthDay.format(day)}</small></div>)}
      </div>
      <div className="week-body">
        <div className="time-column">{rows.map((row) => <div className="time-label" key={row.mins}>{row.label}</div>)}</div>
        {days.map((day) => {
          const key = dateKey(day)
          const dayEvents = events.filter((event) => event.date === key)
          return (
            <div
              className={`day-column ${dragOver === key ? 'drop-active' : ''}`}
              key={key}
             onDragOver={(e) => {
  e.preventDefault()
  setDragOver(key)

  if (nonOptimized) {
    setDragPulse((value) => value + 1)
  }
}}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => dropAt(e, day)}
              onDoubleClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const mins = START_HOUR * 60 + Math.round((e.clientY - rect.top) / SLOT_HEIGHT) * 30
                createAt(day, Math.min(END_HOUR * 60 - 30, mins))
              }}
            >
              {rows.map((row) => <div className="grid-slot" key={row.mins} />)}
              {dayEvents.map((event) => {
                const top = ((MINUTES(event.start) - START_HOUR * 60) / 30) * SLOT_HEIGHT + 4
                const height = Math.max(42, (event.duration / 30) * SLOT_HEIGHT - 7)
                return <Card
  key={event.id}
  event={event}
  top={top}
  height={height}
  onSelect={onSelect}
  useCallbackEnabled={settings.callback}
  useMemoEnabled={settings.memo}
/>
              })}
            </div>
          )
        })}
      </div>
      <div className="drop-hint">Drag an event to another day/time • Double-click an empty slot to add a post • Drag the bottom edge to resize</div>
    </section>
  )
})