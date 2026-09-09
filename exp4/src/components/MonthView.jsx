import React, { useMemo } from 'react'

const pad = (n) => String(n).padStart(2, '0')
const key = (d) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x }

export function MonthView({ anchorDate, events, onSelect, onMove }) {
  const cells = useMemo(() => {
    const base = new Date(`${anchorDate}T12:00:00`)
    const first = new Date(base.getFullYear(), base.getMonth(), 1)
    const mondayOffset = (first.getDay() + 6) % 7
    const start = addDays(first, -mondayOffset)
    return Array.from({ length: 42 }, (_, i) => addDays(start, i))
  }, [anchorDate])
  return <section className="month-panel"><div className="month-weekdays">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(x => <strong key={x}>{x}</strong>)}</div><div className="month-grid">{cells.map(day => { const k=key(day); const list=events.filter(e=>e.date===k); return <div className="month-cell" key={k} onDragOver={e=>e.preventDefault()} onDrop={e=>{const id=e.dataTransfer.getData('text/event-id'); if(id) onMove(id,k,'09:00')}}><span className="month-date">{day.getDate()}</span>{list.slice(0,4).map(e=><button draggable onDragStart={ev=>ev.dataTransfer.setData('text/event-id',e.id)} className={`mini-event event-${e.color}`} key={e.id} onClick={()=>onSelect(e.id)}>{e.start} · {e.title}</button>)}</div>})}</div></section>
}
