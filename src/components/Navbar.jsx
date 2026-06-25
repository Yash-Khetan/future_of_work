import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

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
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2,
      }}>
        SP JAIN · MBA
      </span>
    </nav>
  )
}
