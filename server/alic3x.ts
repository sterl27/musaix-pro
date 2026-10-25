import { createHash, timingSafeEqual } from 'node:crypto'

export function createHandler(generate: (prompt: string) => Promise<string>) {
  return async (request: Request): Promise<Response> => {
    const reply = (body: object, status = 200) => Response.json(body, {
      status, headers: { 'Cache-Control': 'no-store' },
    })
    if (request.method !== 'POST') return reply({ error: 'Use POST.' }, 405)
    const token = process.env.ALIC3X_ACCESS_TOKEN
    if (!token || !process.env.AI_GATEWAY_MODEL) {
      return reply({ error: 'Alic3X is not configured yet.' }, 503)
    }
    const provided = request.headers.get('authorization') ?? ''
    const hash = (value: string) => createHash('sha256').update(value).digest()
    if (!timingSafeEqual(hash(provided), hash(`Bearer ${token}`))) {
      return reply({ error: 'Enter a valid assistant access code.' }, 401)
    }
    if (!request.headers.get('content-type')?.startsWith('application/json')) {
      return reply({ error: 'Send JSON.' }, 415)
    }
    // Bound the body while reading, rather than trusting Content-Length.
    const reader = request.body?.getReader()
    if (!reader) return reply({ error: 'Enter a message.' }, 400)
    const chunks: Uint8Array[] = []
    let size = 0
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > 16384) {
          await reader.cancel()
          return reply({ error: 'Message is too large.' }, 413)
        }
        chunks.push(value)
      }
      const body: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
      if (!body || typeof body !== 'object' || !('message' in body) ||
          typeof body.message !== 'string' || !body.message.trim() || body.message.length > 4000) {
        return reply({ error: 'Enter a message of 1–4000 characters.' }, 400)
      }
      try {
        const text = await generate(body.message.trim())
        return reply({ text })
      } catch {
        return reply({ error: 'AI Gateway is unavailable. Check configuration or try again later.' }, 502)
      }
    } catch {
      return reply({ error: 'Invalid JSON request.' }, 400)
    } finally {
      reader.releaseLock()
    }
  }
}
