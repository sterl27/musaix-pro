import AppShell from '../components/AppShell'
import { useState } from 'react'

const tracks = [
  { name: 'Lead Vocal', icon: 'mic', active: true },
  { name: 'Guitar Stem', icon: 'music_note', active: true },
  { name: 'Bass Line', icon: 'equalizer', active: false },
  { name: 'Drums', icon: 'piano', active: true },
  { name: 'FX Bus', icon: 'blur_on', active: false },
]

export default function ProductionBoard() {
  const [playing, setPlaying] = useState(false)

  return (
    <AppShell title="Production Board">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Production Board</h1>
        <p className="text-on-surface-variant font-body-lg">Multi-track digital audio workstation interface.</p>
      </div>

      {/* Transport */}
      <div className="bg-surface-container ghost-border rounded-lg p-stack-md mb-gutter flex flex-col sm:flex-row items-center gap-stack-md justify-between">
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Skip back">
            <span className="material-symbols-outlined text-3xl">skip_previous</span>
          </button>
          <button
            className="w-14 h-14 rounded-full bg-brand-coral flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            <span className="material-symbols-outlined text-white text-3xl">
              {playing ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button className="text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Skip forward">
            <span className="material-symbols-outlined text-3xl">skip_next</span>
          </button>
          <button className="text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Record">
            <span className="material-symbols-outlined text-3xl text-error">radio_button_checked</span>
          </button>
        </div>
        <div className="font-mono-data text-mono-data text-on-surface text-2xl tracking-widest">
          00:02:47:14
        </div>
        <div className="flex items-center gap-4">
          <span className="font-label-caps text-label-caps text-on-surface-variant">BPM</span>
          <span className="font-mono-data text-mono-data text-on-surface text-xl">128</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant ml-4">KEY</span>
          <span className="font-mono-data text-mono-data text-on-surface text-xl">Am</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-surface-container ghost-border rounded-lg overflow-hidden mb-gutter">
        <div className="flex">
          {/* Track labels */}
          <div className="w-40 shrink-0 border-r border-outline-variant">
            <div className="h-10 border-b border-outline-variant bg-surface-container-high" />
            {tracks.map((t) => (
              <div key={t.name} className="h-16 border-b border-outline-variant px-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">{t.icon}</span>
                <span className="font-label-caps text-label-caps text-on-surface truncate">{t.name}</span>
              </div>
            ))}
          </div>
          {/* Track lanes */}
          <div className="flex-1 overflow-x-auto">
            <div className="h-10 border-b border-outline-variant bg-surface-container-high flex items-center px-4 gap-8">
              {Array.from({ length: 16 }, (_, i) => (
                <span key={i} className="font-mono-data text-mono-data text-outline text-xs shrink-0">{i + 1}</span>
              ))}
            </div>
            {tracks.map((t) => (
              <div key={t.name} className="h-16 border-b border-outline-variant flex items-center px-2 gap-1">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className={
                      t.active && (i % 3 !== 2)
                        ? 'h-10 rounded flex-1 bg-brand-coral/20 border border-brand-coral/40 hover:bg-brand-coral/30 cursor-pointer transition-colors'
                        : 'h-10 rounded flex-1 bg-surface-container-high border border-outline-variant/30'
                    }
                    title={`${t.name} — Bar ${i + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mixer */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter">
        {tracks.map((t) => (
          <div key={t.name} className="bg-surface-container ghost-border rounded-lg p-4 flex flex-col items-center gap-3">
            <span className="font-label-caps text-label-caps text-outline truncate w-full text-center">{t.name}</span>
            <div className="h-32 w-3 bg-surface-container-highest rounded-full relative">
              <div
                className="absolute bottom-0 left-0 right-0 bg-brand-coral rounded-full"
                style={{ height: t.active ? '75%' : '40%' }}
              />
            </div>
            <span className="font-mono-data text-mono-data text-on-surface">{t.active ? '-3dB' : '-18dB'}</span>
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                t.active ? 'bg-brand-coral text-white' : 'bg-surface-container-high text-outline'
              }`}
              aria-label="Toggle track"
            >
              <span className="material-symbols-outlined text-sm">power_settings_new</span>
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
