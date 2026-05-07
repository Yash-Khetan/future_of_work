import React, { useState } from 'react'
import { GlobalStyles } from './styles.jsx'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import DashboardFeed from './components/DashboardFeed.jsx'
import Assignments from './components/Assignments.jsx'
import Materials from './components/Materials.jsx'
import Quizzes from './components/Quizzes.jsx'
import Chatrooms from './components/Chatrooms.jsx'
import KnowledgeBank from './components/KnowledgeBank.jsx'
import Setup from './screens/Setup.jsx'
import Scenario from './screens/Scenario.jsx'
import Results from './screens/Results.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [role, setRole] = useState('student') // 'student' or 'teacher'
  
  // Scenario Flow State
  const [playingWorld, setPlayingWorld] = useState(null)
  const [scenarioState, setScenarioState] = useState('setup') // setup, scenario, results
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [finalMetrics, setFinalMetrics] = useState(null)

  if (playingWorld) {
    if (scenarioState === 'setup') {
      return <Setup world={playingWorld} onBack={() => setPlayingWorld(null)} onStart={(industry, role) => { setSelectedIndustry(industry); setSelectedRole(role); setScenarioState('scenario'); }} />
    }
    if (scenarioState === 'scenario') {
      return <Scenario world={playingWorld} industry={selectedIndustry} role={selectedRole} onBack={() => setScenarioState('setup')} onComplete={(metrics) => { setFinalMetrics(metrics); setScenarioState('results'); }} />
    }
    if (scenarioState === 'results') {
      return <Results world={playingWorld} metrics={finalMetrics} onRestart={() => setPlayingWorld(null)} />
    }
  }

  return (
    <div className="app-container">
      <GlobalStyles />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Header role={role} setRole={setRole} activeTab={activeTab} />
        <main className="content-area">
          {activeTab === 'dashboard' && <DashboardFeed role={role} />}
          {activeTab === 'assignments' && <Assignments role={role} />}
          {activeTab === 'materials' && <Materials role={role} />}
          {activeTab === 'quizzes' && <Quizzes role={role} />}
          {activeTab === 'chatrooms' && <Chatrooms role={role} />}
          {activeTab === 'knowledge-bank' && (
            <KnowledgeBank onPlayWorld={(world) => {
              setPlayingWorld(world);
              setScenarioState('setup');
            }} />
          )}
        </main>
      </div>
    </div>
  )
}
