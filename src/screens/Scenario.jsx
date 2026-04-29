import React from 'react'
import { ArrowLeft, Construction } from 'lucide-react'

const METRICS = [
  { label: 'Workforce Health', color: '#00C2A8' },
  { label: 'Revenue Index', color: '#1A6EFF' },
  { label: 'Talent Retention', color: '#F59E0B' },
  { label: 'Innovation Score', color: '#FF4444' },
]

const ROLE_LABELS = {
  strategy: 'Strategy Lead',
  hr: 'HR Director',
  ceo: 'CEO',
}

const INDUSTRY_LABELS = {
  tech: 'Tech',
  bfsi: 'BFSI',
  consulting: 'Consulting',
  fmcg: 'FMCG',
}

export default function Scenario({ world, industry, role, onBack }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D1B2A',
      padding: '0 0 80px',
    }}>
      {/* Header bar */}
      <div style={{
        padding: '16px 40px',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 18 }}>{world?.icon}</span>
            <span style={{ fontWeight: 700, color: world?.color || '#FF4444', fontSize: 15 }}>
              {world?.name || 'Red World'}
            </span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            {INDUSTRY_LABELS[industry] || 'Tech'}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            {ROLE_LABELS[role] || 'Strategy Lead'}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{ fontSize: 12, color: '#64748B' }}>Scenario</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>1</span>
          <span style={{ fontSize: 12, color: '#64748B' }}>of 8</span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '60px auto', padding: '0 40px' }}>
        {/* Dashboard metrics placeholder */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 48,
          animation: 'fadeInUp 0.6s ease-out',
        }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{
              padding: '24px 20px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 36,
                fontWeight: 800,
                color: 'rgba(255,255,255,0.12)',
                marginBottom: 8,
                letterSpacing: '-1px',
              }}>
                --
              </div>
              <div style={{ fontSize: 12, color: m.color, fontWeight: 600 }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder card */}
        <div style={{
          padding: '60px 40px',
          borderRadius: 20,
          border: '2px dashed rgba(255,255,255,0.1)',
          textAlign: 'center',
          animation: 'fadeInUp 0.6s ease-out 0.1s both',
        }}>
          <Construction size={48} color="rgba(255,255,255,0.15)" style={{ marginBottom: 20 }} />
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 16,
            color: 'rgba(255,255,255,0.6)',
          }}>
            🚧 Scenario Engine — Coming in next build
          </h2>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: 480,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            The decision trees, consequence engine, and
            Aanya AI advisor will live here.
          </p>
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            }}
            id="scenario-back-btn"
          >
            <ArrowLeft size={16} /> Back to Setup
          </button>
        </div>
      </div>
    </div>
  )
}
