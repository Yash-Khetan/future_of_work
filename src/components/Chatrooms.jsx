import React, { useState } from 'react'
import { Send, Users, Hash } from 'lucide-react'

export default function Chatrooms({ role }) {
  const rooms = [
    { id: 'red', name: 'The Red World', color: 'var(--red-world)' },
    { id: 'blue', name: 'The Blue World', color: 'var(--blue-world)' },
    { id: 'green', name: 'The Green World', color: 'var(--green-world)' },
    { id: 'yellow', name: 'The Yellow World', color: 'var(--yellow-world)' },
    { id: 'general', name: 'General Discussion', color: 'var(--accent)' }
  ]

  const [activeRoom, setActiveRoom] = useState(rooms[0])
  const [messages, setMessages] = useState([
    { id: 1, author: 'Prof. Davis', role: 'teacher', text: 'Welcome to the Red World chatroom! Discuss how innovation rules in this highly fragmented market.', time: '10:00 AM' },
    { id: 2, author: 'Alex S.', role: 'student', text: 'Does this mean job security is essentially zero in the Red World?', time: '10:05 AM' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, {
      id: Date.now(),
      author: role === 'student' ? 'You (Student)' : 'You (Teacher)',
      role: role,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
  }

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px' }}>Discussion Rooms</h3>
        </div>
        <div style={{ padding: '12px' }}>
          {rooms.map(room => (
            <div 
              key={room.id}
              onClick={() => setActiveRoom(room)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: activeRoom.id === room.id ? 'var(--glass-bg)' : 'transparent',
                borderLeft: activeRoom.id === room.id ? `3px solid ${room.color}` : '3px solid transparent'
              }}
            >
              <Hash size={16} color={room.color} />
              <span style={{ fontWeight: activeRoom.id === room.id ? '600' : '400' }}>{room.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chat-main">
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Hash size={24} color={activeRoom.color} />
            <h2>{activeRoom.name}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <Users size={16} /> 24 online
          </div>
        </div>
        
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', gap: '16px' }}>
              <div className="profile-pic" style={{ width: '36px', height: '36px', fontSize: '14px', flexShrink: 0, border: msg.role === 'teacher' ? '2px solid var(--accent)' : 'none' }}>
                {msg.author.charAt(0)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: msg.role === 'teacher' ? 'var(--accent)' : 'white' }}>{msg.author}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{msg.time}</span>
                </div>
                <div style={{ background: 'var(--glass-bg)', padding: '12px 16px', borderRadius: '0 12px 12px 12px', border: '1px solid var(--border)', lineHeight: '1.5' }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ padding: '20px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              placeholder={`Message #${activeRoom.id}...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={{ flex: 1, background: 'var(--panel-bg)', border: '1px solid var(--border)', borderRadius: '24px', padding: '12px 20px', color: 'white', outline: 'none' }}
            />
            <button className="btn btn-primary" style={{ borderRadius: '24px', padding: '12px 24px' }} onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
