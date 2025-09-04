import React, { useEffect, useState } from 'react'
import type { Note } from '../api'

type Props = {
  note?: Note
  onChange: (update: { title?: string; content?: string }) => void
  onToggleShare: () => void
  shareUrl?: string
}

export default function Editor({ note, onChange, onToggleShare, shareUrl }: Props) {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')

  useEffect(() => {
    setTitle(note?.title || '')
    setContent(note?.content || '')
  }, [note?.id])

  if (!note) return <div className="card">Select a note</div>

  return (
    <div className="card">
      <div className="header">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => { setTitle(e.target.value); onChange({ title: e.target.value }) }}
          style={{flex:1}}
        />
        <button onClick={onToggleShare}>{note.is_public ? 'Make Private' : 'Share Publicly'}</button>
      </div>
      {note.is_public && shareUrl && (
        <div style={{marginTop:8}}>
          Public URL: <a className="link" href={shareUrl} target="_blank" rel="noreferrer">{shareUrl}</a>
        </div>
      )}
      <div style={{marginTop:12}}>
        <textarea
          placeholder="Write here..."
          value={content}
          onChange={(e) => { setContent(e.target.value); onChange({ content: e.target.value }) }}
        />
      </div>
      <div className="footer">Changes auto-save.</div>
    </div>
  )
}
