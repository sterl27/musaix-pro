import AppShell from '../components/AppShell'

const notifications = [
  { type: 'alert', title: 'Security Event', body: 'Suspicious login attempt blocked from 185.220.101.x', time: '2 min ago', read: false },
  { type: 'info', title: 'Node Connected', body: 'MIC_01 successfully paired to Studio A session', time: '8 min ago', read: false },
  { type: 'success', title: 'Deploy Complete', body: 'Session session_2026_07_27.wav deployed to cloud', time: '23 min ago', read: true },
  { type: 'info', title: 'AI Engine Update', body: 'Noise profiler updated to model v4.2', time: '1h ago', read: true },
  { type: 'warning', title: 'Latency Spike', body: 'NODE_C3 reported 3.1ms latency — above threshold', time: '2h ago', read: true },
]

const typeIcon = (t: string) =>
  t === 'alert' ? 'error' :
  t === 'warning' ? 'warning' :
  t === 'success' ? 'check_circle' :
  'info'

const typeColor = (t: string) =>
  t === 'alert' ? 'text-error' :
  t === 'warning' ? 'text-tertiary' :
  t === 'success' ? 'text-green-400' :
  'text-on-surface-variant'

export default function SystemNotifications() {
  return (
    <AppShell title="Notifications">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Notifications</h1>
          <p className="text-on-surface-variant font-body-lg">System alerts and activity updates.</p>
        </div>
        <button className="font-label-caps text-label-caps text-brand-coral hover:opacity-80 transition-opacity">Mark all read</button>
      </div>

      <div className="space-y-3 max-w-3xl">
        {notifications.map((n, i) => (
          <div key={i} className={`flex items-start gap-4 p-stack-md rounded-lg border transition-colors ${n.read ? 'bg-surface-container border-outline-variant' : 'bg-surface-container-high border-brand-coral/30'}`}>
            <span className={`material-symbols-outlined text-2xl shrink-0 ${typeColor(n.type)}`}>{typeIcon(n.type)}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={`font-medium ${n.read ? 'text-on-surface-variant' : 'text-on-surface'}`}>{n.title}</p>
                <span className="font-label-caps text-label-caps text-outline">{n.time}</span>
              </div>
              <p className="text-sm text-on-surface-variant mt-1">{n.body}</p>
            </div>
            {!n.read && <span className="w-2 h-2 rounded-full bg-brand-coral shrink-0 mt-1" />}
          </div>
        ))}
      </div>
    </AppShell>
  )
}
