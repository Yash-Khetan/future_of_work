import React from 'react'
import { ArrowLeft } from 'lucide-react'
import WorldCard from '../components/WorldCard.jsx'
import { WORLDS } from '../data.js'

export default function WorldSelect({ onBack, onSelect }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D1B2A',
      padding: '40px 40px 80px',
    }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          padding: '8px 0',
          marginBottom: 40,
          fontFamily: 'inherit',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        id="worldselect-back-btn"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 800,
          marginBottom: 16,
          letterSpacing: '-1.5px',
          animation: 'fadeInUp 0.6s ease-out',
        }}>
          Select Your World
        </h1>
        <p style={{
          fontSize: 16,
          color: '#64748B',
          maxWidth: 460,
          margin: '0 auto',
          lineHeight: 1.6,
          animation: 'fadeInUp 0.6s ease-out 0.1s both',
        }}>
          Each world is a different version of 2030.
          All of them are possible.
        </p>
      </div>

      {/* World grid */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 28,
        animation: 'fadeInUp 0.6s ease-out 0.2s both',
      }}>
        {WORLDS.map((w) => (
          <WorldCard
            key={w.id}
            world={w}
            variant="select"
            dimmed={!w.available}
            onClick={w.available ? () => onSelect(w) : undefined}
          />
        ))}
      </div>
    </div>
  )
}
