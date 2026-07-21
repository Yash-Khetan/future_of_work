import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ModuleCard from './ModuleCard.jsx';

export default function Timeline({ modules, timelineRef }) {
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={timelineRef}
      style={{
        position: 'relative',
        padding: '80px 40px 120px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 80 }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: 5,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 16,
          }}
        >
          {/* [ COURSE_ARCHITECTURE ] */}
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          10 Modules.{' '}
          {/* <span style={{ color: '#00FFD1' }}></span> */}
        </h2>
        <p
          className="font-mono"
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Click any module to explore its learning objectives and readings.
        </p>
      </motion.div>

      {/* Timeline container */}
      <div style={{ position: 'relative' }}>
        {/* Center line (background) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            background: 'rgba(255,255,255,0.05)',
            transform: 'translateX(-50%)',
          }}
        />
        {/* Center line (animated fill) */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: 2,
            height: lineHeight,
            background: 'linear-gradient(to bottom, #00FFD1, #1A6EFF, #A855F7, #10B981)',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        />

        {/* Module cards */}
        {modules.map((module, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={module.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: index === modules.length - 1 ? 0 : 40,
                position: 'relative',
              }}
            >
              {/* Left card */}
              <div
                style={{
                  width: '46%',
                  paddingRight: isLeft ? 40 : 0,
                  paddingLeft: isLeft ? 0 : 40,
                }}
              >
                {isLeft && <ModuleCard module={module} index={index} />}
              </div>

              {/* Center node */}
              <div
                style={{
                  width: '8%',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: 20,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: module.color,
                    boxShadow: `0 0 20px ${module.color}40, 0 0 40px ${module.color}15`,
                    border: '2px solid #000',
                    position: 'relative',
                  }}
                >
                  {/* Pulse ring */}
                  <div
                    className="timeline-pulse"
                    style={{
                      position: 'absolute',
                      inset: -6,
                      borderRadius: '50%',
                      border: `1px solid ${module.color}40`,
                    }}
                  />
                </motion.div>
              </div>

              {/* Right card */}
              <div
                style={{
                  width: '46%',
                  paddingLeft: isLeft ? 0 : 40,
                  paddingRight: isLeft ? 40 : 0,
                }}
              >
                {!isLeft && <ModuleCard module={module} index={index} />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
