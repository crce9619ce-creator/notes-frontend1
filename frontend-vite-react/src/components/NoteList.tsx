import React from 'react'
import type { Note } from '../api'

type Props = {
  notes: Note[]
  selectedId?: number
  onSelect: (id: number) => void
  onDelete: (id: number) => void
  onCreate: () => void
}

export default function NoteList({ notes, selectedId, onSelect, onDelete, onCreate }: Props) {
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <h2>Notes</h2>
        <button onClick={onCreate}>+ New</button>
      </div>
      <div className="note-list">
        {notes.map(n => (
          <div key={n.id} className="note-item">
            <button className="note-title" onClick={() => onSelect(n.id)} style={{flex:1, textAlign:'left'}}>
              {n.title || 'Untitled'}
            </button>
            {n.is_public && <span className="badge">Public</span>}
            <div className="actions">
              <button onClick={() => onDelete(n.id)}>Delete</button>
            </div>
          </div>
        ))}
        {notes.length === 0 && <div>No notes yet. Create one!</div>}
      </div>
    </div>
  )
}
