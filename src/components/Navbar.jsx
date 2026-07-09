import React, { useState, useEffect } from 'react'
import { audio } from '../utils/audio.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [soundOn, setSoundOn] = useState(true)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleToggleSound = () => {
    const isNowEnabled = audio.toggle()
    setSoundOn(isNowEnabled)
    if (isNowEnabled) {
      audio.playClick()
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: 20,
          color: '#fff',
          letterSpacing: '-0.5px',
        }}>
          AI & Future
        </span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: 20,
          color: '#00FFD1',
          letterSpacing: '-0.5px',
        }}>
          of Work
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={handleToggleSound}
          title={soundOn ? 'Mute sounds' : 'Unmute sounds'}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '6px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: soundOn ? '#00FFD1' : 'rgba(255,255,255,0.3)',
            transition: 'all 0.2s ease',
            fontSize: 16,
          }}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: 2,
        }}>
          SP JAIN · MBA
        </span>
      </div>
    </nav>
  )
}
