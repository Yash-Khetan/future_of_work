import React, { useState } from 'react'
import { GlobalStyles } from './styles.jsx'
import Landing from './screens/Landing.jsx'
import WorldSelect from './screens/WorldSelect.jsx'
import Setup from './screens/Setup.jsx'
import Scenario from './screens/Scenario.jsx'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [selectedWorld, setSelectedWorld] = useState(null)
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)

  const navigate = (s) => {
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
        />
      )}
    </>
  )
}
