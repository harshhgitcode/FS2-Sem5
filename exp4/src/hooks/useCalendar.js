import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../store/store'

export const useCalendar = () => {
  const dispatch = useDispatch()
  const calendar = useSelector((state) => state.calendar)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    if (!calendar.settings.liveClock) return undefined
    const id = setInterval(() => setNow(new Date()), 450)
    return () => clearInterval(id)
  }, [calendar.settings.liveClock])

  const visibleEvents = useMemo(() => {
    if (!calendar.settings.memoFilter) return calendar.events.filter((event) => calendar.filters[event.type])
    return calendar.events.filter((event) => calendar.filters[event.type])
  }, [calendar.events, calendar.filters, calendar.settings.memoFilter])

  const moveEvent = useCallback((id, date, start) => {
    dispatch(actions.moveEvent({ id, date, start }))
  }, [dispatch])

  const selectEvent = useCallback((id) => dispatch(actions.selectEvent(id)), [dispatch])
  const createEvent = useCallback((event) => dispatch(actions.addEvent(event)), [dispatch])
  const updateEvent = useCallback((event) => dispatch(actions.updateEvent(event)), [dispatch])
  const deleteEvent = useCallback((id) => dispatch(actions.deleteEvent(id)), [dispatch])
  const toggleSetting = useCallback((name) => dispatch(actions.toggleSetting(name)), [dispatch])
  const toggleFilter = useCallback((name) => dispatch(actions.toggleFilter(name)), [dispatch])
  const resetCounters = useCallback(() => dispatch(actions.resetCounters()), [dispatch])

  return { calendar, visibleEvents, now, moveEvent, selectEvent, createEvent, updateEvent, deleteEvent, toggleSetting, toggleFilter, resetCounters, dispatch }
}
