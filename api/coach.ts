export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `You are an expert Ableton Live 12 and music production coach embedded in Musaix Pro.
You give concise, actionable advice on arrangement, mixing, sound design, Max for Live, Push, MIDI,
the Suno → Ableton stem import workflow, and live performance. Keep responses under 200 words unless
a deep-dive or workshop mode is requested. Never invent plugin names or fabricate features.`

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'XAI_API_KEY not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: { message?: string; history?: ChatMessage[] }
  try {
    body = await req.json() as { message?: string; history?: ChatMessage[] }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
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
      return new Response(
        JSON.stringify({ error: `xAI ${xaiRes.status}`, detail }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const data = await xaiRes.json() as {
      choices: Array<{ message: { content: string } }>
    }
    const reply = data.choices[0]?.message?.content ?? '(empty response)'

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
