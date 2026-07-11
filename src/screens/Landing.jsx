import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
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

    /* Responsive timeline */
    @media (max-width: 900px) {
      .timeline-container .timeline-row {
        flex-direction: column !important;
      }
      .timeline-container .timeline-left,
      .timeline-container .timeline-right {
        width: 100% !important;
        padding: 0 !important;
      }
      .timeline-container .timeline-center {
        display: none !important;
      }
    }
  `}</style>
);

// --- COMPONENT: Particle Field ---
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
        position: 'absolute',
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
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const [heroPhase, setHeroPhase] = useState(1);
  const prevPhaseRef = useRef(1);


  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const sectionHeight = heroRef.current.offsetHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)));

      let newPhase;
      if (progress < 0.3) {
        newPhase = 1;
      } else if (progress < 0.65) {
        newPhase = 2;
      } else {
        newPhase = 3;
      }

      if (newPhase !== prevPhaseRef.current) {
        prevPhaseRef.current = newPhase;
      }
      setHeroPhase(newPhase);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section 2 Progress (course stats)
  const s2Ref = useRef(null);
  const { scrollYProgress: s2Progress } = useScroll({ target: s2Ref, offset: ["start start", "end end"] });
  const s2LineScale = useTransform(s2Progress, [0.1, 0.5], [0, 1]);

  const heroTextStyle = (isActive) => ({
    position: 'absolute',
    zIndex: isActive ? 2 : 1,
    textAlign: 'center',
    width: '100%',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isActive ? 1 : 0,
    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
    pointerEvents: isActive ? 'auto' : 'none',
  });

  return (
    <>
      <GlobalTypography />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ParticleField />

          {/* Phase 1 */}
          <div style={heroTextStyle(heroPhase === 1)} className="font-display">
            <div className="font-mono" style={{
              fontSize: 15, letterSpacing: 6, color: '#00FFD1', marginBottom: 24,
              opacity: 0.8,
            }}>
              Leadership Journey
            </div>

            <h1 style={{
              fontSize: 'clamp(48px, 9vw, 110px)', margin: 0, letterSpacing: '-5px',
              lineHeight: 0.95,
            }}>
              The workplace
            </h1>
            <h1 style={{
              fontSize: 'clamp(48px, 9vw, 110px)', margin: 0, letterSpacing: '-5px',
              color: 'rgba(255,255,255,0.3)', lineHeight: 0.95,
            }}>
              is being rewritten.
            </h1>
          </div>

          {/* Phase 2 */}
          <div style={heroTextStyle(heroPhase === 2)} className="font-display">
            <h1 style={{
              fontSize: 'clamp(44px, 8vw, 100px)', margin: 0, letterSpacing: '-4px',
              lineHeight: 1.05,
            }}>
              By algorithms.{' '}
              <span style={{ color: '#1A6EFF' }}>By you.</span>
              <br />
              <span style={{ color: '#00FFD1' }}>By us.</span>
            </h1>
          </div>

          {/* Phase 3 */}
          <div style={heroTextStyle(heroPhase === 3)} className="font-display">
            <h1 style={{
              fontSize: 'clamp(40px, 7vw, 90px)', margin: 0, letterSpacing: '-4px',
              lineHeight: 1.1,
            }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>10 Modules.</span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>17 Days.</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #00FFD1, #1A6EFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Your playbook.
              </span>
            </h1>
            <div className="font-mono" style={{
              fontSize: 12, letterSpacing: 4, color: 'rgba(255,255,255,0.4)',
              marginTop: 32,
            }}>

            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: '6vh',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8, zIndex: 3,
            }}
          >
            <div className="font-mono" style={{
              fontSize: 10, letterSpacing: 4, color: 'rgba(255,255,255,0.3)',
            }}>
              SCROLL TO EXPLORE
            </div>
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
              <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <motion.circle
                cx="10" cy="8" r="2.5" fill="#00FFD1"
                animate={{ cy: [8, 18, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: COURSE OVERVIEW COUNTER STRIP
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={s2Ref}
        style={{
          height: '200vh',
          position: 'relative',
        }}
      >
        <div
          className="grid-bg"
          style={{
            position: 'sticky', top: 0, height: '100vh',
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
                [ COURSE_OVERVIEW ]
              </div>
              <h2 className="font-display" style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                letterSpacing: '-2px',
                marginBottom: 12,
              }}>
                AI & The Future of Work
              </h2>
              <p className="font-mono" style={{
                fontSize: 13, color: 'rgba(255,255,255,0.4)',
                maxWidth: 650, margin: '0 auto', lineHeight: 1.7,
              }}>
                A comprehensive deep-dive into how AI is reshaping organizations,
                careers, competencies, and the very fabric of modern work.
                From organizational design to ethical AI deployment — every dimension covered.
              </p>
            </motion.div>

            {/* Counters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 40,
              marginBottom: 50,
            }}>
              {COURSE_STATS.map((stat, i) => (
                <AnimatedCounter key={i} value={stat.value} label={stat.label} color={stat.color} suffix={stat.value === '10+' ? '' : ''} />
              ))}
            </div>

            {/* Animated line */}
            <motion.div style={{
              height: 1, background: 'rgba(255,255,255,0.15)', width: '100%',
              scaleX: s2LineScale, transformOrigin: 'left',
            }} />

            {/* Date marquee */}
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginTop: 30, opacity: 0.3 }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: INTERACTIVE MODULE TIMELINE
      ═══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          background: '#000',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <FloatingOrbs />
        <Timeline modules={MODULES} timelineRef={timelineRef} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: STATS TICKER (KEPT)
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid #111', background: '#000' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
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
          SECTION 5: FINAL CTA (KEPT)
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '160px 40px',
        textAlign: 'center',
        borderTop: '1px solid #111',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <FloatingOrbs />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className="font-mono" style={{
            fontSize: 11, letterSpacing: 5,
            color: 'rgba(255,255,255,0.3)', marginBottom: 24,
          }}>
            [ 27 JULY — 12 AUGUST 2025 ]
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            letterSpacing: '-3px',
            marginBottom: 24,
            lineHeight: 1.1,
          }}>
            Stop reading about the future.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #00FFD1, #1A6EFF, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Start shaping it.
            </span>
          </h2>
          <p className="font-mono" style={{
            fontSize: 13, color: 'rgba(255,255,255,0.4)',
            maxWidth: 550, margin: '0 auto 40px', lineHeight: 1.7,
          }}>
            Walk in as a student. Walk out as a Day-1 AI-Ready Manager.
            This isn't a course — it's your operating system for the future.
          </p>

          {/* Animated module colors strip */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 6,
            marginTop: 40,
          }}>
            {MODULES.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                style={{
                  width: 4,
                  height: 40,
                  background: m.color,
                  borderRadius: 2,
                  transformOrigin: 'bottom',
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
          <div className="font-mono" style={{
            fontSize: 10, letterSpacing: 3,
            color: 'rgba(255,255,255,0.25)', marginTop: 16,
          }}>
            10 MODULES · YOUR TRANSFORMATION
          </div>
        </motion.div>
      </section>
    </>
  );
}
