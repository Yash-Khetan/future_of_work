import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Calendar, Clock, Zap } from 'lucide-react';

const activityIcons = {
  group: '👥',
  case: '📋',
  assessment: '🎯',
  discussion: '💬',
  scenario: '🔍',
  roadmap: '🗺️',
};

export default function ModuleCard({ module, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      onClick={() => {
        setIsExpanded(!isExpanded);
      }}
      style={{ cursor: 'pointer', width: '100%' }}
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderTop: `2px solid ${module.color}`,
          borderRadius: 16,
          padding: '28px 32px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        className="module-card"
        data-color={module.color}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${module.color}08 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, position: 'relative', zIndex: 1 }}>
          {/* Module number */}
          <div
            style={{
              minWidth: 56,
              height: 56,
              borderRadius: 14,
              background: `${module.color}12`,
              border: `1px solid ${module.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              flexShrink: 0,
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: 2,
                color: module.color,
                opacity: 0.7,
                lineHeight: 1,
              }}
            >
              M
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: module.color,
                lineHeight: 1,
              }}
            >
              {module.number}
            </span>
          </div>

          {/* Title & subtitle */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 22px)',
                fontWeight: 900,
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
                marginBottom: 6,
                color: '#fff',
              }}
            >
              {module.title}
            </h3>
            <p
              className="font-mono"
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.5,
                maxWidth: 500,
              }}
            >
              {module.subtitle}
            </p>
          </div>

          {/* Expand chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ChevronDown size={16} color="rgba(255,255,255,0.4)" />
          </motion.div>
        </div>

        {/* Badge row */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: 16,
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Date */}
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              padding: '5px 12px',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Calendar size={12} />
            {module.dates}
          </span>

          {/* Sessions */}
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              padding: '5px 12px',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Clock size={12} />
            {module.sessions} {module.sessions > 1 ? 'Sessions' : 'Session'}
          </span>

          {/* Activity */}
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              padding: '5px 12px',
              borderRadius: 20,
              background: `${module.color}10`,
              border: `1px solid ${module.color}25`,
              color: module.color,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span style={{ fontSize: 13 }}>{activityIcons[module.activity.type] || '📌'}</span>
            {module.activity.label}
          </span>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}
            >
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 32,
                }}
              >
                {/* Learning Objectives */}
                <div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: 3,
                      color: module.color,
                      marginBottom: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Zap size={12} />
                    LEARNING OBJECTIVES
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {module.objectives.map((obj, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="font-mono"
                        style={{
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.6,
                          marginBottom: 10,
                          paddingLeft: 16,
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 2,
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            background: module.color,
                            opacity: 0.6,
                          }}
                        />
                        {obj}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Readings */}
                <div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: 3,
                      color: module.color,
                      marginBottom: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <BookOpen size={12} />
                    READINGS
                  </div>
                  {module.readings.map((reading, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        marginBottom: 8,
                      }}
                    >
                      <div
                        className="font-mono"
                        style={{
                          fontSize: 9,
                          letterSpacing: 2,
                          color:
                            reading.type === 'compulsory'
                              ? '#EF4444'
                              : 'rgba(255,255,255,0.35)',
                          marginBottom: 4,
                          textTransform: 'uppercase',
                        }}
                      >
                        {reading.type === 'compulsory' ? '● PRE-READ' : '○ SUGGESTED'}
                      </div>
                      {reading.url ? (
                        <a
                          href={reading.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono"
                          style={{
                            fontSize: 12,
                            color: module.color,
                            textDecoration: 'none',
                            lineHeight: 1.5,
                            borderBottom: `1px dashed ${module.color}40`,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {reading.title} ↗
                        </a>
                      ) : (
                        <div
                          className="font-mono"
                          style={{
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.55)',
                            lineHeight: 1.5,
                          }}
                        >
                          {reading.title}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
