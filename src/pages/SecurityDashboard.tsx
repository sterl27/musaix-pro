import AppShell from '../components/AppShell'
import { useNavigate } from 'react-router-dom'

const threats = [
  { time: '14:21:08', event: 'Suspicious login attempt blocked', severity: 'high', ip: '185.220.101.x' },
  { time: '13:55:33', event: 'API rate limit exceeded', severity: 'medium', ip: '10.0.0.55' },
  { time: '12:44:20', event: 'Port scan detected', severity: 'low', ip: '192.168.1.42' },
  { time: '11:30:14', event: 'Certificate renewal successful', severity: 'info', ip: 'internal' },
]

const sevColor = (s: string) =>
  s === 'high' ? 'text-error bg-error-container/40' :
  s === 'medium' ? 'text-tertiary bg-tertiary-container/40' :
  s === 'low' ? 'text-outline bg-surface-container-high' :
  'text-on-surface-variant bg-surface-container'

export default function SecurityDashboard() {
  const navigate = useNavigate()
  return (
    <AppShell title="Security">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Security Dashboard</h1>
        <p className="text-on-surface-variant font-body-lg">Monitor threats, access logs, and system integrity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
        {[
          { label: 'Threats Blocked', value: '3', icon: 'shield', status: 'warning' },
          { label: 'Active Sessions', value: '2', icon: 'verified_user', status: 'ok' },
          { label: 'Last Scan', value: '4m ago', icon: 'manage_search', status: 'ok' },
          { label: 'Uptime', value: '99.99%', icon: 'online_prediction', status: 'ok' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <span className={`material-symbols-outlined text-3xl ${s.status === 'warning' ? 'text-error' : 'accent-coral'}`}>{s.icon}</span>
            <p className="font-display-lg text-display-lg-mobile text-on-surface mt-2">{s.value}</p>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-surface-container ghost-border rounded-lg p-stack-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-label-caps text-label-caps text-outline">THREAT LOG</h3>
            <button className="text-brand-coral font-label-caps text-label-caps hover:opacity-80 transition-opacity" onClick={() => navigate('/security/audit')}>VIEW ALL</button>
          </div>
          <div className="space-y-3">
            {threats.map((t, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded bg-surface-container-high border border-outline-variant">
                <div className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${sevColor(t.severity)}`}>{t.severity}</div>
                <div className="flex-1">
                  <p className="text-on-surface text-sm">{t.event}</p>
                  <p className="font-mono-data text-mono-data text-outline-variant mt-1">IP: {t.ip}</p>
                </div>
                <span className="font-mono-data text-mono-data text-outline shrink-0">{t.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-gutter">
          <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <h3 className="font-label-caps text-label-caps text-outline mb-4">QUICK ACTIONS</h3>
            <div className="space-y-2">
              {[
                { label: 'Run Security Scan', icon: 'manage_search', path: '/diagnostics' },
                { label: 'View Audit Log', icon: 'list_alt', path: '/security/audit' },
                { label: 'Security Panel', icon: 'admin_panel_settings', path: '/security/panel' },
                { label: 'Reset Password', icon: 'lock_reset', path: '/reset-password' },
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
          <div className="bg-surface-container ghost-border rounded-lg p-stack-md text-center">
            <span className="material-symbols-outlined text-4xl text-green-400">verified_user</span>
            <p className="font-headline-md text-headline-md text-white mt-2">System Secure</p>
            <p className="text-on-surface-variant text-sm mt-1">All integrity checks passed.</p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
