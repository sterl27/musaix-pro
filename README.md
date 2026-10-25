# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Alic3X assistant (AI Gateway)

Open `/assistant` or select **Alic3X** in the sidebar. This is text assistance,
not an implementation of voice, WhatsApp, outbound calls, knowledge retrieval,
or live session control. Requests are independent; prior chat is display-only.

### Configure on Vercel

In the project dashboard, go to **Settings → Environment Variables** and set:

- `AI_GATEWAY_MODEL`: a supported text model ID from the
  [Gateway model catalog](https://vercel.com/ai-gateway/models).
- `ALIC3X_ACCESS_TOKEN`: a long, random shared assistant access code. Share only
  with trusted testers; enter it in the page's password field. It is not a
  Gateway credential. Rotate it to revoke access.
- `AI_GATEWAY_API_KEY`: optional server-only Gateway key. On Vercel the AI SDK
  can instead authenticate using the deployment's OIDC token. See
  [Gateway authentication](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc).

Set variables for the intended Preview/Production environment and redeploy.
Never prefix credentials with `VITE_`, commit them, or paste a Gateway key into
chat. Without the model and access code, the endpoint returns 503 and makes no
model calls. This PR does not configure credentials or enable production.

The shared code is a prototype gate, not per-user authentication or a distributed
rate limiter. Before broad access, add real user authentication and per-user
quotas. Configure an [AI Gateway budget](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets)
and platform rate limits before sharing access. Authorized requests incur model
charges; input is capped at 4,000 characters and output at 800 tokens. Automatic
retries are disabled. No prompts or provider errors are logged by this endpoint.

Use Node.js 22+ (required by AI SDK 7). For full-stack local development, use
`vercel dev` with the server environment variables above. `npm run dev` serves
only the Vite frontend and does not run the API. Keep local secrets in ignored
environment files. API files run as Vercel Functions; the SPA fallback excludes
`/api` via the first rewrite.

Checks: `npm run build`, `npm run lint`, and
`node --experimental-strip-types --test server/alic3x.test.ts`.
The endpoint tests use a fake generator and do not incur model charges.
