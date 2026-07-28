import AppShell from '../components/AppShell'

const releases = [
  {
    version: 'v4.2.0',
    date: '2026-07-20',
    type: 'major',
    title: 'AI Engine Overhaul',
    notes: ['Upgraded noise profiler to neural model v4.2', 'Reduced AI processing latency by 30%', 'Added multi-language vocal isolation', 'Improved spatial rendering accuracy'],
  },
  {
    version: 'v4.1.5',
    date: '2026-06-14',
    type: 'patch',
    title: 'Stability & Security',
    notes: ['Fixed MIC sync drift on 4-channel sessions', 'Patched CVE-2026-4421 in auth module', 'Improved cloud relay resilience'],
  },
  {
    version: 'v4.1.0',
    date: '2026-05-01',
    type: 'minor',
    title: 'Production Board v2',
    notes: ['New multi-track timeline interface', 'Added real-time waveform visualizer', 'One-click session export to WAV/FLAC'],
  },
]

const typeColor = (t: string) =>
  t === 'major' ? 'bg-brand-coral/20 text-brand-coral' :
  t === 'minor' ? 'bg-tertiary/20 text-tertiary' :
  'bg-outline-variant/30 text-outline'

export default function LatestReleases() {
  return (
    <AppShell title="Releases">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Latest Releases</h1>
        <p className="text-on-surface-variant font-body-lg">Changelog and version history for Musaix Pro.</p>
      </div>

      <div className="space-y-gutter max-w-3xl">
        {releases.map((r) => (
          <div key={r.version} className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono-data text-mono-data text-on-surface text-lg">{r.version}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${typeColor(r.type)}`}>{r.type}</span>
              </div>
              <span className="font-mono-data text-mono-data text-outline">{r.date}</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-white mb-4">{r.title}</h3>
            <ul className="space-y-2">
              {r.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-brand-coral text-base mt-0.5">arrow_right</span>
                  <span className="text-on-surface-variant text-sm">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
