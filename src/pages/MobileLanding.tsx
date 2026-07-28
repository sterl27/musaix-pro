import { useNavigate } from 'react-router-dom'

export default function MobileLanding() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col max-w-sm mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-headline-md font-bold text-on-surface">Musaix Pro</span>
        </div>
        <button className="text-on-surface-variant" aria-label="Menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-stack-lg">
          <div className="w-24 h-24 rounded-full bg-brand-coral/10 border border-brand-coral/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-brand-coral text-5xl">spatial_audio</span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile text-white mb-4">
            Studio Sound.<br />
            <span className="accent-coral">Anywhere.</span>
          </h1>
          <p className="text-on-surface-variant">Professional audio infrastructure in your pocket.</p>
        </div>

        <div className="space-y-3 mb-stack-lg">
          {[
            { icon: 'mic', label: '4-Channel Wireless Sync' },
            { icon: 'spatial_audio', label: '3D Spatial Audio' },
            { icon: 'neurology', label: 'AI Noise Profiling' },
            { icon: 'cloud_upload', label: 'Instant Cloud Export' },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-4 p-4 bg-surface-container ghost-border rounded-lg">
              <span className="material-symbols-outlined accent-coral">{f.icon}</span>
              <span className="font-label-caps text-label-caps text-on-surface">{f.label}</span>
              <span className="material-symbols-outlined text-outline ml-auto">arrow_forward_ios</span>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-brand-coral text-white font-label-caps text-label-caps py-4 rounded-sm font-bold hover:opacity-90 transition-opacity mb-3"
          onClick={() => navigate('/dashboard')}
        >
          Open Dashboard
        </button>
        <button
          className="w-full ghost-border bg-surface-container font-label-caps text-label-caps text-on-surface-variant py-4 rounded-sm hover:bg-surface-container-high transition-colors"
          onClick={() => navigate('/')}
        >
          Learn More
        </button>
      </div>

      <p className="text-center font-label-caps text-label-caps text-outline mt-8">&copy; 2026 MUSAIX PRO</p>
    </div>
  )
}
