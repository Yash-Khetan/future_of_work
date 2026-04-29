import React from 'react'

export function GlobalStyles() {
  return (
    <style>{`
      :root {
        --dark: #0D1B2A;
        --accent: #1A6EFF;
        --teal: #00C2A8;
        --orange: #FF6B35;
        --light-bg: #F4F6FA;
        --card-bg: #EAF1FF;
        --muted: #64748B;
        --border: #CBD5E1;
        --red-world: #FF4444;
        --blue-world: #1A6EFF;
        --green-world: #22C55E;
        --yellow-world: #F59E0B;
      }

      @keyframes gradientDrift {
        0%, 100% { background-position: 0% 50%; }
        25% { background-position: 100% 0%; }
        50% { background-position: 100% 100%; }
        75% { background-position: 0% 100%; }
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

      .hero-mesh {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 0;
      }

      .hero-mesh::before {
        content: '';
        position: absolute;
        width: 600px;
        height: 600px;
        top: 10%;
        left: 10%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(26,110,255,0.35) 0%, transparent 70%);
        animation: meshPulse 20s ease-in-out infinite;
      }

      .hero-mesh::after {
        content: '';
        position: absolute;
        width: 500px;
        height: 500px;
        top: 40%;
        right: 10%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0,194,168,0.3) 0%, transparent 70%);
        animation: meshPulse2 18s ease-in-out infinite;
      }

      .hero-mesh-extra {
        position: absolute;
        width: 450px;
        height: 450px;
        bottom: 10%;
        left: 35%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%);
        animation: meshPulse3 22s ease-in-out infinite;
        z-index: 0;
      }

      .hero-mesh-extra2 {
        position: absolute;
        width: 350px;
        height: 350px;
        top: 20%;
        right: 30%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(26,110,255,0.15) 0%, transparent 70%);
        animation: meshPulse 25s ease-in-out infinite reverse;
        z-index: 0;
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
        .hero-mesh::before { width: 300px; height: 300px; }
        .hero-mesh::after { width: 250px; height: 250px; }
        .hero-mesh-extra { width: 200px; height: 200px; }
        .hero-mesh-extra2 { width: 180px; height: 180px; }
      }
    `}</style>
  )
}
