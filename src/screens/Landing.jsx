import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import WorldCard from '../components/WorldCard.jsx';
import { WORLDS, STATS } from '../data.js';

// --- STYLES & FONTS ---
const GlobalTypography = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@900&display=swap');
    
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

    .scanline {
      background: repeating-linear-gradient(
        to bottom,
        rgba(0, 255, 209, 0),
        rgba(0, 255, 209, 0) 2px,
        rgba(0, 255, 209, 0.03) 2px,
        rgba(0, 255, 209, 0.03) 4px
      );
    }
    
    @keyframes rotateShard {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .shard-fragment {
      transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    
    .shard-container:hover .frag-1 { transform: translate(-20px, -20px) rotate(-15deg); }
    .shard-container:hover .frag-2 { transform: translate(30px, -10px) rotate(25deg); }
    .shard-container:hover .frag-3 { transform: translate(-10px, 30px) rotate(-10deg); }
    .shard-container:hover .frag-4 { transform: translate(20px, 20px) rotate(15deg); }

    .cube-container {
      perspective: 1000px;
    }
    .cube {
      width: 120px;
      height: 120px;
      position: relative;
      transform-style: preserve-3d;
      animation: rotateCube 10s infinite linear;
      transition: transform 0.5s ease-out;
    }
    .cube-container:hover .cube {
      transform: scale(1.5);
    }
    .cube-face {
      position: absolute;
      width: 120px;
      height: 120px;
      background: rgba(26, 110, 255, 0.1);
      border: 1px solid rgba(26, 110, 255, 0.5);
      box-shadow: 0 0 20px rgba(26, 110, 255, 0.2) inset;
    }
    .front  { transform: rotateY(  0deg) translateZ(60px); }
    .right  { transform: rotateY( 90deg) translateZ(60px); }
    .back   { transform: rotateY(180deg) translateZ(60px); }
    .left   { transform: rotateY(-90deg) translateZ(60px); }
    .top    { transform: rotateX( 90deg) translateZ(60px); }
    .bottom { transform: rotateX(-90deg) translateZ(60px); }

    @keyframes rotateCube {
      0% { transform: rotateY(0deg) rotateX(20deg); }
      100% { transform: rotateY(360deg) rotateX(20deg); }
    }
    
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .cursor-blink { animation: blink 1s step-end infinite; }

    .hero-bottom-lines {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      justify-content: center;
    }
    .hero-slash {
      display: none;
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(64px, 10vw, 120px);
      color: rgba(255,255,255,0.2);
      font-weight: 900;
    }
    @media (min-width: 1400px) {
      .hero-bottom-lines {
        flex-direction: row !important;
        gap: 20px;
        align-items: baseline;
      }
      .hero-slash {
        display: inline-block !important;
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
    const NUM_PARTICLES = 800;

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
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
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

// --- COMPONENT: Radar Button ---
const RadarButton = ({ onClick }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        x.set(dx * 0.2);
        y.set(dy * 0.2);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX, y: smoothY, position: 'relative', display: 'inline-block', zIndex: 10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={{
        position: 'absolute', top: -20, left: -20, right: -20, bottom: -20,
        border: `1px solid ${isHovered ? '#00FFD1' : 'rgba(255,255,255,0.2)'}`,
        borderRadius: '50%',
        animation: `radarPulse ${isHovered ? '0.5s' : '2s'} infinite linear`,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: -10, left: -10, right: -10, bottom: -10,
        border: `1px solid ${isHovered ? '#00FFD1' : 'rgba(255,255,255,0.4)'}`,
        borderRadius: '50%',
        animation: `radarPulse ${isHovered ? '0.5s' : '2s'} infinite linear 0.5s`,
        pointerEvents: 'none'
      }} />

      <button style={{
        width: 140, height: 140, borderRadius: '50%',
        background: isHovered ? 'rgba(0, 255, 209, 0.1)' : '#000',
        border: `1px solid ${isHovered ? '#00FFD1' : '#333'}`,
        color: isHovered ? '#00FFD1' : '#fff',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        outline: 'none',
        backdropFilter: 'blur(4px)'
      }}>
        <span className="font-mono" style={{ fontSize: 10, letterSpacing: 2, textAlign: 'center', lineHeight: 1.4, fontWeight: 700 }}>
          Initiate<br />Simulation
        </span>
      </button>
    </motion.div>
  );
};

// --- COMPONENT: Slot Counter ---
const SlotCounter = ({ target, value }) => {
  return <span className="font-mono">{value.toLocaleString()}</span>;
};

// --- COMPONENT: Terminal Chat ---
const TerminalChat = () => {
  const [lines, setLines] = useState([]);
  const [activeNodes, setActiveNodes] = useState([]);

  const initSequence = [
    "> AANYA_v2.1 [INITIALIZED]",
    "> CONNECTING TO WEF_DATABASE... [OK]",
    "> CONNECTING TO MCKINSEY_GI... [OK]",
    "> READY."
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let timeoutId;

    const typeNextChar = () => {
      if (currentLine >= initSequence.length) return;

      const text = initSequence[currentLine];
      if (currentChar <= text.length) {
        setLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = text.substring(0, currentChar);
          return newLines;
        });
        currentChar++;
        timeoutId = setTimeout(typeNextChar, 30);
      } else {
        currentLine++;
        currentChar = 0;
        timeoutId = setTimeout(typeNextChar, 100);
      }
    };

    typeNextChar();
    return () => clearTimeout(timeoutId);
  }, []);

  const handleNodeClick = (nodeName) => {
    // TODO: Add terminal hum audio via Web Audio API
    setActiveNodes(prev => [...prev, nodeName]);

    const stats = {
      'WEF DATA': '170M new roles emerge by 2030.',
      'McKINSEY': '375M workers need to switch occupations.',
      'INDIA CONTEXT': 'Only 42.6% of Indian grads employable.'
    };

    setLines(prev => [...prev, `$ USER: QUERY [${nodeName}]`]);

    setTimeout(() => {
      setLines(prev => [...prev, `> AANYA: ${stats[nodeName]}`]);
    }, 500);

    setTimeout(() => {
      setActiveNodes(prev => prev.filter(n => n !== nodeName));
    }, 2000);
  };

  return (
    <div className="font-mono" style={{
      background: '#000',
      border: '1px solid rgba(0,255,209,0.2)',
      boxShadow: '0 0 60px rgba(0,255,209,0.05)',
      position: 'relative',
      height: 400,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="scanline" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* Terminal Output */}
      <div style={{ padding: 24, flex: 1, overflowY: 'auto', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            color: (line && (line.startsWith('> AANYA:') || (line.startsWith('>') && !line.includes('USER:')))) ? '#00FFD1' : 'rgba(255,255,255,0.6)',
            fontSize: 13,
            lineHeight: 1.5,
          }}>
            {line}
          </div>
        ))}
        <div style={{ color: '#00FFD1' }}>
          <span className="cursor-blink">█</span>
        </div>
      </div>

      {/* Interactive Nodes */}
      <div style={{
        padding: 16,
        borderTop: '1px solid rgba(0,255,209,0.2)',
        display: 'flex',
        gap: 16,
        zIndex: 2,
        background: 'rgba(0,0,0,0.8)'
      }}>
        {['WEF DATA', 'McKINSEY', 'INDIA CONTEXT'].map(node => (
          <button
            key={node}
            onClick={() => handleNodeClick(node)}
            style={{
              background: activeNodes.includes(node) ? 'rgba(0,255,209,0.2)' : 'transparent',
              border: `1px solid ${activeNodes.includes(node) ? '#00FFD1' : 'rgba(255,255,255,0.2)'}`,
              color: activeNodes.includes(node) ? '#00FFD1' : 'rgba(255,255,255,0.6)',
              padding: '6px 12px',
              fontSize: 11,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: 4,
              display: 'flex', alignItems: 'center', gap: 6,
              outline: 'none'
            }}
          >
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: activeNodes.includes(node) ? '#00FFD1' : 'rgba(255,255,255,0.4)',
              boxShadow: activeNodes.includes(node) ? '0 0 8px #00FFD1' : 'none',
              animation: activeNodes.includes(node) ? 'blink 0.5s infinite' : 'none'
            }} />
            [{node}]
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MAIN LANDING COMPONENT ---
export default function Landing({ onEnter }) {
  // Hero section — scroll-driven phase switcher (vanilla scroll listener, no Framer Motion)
  const heroRef = useRef(null);
  const [heroPhase, setHeroPhase] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const sectionHeight = heroRef.current.offsetHeight;
      const scrolled = -rect.top; // how far we've scrolled into this section
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)));

      if (progress < 0.3) {
        setHeroPhase(1);
      } else if (progress < 0.65) {
        setHeroPhase(2);
      } else {
        setHeroPhase(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section 2 Progress (300vh tall)
  const s2Ref = useRef(null);
  const { scrollYProgress: s2Progress } = useScroll({ target: s2Ref, offset: ["start start", "end end"] });

  const [numValue, setNumValue] = useState(92000000);
  const [numText, setNumText] = useState('JOBS DISPLACED');
  const [numColor, setNumColor] = useState('#ffffff');

  useEffect(() => {
    return s2Progress.on('change', (v) => {
      if (v > 0.3) {
        const diff = 170000000 - 92000000;
        const progress = Math.min((v - 0.3) * 2.5, 1);
        setNumValue(Math.floor(92000000 + diff * progress));
        if (progress > 0.8) {
          setNumText('ROLES CREATED');
          setNumColor('#00FFD1');
        } else {
          setNumText('JOBS DISPLACED');
          setNumColor('#ffffff');
        }
      } else {
        setNumValue(92000000);
        setNumText('JOBS DISPLACED');
        setNumColor('#ffffff');
      }
    });
  }, [s2Progress]);

  const s2LineScale = useTransform(s2Progress, [0.1, 0.3], [0, 1]);

  // Section 3: The 4 Worlds Sticky Scroll
  const s3Ref = useRef(null);
  const { scrollYProgress: s3Progress } = useScroll({ target: s3Ref, offset: ["start start", "end end"] });

  // Shared style for hero text phases
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

      {/* SECTION 1: HERO */}
      <section ref={heroRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ParticleField />

          {/* Phase 1: "The future of work isn't approaching." */}
          <div style={heroTextStyle(heroPhase === 1)} className="font-display">
            <h1 style={{ fontSize: 'clamp(64px, 10vw, 120px)', margin: 0, letterSpacing: '-5px' }}>The future of work</h1>
            <h1 style={{ fontSize: 'clamp(64px, 10vw, 120px)', margin: 0, letterSpacing: '-5px', color: 'rgba(255,255,255,0.4)' }}>isn't approaching.</h1>
          </div>

          {/* Phase 2: "It's already executing." */}
          <div style={heroTextStyle(heroPhase === 2)} className="font-display">
            <h1 style={{ fontSize: 'clamp(64px, 10vw, 120px)', margin: '0', letterSpacing: '-5px', color: '#00FFD1' }}>It's already executing.</h1>
          </div>

          {/* Phase 3: "It's already here." */}
          <div style={heroTextStyle(heroPhase === 3)} className="font-display">
            <h1 style={{ fontSize: 'clamp(48px, 9vw, 110px)', margin: '0', letterSpacing: '-5px', color: '#fff' }}>
              It's already{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                here.
                <svg
                  viewBox="0 0 100 20"
                  style={{ position: 'absolute', left: -5, right: -10, bottom: -2, width: 'calc(100% + 15px)', height: '20px', overflow: 'visible', zIndex: -1 }}
                >
                  <path
                    d="M 5 10 Q 30 18 60 12 T 95 8"
                    fill="none"
                    stroke="#00FFD1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: heroPhase === 3 ? 0 : 100,
                      transition: 'stroke-dashoffset 0.8s ease 0.3s',
                    }}
                  />
                </svg>
              </span>
            </h1>
          </div>

          {/* CTA Button */}
          <div style={{ position: 'absolute', bottom: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, zIndex: 3 }}>
            <RadarButton onClick={onEnter} />
            <a
              href="#research"
              className="font-mono"
              style={{ color: '#fff', textDecoration: 'none', fontSize: 12, letterSpacing: 4, opacity: 0.6 }}
            >
              [ ACCESS DATA ]
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: REALITY CHECK */}
      <section ref={s2Ref} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', overflow: 'hidden' }}>

          {/* Background Graph SVG */}
          <motion.svg
            style={{ position: 'absolute', right: 0, bottom: 0, width: '100%', height: '50%', opacity: 0.06, zIndex: 0 }}
            viewBox="0 0 100 100" preserveAspectRatio="none"
          >
            <motion.path
              d="M0,100 C30,100 40,80 60,80 C70,80 80,40 100,0"
              fill="none" stroke="#fff" strokeWidth="1"
              style={{ pathLength: s2Progress }}
            />
          </motion.svg>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
            <motion.div
              className="font-mono"
              style={{
                fontSize: 'clamp(80px, 15vw, 160px)',
                fontWeight: 700,
                color: numColor,
                lineHeight: 1,
                letterSpacing: '-4px'
              }}
            >
              <SlotCounter value={numValue} target={170000000} />
            </motion.div>

            <motion.div
              className="font-mono"
              style={{ fontSize: 14, letterSpacing: 6, color: numColor, marginTop: 20 }}
            >
              {numText}
            </motion.div>

            <motion.div
              style={{
                height: 1, background: 'rgba(255,255,255,0.2)', width: '100%', marginTop: 60,
                scaleX: s2LineScale, transformOrigin: 'left'
              }}
            />

            {/* Marquee */}
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginTop: 30, opacity: 0.4 }}>
              <div
                className="font-mono"
                style={{
                  display: 'inline-block',
                  animation: 'marquee 20s linear infinite',
                  fontSize: 14,
                  letterSpacing: 4
                }}
              >
                WEF 2025 · MCKINSEY GLOBAL INSTITUTE · PwC WORKFORCE HORIZONS · INDIA SKILLS REPORT · WEF 2025 · MCKINSEY GLOBAL INSTITUTE · PwC WORKFORCE HORIZONS · INDIA SKILLS REPORT ·
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE FOUR WORLDS */}
      <section ref={s3Ref} style={{ position: 'relative', background: '#000' }}>
        <div style={{ display: 'flex' }}>

          {/* Left Sticky Column */}
          <div style={{ width: '40%', height: '100vh', position: 'sticky', top: 0, padding: '80px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="font-mono" style={{ fontSize: 12, letterSpacing: 4, color: 'rgba(255,255,255,0.6)' }}>CHOOSE YOUR</div>
            <div className="font-display" style={{ fontSize: 'clamp(100px, 15vw, 200px)', lineHeight: 0.9, letterSpacing: '-8px' }}>2030</div>

            <div style={{ width: 4, height: 200, background: 'rgba(255,255,255,0.1)', marginTop: 40, borderRadius: 2 }}>
              <motion.div style={{ width: '100%', height: '100%', background: '#fff', scaleY: s3Progress, transformOrigin: 'top' }} />
            </div>
          </div>

          {/* Right Scrolling Column */}
          <div style={{ width: '60%' }}>

            {/* Red World */}
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,45,85,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div className="shard-container" style={{ position: 'absolute', right: '10%', top: '20%', width: 200, height: 200, animation: 'rotateShard 20s linear infinite' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0 0 20px #FF2D55)' }}>
                  <polygon className="shard-fragment frag-1" points="50,10 80,40 50,70 20,40" fill="none" stroke="#FF2D55" strokeWidth="1" />
                  <polygon className="shard-fragment frag-2" points="55,15 85,45 55,75" fill="none" stroke="#FF2D55" strokeWidth="1" />
                  <polygon className="shard-fragment frag-3" points="45,15 15,45 45,75" fill="none" stroke="#FF2D55" strokeWidth="1" />
                  <circle className="shard-fragment frag-4" cx="50" cy="40" r="10" fill="none" stroke="#FF2D55" strokeWidth="1" />
                </svg>
              </div>
              <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 10 }}>
                <WorldCard world={WORLDS[0]} variant="landing" onClick={() => onEnter(WORLDS[0])} />
              </div>
            </div>

            {/* Blue World */}
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div className="cube-container" style={{ position: 'absolute', right: '20%', top: '30%', zIndex: 0 }}>
                <div className="cube">
                  <div className="cube-face front"></div>
                  <div className="cube-face back"></div>
                  <div className="cube-face right"></div>
                  <div className="cube-face left"></div>
                  <div className="cube-face top"></div>
                  <div className="cube-face bottom"></div>
                </div>
              </div>
              <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 10 }}>
                <WorldCard world={WORLDS[1]} variant="landing" onClick={() => WORLDS[1].available && onEnter(WORLDS[1])} />
              </div>
            </div>

            {/* Green World */}
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 10 }}>
                <WorldCard world={WORLDS[2]} variant="landing" dimmed={!WORLDS[2].available} onClick={() => WORLDS[2].available && onEnter(WORLDS[2])} />
              </div>
            </div>

            {/* Yellow World */}
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 10 }}>
                <WorldCard world={WORLDS[3]} variant="landing" dimmed={!WORLDS[3].available} onClick={() => WORLDS[3].available && onEnter(WORLDS[3])} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: MEET AANYA */}
      <section style={{ padding: '120px 40px', background: '#000', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="font-mono" style={{ color: '#00FFD1', fontSize: 12, letterSpacing: 2, marginBottom: 20 }}>[ AI_ADVISOR_LINK ]</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 60px)', letterSpacing: '-2px', marginBottom: 24 }}>Meet Aanya.</h2>
            <p className="font-mono" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: 14 }}>
              She isn't just a chatbot. She's embedded with 50,000 words of workforce research.
              She analyzes every decision you make in real-time against global datasets.
            </p>
          </div>
          <TerminalChat />
        </div>
      </section>

      {/* STATS TICKER */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid #111', background: '#000' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ borderTop: `2px solid ${s.color}`, paddingTop: 20 }}>
              <div className="font-mono" style={{ fontSize: 40, fontWeight: 700, color: s.color, marginBottom: 10 }}>{s.value}</div>
              <div className="font-mono" style={{ fontSize: 12, color: '#fff', marginBottom: 8, letterSpacing: 1 }}>{s.label}</div>
              <div className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{s.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INDIA FOCUS */}
      <section style={{ padding: '120px 40px', background: '#000', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', right: '-10%', top: '10%', width: '60%', height: '80%', opacity: 0.04, fill: 'none', stroke: '#fff' }}>
          <path d="M50,10 L80,30 L70,80 L40,90 L20,60 Z" strokeWidth="0.5" />
        </svg>
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 60px)', letterSpacing: '-2px', marginBottom: 60 }}>Built for India's Reality.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            <div>
              <div className="font-mono" style={{ fontSize: 48, fontWeight: 700, marginBottom: 10 }}>70M+</div>
              <div className="font-mono" style={{ fontSize: 12, opacity: 0.6, lineHeight: 1.5 }}>Workers at risk of displacement by 2030</div>
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: 48, fontWeight: 700, marginBottom: 10 }}>1M+</div>
              <div className="font-mono" style={{ fontSize: 12, opacity: 0.6, lineHeight: 1.5 }}>AI-related jobs opening in India by 2026</div>
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: 48, fontWeight: 700, marginBottom: 10 }}>#3</div>
              <div className="font-mono" style={{ fontSize: 12, opacity: 0.6, lineHeight: 1.5 }}>India's rank in global AI talent pool</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '160px 40px', textAlign: 'center', borderTop: '1px solid #111' }}>
        <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-3px', marginBottom: 40 }}>
          Stop reading about the future.<br />
          <span style={{ color: '#00FFD1' }}>Start navigating it.</span>
        </h2>
        <RadarButton onClick={onEnter} />
      </section>
    </>
  );
}
