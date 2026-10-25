import { useState, type FormEvent } from 'react'
import AppShell from '../components/AppShell'

export default function Alic3X() {
  const [accessCode, setAccessCode] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending || !message.trim() || !accessCode) return
    const prompt = message.trim()
    setPending(true)
    setError('')
    try {
      const response = await fetch('/api/alic3x', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessCode}` },
        body: JSON.stringify({ message: prompt }),
        signal: AbortSignal.timeout(30000),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Request failed.')
      if (typeof data.text !== 'string') throw new Error('Unexpected response. Please try again.')
      setMessages((previous) => [...previous, { role: 'You', text: prompt }, { role: 'Alic3X', text: data.text }])
      setMessage('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to reach Alic3X.')
    } finally {
      setPending(false)
    }
  }

  return (
    <AppShell title="Alic3X Assistant">
      <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Alic3X Assistant</h1>
      <p className="text-on-surface-variant mb-6">Plan music and audio workflows with AI Gateway. Each request is independent; chat history is not sent. No live tools are connected.</p>
      <div className="bg-surface-container ghost-border rounded-lg p-stack-md space-y-6">
        <div role="log" aria-label="Conversation" aria-live="polite" className="space-y-4">
          {messages.map((entry, index) => (
            <div key={index} className="text-on-surface whitespace-pre-wrap break-words">
              <strong>{entry.role}</strong><p>{entry.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-on-surface">Assistant access code
            <input type="password" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} required autoComplete="off" className="block w-full bg-background rounded p-3 mt-2" />
          </label>
          <p className="text-sm text-on-surface-variant">Your access code stays in memory only. Never enter a Gateway API key here.</p>
          <label className="block text-on-surface">Message
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={4000} rows={4} required disabled={pending} className="block w-full bg-background rounded p-3 mt-2" />
          </label>
          {error && <p role="alert" className="text-on-surface">{error}</p>}
          <button type="submit" disabled={pending || !message.trim() || !accessCode} className="bg-brand-coral text-white px-6 py-3 rounded disabled:opacity-50">{pending ? 'Thinking…' : 'Send to Alic3X'}</button>
        </form>
      </div>
    </AppShell>
  )
}
