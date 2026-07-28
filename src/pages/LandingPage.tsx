import TopNavBar from '../components/TopNavBar'
import { useNavigate } from 'react-router-dom'

const features = [
  { icon: 'spatial_audio', title: '3D Spatial Audio Mapping', desc: 'Render immersive acoustic environments with pixel-perfect spatial accuracy and real-time reflection modeling.' },
  { icon: 'neurology', title: 'AI Noise Profiling', desc: 'Intelligently isolate voices and eliminate environmental artifacts with our trained neural networks.' },
  { icon: 'wifi_tethering', title: 'Multi-Track Wireless Sync', desc: 'Synchronize up to four high-fidelity microphones with sub-millisecond precision. No cables. No compromises.' },
  { icon: 'content_cut', title: 'Instant-Edit Timeline', desc: 'Revolutionary simultaneous audio and video trimming compresses production cycles from hours to minutes.' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <TopNavBar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-margin-desktop text-center">
          <div className="absolute inset-0 z-0 hero-gradient" />
          <div className="relative z-10 max-w-4xl space-y-stack-md">
            <span className="font-label-caps text-label-caps accent-coral tracking-[0.2em] uppercase">Professional Audio Infrastructure</span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight tracking-tight text-white">
              Invisible Audio Infrastructure for the{' '}
              <span className="accent-coral">Modern Creator.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Experience the fusion of high-performance React-based software and wireless multi-track recording. Studio-quality sound, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-gutter pt-8">
              <button
                className="bg-brand-coral text-white font-label-caps text-label-caps px-10 py-4 rounded-sm font-bold hover:scale-105 transition-transform"
                onClick={() => navigate('/dashboard')}
              >
                Start Your Free Trial
              </button>
              <button
                className="border border-outline text-white font-label-caps text-label-caps px-10 py-4 rounded-sm hover:bg-white/5 transition-colors"
                onClick={() => navigate('/ecosystem')}
              >
                Explore Musaix Pro
              </button>
            </div>
          </div>
        </section>

        {/* Features Bento */}
        <section id="tech" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg gap-gutter">
            <div className="max-w-xl">
              <span className="font-label-caps text-label-caps accent-coral mb-2 block uppercase tracking-[0.2em]">High Performance</span>
              <h2 className="font-headline-md text-headline-md text-white">Precision Engineered Sound.</h2>
            </div>
            <p className="text-on-surface-variant max-w-md">Our proprietary engine delivers zero-latency monitoring and intelligent sonic enhancement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {features.map((f) => (
              <div key={f.title} className="bento-card rounded-lg p-stack-md flex flex-col gap-stack-sm">
                <span className="material-symbols-outlined accent-coral text-4xl">{f.icon}</span>
                <h3 className="font-headline-md text-headline-md text-white">{f.title}</h3>
                <p className="text-on-surface-variant">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mic grid */}
        <section id="workflow" className="py-stack-lg bg-surface-container-lowest">
          <div className="px-margin-desktop max-w-container-max mx-auto">
            <div className="mb-stack-lg text-center">
              <span className="font-label-caps text-label-caps accent-coral tracking-widest">Wireless Sync</span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mt-2">Four Mics. Zero Cables.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
              {['MIC_01', 'MIC_02', 'MIC_03', 'MIC_04'].map((mic) => (
                <div key={mic} className="h-32 bg-surface-container-low rounded border border-outline-variant flex flex-col items-center justify-center gap-2">
                  <span className="material-symbols-outlined accent-coral text-3xl">mic</span>
                  <span className="font-mono-data text-mono-data accent-coral">{mic}_READY</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-stack-md">
              <div className="bg-surface-container-high px-4 py-2 rounded-sm border border-outline-variant">
                <span className="font-label-caps text-label-caps text-on-surface">96KHZ / 24-BIT</span>
              </div>
              <div className="bg-surface-container-high px-4 py-2 rounded-sm border border-outline-variant">
                <span className="font-label-caps text-label-caps text-on-surface">&lt;1.2MS LATENCY</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="producer" className="py-stack-lg px-margin-desktop text-center">
          <div className="max-w-2xl mx-auto space-y-stack-md">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white">Ready to Produce?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Join thousands of professional creators building with Musaix Pro.</p>
            <button
              className="bg-brand-coral text-white font-label-caps text-label-caps px-12 py-4 rounded-sm font-bold hover:scale-105 transition-transform"
              onClick={() => navigate('/dashboard')}
            >
              Enter Dashboard
            </button>
          </div>
        </section>

        <footer className="border-t border-outline-variant px-margin-desktop py-stack-md text-center">
          <p className="text-on-surface-variant font-label-caps text-label-caps">&copy; 2026 MUSAIX PRO. ALL RIGHTS RESERVED.</p>
        </footer>
      </main>
    </div>
  )
}
