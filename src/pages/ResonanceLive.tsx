import { useRef, useEffect, useState, useCallback } from 'react'
import AppShell from '../components/AppShell'

type Preset = '808-gravity' | 'vocal-silk' | 'noir-rain'

type Particle = { x: number; y: number; speed: number; length: number; opacity: number }

function draw808Gravity(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  freqData: Uint8Array,
  t: number,
) {
  ctx.fillStyle = 'rgba(11, 13, 20, 0.18)'
  ctx.fillRect(0, 0, w, h)

  const cx = w / 2
  const cy = h / 2

  let bassSum = 0
  for (let i = 0; i < 16; i++) bassSum += freqData[i]
  const bassAmp = bassSum / (16 * 255)

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140 * (1 + bassAmp * 0.6))
  grad.addColorStop(0, `rgba(245, 158, 11, ${0.25 + bassAmp * 0.35})`)
  grad.addColorStop(0.5, `rgba(139, 92, 246, ${0.08 + bassAmp * 0.15})`)
  grad.addColorStop(1, 'transparent')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(cx, cy, 140 * (1 + bassAmp * 0.6), 0, Math.PI * 2)
  ctx.fill()

  const rings = [60, 100, 160]
  rings.forEach((r, ri) => {
    const rAmp = ri === 0 ? bassAmp : freqData[ri * 20] / 255
    ctx.beginPath()
    ctx.arc(cx, cy, r + rAmp * 30, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(245, 158, 11, ${0.15 + rAmp * 0.3})`
    ctx.lineWidth = 1
    ctx.stroke()
  })

  const count = 40
  for (let i = 0; i < count; i++) {
    const fIdx = Math.floor((i / count) * freqData.length * 0.35)
    const amp = freqData[fIdx] / 255
    const angle = (i / count) * Math.PI * 2 + t * 0.25 * (1 + bassAmp * 0.4)
    const radius = 80 + amp * 130 + bassAmp * 35
    const px = cx + Math.cos(angle) * radius
    const py = cy + Math.sin(angle) * radius
    const size = 1.5 + amp * 5

    ctx.beginPath()
    ctx.arc(px, py, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(245, 158, 11, ${0.35 + amp * 0.65})`
    ctx.fill()
  }
}

function drawVocalSilk(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  freqData: Uint8Array,
  timeData: Uint8Array,
  t: number,
) {
  ctx.fillStyle = 'rgba(11, 13, 20, 0.10)'
  ctx.fillRect(0, 0, w, h)

  const midS = 16, midE = 100
  let midSum = 0
  for (let i = midS; i < midE; i++) midSum += freqData[i]
  const midAmp = midSum / ((midE - midS) * 255)

  for (let ribbon = 0; ribbon < 6; ribbon++) {
    const phase = (ribbon / 6) * Math.PI * 2
    const alpha = 0.08 + ribbon * 0.08 + midAmp * 0.25
    const yBase = h / 2 + (ribbon - 2.5) * 28

    ctx.beginPath()
    ctx.moveTo(0, yBase)
    for (let x = 0; x <= w; x += 3) {
      const freq = x / w
      const dIdx = Math.floor(freq * (midE - midS)) + midS
      const amp = (freqData[dIdx] / 255) * 55
      const tIdx = Math.floor(freq * timeData.length)
      const tSample = ((timeData[tIdx] ?? 128) / 128 - 1) * 35
      const y = yBase + Math.sin(freq * Math.PI * 5 + t * 1.4 + phase) * (18 + amp) + tSample
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`
    ctx.lineWidth = 1.2 + ribbon * 0.25 + midAmp * 0.8
    ctx.stroke()
  }

  ctx.beginPath()
  ctx.moveTo(0, h / 2)
  for (let i = 0; i < timeData.length; i++) {
    const x = (i / timeData.length) * w
    const y = h / 2 + ((timeData[i] ?? 128) / 128 - 1) * 75
    ctx.lineTo(x, y)
  }
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 + midAmp * 0.4})`
  ctx.lineWidth = 1
  ctx.stroke()
}

function drawNoirRain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  freqData: Uint8Array,
  particles: Particle[],
) {
  ctx.fillStyle = 'rgba(11, 13, 20, 0.22)'
  ctx.fillRect(0, 0, w, h)

  const hS = 101, hE = Math.min(512, freqData.length)
  let hSum = 0
  for (let i = hS; i < hE; i++) hSum += freqData[i]
  const highAmp = hSum / ((hE - hS) * 255)

  let bSum = 0
  for (let i = 0; i < 8; i++) bSum += freqData[i]
  const bassAmp = bSum / (8 * 255)

  for (const p of particles) {
    p.y += p.speed * (1 + highAmp * 2.5)
    if (p.y > h) {
      p.y = -p.length
      p.x = Math.random() * w
    }
    const fBin = Math.floor((p.x / w) * (hE - hS)) + hS
    const localAmp = (freqData[fBin] ?? 0) / 255

    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
    ctx.lineTo(p.x, p.y + p.length)
    ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * (0.25 + localAmp * 0.75) * (0.4 + highAmp * 0.6)})`
    ctx.lineWidth = 0.5 + localAmp * 0.8
    ctx.stroke()
  }

  if (bassAmp > 0.08) {
    const fog = ctx.createLinearGradient(0, h * 0.65, 0, h)
    fog.addColorStop(0, 'transparent')
    fog.addColorStop(1, `rgba(56, 189, 248, ${bassAmp * 0.18})`)
    ctx.fillStyle = fog
    ctx.fillRect(0, h * 0.65, w, h * 0.35)
  }
}

const PRESETS = [
  { id: '808-gravity' as Preset, label: '808 Gravity', desc: '20 – 180 Hz', key: '1' },
  { id: 'vocal-silk' as Preset, label: 'Vocal Silk', desc: '180 – 2500 Hz', key: '2' },
  { id: 'noir-rain' as Preset, label: 'Noir Rain', desc: '2.5 – 16 kHz', key: '3' },
]

export default function ResonanceLive() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasSizeRef = useRef({ w: 800, h: 400 })
  const particlesRef = useRef<Particle[]>([])
  const tRef = useRef(0)

  const [preset, setPreset] = useState<Preset>('808-gravity')
  const [isRunning, setIsRunning] = useState(false)
  const [sensitivity, setSensitivity] = useState(75)
  const [smoothing, setSmoothing] = useState(80)
  const [tempo, setTempo] = useState(120)
  const [beat, setBeat] = useState(0)
  const [micError, setMicError] = useState('')

  const initParticles = (w: number, h: number) => {
    particlesRef.current = Array.from({ length: 180 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 1 + Math.random() * 2.5,
      length: 14 + Math.random() * 28,
      opacity: 0.25 + Math.random() * 0.75,
    }))
  }

  const stopMic = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    void ctxRef.current?.close()
    streamRef.current = null
    ctxRef.current = null
    analyserRef.current = null
    setIsRunning(false)
  }, [])

  const startMic = useCallback(async () => {
    setMicError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      streamRef.current = stream
      const audioCtx = new AudioContext()
      ctxRef.current = audioCtx
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = smoothing / 100
      analyserRef.current = analyser
      audioCtx.createMediaStreamSource(stream).connect(analyser)
      setIsRunning(true)
    } catch {
      setMicError('Microphone access denied. Grant permission to enable Resonance Live.')
    }
  }, [smoothing])

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => setBeat(b => (b + 1) % 4), (60 / tempo) * 1000)
    return () => clearInterval(id)
  }, [isRunning, tempo])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx2d.scale(dpr, dpr)
      canvasSizeRef.current = { w: rect.width, h: rect.height }
      initParticles(rect.width, rect.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const freqBuf = new Uint8Array(2048)
    const timeBuf = new Uint8Array(2048)

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      tRef.current += 0.016
      const { w, h } = canvasSizeRef.current
      const analyser = analyserRef.current

      if (analyser) {
        analyser.getByteFrequencyData(freqBuf)
        analyser.getByteTimeDomainData(timeBuf)
      }

      const scale = sensitivity / 50
      const scaledFreq = new Uint8Array(freqBuf.length)
      for (let i = 0; i < freqBuf.length; i++) {
        scaledFreq[i] = Math.min(255, freqBuf[i] * scale)
      }

      if (preset === '808-gravity') draw808Gravity(ctx2d, w, h, scaledFreq, tRef.current)
      else if (preset === 'vocal-silk') drawVocalSilk(ctx2d, w, h, scaledFreq, timeBuf, tRef.current)
      else drawNoirRain(ctx2d, w, h, scaledFreq, particlesRef.current)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [preset, sensitivity])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).matches('input,select,textarea')) return
      if (e.key === '1') setPreset('808-gravity')
      else if (e.key === '2') setPreset('vocal-silk')
      else if (e.key === '3') setPreset('noir-rain')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    return () => {
      stopMic()
      cancelAnimationFrame(rafRef.current)
    }
  }, [stopMic])

  return (
    <AppShell title="Resonance Live">
      <div className="flex flex-col gap-stack-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display-lg text-display-lg-mobile text-on-surface">
              Resonance <span className="accent-neon-amber">Live</span>
            </h1>
            <p className="text-on-surface-variant font-body-md mt-1">
              Audio-reactive Canvas2D · Web Audio API · Ableton OSC bridge
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-outline-variant">
              <span className={`w-2 h-2 rounded-full transition-colors ${isRunning ? 'bg-neon-amber animate-pulse' : 'bg-outline'}`} />
              <span className="font-mono-data text-mono-data text-on-surface">{tempo} BPM</span>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-75 ${
                    isRunning && beat === i ? 'bg-neon-amber scale-125' : 'bg-surface-container-high'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div
          className="relative rounded-lg overflow-hidden border border-outline-variant bg-brand-ink"
          style={{ height: '420px' }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          {!isRunning && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-ink/80 backdrop-blur-sm">
              <div className="text-center space-y-3">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant block">graphic_eq</span>
                <p className="text-on-surface-variant font-body-md">Enable microphone to start visualizer</p>
                {micError && (
                  <p className="font-mono-data text-xs text-red-400 max-w-xs mx-auto">{micError}</p>
                )}
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container/80 backdrop-blur-sm border border-outline-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-amber" />
            <span className="font-mono-data text-mono-data text-neon-amber">
              {PRESETS.find(p => p.id === preset)?.label}
            </span>
          </div>
          <div className="absolute top-4 right-4 px-2 py-1 rounded bg-surface-container/80 backdrop-blur-sm border border-outline-variant">
            <span className="font-mono-data text-xs text-on-surface-variant">
              {PRESETS.find(p => p.id === preset)?.desc}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Preset selector */}
          <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <h3 className="font-label-caps text-label-caps text-outline mb-4">VISUAL PRESET</h3>
            <div className="space-y-2">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded border transition-all ${
                    preset === p.id
                      ? 'border-neon-amber bg-neon-amber/10 text-neon-amber'
                      : 'border-outline-variant text-on-surface-variant hover:border-outline hover:bg-surface-container-high'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-mono-data text-mono-data">{p.label}</div>
                    <div className="text-xs text-outline mt-0.5">{p.desc}</div>
                  </div>
                  <kbd className="font-mono-data text-xs text-outline border border-outline-variant rounded px-1.5 py-0.5">
                    {p.key}
                  </kbd>
                </button>
              ))}
            </div>
          </div>

          {/* Parameters */}
          <div className="bg-surface-container ghost-border rounded-lg p-stack-md">
            <h3 className="font-label-caps text-label-caps text-outline mb-4">PARAMETERS</h3>
            <div className="space-y-5">
              {[
                { label: 'Sensitivity', value: sensitivity, min: 10, max: 200, unit: '%', onChange: setSensitivity },
                {
                  label: 'Smoothing', value: smoothing, min: 0, max: 95, unit: '%',
                  onChange: (v: number) => {
                    setSmoothing(v)
                    if (analyserRef.current) analyserRef.current.smoothingTimeConstant = v / 100
                  },
                },
                { label: 'Tempo', value: tempo, min: 60, max: 180, unit: ' BPM', onChange: setTempo },
              ].map(({ label, value, min, max, unit, onChange }) => (
                <label key={label} className="block">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-on-surface-variant">{label}</span>
                    <span className="font-mono-data text-mono-data text-on-surface">{value}{unit}</span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={e => onChange(+e.target.value)}
                    className="w-full accent-neon-amber"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Transport */}
          <div className="bg-surface-container ghost-border rounded-lg p-stack-md flex flex-col gap-4">
            <h3 className="font-label-caps text-label-caps text-outline">TRANSPORT</h3>
            <button
              onClick={isRunning ? stopMic : startMic}
              className={`flex items-center justify-center gap-3 py-4 rounded font-label-caps text-label-caps font-bold transition-all ${
                isRunning
                  ? 'bg-red-500/15 border border-red-500/40 text-red-400 hover:bg-red-500/25'
                  : 'bg-neon-amber text-[#472a00] hover:opacity-90'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{isRunning ? 'stop' : 'mic'}</span>
              {isRunning ? 'STOP' : 'START MIC'}
            </button>

            <div className="flex-1" />

            <div className="space-y-2 border-t border-outline-variant pt-4">
              {[
                ['Engine', 'Web Audio API', 'text-cyber-cyan'],
                ['Renderer', 'Canvas2D', 'text-cyber-cyan'],
                ['OSC Bridge', 'Offline', 'text-outline'],
                ['Ableton', 'Not connected', 'text-outline'],
              ].map(([k, v, cls]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-outline">{k}</span>
                  <span className={`font-mono-data ${cls}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
