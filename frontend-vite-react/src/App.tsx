import React, { useEffect, useMemo, useState } from 'react'
import { listNotes, createNote, deleteNote, updateNote, toggleShare, type Note } from './api'
import NoteList from './components/NoteList'
import Editor from './components/Editor'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedId, setSelectedId] = useState<number | undefined>()
  const [shareUrl, setShareUrl] = useState<string | undefined>()

  async function refresh() {
    const ns = await listNotes()
    setNotes(ns)
    if (ns.length && !selectedId) setSelectedId(ns[0].id)
  }

  useEffect(() => { refresh() }, [])

  const selected = useMemo(() => notes.find(n => n.id === selectedId), [notes, selectedId])

  async function onCreate() {
    const n = await createNote("Untitled", "")
    setNotes([n, ...notes])
    setSelectedId(n.id)
  }

  async function onDelete(id: number) {
    await deleteNote(id)
    setNotes(notes.filter(n => n.id !== id))
    if (selectedId === id) setSelectedId(undefined)
  }

  async function onChange(update: { title?: string; content?: string }) {
    if (!selected) return
    const updated = await updateNote(selected.id, update)
    setNotes(notes.map(n => n.id === updated.id ? updated : n))
  }

  async function onToggleShare() {
    if (!selected) return
    const res = await toggleShare(selected.id)
    setNotes(notes.map(n => n.id === res.id ? { ...n, is_public: res.is_public, share_id: res.is_public ? (n.share_id || 'new') : null } : n))
    // Build public URL for frontend: map API /public/{id} -> app route /p/{id}
    const url = new URL(res.share_url, window.location.origin)
    const shareId = url.pathname.split('/').pop()
    if (res.is_public && shareId) setShareUrl(`${window.location.origin}/p/${shareId}`)
    else setShareUrl(undefined)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>📝 Notes</h1>
      </div>

      <div className="layout" style={{marginTop:12}}>
        <NoteList
          notes={notes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onDelete={onDelete}
          onCreate={onCreate}
        />
        <Editor note={selected} onChange={onChange} onToggleShare={onToggleShare} shareUrl={shareUrl} />
      </div>
    </div>
  )
}
