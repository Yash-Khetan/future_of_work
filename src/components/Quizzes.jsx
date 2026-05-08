import React from 'react'
import { HelpCircle, Play, Plus, BarChart2 } from 'lucide-react'

export default function Quizzes({ role }) {
  const quizzes = [
    {
      id: 1,
      title: 'Quiz 1: Fundamentals of The Four Worlds',
      questions: 15,
      timeLimit: '20 mins',
      status: 'available', // available, completed
      score: null
    },
    {
      id: 2,
      title: 'Quiz 2: The Red World vs The Green World',
      questions: 10,
      timeLimit: '15 mins',
      status: 'completed',
      score: '8/10'
    }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Quizzes & Assessments</h2>
        {role === 'teacher' && (
          <button className="btn btn-primary"><Plus size={18} /> Create Quiz</button>
        )}
      </div>

      <div className="feed-grid">
        {quizzes.map(q => (
          <div key={q.id} className="glass-card">
            <div className="card-header">
              <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: '12px' }}>
                <HelpCircle color="var(--yellow-world)" size={24} />
              </div>
              {role === 'student' && q.status === 'completed' && (
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--green-world)' }}>{q.score}</div>
              )}
            </div>
            <h3 style={{ margin: '16px 0 8px' }}>{q.title}</h3>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
              <span>{q.questions} Questions</span>
              <span>{q.timeLimit}</span>
            </div>

            {role === 'student' ? (
              <button className={`btn ${q.status === 'available' ? 'btn-primary' : ''}`} style={{ width: '100%', justifyContent: 'center' }} disabled={q.status === 'completed'}>
                {q.status === 'available' ? <><Play size={16} /> Start Quiz</> : 'Completed'}
              </button>
            ) : (
              <button className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                <BarChart2 size={16} /> View Results
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
