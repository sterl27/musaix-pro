import AppShell from '../components/AppShell'
import { useNavigate } from 'react-router-dom'

const stats = [
  { label: 'Active Sessions', value: '4', icon: 'sensors', delta: '+2 today' },
  { label: 'Latency', value: '0.8ms', icon: 'speed', delta: 'Optimal' },
  { label: 'Audio Quality', value: '96kHz', icon: 'graphic_eq', delta: '24-bit' },
  { label: 'Cloud Sync', value: '100%', icon: 'cloud_done', delta: 'Live' },
]

const recentActivity = [
  { time: '14:22:01', event: 'MIC_01 connected — Studio A', type: 'success' },
  { time: '14:21:44', event: 'Spatial map recalibrated', type: 'info' },
  { time: '14:19:33', event: 'AI noise profile updated — Room 3', type: 'info' },
  { time: '14:17:10', event: 'Session exported: session_2026_07_27.wav', type: 'success' },
  { time: '14:15:05', event: 'Security scan completed — 0 threats', type: 'success' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <AppShell title="Dashboard">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Dashboard</h1>
        <p className="text-on-surface-variant font-body-lg">Real-time overview of your Musaix Pro audio infrastructure.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <div className="flex items-start justify-between mb-4">
              <span className="material-symbols-outlined accent-coral text-3xl">{s.icon}</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">{s.delta}</span>
            </div>
            <p className="font-display-lg text-display-lg-mobile text-on-surface">{s.value}</p>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Activity */}
        <div className="lg:col-span-2 bg-surface-container ghost-border rounded-lg p-stack-md">
          <h3 className="font-label-caps text-label-caps text-outline mb-6">RECENT ACTIVITY</h3>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-outline-variant last:border-0">
                <span className={
                  a.type === 'success' ? 'w-2 h-2 rounded-full bg-brand-coral mt-2 shrink-0' :
                  'w-2 h-2 rounded-full bg-outline mt-2 shrink-0'
                } />
                <div className="flex-1">
                  <p className="text-on-surface text-sm">{a.event}</p>
                  <p className="font-mono-data text-mono-data text-outline-variant mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Nav */}
        <div className="space-y-gutter">
          <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <h3 className="font-label-caps text-label-caps text-outline mb-4">QUICK ACCESS</h3>
            <div className="space-y-2">
              {[
                { label: 'Audio Ecosystem', path: '/ecosystem', icon: 'settings_input_component' },
                { label: 'Production Board', path: '/production', icon: 'graphic_eq' },
                { label: 'Music Discovery', path: '/discover', icon: 'music_note' },
                { label: 'Security', path: '/security', icon: 'security' },
                { label: 'Node Diagnostics', path: '/diagnostics', icon: 'developer_board' },
              ].map((item) => (
                <button
                  key={item.path}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-all text-left"
                  onClick={() => navigate(item.path)}
                >
                  <span className="material-symbols-outlined text-sm">{item.icon}</span>
                  <span className="font-label-caps text-label-caps">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-tertiary-container ghost-border rounded-lg p-stack-md active-glow">
            <span className="material-symbols-outlined accent-coral text-2xl">rocket_launch</span>
            <h3 className="font-headline-md text-headline-md text-white mt-2">Deploy Session</h3>
            <p className="text-on-surface-variant text-sm mt-1">Push your session to the cloud production environment.</p>
            <button
              className="mt-4 bg-brand-coral text-white font-label-caps text-label-caps px-6 py-2 rounded-sm w-full hover:opacity-90 transition-opacity"
              onClick={() => navigate('/deployment')}
            >
              Deploy Now
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
