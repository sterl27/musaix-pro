export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `You are an expert Ableton Live 12 and music production coach embedded in Musaix Pro.
You give concise, actionable advice on arrangement, mixing, sound design, Max for Live, Push, MIDI,
the Suno → Ableton stem import workflow, and live performance. Keep responses under 200 words unless
a deep-dive or workshop mode is requested. Never invent plugin names or fabricate features.`

const ALLOWED_ORIGINS = new Set([
  'http://localhost:5173',
  'http://localhost:4173',
  'https://musaix-pro.vercel.app',
])

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : ''
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get('origin')

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const cors = corsHeaders(origin)
  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json', ...cors },
    })

  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    return json({ error: 'XAI_API_KEY not configured' }, 503)
  }

  let body: { message?: string; history?: ChatMessage[] }
  try {
    body = await req.json() as { message?: string; history?: ChatMessage[] }
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const { message = '', history = [] } = body

  const priorMessages: ChatMessage[] = history
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-10)

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
      const detail = await xaiRes.text()
      return json({ error: `xAI ${xaiRes.status}`, detail }, 502)
    }

    const data = await xaiRes.json() as {
      choices: Array<{ message: { content: string } }>
    }
    const reply = data.choices[0]?.message?.content ?? '(empty response)'

    return json({ reply }, 200)
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
}
