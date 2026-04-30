import React from 'react'

export function GlobalStyles() {
  return (
    <style>{`
      :root {
        --dark: #050505;
        --darker: #000000;
        --accent: #F4F4F5;
        --teal: #00E5FF;
        --orange: #FF4444;
        --light-bg: #FAFAFA;
        --card-bg: #0A0A0A;
        --muted: #888888;
        --border: #222222;
        --red-world: #FF4444;
        --blue-world: #1A6EFF;
        --green-world: #22C55E;
        --yellow-world: #F59E0B;
      }

      @keyframes meshPulse {
        0%, 100% { opacity: 0.4; transform: scale(1) translate(0, 0); }
        33% { opacity: 0.6; transform: scale(1.1) translate(30px, -20px); }
        66% { opacity: 0.3; transform: scale(0.95) translate(-20px, 30px); }
      }

      @keyframes meshPulse2 {
        0%, 100% { opacity: 0.3; transform: scale(1) translate(0, 0); }
        33% { opacity: 0.5; transform: scale(1.05) translate(-40px, 20px); }
        66% { opacity: 0.35; transform: scale(1.15) translate(20px, -30px); }
      }

      @keyframes meshPulse3 {
        0%, 100% { opacity: 0.25; transform: scale(1.1) translate(10px, 10px); }
        50% { opacity: 0.45; transform: scale(0.9) translate(-30px, -20px); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 8px rgba(0,194,168,0.3); }
        50% { box-shadow: 0 0 20px rgba(0,194,168,0.6); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes bounceDown {
        0%, 100% { transform: translateY(0); opacity: 0.6; }
        50% { transform: translateY(8px); opacity: 1; }
      }

      @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes availablePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
        50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
      }

      @keyframes glowBorder {
        0%, 100% { box-shadow: 0 0 15px rgba(255, 68, 68, 0.3), inset 0 0 15px rgba(255, 68, 68, 0.05); }
        50% { box-shadow: 0 0 30px rgba(255, 68, 68, 0.5), inset 0 0 30px rgba(255, 68, 68, 0.1); }
      }

      @keyframes typing {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes gridMove {
        0% { transform: perspective(1000px) rotateX(60deg) translateY(0); }
        100% { transform: perspective(1000px) rotateX(60deg) translateY(50px); }
      }

      .cinematic-grid {
        position: absolute;
        width: 200vw;
        height: 200vh;
        left: -50vw;
        top: -50vh;
        background-image: 
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        background-size: 50px 50px;
        transform-origin: center top;
        animation: gridMove 2s linear infinite;
        z-index: 0;
        pointer-events: none;
      }

      .cinematic-fade {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, transparent 0%, var(--dark) 70%);
        z-index: 1;
        pointer-events: none;
      }

      .hero-glow {
        position: absolute;
        width: 600px;
        height: 600px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
        border-radius: 50%;
        z-index: 0;
        pointer-events: none;
        filter: blur(40px);
      }

      .card-hover {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .card-hover:hover {
        transform: translateY(-4px);
      }

      .btn-primary {
        background: var(--accent);
        color: #fff;
        border: none;
        padding: 14px 32px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
      }
      .btn-primary:hover {
        background: #1557cc;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(26,110,255,0.3);
      }

      .btn-outline {
        background: transparent;
        color: #fff;
        border: 1.5px solid rgba(255,255,255,0.3);
        padding: 14px 32px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
      }
      .btn-outline:hover {
        border-color: #fff;
        background: rgba(255,255,255,0.05);
        transform: translateY(-2px);
      }

      .section-dark {
        background: var(--dark);
        color: #fff;
      }
      .section-light {
        background: var(--light-bg);
        color: var(--dark);
      }

      .navbar-scrolled {
        backdrop-filter: blur(12px);
        box-shadow: 0 1px 20px rgba(0,0,0,0.3);
        background: rgba(13,27,42,0.85) !important;
      }

      @media (max-width: 768px) {
        .cinematic-grid { background-size: 30px 30px; }
      }
    `}</style>
  )
}
