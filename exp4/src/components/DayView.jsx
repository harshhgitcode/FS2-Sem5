import React from 'react'
import { WeekView } from './WeekView'
export function DayView(props) {
  return <div className="day-wrapper"><WeekView {...props} anchorDate={props.anchorDate} events={props.events.filter(e=>e.date===props.anchorDate)} /></div>
}
