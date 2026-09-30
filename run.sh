#!/usr/bin/env bash
# Builds and serves Nexo locally. Judges: you don't need this, the live site is linked in README.md.
set -e
cd "$(dirname "$0")"

PORT="${PORT:-4173}"
LIVE_URL="https://nexo-one-cyan.vercel.app"

echo "Live version: $LIVE_URL"
command -v node >/dev/null 2>&1 || { echo "ERROR: Node.js 18+ is required (https://nodejs.org)" >&2; exit 1; }

echo "Installing dependencies..."
npm install --silent --no-audit --no-fund

echo "Building..."
npm run build --silent

echo "Starting Nexo on http://localhost:$PORT ..."
npx vite preview --port "$PORT" --strictPort >/tmp/nexo-preview.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null' EXIT

echo "Waiting for startup"
for i in $(seq 1 30); do
  curl -s "http://localhost:$PORT/api/health" >/dev/null 2>&1 && break
  sleep 0.5
done

echo "Running an example curl to check the app is working"
curl -s "http://localhost:$PORT/api/health"; echo
curl -s -o /dev/null -w "GET / -> HTTP %{http_code}\n" "http://localhost:$PORT/"

echo "Open http://localhost:$PORT in your browser. Press Ctrl+C to stop."
wait $SERVER_PID
