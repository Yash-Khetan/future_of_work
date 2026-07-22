import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Timeline from '../components/Timeline.jsx';
import { MODULES, COURSE_STATS } from '../moduleData.js';
import { STATS } from '../data.js';

// --- STYLES & FONTS ---
const GlobalTypography = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@400;700;900&display=swap');
    
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    body {
      background: #000000 !important;
      color: #ffffff;
      margin: 0;
      overflow-x: hidden;
    }

    @keyframes radarPulse {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(2); opacity: 0; }
    }
    
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    @keyframes pulseGlow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes timelinePulse {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }

    .timeline-pulse {
      animation: timelinePulse 2s ease-out infinite;
    }

    .scanline {
      background: repeating-linear-gradient(
        to bottom,
        rgba(0, 255, 209, 0),
        rgba(0, 255, 209, 0) 2px,
        rgba(0, 255, 209, 0.03) 2px,
        rgba(0, 255, 209, 0.03) 4px
      );
    }

    .module-card:hover {
      border-color: rgba(255,255,255,0.15) !important;
      box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 60px var(--card-glow, rgba(0,255,209,0.05));
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .cursor-blink { animation: blink 1s step-end infinite; }

    /* Counter animation */
    @keyframes countUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Grid pattern background */
    .grid-bg {
      background-image: 
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* Responsive styles */
    @media (max-width: 900px) {
      .timeline-row {
        flex-direction: column !important;
      }
      .timeline-left-col,
      .timeline-right-col {
        width: 100% !important;
        padding: 0 !important;
      }
      .timeline-center-col {
        display: none !important;
      }
      .timeline-center-line,
      .timeline-center-line-fill {
        display: none !important;
      }
      .stats-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 24px !important;
      }
      .module-expanded-grid {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
      .section-pad {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .discussion-inner {
        padding: 28px 24px !important;
      }
    }

    @media (max-width: 600px) {
      .stats-grid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }
      .module-card-inner {
        padding: 20px 18px !important;
      }
      .section-pad {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
      .discussion-inner {
        padding: 24px 20px !important;
      }
      .timeline-section {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
    }
  `}</style>
);


// --- COMPONENT: Particle Field (Galaxy Background) ---
const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const NUM_PARTICLES = 600;

    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    };

    window.addEventListener('resize', () => { resize(); initParticles(); });
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    resize();
    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (1 - dist / 120) * 8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};


// --- COMPONENT: Animated Counter ---
const AnimatedCounter = ({ value, label, color, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value) || 0;
    if (numericValue === 0) {
      setDisplayValue(value);
      return;
    }
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericValue);
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: 'center' }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 'clamp(40px, 6vw, 64px)',
          fontWeight: 700,
          color: color,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {displayValue}{suffix}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
};

// --- COMPONENT: Floating Orbs Background ---
const FloatingOrbs = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <div style={{
      position: 'absolute',
      top: '20%', left: '10%',
      width: 300, height: 300,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,255,209,0.06) 0%, transparent 70%)',
      animation: 'float 8s ease-in-out infinite',
      filter: 'blur(40px)',
    }} />
    <div style={{
      position: 'absolute',
      bottom: '20%', right: '15%',
      width: 400, height: 400,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(26,110,255,0.05) 0%, transparent 70%)',
      animation: 'float 10s ease-in-out infinite 2s',
      filter: 'blur(40px)',
    }} />
    <div style={{
      position: 'absolute',
      top: '60%', left: '50%',
      width: 250, height: 250,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
      animation: 'float 12s ease-in-out infinite 4s',
      filter: 'blur(40px)',
    }} />
  </div>
);

// --- MAIN LANDING COMPONENT ---
export default function Landing() {
  const timelineRef = useRef(null);

  // Section 2 Progress (course stats)
  const s2Ref = useRef(null);
  const { scrollYProgress: s2Progress } = useScroll({ target: s2Ref, offset: ["start start", "end end"] });
  const s2LineScale = useTransform(s2Progress, [0.1, 0.5], [0, 1]);

  return (
    <>
      <GlobalTypography />
      <ParticleField />


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: COURSE OVERVIEW COUNTER STRIP
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={s2Ref}
        style={{
          position: 'relative',
          paddingTop: '80px',
        }}
      >
        <div
          className="grid-bg section-pad"
          style={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            padding: '0 40px', overflow: 'hidden',
          }}
        >
          <FloatingOrbs />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, width: '100%' }}>
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', marginBottom: 60 }}
            >
              <div className="font-mono" style={{
                fontSize: 11, letterSpacing: 5,
                color: 'rgba(255,255,255,0.35)', marginBottom: 16,
              }}>
                {/* [ COURSE_OVERVIEW ] */}
              </div>
              <h2 className="font-display" style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                letterSpacing: '-2px',
                marginBottom: 12,
              }}>
                The Future of Work
              </h2>
              {/* <p className="font-mono" style={{
                fontSize: 13, color: 'rgba(255,255,255,0.4)',
                maxWidth: 650, margin: '0 auto', lineHeight: 1.7,
              }}>
                A comprehensive deep-dive into how AI is reshaping organizations,
                careers, competencies, and the very fabric of modern work.
                From organizational design to ethical AI deployment — every dimension covered.
              </p> */}
            </motion.div>

            {/* Counters
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 40,
              marginBottom: 50,
            }}>
              {COURSE_STATS.map((stat, i) => (
                <AnimatedCounter key={i} value={stat.value} label={stat.label} color={stat.color} suffix={stat.value === '10+' ? '' : ''} />
              ))}
            </div> */}

            {/* Animated line */}
            {/* <motion.div style={{
              height: 1, background: 'rgba(255,255,255,0.15)', width: '100%',
              scaleX: s2LineScale, transformOrigin: 'left',
            }} /> */}

            {/* Date marquee */}
            {/* <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginTop: 30, opacity: 0.3 }}>
              <div
                className="font-mono"
                style={{
                  display: 'inline-block',
                  animation: 'marquee 25s linear infinite',
                  fontSize: 12,
                  letterSpacing: 4,
                }}
              >
                27 JULY — 12 AUGUST · CASES · GROUP ACTIVITIES · ASSESSMENTS · SCENARIO ANALYSIS · CLASS DISCUSSIONS · ROADMAP BUILDING · 27 JULY — 12 AUGUST · CASES · GROUP ACTIVITIES · ASSESSMENTS · SCENARIO ANALYSIS · CLASS DISCUSSIONS · ROADMAP BUILDING ·&nbsp;
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION: STATS TICKER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding: '80px 40px', borderTop: '1px solid #111', background: '#000' }}>
        <div className="stats-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ borderTop: `2px solid ${s.color}`, paddingTop: 20 }}
            >
              <div className="font-mono" style={{ fontSize: 40, fontWeight: 700, color: s.color, marginBottom: 10 }}>{s.value}</div>
              <div className="font-mono" style={{ fontSize: 12, color: '#fff', marginBottom: 8, letterSpacing: 1 }}>{s.label}</div>
              <div className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{s.source}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION: DISCUSSION TEASER — AI & HIRING
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding: '60px 40px', background: '#000' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 720, margin: '0 auto' }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 22,
              padding: 2,
              background: 'linear-gradient(135deg, #FF6B6B, #FF8E53, #A855F7, #FF6B6B)',
              backgroundSize: '300% 300%',
              animation: 'gradientShift 6s ease infinite',
            }}
          >
            <div
              style={{
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 20,
                padding: '40px 44px',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="discussion-inner"
            >
              {/* Ambient glows */}
              <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, background: 'radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -60, left: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Tag */}
              <div style={{ marginBottom: 20, position: 'relative', zIndex: 1 }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: 3,
                    padding: '5px 14px',
                    borderRadius: 20,
                    background: 'rgba(255,107,107,0.12)',
                    border: '1px solid rgba(255,107,107,0.2)',
                    color: '#FF6B6B',
                    textTransform: 'uppercase',
                  }}
                >
                  🎙️ Discussion Session
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(22px, 3vw, 30px)',
                  fontWeight: 900,
                  letterSpacing: '-0.5px',
                  lineHeight: 1.2,
                  marginBottom: 12,
                  color: '#fff',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                AI & Hiring — The Talent Disruption
              </h3>

              {/* Subtitle */}
              <p
                className="font-mono"
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.7,
                  maxWidth: 520,
                  position: 'relative',
                  zIndex: 1,
                  margin: 0,
                }}
              >
                A candid discussion on how algorithms are rewriting the rules of who gets hired, who gets seen, and who gets left behind.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION: INTERACTIVE MODULE TIMELINE
      ═══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          background: 'transparent',
          marginTop: '-40px',
        }}
      >
        <FloatingOrbs />
        <Timeline modules={MODULES} timelineRef={timelineRef} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          padding: '60px 40px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#000',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display"
          style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            color: '#fff',
            marginBottom: 6,
          }}
        >
          The future of work
        </motion.div>
        <div
          className="font-mono"
          style={{
            fontSize: 12,
            letterSpacing: 3,
            color: 'rgba(255, 255, 255, 0.4)',
            textTransform: 'uppercase',
          }}
        >
          A leadership journey
        </div>
      </footer>
    </>
  );
}
