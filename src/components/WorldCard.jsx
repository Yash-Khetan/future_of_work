import React from 'react'
import { Lock } from 'lucide-react'

export default function WorldCard({ world, onClick, variant = 'landing', dimmed = false }) {
  const { name, tagline, color, icon, available, description, indiaLens } = world
  const isLanding = variant === 'landing'

  const cardStyle = {
    position: 'relative',
    background: dimmed ? 'rgba(255,255,255,0.03)' : isLanding ? '#fff' : 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    overflow: 'hidden',
    border: dimmed
      ? '1px solid rgba(255,255,255,0.05)'
      : available && !isLanding
        ? `2px solid ${color}`
        : isLanding ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
    opacity: dimmed ? 0.45 : 1,
    cursor: available && onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    animation: available && !isLanding ? 'glowBorder 3s ease-in-out infinite' : 'none',
    ...(available && !isLanding ? {
      '--glow-color': color,
    } : {}),
  }

  const hoverStyle = available ? {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 40px ${color}30`,
  } : {}

  return (
    <div
      className="card-hover"
      style={cardStyle}
      onClick={available && onClick ? () => onClick(world) : undefined}
      onMouseEnter={(e) => {
        if (available) {
          Object.assign(e.currentTarget.style, hoverStyle)
        }
      }}
      onMouseLeave={(e) => {
        if (available) {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = ''
        }
      }}
    >
      {/* Top color bar */}
      <div style={{ height: 4, background: color }} />

      <div style={{ padding: '28px 24px' }}>
        {/* Lock overlay for dimmed cards */}
        {dimmed && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}>
            <Lock size={40} color="rgba(255,255,255,0.2)" />
          </div>
        )}

        {/* Icon + Title */}
        <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
        <h3 style={{
          fontSize: 22,
          fontWeight: 700,
          color: isLanding ? '#0D1B2A' : '#fff',
          marginBottom: 4,
        }}>
          {name}
        </h3>
        <p style={{
          fontSize: 14,
          fontWeight: 600,
          color: color,
          marginBottom: 14,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          {tagline}
        </p>

        {/* Description */}
        <p style={{
          fontSize: 14,
          lineHeight: 1.6,
          color: isLanding ? '#64748B' : 'rgba(255,255,255,0.6)',
          marginBottom: 16,
        }}>
          {description}
        </p>

        {/* India lens tag */}
        <div style={{
          fontSize: 12,
          color: isLanding ? '#64748B' : 'rgba(255,255,255,0.4)',
          padding: '8px 12px',
          background: isLanding ? '#F4F6FA' : 'rgba(255,255,255,0.04)',
          borderRadius: 8,
          marginBottom: 18,
          fontStyle: 'italic',
        }}>
          🇮🇳 {indiaLens}
        </div>

        {/* Badge */}
        <div style={{ marginBottom: 16 }}>
          {available ? (
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              color: '#22C55E',
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.3)',
              padding: '4px 12px',
              borderRadius: 20,
              animation: 'availablePulse 2s ease-in-out infinite',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              ● Available in MVP
            </span>
          ) : (
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              color: '#64748B',
              background: 'rgba(100,116,139,0.1)',
              border: '1px solid rgba(100,116,139,0.2)',
              padding: '4px 12px',
              borderRadius: 20,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Coming Soon
            </span>
          )}
        </div>

        {/* CTA */}
        {isLanding && (
          <button
            disabled={!available}
            onClick={available && onClick ? (e) => { e.stopPropagation(); onClick(world) } : undefined}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: 10,
              border: 'none',
              fontSize: 14,
              fontWeight: 600,
              cursor: available ? 'pointer' : 'default',
              background: available ? color : '#e2e8f0',
              color: available ? '#fff' : '#94a3b8',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
          >
            {available ? `Play ${name} →` : 'Coming Soon'}
          </button>
        )}
      </div>
    </div>
  )
}
