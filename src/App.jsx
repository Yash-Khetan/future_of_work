import React, { useState } from 'react'
import { GlobalStyles } from './styles.jsx'
import Landing from './screens/Landing.jsx'
import WorldSelect from './screens/WorldSelect.jsx'
import Setup from './screens/Setup.jsx'
import Scenario from './screens/Scenario.jsx'
import Results from './screens/Results.jsx'
import { audio } from './utils/audio.js'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [selectedWorld, setSelectedWorld] = useState(null)
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [finalMetrics, setFinalMetrics] = useState(null)

  const navigate = (s) => {
    if (s === 'worldselect') audio.init() // initialize audio on first user interaction
    if (s !== 'landing') audio.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setScreen(s), 100)
  }

  return (
    <>
      <GlobalStyles />
      {screen === 'landing' && (
        <Landing onEnter={() => navigate('worldselect')} />
      )}
      {screen === 'worldselect' && (
        <WorldSelect
          onBack={() => navigate('landing')}
          onSelect={(w) => { setSelectedWorld(w); navigate('setup') }}
        />
      )}
      {screen === 'setup' && (
        <Setup
          world={selectedWorld}
          onBack={() => navigate('worldselect')}
          onStart={(industry, role) => {
            setSelectedIndustry(industry)
            setSelectedRole(role)
            navigate('scenario')
          }}
        />
      )}
      {screen === 'scenario' && (
        <Scenario
          world={selectedWorld}
          industry={selectedIndustry}
          role={selectedRole}
          onBack={() => navigate('setup')}
          onComplete={(metrics) => {
            setFinalMetrics(metrics)
            navigate('results')
          }}
        />
      )}
      {screen === 'results' && (
        <Results
          world={selectedWorld}
          metrics={finalMetrics}
          onRestart={() => navigate('worldselect')}
        />
      )}
    </>
  )
}
