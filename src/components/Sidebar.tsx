import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard',    icon: 'dashboard',               label: 'Dashboard' },
  { to: '/ecosystem',    icon: 'settings_input_component', label: 'Ecosystem' },
  { to: '/discover',     icon: 'music_note',              label: 'Discover' },
  { to: '/production',   icon: 'graphic_eq',              label: 'Production' },
  { to: '/security',     icon: 'security',                label: 'Security' },
  { to: '/settings',     icon: 'person',                  label: 'Account' },
  { to: '/security/audit', icon: 'list_alt',              label: 'Logs' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container border-r border-outline-variant flex flex-col py-stack-md z-50">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-md text-headline-md font-bold text-on-surface leading-none">Musaix Pro</span>
          <span className="font-label-caps text-label-caps text-on-tertiary-container tracking-widest mt-1">ENTERPRISE AUDIO</span>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${
                isActive
                  ? 'text-tertiary border-r-2 border-tertiary bg-surface-container-high'
                  : 'text-on-surface-variant hover:bg-surface-container-highest'
              }`
            }
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="font-label-caps text-label-caps">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 mt-auto border-t border-outline-variant pt-6 space-y-1">
        <NavLink to="/releases" className="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-highest transition-all">
          <span className="material-symbols-outlined">new_releases</span>
          <span className="font-label-caps text-label-caps">Releases</span>
        </NavLink>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-highest transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-caps text-label-caps">Logout</span>
        </button>
      </div>
    </aside>
  )
}
