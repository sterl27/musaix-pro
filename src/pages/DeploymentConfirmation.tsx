import { useNavigate } from 'react-router-dom'

const steps = [
  { label: 'Pre-flight check', status: 'done' },
  { label: 'Packaging session assets', status: 'done' },
  { label: 'Uploading to cloud', status: 'done' },
  { label: 'Verifying integrity', status: 'done' },
  { label: 'Deployment complete', status: 'done' },
]

export default function DeploymentConfirmation() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full bg-brand-coral/10 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-brand-coral/10 border-2 border-brand-coral flex items-center justify-center">
            <span className="material-symbols-outlined text-brand-coral text-5xl">rocket_launch</span>
          </div>
        </div>

        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-2">Deployment Successful</h1>
        <p className="text-on-surface-variant font-body-lg mb-stack-lg">Your session has been deployed to the Musaix Pro cloud infrastructure.</p>

        <div className="bg-surface-container ghost-border rounded-lg p-stack-md text-left mb-stack-lg">
          <h3 className="font-label-caps text-label-caps text-outline mb-4">DEPLOYMENT STEPS</h3>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
                <span className="text-sm text-on-surface">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-ink ghost-border rounded-lg p-stack-md text-left mb-stack-lg">
          <div className="flex justify-between">
            <span className="font-label-caps text-label-caps text-outline">DEPLOY ID</span>
            <span className="font-mono-data text-mono-data accent-coral">dpl_7a2f9x8q</span>
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-label-caps text-label-caps text-outline">TIMESTAMP</span>
            <span className="font-mono-data text-mono-data text-on-surface">2026-07-27 14:22:01 UTC</span>
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-label-caps text-label-caps text-outline">ENVIRONMENT</span>
            <span className="font-mono-data text-mono-data text-on-surface">PRODUCTION</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 bg-brand-coral text-white font-label-caps text-label-caps py-3 rounded-sm hover:opacity-90 transition-opacity"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
          <button
            className="flex-1 ghost-border bg-surface-container font-label-caps text-label-caps text-on-surface-variant py-3 rounded-sm hover:bg-surface-container-high transition-colors"
            onClick={() => navigate('/production')}
          >
            New Session
          </button>
        </div>
      </div>
    </div>
  )
}
