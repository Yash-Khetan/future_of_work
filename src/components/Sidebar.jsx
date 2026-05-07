import React from 'react'
import { LayoutDashboard, BookOpen, FileText, HelpCircle, MessageSquare, Briefcase, Database } from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Class Stream', icon: <LayoutDashboard size={20} /> },
    { id: 'assignments', label: 'Assignments', icon: <FileText size={20} /> },
    { id: 'materials', label: 'Reading Materials', icon: <BookOpen size={20} /> },
    { id: 'quizzes', label: 'Quizzes', icon: <HelpCircle size={20} /> },
    { id: 'chatrooms', label: 'Discussion Rooms', icon: <MessageSquare size={20} /> },
    { id: 'knowledge-bank', label: 'Knowledge Bank', icon: <Database size={20} /> },
  ]

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">
          <Briefcase size={24} color="#FFF" />
        </div>
        <div className="logo-text">FOW Classroom</div>
      </div>
      <nav className="nav-menu">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}
