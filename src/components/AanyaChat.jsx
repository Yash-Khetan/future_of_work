import React, { useState, useEffect } from 'react';

export default function AanyaChat({ text, onNext }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    
    // Typing effect
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15); // Fast typing speed

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div style={{
      marginTop: 32,
      background: 'rgba(255,255,255,0.04)',
      borderRadius: 20,
      border: '1px solid rgba(0,194,168,0.3)',
      padding: '24px',
      animation: 'fadeInUp 0.4s ease-out',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00C2A8, #1A6EFF)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 700,
          color: '#fff',
        }}>
          A
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Aanya</div>
          <div style={{ fontSize: 12, color: '#00C2A8', fontWeight: 600 }}>AI Advisor</div>
        </div>
      </div>
      
      <div style={{
        fontSize: 15,
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.85)',
        minHeight: 80, // Prevent jumping
      }}>
        {displayedText}
        {isTyping && <span style={{ opacity: 0.7 }}>▋</span>}
      </div>

      {!isTyping && (
        <div style={{ marginTop: 24, textAlign: 'right', animation: 'fadeInUp 0.3s ease-out' }}>
          <button
            onClick={onNext}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: '#fff',
              color: '#0D1B2A',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
