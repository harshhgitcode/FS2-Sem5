import { configureStore, createSlice } from '@reduxjs/toolkit'

const baseDate = new Date(2026, 8, 7) // Monday, Sep 7 2026
const iso = (date) => date.toISOString().slice(0, 10)

const seedEvents = [
  { id: 'e1', title: 'Design review', date: iso(new Date(2026, 8, 7)), start: '10:00', duration: 60, type: 'meeting', color: 'blue' },
  { id: 'e2', title: 'Ship v2.3', date: iso(new Date(2026, 8, 7)), start: '16:00', duration: 60, type: 'deadline', color: 'red' },
  { id: 'e3', title: '1:1 with Sam', date: iso(new Date(2026, 8, 8)), start: '09:30', duration: 60, type: 'meeting', color: 'blue' },
  { id: 'e4', title: 'Write proposal', date: iso(new Date(2026, 8, 9)), start: '13:00', duration: 90, type: 'focus', color: 'green' },
  { id: 'e5', title: 'Client demo', date: iso(new Date(2026, 8, 10)), start: '15:00', duration: 60, type: 'meeting', color: 'blue' },
  { id: 'e6', title: 'Portfolio review', date: iso(new Date(2026, 8, 10)), start: '18:00', duration: 60, type: 'focus', color: 'green' },
  { id: 'e7', title: 'Grocery run', date: iso(new Date(2026, 8, 12)), start: '10:00', duration: 60, type: 'personal', color: 'amber' },
  { id: 'e8', title: 'Sprint planning', date: iso(new Date(2026, 8, 13)), start: '11:00', duration: 90, type: 'meeting', color: 'blue' },
]

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: seedEvents,
    selectedEventId: null,
    view: 'week',
    anchorDate: iso(baseDate),
    filters: { meeting: true, deadline: true, focus: true, personal: true },
    settings: { memo: true, callback: true, memoFilter: true, liveClock: false },
    renderCounts: Object.fromEntries(seedEvents.map((e) => [e.id, 0])),
    totalRenders: 0,
  },
  reducers: {
    setView(state, action) { state.view = action.payload },
    setAnchorDate(state, action) { state.anchorDate = action.payload },
    selectEvent(state, action) { state.selectedEventId = action.payload },
    toggleFilter(state, action) { state.filters[action.payload] = !state.filters[action.payload] },
    toggleSetting(state, action) { state.settings[action.payload] = !state.settings[action.payload] },
    resetCounters(state) {
      state.totalRenders = 0
      state.renderCounts = Object.fromEntries(state.events.map((e) => [e.id, 0]))
    },
    logRender(state, action) {
      state.totalRenders += 1
      state.renderCounts[action.payload] = (state.renderCounts[action.payload] || 0) + 1
    },
    addEvent(state, action) {
      const event = { ...action.payload, id: `e${Date.now()}` }
      state.events.push(event)
      state.renderCounts[event.id] = 0
      state.selectedEventId = event.id
    },
    updateEvent(state, action) {
      const index = state.events.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) state.events[index] = { ...state.events[index], ...action.payload }
    },
    deleteEvent(state, action) {
      state.events = state.events.filter((e) => e.id !== action.payload)
      state.selectedEventId = null
    },
    moveEvent(state, action) {
      const { id, date, start } = action.payload
      const event = state.events.find((e) => e.id === id)
      if (event) { event.date = date; event.start = start }
    },
    resizeEvent(state, action) {
      const { id, duration } = action.payload
      const event = state.events.find((e) => e.id === id)
      if (event) event.duration = Math.max(30, Math.min(240, duration))
    },
  },
})

export const actions = calendarSlice.actions
export const store = configureStore({ reducer: { calendar: calendarSlice.reducer } })
