import { useState } from 'react'
import AppShell from '../components/AppShell'

const STEPS = [
  {
    num: '01',
    title: 'Generate & Separate Stems in Suno',
    icon: 'music_note',
    color: 'text-neon-amber',
    border: 'border-neon-amber/40',
    bg: 'bg-neon-amber/8',
    activeBg: 'bg-neon-amber/15',
    details: [
      {
        label: 'Craft your track',
        body: 'Use Suno Custom Mode with specific style tags and lyrics to generate your seed track.',
      },
      {
        label: 'Export stems',
        body: 'Use Suno\'s Get Stems (Pro / Premier plans) or Suno Studio to split the mix into vocals, drums, bass, and synths as individual WAV files.',
      },
      {
        label: 'Note the BPM',
        body: 'Record the exact BPM displayed in Suno. You\'ll set this manually in Ableton — do not rely on auto-detection.',
      },
    ],
    tip: 'Suno exports stems time-aligned, so they drop in at 1.1.1 without manual nudging.',
  },
  {
    num: '02',
    title: 'Configure Your Ableton Project',
    icon: 'settings',
    color: 'text-electric-violet',
    border: 'border-electric-violet/40',
    bg: 'bg-electric-violet/8',
    activeBg: 'bg-electric-violet/15',
    details: [
      {
        label: 'Set project tempo manually',
        body: 'Open Ableton Live and set the master tempo to match Suno\'s BPM exactly before importing anything.',
      },
      {
        label: 'Why manual beats auto-detect',
        body: 'Auto-detect can drift on AI-generated audio that lacks a rigid transient grid. Entering the value from Suno\'s UI guarantees lock.',
      },
    ],
    tip: 'Set sample rate to 44.1 kHz / 24-bit to match the Suno WAV export spec.',
  },
  {
    num: '03',
    title: 'Import & Align Stems',
    icon: 'align_horizontal_left',
    color: 'text-cyber-cyan',
    border: 'border-cyber-cyan/40',
    bg: 'bg-cyber-cyan/8',
    activeBg: 'bg-cyber-cyan/15',
    details: [
      {
        label: 'Unzip and drag in',
        body: 'Download the stem ZIP from Suno, unzip it, then drag all WAV files into Ableton\'s Arrangement View at the 1.1.1 start marker.',
      },
      {
        label: 'Instant lock',
        body: 'Because Suno exports stems time-aligned from the same render, they snap into phase without manual nudging.',
      },
    ],
    tip: 'Switch to Arrangement View before dropping — Session View clips won\'t auto-place at bar 1.',
  },
  {
    num: '04',
    title: 'Produce & Customize in Ableton',
    icon: 'graphic_eq',
    color: 'text-brand-coral',
    border: 'border-brand-coral/40',
    bg: 'bg-brand-coral/8',
    activeBg: 'bg-brand-coral/15',
    details: [
      {
        label: 'Group & mix',
        body: 'Organize stems into groups (Drums, Bass, Vocals, Instruments). Apply EQ Eight, compressors, and saturators to clean up AI artifacts.',
      },
      {
        label: 'Layer your own elements',
        body: 'Add your own MIDI instruments, hardware synths, or custom drum racks over the AI-generated stems to reinforce or replace sections.',
      },
      {
        label: 'Automate & arrange',
        body: 'Slice, rearrange, and write custom transitions in the Arrangement View to turn the AI seed into a fully structured production.',
      },
    ],
    tip: 'Studio Coach can suggest arrangement and mix moves — open it alongside this workflow.',
  },
]

const LIMITS = [
  {
    icon: 'cloud_off',
    title: 'No native Ableton plugin',
    body: 'Suno is cloud-based. There is no in-DAW text prompt. Everything goes through export → import.',
  },
  {
    icon: 'key',
    title: 'Stems require Pro / Premier',
    body: 'Get Stems is not available on the free Suno tier. Check your plan before starting the workflow.',
  },
  {
    icon: 'sync_problem',
    title: 'Ableton OSC bridge',
    body: 'Real-time Ableton ↔ Musaix control (tempo sync, clip fire) requires AbletonOSC on localhost. See Build Plan steps 1 – 3.',
  },
]

