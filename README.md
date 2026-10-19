# Musaix Pro

AI-native music production infrastructure. A control layer that bridges Ableton Live, generative AI, and real-time audio analysis — built for serious creators.

---

## What it is

Musaix Pro is a browser-based production companion that runs beside your DAW. It is not a DAW. It does not generate audio. It is the intelligence layer that connects what AI can generate with what a professional can release.

**Obsidian Lumina aesthetic** — VIP nightclub at 3am. Every surface intentional.

---

## Features

### Resonance Live
Canvas2D + Web Audio visualizer with three production presets:
- **808 Gravity** — Low-end trap and bass music. Radial pulse driven by sub-bass energy.
- **Vocal Silk** — Melodic and vocal-forward. Harmonic waveform with mid-frequency shaping.
- **Noir Rain** — Ambient and textural. 180-particle rain field driven by high-frequency transients.

Reads live microphone input via `getUserMedia`. Three-band frequency analysis (bass 0–15, mid 16–100, high 101–512). Beat ticker locks to session tempo. DPR-scaled Canvas2D at full Retina resolution.

### Studio Coach
AI coaching interface powered by xAI Grok 3 Mini. Streaming responses via SSE — text appears token by token, no waiting.

Four response modes: **Immediate**, **Deep Dive**, **Workshop**, **Critique**.

Knows Ableton Live 12 arrangement, mixing, sound design, Max for Live, Push, MIDI, live performance, and the full Suno → Ableton stem import workflow.

### Suno Workflow
Interactive four-step guide for the Suno-to-Ableton production pipeline:
1. Generate in Suno with a structured prompt (no artist name references)
2. Export individual WAV stems (Pro/Premier plan)
3. Import stems into Ableton at 1.1.1, tempo-map to reference audio
4. Production layer — MIDI, effects, automation, arrangement

### Dashboard, Ecosystem, Discovery, Production
Full app shell with sidebar navigation, live session panels, audio ecosystem mapping, music discovery, and production board.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS 3 + Obsidian Lumina design tokens |
| Routing | React Router v7 |
| Audio | Web Audio API, Canvas2D, getUserMedia |
| AI | xAI Grok 3 Mini via streaming SSE |
| API (dev) | Vite `configureServer` plugin middleware |
| API (prod) | Vercel Edge Functions |
| Deploy | Vercel |

No Next.js. No framer-motion. No component library. No Redux.

---

## Local development

```bash
npm install
```

Create `.env.local` in the project root:

```
XAI_API_KEY=your_key_here
```

```bash
npm run dev
```

The dev server runs at `http://localhost:5173`. The `/api/coach` endpoint is handled by the Vite dev middleware — no separate backend process needed.

---

## Production deployment

Deployed on Vercel. The Edge Function at `api/coach.ts` handles AI requests in production.

**Required environment variable** — set in Vercel dashboard under Settings → Environment Variables:

```
XAI_API_KEY=your_key_here
```

The key is never committed to git. `.env*` is covered by `.gitignore`.

---

## Project structure

```
musaix-pro/
├── api/
│   └── coach.ts              # Vercel Edge Function — xAI streaming proxy
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AppShell.tsx
│   │   └── Sidebar.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── ResonanceLive.tsx  # Canvas2D + Web Audio visualizer
│   │   ├── StudioCoach.tsx    # Streaming AI coach
│   │   ├── SunoWorkflow.tsx   # 4-step Suno → Ableton guide
│   │   ├── AudioEcosystem.tsx
│   │   ├── MusicDiscovery.tsx
│   │   └── ProductionBoard.tsx
│   ├── routes/
│   │   └── appRoutes.tsx
│   └── main.tsx
├── vercel.json                # SPA rewrites, security headers, cache headers
├── vite.config.ts             # Dev middleware for /api/coach
├── tailwind.config.js         # Obsidian Lumina design tokens
└── index.html
```

---

## Design system — Obsidian Lumina

| Token | Hex | Use |
|---|---|---|
| `neon-amber` | `#F59E0B` | Tempo, beats, active state, primary accent |
| `electric-violet` | `#8B5CF6` | AI surfaces, intelligence indicators |
| `cyber-cyan` | `#38BDF8` | System state, connectivity, data feeds |
| `surface-midnight` | `#131722` | Base background |
| `surface-elevated` | `#1A1F2E` | Cards, panels |

---

## Roadmap

- [ ] **AbletonOSC bridge** — Python OSC server + WebSocket relay + Max for Live patch. Locks beat ticker to DAW clock, feeds live tempo/transport/track data to all pages.
- [ ] **Speed Insights** — `@vercel/speed-insights` for Core Web Vitals baseline
- [ ] **Cassette Cockpit** — Full Hermes-style agent orchestration layer: `ANALYZE_TRACK`, `ENHANCE_VOCALS`, `CONTROL_TRANSPORT` commands via rate-limited asyncio queue
- [ ] **Audio Intelligence** — librosa feature extraction: beat tracking, MFCC, chroma, pitch, onset detection. Results stored in local vector DB with hybrid search.
- [ ] **Dependabot fixes** — 2 high + 1 moderate vulnerabilities flagged on default branch

---

## Security

Security headers are applied globally via `vercel.json`: `X-Content-Type-Options`, `X-Frame-Options`, HSTS, CSP, `Referrer-Policy`, `Permissions-Policy` (microphone self-only).

Static assets under `/assets/` are served with `Cache-Control: immutable` — Vite's content-hashed filenames make this safe.

The `/api/coach` Edge Function validates the `Origin` header against an allowlist and handles CORS preflight.
