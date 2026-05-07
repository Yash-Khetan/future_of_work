import React from 'react'
import { PlusCircle, FileText, MessageSquare } from 'lucide-react'

export default function DashboardFeed({ role }) {
  const announcements = [
    {
      id: 1,
      author: 'Prof. Davis',
      date: 'Today, 10:00 AM',
      content: 'Welcome to the Future of Work! Please read the introductory text on the Four Worlds of Work. We will discuss the "Red World" tomorrow.',
      type: 'announcement'
    },
    {
      id: 2,
      author: 'Prof. Davis',
      date: 'Yesterday',
      content: 'New Assignment posted: "Generative AI Impact on Your Chosen Industry by 2030". Due next Friday.',
      type: 'assignment'
    }
  ]

  return (
    <div className="dashboard-feed">
      {role === 'teacher' && (
        <div className="glass-card" style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Share something with your class...</h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            <input 
              type="text" 
              placeholder="Announce something to your class" 
              style={{ flex: 1, background: 'var(--glass-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 16px', color: 'white' }}
            />
            <button className="btn btn-primary">Post</button>
          </div>
        </div>
      )}

      <div className="feed-list">
        {announcements.map(item => (
          <div key={item.id} className="glass-card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="profile-pic" style={{ width: '32px', height: '32px', fontSize: '14px' }}>P</div>
                <div>
                  <div style={{ fontWeight: '600' }}>{item.author}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.date}</div>
                </div>
              </div>
            </div>
            <p style={{ marginTop: '12px', lineHeight: '1.6' }}>{item.content}</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <button className="btn" style={{ fontSize: '14px', padding: '6px 12px' }}>
                <MessageSquare size={16} /> Add class comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
