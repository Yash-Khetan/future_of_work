import React from 'react'
import { BookOpen, Download, Plus } from 'lucide-react'

export default function Materials({ role }) {
  const materials = [
    {
      id: 1,
      title: 'The Four Worlds of Work - Full Report',
      description: 'Comprehensive analysis of Red, Blue, Green, and Yellow worlds by 2030.',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Human-Machine Frontier Analysis',
      description: 'How AI and automation will split tasks between humans and machines.',
      type: 'Presentation',
      size: '5.1 MB'
    }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Reading Materials</h2>
        {role === 'teacher' && (
          <button className="btn btn-primary"><Plus size={18} /> Upload Material</button>
        )}
      </div>

      <div className="feed-grid">
        {materials.map(m => (
          <div key={m.id} className="glass-card">
            <div className="card-header">
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px' }}>
                <BookOpen color="var(--green-world)" size={24} />
              </div>
              <button className="btn" style={{ padding: '8px' }}><Download size={16} /></button>
            </div>
            <h3 style={{ margin: '16px 0 8px' }}>{m.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
              {m.description}
            </p>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: '600', color: '#888' }}>
              <span style={{ background: 'var(--glass-bg)', padding: '4px 8px', borderRadius: '4px' }}>{m.type}</span>
              <span style={{ background: 'var(--glass-bg)', padding: '4px 8px', borderRadius: '4px' }}>{m.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
