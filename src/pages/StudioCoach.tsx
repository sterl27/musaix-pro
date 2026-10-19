import { useEffect, useRef, useState } from 'react'
import AppShell from '../components/AppShell'

type Role = 'user' | 'assistant'
interface Message { id: string; role: Role; content: string }

const EXPERTISE_AREAS = [
  { id: 1, title: 'Core DAW Mastery', desc: 'Navigation, Shortcuts & Workflow' },
  { id: 2, title: 'Live Performance', desc: 'Session View & MIDI Mapping' },
  { id: 3, title: 'Sound Design', desc: 'Wavetable, Operator & Analog' },
  { id: 4, title: 'MPE & Expression', desc: 'Push 3 & Controller Integration' },
  { id: 5, title: 'Mixing & Mastering', desc: 'EQ Eight, Comp & Saturator' },
  { id: 6, title: 'Arrangement View', desc: 'Automation & Composition' },
  { id: 7, title: 'Max for Live', desc: 'Devices, Racks & Custom Tools' },
  { id: 8, title: 'MIDI Effects', desc: 'Arpeggiator, Chord & Scale' },
  { id: 9, title: 'Network Sync', desc: 'Ableton Link & Collaboration' },
  { id: 10, title: 'Hardware Integration', desc: 'External Instruments & CV' },
  { id: 11, title: 'Suno Integration', desc: 'Stems export → Ableton import' },
]

const MODES = [
  { id: 'immediate', label: 'Immediate Help', icon: 'bolt' },
  { id: 'deep-dive', label: 'Deep Dive', icon: 'search' },
  { id: 'workshop', label: 'Workshop', icon: 'build' },
  { id: 'critique', label: 'Critique', icon: 'chat' },
] as const

type Mode = (typeof MODES)[number]['id']

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  content:
    'Ableton Live 12 Coach is online. Ask me about arrangement, mixing, Max for Live, Push, routing, performance setup, or Suno stem import workflow.',
}

function Waveform({ active }: { active: boolean }) {
  const [heights, setHeights] = useState<number[]>(Array(38).fill(4))

  useEffect(() => {
    if (!active) {
      setHeights(Array(38).fill(4))
      return
    }
    let frame = 0
    const id = setInterval(() => {
      frame += 0.06
      setHeights(
        Array.from({ length: 38 }, (_, i) =>
          4 + ((Math.sin(frame + i * 0.45) + 1) / 2) * 22 + Math.random() * 6,
        ),
      )
    }, 60)
    return () => clearInterval(id)
  }, [active])

  return (
    <div className="flex items-center gap-0.5 h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all duration-75"
          style={{
            height: `${h}px`,
            backgroundColor: active ? '#F59E0B' : '#444748',
          }}
        />
      ))}
    </div>
  )
}

