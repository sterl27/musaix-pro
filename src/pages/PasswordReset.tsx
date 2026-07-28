import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PasswordReset() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | 'sent'>('email')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setStep('sent')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-brand-coral/10 border border-brand-coral/30 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-brand-coral text-3xl">lock_reset</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface">Reset Password</h1>
          <p className="text-on-surface-variant text-sm mt-2">Enter your email to receive a secure reset link.</p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSubmit} className="bg-surface-container ghost-border rounded-lg p-stack-md space-y-4">
            <div>
              <label className="font-label-caps text-label-caps text-outline block mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@musaix.pro"
                className="w-full bg-brand-ink border border-outline-variant rounded px-4 py-3 text-on-surface placeholder-outline focus:outline-none focus:border-brand-coral transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-coral text-white font-label-caps text-label-caps py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              Send Reset Link
            </button>
            <button type="button" className="w-full text-on-surface-variant font-label-caps text-label-caps py-2 hover:text-on-surface transition-colors" onClick={() => navigate('/settings')}>
              Back to Account
            </button>
          </form>
        ) : (
          <div className="bg-surface-container ghost-border rounded-lg p-stack-md text-center space-y-4">
            <span className="material-symbols-outlined text-green-400 text-5xl">mark_email_read</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Check your inbox</h2>
            <p className="text-on-surface-variant text-sm">A reset link has been sent to <span className="text-brand-coral">{email}</span></p>
            <button
              className="w-full bg-surface-container-highest ghost-border py-3 rounded font-label-caps text-label-caps hover:bg-surface-bright transition-colors"
              onClick={() => navigate('/settings')}
            >
              Back to Account
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
