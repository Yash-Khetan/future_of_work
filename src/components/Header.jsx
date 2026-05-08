import React from 'react'
import { Bell, Search } from 'lucide-react'

export default function Header({ role, setRole, activeTab }) {
  return (
    <header className="header">
      <div className="header-title">{activeTab.replace('-', ' ')}</div>
      <div className="user-controls">
        <div className="role-toggle">
          <button 
            className={`role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => setRole('student')}
          >
            Student View
          </button>
          <button 
            className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
            onClick={() => setRole('teacher')}
          >
            Teacher View
          </button>
        </div>
        <div className="btn" style={{ padding: '8px', borderRadius: '50%' }}>
          <Bell size={20} />
        </div>
        <div className="profile-pic">
          {role === 'student' ? 'S' : 'T'}
        </div>
      </div>
    </header>
  )
}
