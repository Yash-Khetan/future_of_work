import React from 'react'
import WorldCard from './WorldCard.jsx'
import { WORLDS } from '../data.js'
import { Database } from 'lucide-react'

export default function KnowledgeBank({ onPlayWorld }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Knowledge Bank: The Four Worlds</h2>
      </div>
      
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '16px', lineHeight: '1.6' }}>
        Explore the four distinct scenarios of the 2030 workspace. Red and Blue represent individualistic futures, while Green and Yellow focus on collective responsibility.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '28px',
      }}>
        {WORLDS.map((w) => (
          <WorldCard
            key={w.id}
            world={w}
            variant="select"
            dimmed={!w.available}
            onClick={() => w.available && onPlayWorld && onPlayWorld(w)}
          />
        ))}
      </div>
    </div>
  )
}