export default function StudioCoach() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<Mode>('immediate')
  const [isLoading, setIsLoading] = useState(false)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text: string) => {
    const msg = text.trim()
    if (!msg || isLoading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg }
    const replyId = `${Date.now()}-reply`
    setMessages(m => [...m, userMsg, { id: replyId, role: 'assistant', content: '' }])
    setInput('')
    setIsLoading(true)

    try {
      const resp = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `[mode:${mode}] ${msg}`, history: messages }),
      })
      if (!resp.ok || !resp.body) throw new Error('offline')

      const reader = resp.body.getReader()
      const decoder = new TextDecoder()

      outer: while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value, { stream: true }).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6)
          if (payload === '[DONE]') break outer
          try {
            const token = (
              JSON.parse(payload) as {
                choices: Array<{ delta: { content?: string } }>
              }
            ).choices[0]?.delta?.content
            if (token) {
              setMessages(m =>
                m.map(m2 => (m2.id === replyId ? { ...m2, content: m2.content + token } : m2)),
              )
            }
          } catch { /* skip malformed chunk */ }
        }
      }
    } catch {
      setMessages(m =>
        m.map(m2 =>
          m2.id === replyId
            ? {
                ...m2,
                content:
                  'Studio Coach is offline. Connect your AI key in Settings → Integrations to enable real-time coaching.',
              }
            : m2,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const quickSend = (area: (typeof EXPERTISE_AREAS)[number]) => {
    void send(`Help me with ${area.title}: ${area.desc}`)
  }

  return (
    <AppShell title="Studio Coach">
      <div
        className="grid gap-gutter"
        style={{
          gridTemplateColumns: '220px 1fr 200px',
          height: 'calc(100vh - 10rem)',
        }}
      >
        {/* Left: expertise areas */}
        <aside className="bg-surface-container ghost-border rounded-lg flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-outline-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-neon-amber text-[18px]">psychology</span>
            <span className="font-label-caps text-label-caps text-on-surface">CORE EXPERTISE</span>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {EXPERTISE_AREAS.map(area => (
              <button
                key={area.id}
                onClick={() => quickSend(area)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-container-high transition-colors group"
              >
                <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-neon-amber transition-colors">
                  music_note
                </span>
                <div className="min-w-0">
                  <div className="font-label-caps text-label-caps text-on-surface group-hover:text-neon-amber truncate transition-colors">
                    {area.title}
                  </div>
                  <div className="text-xs text-on-surface-variant truncate mt-0.5">{area.desc}</div>
                </div>
                <span className="material-symbols-outlined text-[14px] text-outline ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Center: chat */}
        <section className="flex flex-col bg-surface-container ghost-border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-neon-amber">radio</span>
              <span className="font-label-caps text-label-caps text-on-surface">STUDIO COACH</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${isLoading ? 'bg-neon-amber animate-pulse' : 'bg-electric-violet'}`}
                />
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">
                  {isLoading ? 'STREAMING' : 'READY'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${isVoiceActive ? 'bg-red-400 animate-pulse' : 'bg-outline'}`}
                />
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">
                  VOICE
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-neon-amber/15 border border-neon-amber/25 text-on-surface ml-8'
                      : 'bg-surface-container-high border border-outline-variant text-on-surface-variant'
                  }`}
                >
                  {msg.content === '' && msg.role === 'assistant' ? (
                    <div className="flex gap-1.5 items-center h-4">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-neon-amber animate-pulse"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Visualizer + input */}
          <div className="border-t border-outline-variant px-4 py-3 space-y-3">
            <div className="flex items-center justify-center">
              <Waveform active={isVoiceActive || isLoading} />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsVoiceActive(v => !v)}
                className={`p-2.5 rounded border transition-all ${
                  isVoiceActive
                    ? 'bg-red-500/15 border-red-500/40 text-red-400'
                    : 'border-outline-variant text-on-surface-variant hover:border-outline'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isVoiceActive ? 'mic' : 'mic_off'}
                </span>
              </button>
              <input
                type="text"
                className="flex-1 bg-surface-container-highest border border-outline-variant rounded px-3 py-2.5 text-sm text-on-surface placeholder-outline focus:outline-none focus:border-neon-amber transition-colors"
                placeholder="Ask your coach anything about Live 12…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') void send(input) }}
              />
              <button
                disabled={isLoading || !input.trim()}
                onClick={() => void send(input)}
                className="p-2.5 rounded border border-neon-amber/50 text-neon-amber hover:bg-neon-amber/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right: modes + status */}
        <aside className="flex flex-col gap-4 overflow-y-auto">
          {/* Modes */}
          <div className="bg-surface-container ghost-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[16px] text-outline">layers</span>
              <span className="font-label-caps text-label-caps text-outline">MODES</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded border text-center transition-all ${
                    mode === m.id
                      ? 'border-neon-amber bg-neon-amber/10 text-neon-amber'
                      : 'border-outline-variant text-on-surface-variant hover:border-outline'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{m.icon}</span>
                  <span className="font-label-caps text-label-caps text-[9px] leading-tight">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Audio engine */}
          <div className="bg-surface-container ghost-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[16px] text-outline">volume_up</span>
              <span className="font-label-caps text-label-caps text-outline">AUDIO ENGINE</span>
            </div>
            <div className="space-y-2">
              {[
                ['Sample Rate', '48000 Hz'],
                ['Buffer Size', '128 samples'],
                ['Latency', '3.2 ms'],
                ['OSC In', 'UDP 11000'],
                ['OSC Out', 'UDP 11001'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-xs text-outline">{k}</span>
                  <span className="font-mono-data text-mono-data text-on-surface">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transport */}
          <div className="bg-surface-container ghost-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[16px] text-outline">play_circle</span>
              <span className="font-label-caps text-label-caps text-outline">TRANSPORT</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => void send('How should I prepare playback for this session?')}
                className="flex-1 flex items-center justify-center py-2.5 rounded border border-outline-variant text-on-surface-variant hover:border-neon-amber hover:text-neon-amber transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              </button>
              <button
                onClick={() => void send('How should I safely stop and review this session?')}
                className="flex-1 flex items-center justify-center py-2.5 rounded border border-outline-variant text-on-surface-variant hover:border-neon-amber hover:text-neon-amber transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">stop</span>
              </button>
            </div>
          </div>

          {/* Build plan status */}
          <div className="bg-surface-container ghost-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[16px] text-outline">checklist</span>
              <span className="font-label-caps text-label-caps text-outline">BUILD STATUS</span>
            </div>
            <div className="space-y-2">
              {[
                ['1. OSC Bridge', 'Pending'],
                ['2. State Read', 'Pending'],
                ['3. Transport', 'Pending'],
                ['4. Audio Analysis', 'UI Ready'],
                ['5. Suggestions', 'UI Ready'],
                ['6. OSC Actions', 'Pending'],
              ].map(([step, status]) => (
                <div key={step} className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">{step}</span>
                  <span
                    className={`font-mono-data text-[10px] px-1.5 py-0.5 rounded ${
                      status === 'UI Ready'
                        ? 'bg-neon-amber/15 text-neon-amber'
                        : 'bg-surface-container-high text-outline'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  )
}
