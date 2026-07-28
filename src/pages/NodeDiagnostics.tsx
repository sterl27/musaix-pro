import AppShell from '../components/AppShell'

const diagnostics = [
  { node: 'NODE_A1', cpu: 12, mem: 34, temp: 42, status: 'OK', uptime: '14d 6h' },
  { node: 'NODE_B2', cpu: 45, mem: 61, temp: 58, status: 'OK', uptime: '14d 6h' },
  { node: 'NODE_C3', cpu: 78, mem: 72, temp: 71, status: 'WARN', uptime: '3d 2h' },
  { node: 'NODE_D4', cpu: 0, mem: 8, temp: 31, status: 'STANDBY', uptime: '14d 6h' },
]

const bar = (val: number) => {
  const color = val > 70 ? 'bg-error' : val > 50 ? 'bg-tertiary' : 'bg-brand-coral'
  return <div className="w-full bg-surface-container-high rounded-full h-1.5">
    <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${val}%` }} />
  </div>
}

export default function NodeDiagnostics() {
  return (
    <AppShell title="Node Diagnostics">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Node Diagnostics</h1>
        <p className="text-on-surface-variant font-body-lg">Real-time health monitoring for all infrastructure nodes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {diagnostics.map((d) => (
          <div key={d.node} className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono-data text-mono-data text-on-surface text-lg">{d.node}</span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                d.status === 'OK' ? 'bg-green-400/10 text-green-400' :
                d.status === 'WARN' ? 'bg-error-container text-error' :
                'bg-outline-variant/30 text-outline'
              }`}>{d.status}</span>
            </div>
            <div className="space-y-4">
              {[
                { label: 'CPU Usage', val: d.cpu },
                { label: 'Memory', val: d.mem },
                { label: 'Temperature', val: d.temp },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-on-surface-variant">{label}</span>
                    <span className="font-mono-data text-mono-data text-on-surface">{val}%</span>
                  </div>
                  {bar(val)}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between">
              <span className="text-xs text-outline">Uptime</span>
              <span className="font-mono-data text-mono-data text-on-surface">{d.uptime}</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
