import React from 'react';

const METRIC_CONFIG = [
  { id: 'workforceHealth', label: 'Workforce Health', color: '#00C2A8' },
  { id: 'revenueIndex', label: 'Revenue Index', color: '#1A6EFF' },
  { id: 'talentRetention', label: 'Talent Retention', color: '#F59E0B' },
  { id: 'innovationScore', label: 'Innovation Score', color: '#FF4444' },
];

export default function MetricDashboard({ metrics }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 16,
      marginBottom: 32,
      animation: 'fadeInUp 0.6s ease-out',
    }}>
      {METRIC_CONFIG.map((m) => {
        const val = metrics[m.id];
        // Ensure val is between 0 and 100
        const clampedVal = Math.max(0, Math.min(100, val));
        
        // Determine health color based on value
        let statusColor = m.color;
        if (clampedVal < 30) statusColor = '#FF4444'; // Critical
        else if (clampedVal < 50) statusColor = '#F59E0B'; // Warning

        return (
          <div key={m.id} style={{
            padding: '20px 16px',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background bar indicator */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '4px',
              width: `${clampedVal}%`,
              background: statusColor,
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1), background-color 1s',
            }} />
            
            <div style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 8,
              letterSpacing: '-1px',
              transition: 'color 0.5s',
            }}>
              {clampedVal}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              {m.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
