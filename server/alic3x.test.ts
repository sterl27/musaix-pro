import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHandler } from './alic3x.ts'

test('protects Gateway access and validates requests before generating', async () => {
  const oldToken = process.env.ALIC3X_ACCESS_TOKEN
  const oldModel = process.env.AI_GATEWAY_MODEL
  let calls = 0
  const handler = createHandler(async (prompt) => { calls++; return `Answer: ${prompt}` })
  const request = (body: string, token = 'test-access', method = 'POST') => new Request('https://example.test/api/alic3x', {
    method, headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    ...(method === 'POST' ? { body } : {}),
  })
  try {
    delete process.env.ALIC3X_ACCESS_TOKEN
    assert.equal((await handler(request('{}'))).status, 503)
    process.env.ALIC3X_ACCESS_TOKEN = 'test-access'
    process.env.AI_GATEWAY_MODEL = 'test/model'
    assert.equal((await handler(request('{}', 'wrong'))).status, 401)
    assert.equal((await handler(request('', 'test-access', 'GET'))).status, 405)
    for (const body of ['not json', 'null', '{}', '{"message":" "}', JSON.stringify({ message: 'x'.repeat(4001) })]) {
      assert.equal((await handler(request(body))).status, 400)
    }
    assert.equal((await handler(request('x'.repeat(16385)))).status, 413)
    assert.equal(calls, 0)
    const response = await handler(request('{"message":" Help "}'))
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('cache-control'), 'no-store')
    assert.deepEqual(await response.json(), { text: 'Answer: Help' })
    assert.equal(calls, 1)
    const failed = createHandler(async () => { throw new Error('private provider detail') })
    const failure = await failed(request('{"message":"Hi"}'))
    assert.equal(failure.status, 502)
    assert.ok(!(await failure.text()).includes('private provider detail'))
  } finally {
    if (oldToken === undefined) delete process.env.ALIC3X_ACCESS_TOKEN
    else process.env.ALIC3X_ACCESS_TOKEN = oldToken
    if (oldModel === undefined) delete process.env.AI_GATEWAY_MODEL
    else process.env.AI_GATEWAY_MODEL = oldModel
  }
})
