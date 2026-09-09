import React from 'react'

export const Toggle = React.memo(function Toggle({ checked, onChange, label, description }) {
  return (
    <button className="setting-row" onClick={onChange} aria-pressed={checked}>
      <span className={`switch ${checked ? 'on' : ''}`}><span /></span>
      <span className="setting-copy"><strong>{label}</strong><small>{description}</small></span>
    </button>
  )
})
