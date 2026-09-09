# Interactive Calendar Scheduler + React Performance Lab

A single React project combining the two academic experiments:

1. **Interactive Calendar for Scheduling and Managing Posts** — CO3 / BT3
2. **Rendering Performance Optimization and Testing** — CO4 / BT4, CO5 / BT5

The interface is intentionally modeled after the supplied reference image while expanding it into a complete scheduling application.

## Included functionality

- Week, day and month calendar views
- Drag-and-drop events between dates/time slots
- Resize events by dragging the bottom edge
- Double-click an empty week slot to create a post
- Create, edit and delete scheduled posts
- Date navigation, Today button and view switcher
- Meeting / Deadline / Focus block / Personal filters
- Live clock toggle that updates every 450ms
- React.memo toggle for event cards
- useCallback toggle for interaction handlers
- useMemo toggle for the filtered agenda calculation
- Render Monitor with per-card counters and reset (wired to Redux performance state)
- Redux Toolkit state management
- Unit/component tests with Vitest + React Testing Library
- Responsive dark UI closely matching the supplied sample

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Test

```bash
npm test
```

## Production build

```bash
npm run build
```

## Academic mapping

### CO3 — BT3
Temporal data modeling, event-to-time-slot mapping, calendar views, click interaction and drag-and-drop scheduling.

### CO4 — BT4
React.memo, useMemo, useCallback, efficient state updates and a render monitor for observing unnecessary work.

### CO5 — BT5
Vitest + React Testing Library tests for rendering and core UI behavior, providing a foundation for regression testing.
