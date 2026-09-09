import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import App from '../App'

const renderApp = () => render(<Provider store={store}><App /></Provider>)

describe('Interactive Calendar', () => {
  it('renders seeded calendar events', () => {
    renderApp()
    expect(screen.getByText('Design review')).toBeInTheDocument()
    expect(screen.getByText('Sprint planning')).toBeInTheDocument()
  })

  it('shows performance controls and render monitor', () => {
    renderApp()
    expect(screen.getByText('React.memo on cards')).toBeInTheDocument()
    expect(screen.getByText('useCallback for handlers')).toBeInTheDocument()
    expect(screen.getByText('useMemo for agenda filter')).toBeInTheDocument()
    expect(screen.getByText('RENDER MONITOR')).toBeInTheDocument()
  })
})
