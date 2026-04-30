import React from 'react';

export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;
  
  return (
    <div style={{ width: '100%', marginBottom: 32 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: 13, 
        color: '#64748B', 
        marginBottom: 8,
        fontWeight: 600,
      }}>
        <span>Scenario {current} of {total}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      <div style={{
        height: 6,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: 'linear-gradient(90deg, #FF4444, #F59E0B)',
          transition: 'width 0.5s ease-out',
        }} />
      </div>
    </div>
  );
}
