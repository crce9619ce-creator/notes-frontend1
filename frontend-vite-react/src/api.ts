const BASE = import.meta.env.VITE_API_URL || ""

export type Note = {
  id: number
  title: string
  content: string
  is_public: boolean
  share_id?: string | null
}

export async function listNotes(): Promise<Note[]> {
  const r = await fetch(`${BASE}/notes`)
  if (!r.ok) throw new Error('Failed to list notes')
  return r.json()
}

export async function createNote(title = "Untitled", content = ""): Promise<Note> {
  const r = await fetch(`${BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
  if (!r.ok) throw new Error('Failed to create note')
  return r.json()
}

export async function updateNote(id: number, data: Partial<Pick<Note, 'title' | 'content'>>): Promise<Note> {
  const r = await fetch(`${BASE}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Failed to update note')
  return r.json()
}

export async function deleteNote(id: number): Promise<void> {
  const r = await fetch(`${BASE}/notes/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Failed to delete note')
}

export async function toggleShare(id: number): Promise<{ id: number; is_public: boolean; share_url: string }>{ 
  const r = await fetch(`${BASE}/notes/${id}/share`, { method: 'POST' })
  if (!r.ok) throw new Error('Failed to toggle share')
  return r.json()
}

export async function fetchPublic(shareId: string): Promise<Note> {
  const r = await fetch(`${BASE}/public/${shareId}`)
  if (!r.ok) throw new Error('Public note not found')
  return r.json()
}
