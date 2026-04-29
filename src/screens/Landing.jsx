import React, { useState, useEffect } from 'react'
import { ChevronDown, Send } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import WorldCard from '../components/WorldCard.jsx'
import { WORLDS, STATS, STEPS, SOURCES, CHAT_MESSAGES } from '../data.js'

export default function Landing({ onEnter }) {
  const [showChevron, setShowChevron] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowChevron(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div>
      <Navbar />

      {/* ─── HERO ─── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0D1B2A',
        overflow: 'hidden',
        padding: '0 20px',
      }}>
        {/* Animated mesh gradient */}
        <div className="hero-mesh">
          <div className="hero-mesh-extra" />
          <div className="hero-mesh-extra2" />
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800 }}>
          {/* Live badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 24,
            border: '1px solid rgba(0,194,168,0.4)',
            background: 'rgba(0,194,168,0.08)',
            marginBottom: 32,
            animation: 'fadeInUp 0.6s ease-out',
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#00C2A8',
              animation: 'pulse 2s ease-in-out infinite',
              display: 'inline-block',
            }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#00C2A8', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Live Simulation
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 76px)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-2px',
            marginBottom: 28,
            animation: 'fadeInUp 0.8s ease-out 0.1s both',
          }}>
            The future of work<br />
            isn't coming.<br />
            <span style={{ color: '#1A6EFF' }}>It's already here.</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#64748B',
            maxWidth: 560,
            margin: '0 auto 36px',
            lineHeight: 1.7,
            animation: 'fadeInUp 0.8s ease-out 0.2s both',
          }}>
            92 million jobs will be displaced by 2030.
            170 million new ones will be created.
            Which side of that number are your decisions on?
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 32,
            animation: 'fadeInUp 0.8s ease-out 0.3s both',
          }}>
            <button className="btn-primary" onClick={onEnter} id="enter-simulation-btn">
              Enter Simulation →
            </button>
            <button
              className="btn-outline"
              onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
              id="view-research-btn"
            >
              View Research ↓
            </button>
          </div>

          {/* Trust line */}
          <p style={{
            fontSize: 11,
            color: 'rgba(100,116,139,0.6)',
            animation: 'fadeInUp 0.8s ease-out 0.4s both',
            letterSpacing: '0.3px',
          }}>
            Based on WEF Future of Jobs 2025 &nbsp;·&nbsp; McKinsey Global Institute &nbsp;·&nbsp; PwC Workforce 2030 &nbsp;·&nbsp; India Skills Report
          </p>
        </div>

        {/* Scroll indicator */}
        {showChevron && (
          <div style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounceDown 2s ease-in-out infinite',
            zIndex: 1,
          }}>
            <ChevronDown size={28} color="rgba(255,255,255,0.4)" />
          </div>
        )}
      </section>

      {/* ─── STATS TICKER ─── */}
      <section style={{
        background: '#0f2035',
        padding: '60px 40px',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
        }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 14,
                padding: '28px 24px',
                borderTop: `3px solid ${s.color}`,
                border: '1px solid rgba(255,255,255,0.06)',
                borderTopColor: s.color,
                transition: 'all 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 12px 40px ${s.color}25`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <div style={{ fontSize: 42, fontWeight: 800, color: s.color, marginBottom: 6, letterSpacing: '-1px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 12, lineHeight: 1.4 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
                {s.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOUR WORLDS ─── */}
      <section className="section-light" style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#0D1B2A', marginBottom: 16, letterSpacing: '-1px' }}>
              Choose Your World
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              Four possible futures. All of them plausible.
              Which one will your decisions create?
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {WORLDS.map((w) => (
              <WorldCard key={w.id} world={w} variant="landing" onClick={w.available ? onEnter : undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section-dark" style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-1px' }}>
              How It Works
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
              Six steps. Twenty minutes. A completely different
              understanding of what's coming.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 20,
            position: 'relative',
          }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: 20,
                position: 'relative',
              }}>
                {/* Dotted connector */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: 28,
                    right: -12,
                    width: 24,
                    borderTop: '2px dashed rgba(255,255,255,0.12)',
                    display: window.innerWidth < 768 ? 'none' : 'block',
                  }} />
                )}
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(26,110,255,0.15)',
                  color: '#1A6EFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 16,
                  border: '1px solid rgba(26,110,255,0.3)',
                }}>
                  {s.num}
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#fff' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESEARCH FOUNDATION ─── */}
      <section id="research" className="section-light" style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#0D1B2A', marginBottom: 16, letterSpacing: '-1px' }}>
              Grounded in Global Research
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              Every scenario, every number, every consequence
              is traceable to a primary source.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 24,
          }}>
            {SOURCES.map((src, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  background: '#fff',
                  borderRadius: 14,
                  padding: '32px 24px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: src.color,
                  marginBottom: 12,
                  letterSpacing: '-0.5px',
                }}>
                  {src.abbr}
                </div>
                <div style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#1A6EFF',
                  marginBottom: 8,
                }}>
                  {src.stat}
                </div>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, marginBottom: 8 }}>
                  {src.desc}
                </p>
                <p style={{ fontSize: 11, color: '#94a3b8' }}>
                  {src.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AANYA PREVIEW ─── */}
      <section className="section-dark" style={{ padding: '100px 40px' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Left text */}
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 700,
              color: '#00C2A8',
              background: 'rgba(0,194,168,0.1)',
              border: '1px solid rgba(0,194,168,0.25)',
              padding: '5px 14px',
              borderRadius: 20,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: 20,
            }}>
              AI Advisor
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-1px' }}>
              Meet Aanya
            </h2>
            <p style={{ fontSize: 18, color: '#00C2A8', fontWeight: 600, marginBottom: 20 }}>
              Your AI-powered future-of-work advisor
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 28, maxWidth: 440 }}>
              Aanya is embedded with 50,000 words of workforce research.
              She explains the data behind every decision you make, answers your
              questions, and connects global trends to India's reality.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['✓ Powered by Claude AI', '✓ Backed by WEF & McKinsey data', '✓ India-contextualised insights'].map((t, i) => (
                <span key={i} style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right chat interface */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            maxWidth: 420,
          }}>
            {/* Chat header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00C2A8, #1A6EFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 700,
              }}>
                A
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Aanya</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00C2A8',
                    display: 'inline-block',
                  }} />
                  <span style={{ fontSize: 11, color: '#00C2A8' }}>Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 360, overflowY: 'auto' }}>
              {CHAT_MESSAGES.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                    animation: `typing 0.4s ease-out ${i * 0.15}s both`,
                  }}
                >
                  <div style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.from === 'user'
                      ? 'rgba(26,110,255,0.2)'
                      : 'rgba(255,255,255,0.06)',
                    border: msg.from === 'user'
                      ? '1px solid rgba(26,110,255,0.3)'
                      : '1px solid rgba(255,255,255,0.06)',
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.85)',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}>
              <input
                type="text"
                placeholder="Ask Aanya anything about the future of work..."
                readOnly
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <button style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: '#1A6EFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}>
                <Send size={16} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INDIA FOCUS ─── */}
      <section style={{
        background: 'linear-gradient(135deg, #1A6EFF, #0052cc)',
        padding: '80px 40px',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 48, letterSpacing: '-1px' }}>
            Built for India's Reality
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 48,
          }}>
            {[
              { val: '70M+', label: 'Workers at risk of displacement by 2030' },
              { val: '1M+', label: 'AI-related jobs opening in India by 2026' },
              { val: '#3', label: "India's rank in global AI talent pool" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 8, letterSpacing: '-2px' }}>{s.val}</div>
                <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
            WorkWorld 2030 isn't a Western case study with an India footnote.
            Every scenario is calibrated for the Indian business context —
            from startup culture in Bengaluru to BFSI in Mumbai to
            manufacturing corridors in Pune and Chennai.
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section-dark" style={{ padding: '120px 40px', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 36,
          letterSpacing: '-1.5px',
        }}>
          Stop reading about the future.<br />
          <span style={{ color: '#1A6EFF' }}>Start navigating it.</span>
        </h2>
        <button
          className="btn-primary"
          onClick={onEnter}
          style={{ fontSize: 18, padding: '18px 44px', marginBottom: 20 }}
          id="final-enter-simulation-btn"
        >
          Enter Simulation →
        </button>
        <p style={{ fontSize: 13, color: '#64748B' }}>
          Free · No login required · Built for SP Jain MBA cohort
        </p>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        background: '#0a1520',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 40px 24px',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>WorkWorld</span>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#1A6EFF' }}>2030</span>
          </div>
          <span style={{ fontSize: 12, color: '#64748B', textAlign: 'center' }}>
            Built on WEF · McKinsey · PwC · India Skills Report research
          </span>
          <span style={{ fontSize: 12, color: '#64748B' }}>
            SP Jain School of Global Management · 2026
          </span>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 16,
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            MVP v1.0 · Red World available now
          </span>
        </div>
      </footer>
    </div>
  )
}
