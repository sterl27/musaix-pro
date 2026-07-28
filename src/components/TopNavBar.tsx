import { useNavigate } from 'react-router-dom'

export default function TopNavBar() {
  const navigate = useNavigate()
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-background/95 backdrop-blur-md border-b border-outline-variant">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-headline-md text-headline-md font-bold tracking-tighter text-on-surface">MUSAIX PRO</span>
        </div>
        <div className="hidden md:flex gap-6">
          <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors duration-200" href="#tech">Tech</a>
          <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors duration-200" href="#workflow">Workflow</a>
          <a className="text-on-tertiary-container font-label-caps text-label-caps font-bold border-b-2 border-on-tertiary-container pb-1" href="#producer">Producer Mode</a>
          <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors duration-200" href="#cloud">Cloud</a>
        </div>
      </div>
      <button
        className="bg-brand-coral text-white font-label-caps text-label-caps px-6 py-2 rounded-sm hover:opacity-90 active:scale-95 transition-all"
        onClick={() => navigate('/dashboard')}
      >
        Get Started
      </button>
    </nav>
  )
}
