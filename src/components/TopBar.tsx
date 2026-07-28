import { useNavigate } from 'react-router-dom'

interface TopBarProps {
  title?: string
}

export default function TopBar({ title: _title }: TopBarProps) {
  const navigate = useNavigate()
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-desktop z-40">
      <div className="flex items-center bg-surface-container-low px-4 py-1.5 rounded ghost-border w-96">
        <span className="material-symbols-outlined text-outline text-sm">search</span>
        <input
          className="bg-transparent border-none outline-none text-sm w-full placeholder-outline-variant text-on-surface ml-2"
          placeholder="Search systems or assets..."
          type="text"
        />
        <span className="text-[10px] text-outline-variant border border-outline-variant px-1 rounded">⌘K</span>
      </div>
      <div className="flex items-center gap-6">
        <button
          className="relative text-on-surface-variant hover:text-on-surface transition-colors"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-brand-coral rounded-full"></span>
        </button>
        <button
          className="text-on-surface-variant hover:text-on-surface transition-colors"
          onClick={() => navigate('/settings')}
          aria-label="Settings"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-px bg-outline-variant"></div>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/settings')}>
          <div className="text-right">
            <p className="font-label-caps text-label-caps text-on-surface leading-none">Alex Mercer</p>
            <p className="text-[10px] text-outline-variant uppercase tracking-tighter">Lead Architect</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">person</span>
          </div>
        </div>
      </div>
    </header>
  )
}
