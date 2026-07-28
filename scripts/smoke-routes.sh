#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://127.0.0.1:4173"

ROUTES=(
  "/"
  "/dashboard"
  "/ecosystem"
  "/discover"
  "/production"
  "/settings"
  "/security"
  "/security/audit"
  "/security/panel"
  "/notifications"
  "/diagnostics"
  "/reset-password"
  "/deployment"
  "/releases"
  "/mobile"
)

NOT_FOUND_ROUTE="/this-route-should-404"

cleanup() {
  if [[ -n "${PREVIEW_PID:-}" ]]; then
    kill "${PREVIEW_PID}" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

echo "Starting Vite preview server..."
npm run preview -- --host 127.0.0.1 --port 4173 >/tmp/musaix-preview.log 2>&1 &
PREVIEW_PID=$!

for i in {1..30}; do
  if curl -sf "${BASE_URL}/" >/dev/null; then
    break
  fi
  sleep 1
  if [[ "$i" -eq 30 ]]; then
    echo "Preview server did not start in time"
    exit 1
  fi
done

echo "Running route checks..."
for route in "${ROUTES[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${route}")
  if [[ "$status" != "200" ]]; then
    echo "Route failed: ${route} (HTTP ${status})"
    exit 1
  fi
  echo "✓ ${route}"
done

not_found_status=$(curl -s -o /tmp/musaix-not-found.html -w "%{http_code}" "${BASE_URL}${NOT_FOUND_ROUTE}")
if [[ "$not_found_status" != "200" ]]; then
  echo "Not-found fallback route failed: ${NOT_FOUND_ROUTE} (HTTP ${not_found_status})"
  exit 1
fi

if ! grep -q '<div id="root"></div>' /tmp/musaix-not-found.html; then
  echo "Not-found fallback did not return SPA shell HTML"
  exit 1
fi

echo "✓ ${NOT_FOUND_ROUTE} returns SPA fallback shell"
echo "Route smoke test passed"
