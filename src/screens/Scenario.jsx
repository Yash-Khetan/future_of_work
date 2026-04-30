import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SCENARIOS, INITIAL_METRICS } from '../data/redWorldScenarios.js';
import MetricDashboard from '../components/MetricDashboard.jsx';
import DecisionCard from '../components/DecisionCard.jsx';
import AanyaChat from '../components/AanyaChat.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

const ROLE_LABELS = {
  strategy: 'Strategy Lead',
  hr: 'HR Director',
  ceo: 'CEO',
};

const INDUSTRY_LABELS = {
  tech: 'Tech',
  bfsi: 'BFSI',
  consulting: 'Consulting',
  fmcg: 'FMCG',
};

export default function Scenario({ world, industry, role, onBack, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showAanya, setShowAanya] = useState(false);

  const scenario = SCENARIOS[currentIndex];

  const handleSelect = (choice) => {
    setSelectedChoice(choice);
    // Apply impact immediately
    setMetrics(prev => ({
      workforceHealth: prev.workforceHealth + choice.impact.workforceHealth,
      revenueIndex: prev.revenueIndex + choice.impact.revenueIndex,
      talentRetention: prev.talentRetention + choice.impact.talentRetention,
      innovationScore: prev.innovationScore + choice.impact.innovationScore,
    }));
    
    // Small delay before Aanya appears for drama
    setTimeout(() => {
      setShowAanya(true);
    }, 600);
  };

  const handleNext = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowAanya(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(metrics);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D1B2A',
      padding: '0 0 80px',
    }}>
      {/* Header bar */}
      <div style={{
        padding: '16px 40px',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button 
            onClick={onBack}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 14, fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> Exit
          </button>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>{world?.icon}</span>
            <span style={{ fontWeight: 700, color: world?.color || '#FF4444', fontSize: 15 }}>
              {world?.name || 'Red World'}
            </span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            {INDUSTRY_LABELS[industry] || 'Tech'}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            {ROLE_LABELS[role] || 'Strategy Lead'}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 40px' }}>
        
        {/* Progress & Metrics */}
        <ProgressBar current={currentIndex + 1} total={SCENARIOS.length} />
        <MetricDashboard metrics={metrics} />

        {/* Scenario Content */}
        <div key={scenario.id} style={{ animation: 'fadeInUp 0.5s ease-out' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 800,
            marginBottom: 16,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}>
            {scenario.title}
          </h2>
          <p style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 40,
          }}>
            {scenario.context}
          </p>

          {/* Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {scenario.choices.map((choice) => (
              <DecisionCard
                key={choice.id}
                choice={choice}
                onSelect={handleSelect}
                selected={selectedChoice?.id === choice.id}
                disabled={selectedChoice !== null}
              />
            ))}
          </div>

          {/* Aanya Response */}
          {showAanya && selectedChoice && (
            <AanyaChat 
              text={scenario.aanyaResponses[selectedChoice.id]} 
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
}
