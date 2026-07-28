import AppShell from '../components/AppShell'
import { useState } from 'react'

export default function DesktopSettings() {
  const [twoFactor, setTwoFactor] = useState(true)
  const [passkey, setPasskey] = useState(false)

  return (
    <AppShell title="Account Settings">
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Account Management</h1>
        <p className="text-on-surface-variant font-body-lg">Configure your professional identity and security parameters.</p>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Profile card */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container p-stack-md ghost-border rounded relative overflow-hidden">
          <h3 className="font-label-caps text-label-caps text-outline mb-6">IDENTITY PROFILE</h3>
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-surface-container-highest border-2 border-brand-coral flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-5xl">person</span>
              </div>
              <button className="absolute bottom-0 right-0 bg-surface-container-highest border border-outline-variant p-2 rounded-full hover:bg-brand-coral transition-colors" aria-label="Change photo">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </button>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Alex Mercer</h2>
            <p className="text-tertiary font-label-caps text-label-caps mb-2">Lead Audio Architect</p>
            <p className="text-outline-variant text-sm">a.mercer@musaix.pro</p>
          </div>
          <div className="space-y-4 border-t border-outline-variant pt-6">
            {[['Language', 'EN-US'], ['Timezone', 'UTC -05:00'], ['Member Since', 'Oct 2023']].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-xs text-outline">{k}</span>
                <span className="text-xs font-mono-data">{v}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 bg-surface-container-highest ghost-border py-3 rounded font-label-caps text-label-caps hover:bg-surface-bright transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Right column */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          {/* API Keys */}
          <div className="bg-surface-container p-stack-md ghost-border rounded">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-label-caps text-label-caps text-outline mb-1">API ACCESS & TOKENS</h3>
                <p className="text-xs text-outline-variant">Production environment keys for studio nodes.</p>
              </div>
              <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
            </div>
            {[
              { label: 'Production Key', value: 'musaix_prd_••••••••••••••••x7a2', opacity: '' },
              { label: 'Sandbox Token', value: 'musaix_sbx_••••••••••••••••p9o1', opacity: 'opacity-60' },
            ].map((key) => (
              <div key={key.label} className={`bg-brand-ink p-4 rounded ghost-border flex items-center justify-between mb-3 ${key.opacity}`}>
                <div className="flex flex-col">
                  <span className="text-[10px] text-outline mb-1 uppercase">{key.label}</span>
                  <span className="font-mono-data text-sm tracking-widest text-on-surface">{key.value}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-surface-variant rounded transition-colors text-outline hover:text-on-surface" aria-label="Copy">
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                  <button className="p-2 hover:bg-surface-variant rounded transition-colors text-outline hover:text-on-surface" aria-label="Refresh">
                    <span className="material-symbols-outlined text-sm">refresh</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Auth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="bg-surface-container p-stack-md ghost-border rounded">
              <h3 className="font-label-caps text-label-caps text-outline mb-6">AUTHENTICATION</h3>
              <div className="space-y-6">
                {[
                  { label: 'Two-Factor Auth', desc: 'Extra layer of protection', checked: twoFactor, set: setTwoFactor },
                  { label: 'Passkey Support', desc: 'Biometric login enabled', checked: passkey, set: setPasskey },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-on-surface">{item.label}</p>
                        <p className="text-[10px] text-outline-variant">{item.desc}</p>
                      </div>
                      <button
                        role="switch"
                        aria-checked={item.checked}
                        onClick={() => item.set(!item.checked)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${item.checked ? 'bg-tertiary' : 'bg-surface-variant'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-brand-ink transition-transform ${item.checked ? 'translate-x-5' : ''}`} />
                      </button>
                    </div>
                    <div className="h-px bg-outline-variant mt-4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container p-stack-md ghost-border rounded">
              <h3 className="font-label-caps text-label-caps text-outline mb-6">SUBSCRIPTION</h3>
              <div className="text-center py-4">
                <span className="material-symbols-outlined text-brand-coral text-5xl">workspace_premium</span>
                <p className="font-headline-md text-headline-md text-white mt-2">Enterprise Pro</p>
                <p className="text-on-surface-variant text-sm mt-1">Unlimited nodes · Priority support</p>
                <div className="mt-4 py-2 px-4 bg-brand-coral/10 border border-brand-coral/30 rounded-sm">
                  <p className="font-label-caps text-label-caps text-brand-coral">RENEWS AUG 1, 2027</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
