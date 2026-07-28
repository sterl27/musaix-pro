import AppShell from '../components/AppShell'

const nodes = [
  { id: 'NODE_A1', status: 'ACTIVE', latency: '0.8ms', type: 'Primary Input', quality: '96kHz / 24-bit' },
  { id: 'NODE_B2', status: 'ACTIVE', latency: '1.0ms', type: 'Spatial Engine', quality: '96kHz / 24-bit' },
  { id: 'NODE_C3', status: 'SYNC', latency: '1.1ms', type: 'AI Processor', quality: '48kHz / 32-bit' },
  { id: 'NODE_D4', status: 'STANDBY', latency: '—', type: 'Cloud Relay', quality: 'Streaming' },
]

export default function AudioEcosystem() {
  return (
    <AppShell title="Audio Ecosystem">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Audio Ecosystem</h1>
        <p className="text-on-surface-variant font-body-lg">Manage and monitor all nodes in your Musaix audio network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
        {nodes.map((node) => (
          <div key={node.id} className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-data text-mono-data text-on-surface">{node.id}</span>
              <span className={
                node.status === 'ACTIVE' ? 'text-[10px] font-bold px-2 py-1 rounded-full bg-brand-coral/20 text-brand-coral' :
                node.status === 'SYNC' ? 'text-[10px] font-bold px-2 py-1 rounded-full bg-tertiary/20 text-tertiary' :
                'text-[10px] font-bold px-2 py-1 rounded-full bg-outline-variant/30 text-outline'
              }>
                {node.status}
              </span>
            </div>
            <p className="text-on-surface-variant text-sm mb-1">{node.type}</p>
            <p className="font-mono-data text-mono-data text-on-surface">{node.quality}</p>
            <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between">
              <span className="text-xs text-outline">Latency</span>
              <span className="font-mono-data text-mono-data accent-coral">{node.latency}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
          <h3 className="font-label-caps text-label-caps text-outline mb-6">SPATIAL AUDIO MAP</h3>
          <div className="h-64 bg-brand-ink rounded border border-outline-variant flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 hero-gradient opacity-50" />
            <div className="relative z-10 text-center">
              <span className="material-symbols-outlined accent-coral text-6xl">spatial_audio</span>
              <p className="font-mono-data text-mono-data text-on-surface-variant mt-2">360° Spatial Engine Active</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
                <span className="font-label-caps text-label-caps text-brand-coral">RENDERING</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
          <h3 className="font-label-caps text-label-caps text-outline mb-6">AI NOISE PROFILER</h3>
          <div className="space-y-4">
            {['Vocal Isolation', 'Room Noise', 'Wind Artifacts', 'Electronic Hum'].map((label, i) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-on-surface-variant">{label}</span>
                  <span className="font-mono-data text-mono-data text-on-surface">{[94, 8, 2, 1][i]}%</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-brand-coral"
                    style={{ width: `${[94, 8, 2, 1][i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
            <span className="font-mono-data text-mono-data text-on-surface">Active Engine v4.2</span>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
