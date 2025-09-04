import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchPublic, type Note } from '../api'

export default function PublicNote() {
  const { shareId } = useParams()
  const [note, setNote] = useState<Note | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shareId) return
    fetchPublic(shareId).then(setNote).catch(err => setError(err.message))
  }, [shareId])

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>{note?.title || (error ? 'Not found' : 'Loading...')}</h2>
          <Link className="link" to="/">Back to app</Link>
        </div>
        {error && <div>{error}</div>}
        {!error && <pre style={{whiteSpace:'pre-wrap'}}>{note?.content}</pre>}
      </div>
    </div>
  )
}
