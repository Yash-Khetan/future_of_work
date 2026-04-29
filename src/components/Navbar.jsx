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
      className={scrolled ? 'navbar-scrolled' : ''}
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
        background: scrolled ? 'rgba(13,27,42,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <span style={{ fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: '-0.5px' }}>
          WorkWorld
        </span>
        <span style={{ fontWeight: 800, fontSize: 22, color: '#1A6EFF', letterSpacing: '-0.5px' }}>
          2030
        </span>
      </div>
      <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
        SP Jain × Future of Work
      </span>
    </nav>
  )
}
