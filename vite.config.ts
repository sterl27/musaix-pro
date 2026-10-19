import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

const SYSTEM_PROMPT = `You are an expert Ableton Live 12 and music production coach embedded in Musaix Pro.
You give concise, actionable advice on arrangement, mixing, sound design, Max for Live, Push, MIDI,
the Suno → Ableton stem import workflow, and live performance. Keep responses under 200 words unless
a deep-dive or workshop mode is requested. Never invent plugin names or fabricate features.`

function coachApiPlugin(apiKey: string): Plugin {
  return {
    name: 'coach-api',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        if (req.method !== 'POST' || req.url !== '/api/coach') return next()

        let body = ''
        for await (const chunk of req) body += chunk as string

        const { message, history = [] } = JSON.parse(body) as {
          message: string
          history: Array<{ role: string; content: string }>
        }

        const priorMessages = (history as Array<{ role: string; content: string }>)
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .slice(-10)
          .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))

        try {
          const xaiRes = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'grok-3-mini',
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...priorMessages,
                { role: 'user', content: message },
              ],
              max_tokens: 400,
              temperature: 0.7,
            }),
          })

          if (!xaiRes.ok) {
            const err = await xaiRes.text()
            res.writeHead(502, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: `xAI ${xaiRes.status}`, detail: err }))
            return
          }

          const data = await xaiRes.json() as {
            choices: Array<{ message: { content: string } }>
          }
          const reply = data.choices[0]?.message?.content ?? '(empty response)'
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ reply }))
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: String(e) }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.XAI_API_KEY ?? ''

  return {
    plugins: [react(), ...(apiKey ? [coachApiPlugin(apiKey)] : [])],
  }
})
