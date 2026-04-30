import React from 'react';
import MetricDashboard from '../components/MetricDashboard.jsx';

const getArchetype = (metrics) => {
  const { workforceHealth, revenueIndex, talentRetention, innovationScore } = metrics;
  
  if (revenueIndex > 90 && workforceHealth < 40) return { title: "Ruthless Optimizer", desc: "You prioritized margins over people. Short-term wins, but long-term fragility." };
  if (innovationScore > 85 && revenueIndex < 60) return { title: "Visionary Dreamer", desc: "You built incredible tech but burned cash fast. Watch out for a buyout." };
  if (workforceHealth > 80 && revenueIndex < 50) return { title: "Protector", desc: "You saved jobs but sacrificed growth. In the Red World, you might not survive." };
  if (revenueIndex > 70 && innovationScore > 70 && workforceHealth > 60) return { title: "Agile Mastermind", desc: "You perfectly balanced growth, tech, and talent. A rare Red World survivor." };
  
  return { title: "Pragmatic Survivor", desc: "You made tough calls, balancing survival with growth in a chaotic world." };
};

const getLetter = (metrics) => {
  const avg = (metrics.workforceHealth + metrics.revenueIndex + metrics.talentRetention + metrics.innovationScore) / 4;
  if (avg > 80) return 'A';
  if (avg > 70) return 'B';
  if (avg > 60) return 'C';
  if (avg > 50) return 'D';
  return 'F';
};

export default function Results({ world, metrics, onRestart }) {
  const archetype = getArchetype(metrics);
  const grade = getLetter(metrics);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D1B2A',
      padding: '80px 40px',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 60, animation: 'fadeInUp 0.6s ease-out' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 24,
            border: `1px solid ${world?.color || '#FF4444'}40`,
            background: `${world?.color || '#FF4444'}12`,
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 16 }}>{world?.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: world?.color || '#FF4444' }}>
              Simulation Complete
            </span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 900,
            marginBottom: 16,
            letterSpacing: '-2px',
          }}>
            Your 2030 Reality
          </h1>
          <p style={{ fontSize: 18, color: '#64748B' }}>
            The decisions are made. The consequences are yours.
          </p>
        </div>

        {/* Final Dashboard */}
        <div style={{ marginBottom: 60 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: '#fff', textAlign: 'center' }}>
            Final Metrics
          </h3>
          <MetricDashboard metrics={metrics} />
        </div>

        {/* Archetype & Grade */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 60,
          animation: 'fadeInUp 0.6s ease-out 0.2s both',
        }}>
          {/* Archetype Card */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 20,
            padding: '32px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>
              Your Leadership Archetype
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: world?.color || '#FF4444', marginBottom: 16 }}>
              {archetype.title}
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              {archetype.desc}
            </p>
          </div>

          {/* Grade Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(26,110,255,0.1), rgba(0,194,168,0.1))',
            borderRadius: 20,
            padding: '32px',
            border: '1px solid rgba(26,110,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>
                Overall Readiness
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', maxWidth: 200, lineHeight: 1.5 }}>
                Based on average performance across all four core indicators.
              </p>
            </div>
            <div style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#fff',
              textShadow: '0 0 40px rgba(255,255,255,0.3)',
            }}>
              {grade}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div style={{ textAlign: 'center', animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
          <button
            onClick={onRestart}
            style={{
              padding: '16px 40px',
              borderRadius: 12,
              border: 'none',
              background: '#fff',
              color: '#0D1B2A',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              marginBottom: 16,
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            Play Another World
          </button>
          <p style={{ fontSize: 13, color: '#64748B' }}>
            Or try a different industry/role in this one.
          </p>
        </div>

      </div>
    </div>
  );
}
