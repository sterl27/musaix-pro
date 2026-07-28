import AppShell from '../components/AppShell'

const logs = [
  { id: 'EVT-0091', time: '2026-07-27 14:21:08', user: 'system', action: 'BLOCK_LOGIN', resource: 'auth.musaix.pro', result: 'BLOCKED' },
  { id: 'EVT-0090', time: '2026-07-27 13:55:33', user: 'api-gateway', action: 'RATE_LIMIT', resource: '/api/v2/nodes', result: 'THROTTLED' },
  { id: 'EVT-0089', time: '2026-07-27 12:44:20', user: 'firewall', action: 'PORT_SCAN', resource: '192.168.1.42', result: 'BLOCKED' },
  { id: 'EVT-0088', time: '2026-07-27 11:30:14', user: 'cert-manager', action: 'CERT_RENEW', resource: '*.musaix.pro', result: 'SUCCESS' },
  { id: 'EVT-0087', time: '2026-07-27 10:12:05', user: 'a.mercer', action: 'LOGIN', resource: 'dashboard', result: 'SUCCESS' },
  { id: 'EVT-0086', time: '2026-07-27 09:44:18', user: 'a.mercer', action: 'API_KEY_VIEW', resource: 'prd_key', result: 'AUDITED' },
]

const resultColor = (r: string) =>
  r === 'BLOCKED' ? 'text-error' :
  r === 'THROTTLED' ? 'text-tertiary' :
  r === 'SUCCESS' ? 'text-green-400' :
  'text-on-surface-variant'

export default function SecurityAuditLog() {
  return (
    <AppShell title="Audit Log">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Security Audit Log</h1>
        <p className="text-on-surface-variant font-body-lg">Full immutable record of all security events and access activity.</p>
      </div>

      <div className="bg-surface-container ghost-border rounded-lg overflow-hidden">
        <div className="p-stack-md border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-label-caps text-label-caps text-outline">EVENT LOG — LAST 24H</h3>
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            <span className="font-label-caps text-label-caps">Export CSV</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container-high border-b border-outline-variant">
              <tr>
                {['Event ID', 'Timestamp', 'User', 'Action', 'Resource', 'Result'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left font-label-caps text-label-caps text-outline">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                  <td className="px-4 py-3 font-mono-data text-mono-data text-on-surface-variant">{log.id}</td>
                  <td className="px-4 py-3 font-mono-data text-mono-data text-outline">{log.time}</td>
                  <td className="px-4 py-3 text-sm text-on-surface">{log.user}</td>
                  <td className="px-4 py-3 font-mono-data text-mono-data text-on-surface">{log.action}</td>
                  <td className="px-4 py-3 text-sm text-on-surface-variant">{log.resource}</td>
                  <td className={`px-4 py-3 font-mono-data text-mono-data font-bold ${resultColor(log.result)}`}>{log.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
