import React, { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../store/store'

export const renderStats = { total: 0, cards: {} }
export const resetRenderStats = () => { renderStats.total = 0; renderStats.cards = {} }

const formatTime = (value) => {
  const [h, m] = value.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}

export const EventCard = React.memo(function EventCard({ event, top, height, onSelect, useCallbackEnabled, useMemoEnabled }) {
  renderStats.total += 1
  renderStats.cards[event.id] = (renderStats.cards[event.id] || 0) + 1
  const dispatch = useDispatch()
  const startRef = useRef(null)

  const onDragStart = useCallback((e) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/event-id', event.id)
    e.currentTarget.classList.add('dragging')
  }, useCallbackEnabled ? [event.id] : undefined)

  const onDragEnd = useCallback((e) => e.currentTarget.classList.remove('dragging'), [])
  const onClick = useCallback(() => onSelect(event.id), useCallbackEnabled ? [event.id, onSelect] : undefined)

  const onResizeStart = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const startY = e.clientY
    const original = event.duration
    const move = (ev) => {
      const delta = Math.round((ev.clientY - startY) / 18) * 30
      dispatch(actions.resizeEvent({ id: event.id, duration: original + delta }))
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <button
      className={`event-card event-${event.color}`}
      style={{ top, height }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      ref={startRef}
      aria-label={`${event.title}, ${formatTime(event.start)}`}
    >
      <span className="event-time">{formatTime(event.start)}</span>
      <strong>{event.title}</strong>
      <span className="resize-handle" onPointerDown={onResizeStart} title="Drag to resize" />
    </button>
  )
})
