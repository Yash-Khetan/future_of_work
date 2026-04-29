import React, { useState } from 'react'
import { ArrowLeft, Lock } from 'lucide-react'
import { INDUSTRIES, ROLES } from '../data.js'

export default function Setup({ world, onBack, onStart }) {
  const [industry, setIndustry] = useState(null)
  const [role, setRole] = useState(null)

  const canStart = industry && role

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D1B2A',
      padding: '40px 40px 80px',
    }}>
      {/* Back */}
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
        id="setup-back-btn"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 24,
            border: `1px solid ${world?.color || '#FF4444'}40`,
            background: `${world?.color || '#FF4444'}12`,
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 16 }}>{world?.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: world?.color || '#FF4444' }}>
              {world?.name || 'Red World'}
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            marginBottom: 12,
            letterSpacing: '-1px',
            animation: 'fadeInUp 0.6s ease-out',
          }}>
            {world?.name || 'Red World'} — <span style={{ color: world?.color || '#FF4444' }}>{world?.tagline || 'Innovation Rules'}</span>
          </h1>
          <p style={{
            fontSize: 16,
            color: '#64748B',
            animation: 'fadeInUp 0.6s ease-out 0.1s both',
          }}>
            Configure your simulation
          </p>
        </div>

        {/* Industry select */}
        <div style={{ marginBottom: 48, animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'rgba(255,255,255,0.8)' }}>
            Choose your industry
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}>
            {INDUSTRIES.map((ind) => {
              const selected = industry === ind.id
              const isAvail = ind.available
              return (
                <button
                  key={ind.id}
                  onClick={isAvail ? () => setIndustry(ind.id) : undefined}
                  style={{
                    position: 'relative',
                    padding: '20px 18px',
                    borderRadius: 14,
                    border: selected
                      ? `2px solid ${world?.color || '#FF4444'}`
                      : '1px solid rgba(255,255,255,0.08)',
                    background: selected
                      ? `${world?.color || '#FF4444'}15`
                      : 'rgba(255,255,255,0.03)',
                    cursor: isAvail ? 'pointer' : 'default',
                    opacity: isAvail ? 1 : 0.4,
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    color: '#fff',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{ind.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{ind.label}</div>
                  {!isAvail && (
                    <div style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                    }}>
                      <Lock size={14} color="rgba(255,255,255,0.3)" />
                    </div>
                  )}
                  {!isAvail && (
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Coming Soon</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Role select */}
        <div style={{ marginBottom: 56, animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'rgba(255,255,255,0.8)' }}>
            Choose your role
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}>
            {ROLES.map((r) => {
              const selected = role === r.id
              const isAvail = r.available
              return (
                <button
                  key={r.id}
                  onClick={isAvail ? () => setRole(r.id) : undefined}
                  style={{
                    position: 'relative',
                    padding: '22px 16px',
                    borderRadius: 14,
                    border: selected
                      ? `2px solid ${world?.color || '#FF4444'}`
                      : '1px solid rgba(255,255,255,0.08)',
                    background: selected
                      ? `${world?.color || '#FF4444'}15`
                      : 'rgba(255,255,255,0.03)',
                    cursor: isAvail ? 'pointer' : 'default',
                    opacity: isAvail ? 1 : 0.4,
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    color: '#fff',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{r.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.label}</div>
                  {!isAvail && (
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                    }}>
                      <Lock size={14} color="rgba(255,255,255,0.3)" />
                    </div>
                  )}
                  {!isAvail && (
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Coming Soon</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Start button */}
        <div style={{ textAlign: 'center', animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
          <button
            disabled={!canStart}
            onClick={canStart ? () => onStart(industry, role) : undefined}
            style={{
              padding: '18px 52px',
              borderRadius: 14,
              border: 'none',
              fontSize: 17,
              fontWeight: 700,
              cursor: canStart ? 'pointer' : 'default',
              background: canStart ? (world?.color || '#FF4444') : 'rgba(255,255,255,0.06)',
              color: canStart ? '#fff' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              boxShadow: canStart ? `0 8px 30px ${world?.color || '#FF4444'}40` : 'none',
            }}
            id="start-simulation-btn"
          >
            Start Simulation →
          </button>
          {!canStart && (
            <p style={{ fontSize: 12, color: '#64748B', marginTop: 14 }}>
              Select an industry and role to begin
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
