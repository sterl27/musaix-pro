import AppShell from '../components/AppShell'
import { useState } from 'react'

const controls = [
  { label: 'Firewall', desc: 'Block unauthorized inbound connections', enabled: true },
  { label: 'DDoS Protection', desc: 'Auto-throttle suspicious traffic patterns', enabled: true },
  { label: 'Zero-Trust Mode', desc: 'Require re-auth for every API call', enabled: false },
  { label: 'Geo-Blocking', desc: 'Restrict access from high-risk regions', enabled: false },
  { label: 'Audit Logging', desc: 'Write all events to immutable log', enabled: true },
  { label: 'Auto-Lockout', desc: 'Lock account after 5 failed attempts', enabled: true },
]

export default function SecurityPanel() {
  const [states, setStates] = useState(controls.map((c) => c.enabled))

  return (
    <AppShell title="Security Panel">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Security Panel</h1>
        <p className="text-on-surface-variant font-body-lg">Configure your system-level security posture and access controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {controls.map((ctrl, i) => (
          <div key={ctrl.label} className="bg-surface-container ghost-border rounded-lg p-stack-md flex items-center justify-between">
            <div>
              <p className="font-medium text-on-surface">{ctrl.label}</p>
              <p className="text-sm text-on-surface-variant mt-1">{ctrl.desc}</p>
            </div>
            <button
              role="switch"
              aria-checked={states[i]}
              onClick={() => setStates((prev) => prev.map((v, j) => j === i ? !v : v))}
              className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ml-4 ${states[i] ? 'bg-brand-coral' : 'bg-surface-variant'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-brand-ink transition-transform ${states[i] ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
