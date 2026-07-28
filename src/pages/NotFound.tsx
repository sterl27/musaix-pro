import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center px-margin-desktop">
      <div className="max-w-xl text-center space-y-6">
        <span className="font-label-caps text-label-caps accent-coral tracking-[0.2em] uppercase">404</span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white">
          Page not found.
        </h1>
        <p className="text-on-surface-variant font-body-lg">
          The route you opened doesn’t exist yet. Head back to the landing page or return to the dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-gutter pt-4">
          <button
            className="bg-brand-coral text-white font-label-caps text-label-caps px-10 py-4 rounded-sm font-bold hover:opacity-90 transition-opacity"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>
          <button
            className="border border-outline text-white font-label-caps text-label-caps px-10 py-4 rounded-sm hover:bg-white/5 transition-colors"
            onClick={() => navigate('/dashboard')}
          >
            Open Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}