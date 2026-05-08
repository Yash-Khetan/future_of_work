import React from 'react'
import { FileText, Plus, CheckCircle, Clock } from 'lucide-react'

export default function Assignments({ role }) {
  const assignments = [
    {
      id: 1,
      title: 'Generative AI Impact on Your Chosen Industry',
      dueDate: 'May 14, 2030',
      status: 'pending', // pending, graded, submitted
      world: 'blue'
    },
    {
      id: 2,
      title: 'Analyze: The Red World vs. The Blue World',
      dueDate: 'May 20, 2030',
      status: 'submitted',
      world: 'red'
    }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Class Assignments</h2>
        {role === 'teacher' && (
          <button className="btn btn-primary"><Plus size={18} /> Create Assignment</button>
        )}
      </div>

      <div className="feed-list">
        {assignments.map(a => (
          <div key={a.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '16px', borderRadius: '12px' }}>
                <FileText color="var(--accent)" size={24} />
              </div>
              <div>
                <h3 style={{ marginBottom: '8px' }}>{a.title}</h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <span className={`badge ${a.world}`}>{a.world} world</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> Due {a.dueDate}</span>
                </div>
              </div>
            </div>
            
            {role === 'student' ? (
              <div>
                {a.status === 'pending' ? (
                  <button className="btn btn-primary">Turn In</button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-world)' }}>
                    <CheckCircle size={20} /> Submitted
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>24/30</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Turned in</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