export default function SunoWorkflow() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <AppShell title="Suno Workflow">
      <div className="flex flex-col gap-stack-md max-w-4xl">
        {/* Header */}
        <div>
          <span className="font-label-caps text-label-caps accent-neon-amber tracking-widest uppercase">
            AI-Assisted Production
          </span>
          <h1 className="font-display-lg text-display-lg-mobile text-on-surface mt-1">
            Suno → Ableton <span className="accent-neon-amber">Pipeline</span>
          </h1>
          <p className="text-on-surface-variant font-body-md mt-2 max-w-2xl">
            Export-and-import workflow to bridge Suno&#39;s text-to-music generation with
            professional DAW arrangement in Ableton Live. No real-time plugin required.
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-4">
          {STEPS.map((step, idx) => {
            const isOpen = activeStep === idx
            return (
              <div
                key={step.num}
                className={`rounded-lg border transition-all duration-200 overflow-hidden ${
                  isOpen ? step.border : 'border-outline-variant'
                }`}
              >
                <button
                  className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                    isOpen ? step.activeBg : 'bg-surface-container hover:bg-surface-container-high'
                  }`}
                  onClick={() => setActiveStep(isOpen ? null : idx)}
                >
                  {/* Step number */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded border flex items-center justify-center font-mono-data text-mono-data font-bold transition-colors ${
                      isOpen ? `${step.border} ${step.color}` : 'border-outline-variant text-outline'
                    }`}
                  >
                    {step.num}
                  </div>

                  {/* Icon + title */}
                  <span
                    className={`material-symbols-outlined text-2xl transition-colors ${
                      isOpen ? step.color : 'text-outline'
                    }`}
                  >
                    {step.icon}
                  </span>
                  <span className="flex-1 font-headline-md text-headline-md text-on-surface">
                    {step.title}
                  </span>

                  {/* Chevron */}
                  <span
                    className={`material-symbols-outlined text-outline transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className={`px-6 pb-6 pt-2 ${step.activeBg}`}>
                    <div className="ml-14 space-y-4">
                      {step.details.map(d => (
                        <div key={d.label} className="flex gap-3">
                          <span className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${step.color}`}>
                            check_circle
                          </span>
                          <div>
                            <div className="font-label-caps text-label-caps text-on-surface mb-1">
                              {d.label}
                            </div>
                            <p className="text-on-surface-variant text-sm leading-relaxed">{d.body}</p>
                          </div>
                        </div>
                      ))}

                      {/* Tip */}
                      <div className={`mt-4 flex items-start gap-3 px-4 py-3 rounded border ${step.border} ${step.bg}`}>
                        <span className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${step.color}`}>
                          lightbulb
                        </span>
                        <p className={`text-sm ${step.color}`}>{step.tip}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Pipeline diagram */}
        <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
          <h3 className="font-label-caps text-label-caps text-outline mb-6">SIGNAL FLOW</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: 'Suno Prompt', sub: 'Cloud generation', icon: 'chat', color: 'text-neon-amber', bg: 'bg-neon-amber/10 border-neon-amber/30' },
              null,
              { label: 'Stems WAV', sub: 'Pro / Premier export', icon: 'audio_file', color: 'text-neon-amber', bg: 'bg-neon-amber/10 border-neon-amber/30' },
              null,
              { label: 'Ableton 1.1.1', sub: 'Arrangement View', icon: 'align_horizontal_left', color: 'text-cyber-cyan', bg: 'bg-cyber-cyan/10 border-cyber-cyan/30' },
              null,
              { label: 'Production', sub: 'Mix / Layer / Arrange', icon: 'graphic_eq', color: 'text-brand-coral', bg: 'bg-brand-coral/10 border-brand-coral/30' },
            ].map((node, i) =>
              node === null ? (
                <span key={i} className="material-symbols-outlined text-outline text-xl">arrow_forward</span>
              ) : (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg border ${node.bg}`}
                >
                  <span className={`material-symbols-outlined text-xl ${node.color}`}>{node.icon}</span>
                  <span className={`font-label-caps text-label-caps ${node.color}`}>{node.label}</span>
                  <span className="text-xs text-on-surface-variant">{node.sub}</span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
          <h3 className="font-label-caps text-label-caps text-outline mb-4">KNOWN CONSTRAINTS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {LIMITS.map(l => (
              <div key={l.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[18px]">{l.icon}</span>
                  <span className="font-label-caps text-label-caps text-on-surface">{l.title}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to coach */}
        <div className="flex items-center gap-4 py-4 px-6 rounded-lg bg-surface-container ghost-border">
          <span className="material-symbols-outlined text-neon-amber text-3xl">psychology</span>
          <div className="flex-1">
            <div className="font-headline-md text-headline-md text-on-surface">Need mix or arrangement help?</div>
            <p className="text-on-surface-variant text-sm">Studio Coach can suggest specific Ableton moves for any step in this workflow.</p>
          </div>
          <a
            href="/coach"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded bg-neon-amber text-[#472a00] font-label-caps text-label-caps font-bold hover:opacity-90 transition-opacity"
          >
            Open Coach
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </AppShell>
  )
}
