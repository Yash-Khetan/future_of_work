import React from 'react';

export default function DecisionCard({ choice, onSelect, disabled, selected }) {
  return (
    <button
      onClick={() => onSelect(choice)}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '24px',
        borderRadius: 16,
        background: selected ? 'rgba(255,68,68,0.15)' : 'rgba(255,255,255,0.03)',
        border: selected ? '2px solid #FF4444' : '1px solid rgba(255,255,255,0.08)',
        textAlign: 'left',
        cursor: disabled && !selected ? 'default' : 'pointer',
        opacity: disabled && !selected ? 0.5 : 1,
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        } else if (selected) {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.background = 'rgba(255,68,68,0.15)';
          e.currentTarget.style.borderColor = '#FF4444';
        }
      }}
    >
      <div style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: selected ? '6px solid #FF4444' : '2px solid rgba(255,255,255,0.3)',
        flexShrink: 0,
        transition: 'all 0.2s ease',
      }} />
      <div style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 500 }}>
        {choice.text}
      </div>
    </button>
  );
}
