import { generateText } from 'ai'
import { createHandler } from '../server/alic3x.js'

export default {
  fetch: createHandler(async (prompt) => {
    const { text } = await generateText({
      model: process.env.AI_GATEWAY_MODEL!,
      system: 'You are Alic3X, the Musaix Pro music and audio assistant. Help with production planning, audio workflows, and music discovery. You have no access to live sessions, private documents, phone calls, WhatsApp, or external tools. Never claim to have performed actions. Clearly distinguish suggestions from verified facts.',
      prompt,
      maxOutputTokens: 800,
      maxRetries: 0,
      abortSignal: AbortSignal.timeout(25000),
    })
    return text
  }),
}
