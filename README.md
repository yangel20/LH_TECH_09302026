# Nexo: get recommended, and described correctly, by AI shopping assistants

> **Live demo:** https://nexo-one-cyan.vercel.app, no install needed.

![Nexo screenshot](public/screenshot.png)

## What it does
Shoppers increasingly ask AI assistants what to buy, so a brand that the AI leaves out, or
describes wrongly, loses the customer before they ever reach its website. **Nexo** is a B2B
Generative Engine Optimization (GEO) platform that works in four steps:

1. **Monitor**: asks AI assistants realistic shopping questions and tracks which products they recommend.
2. **Analyze**: checks AI claims against the brand's verified product data.
3. **Investigate**: traces each gap to its source (e.g. battery listed in watt-hours, not hours).
4. **Optimize**: recommends fixes that a human approves, then re-tests to prove the fix worked.

This repo is the Nexo website plus an **interactive demo** that walks through a full audit of a
gaming laptop that AI assistants were leaving out. AI responses in the demo are **simulated**,
so it runs with no API keys.

## How to navigate it (judges start here)
1. Open the **live demo** link above.
2. Click **Try the demo** on the home page (or **Demo** in the menu).
3. Click **Run audit**. You'll see a simulated AI answer that leaves out the client's laptop, then
   Nexo's analysis of why, then a recommended fix.
4. Click **Approve fix & re-test**. The laptop now appears in the AI's recommendation.
5. **About** covers our governance approach, impact metrics and team.

## Tech / frameworks
- **React 18** + **Vite**, JavaScript, React Router, plain CSS with design tokens
- **Vercel** hosting (free Hobby plan) + a Vercel Function (`api/health.js`) as the backend slot
- Built with a multi-agent AI workflow: **Claude Code** (lead, architect, reviewer) and several
  **OpenAI Codex** agents (parallel builders), coordinated through `AGENTS.md` and `TASKS.md`,
  one git branch per agent (see `WORKFLOW.md`)

## How to run it
You don't need to: use the live link. To run locally (Node.js 18+):

```bash
./run.sh
```
Expected output:
```
Live version: https://nexo-one-cyan.vercel.app
Installing dependencies...
Building...
Starting Nexo on http://localhost:4173 ...
Waiting for startup
Running an example curl to check the app is working
{
  "app": "nexo",
  "status": "ok",
  "version": "0.1.0",
  "time": "2026-09-30T15:00:00.000Z"
}
GET / -> HTTP 200
Open http://localhost:4173 in your browser. Press Ctrl+C to stop.
```
For development with hot reload: `npm install && npm run dev`.

## Project structure
```
src/
  pages/        Home, Demo, About
  sections/     Hero, Features (home page sections)
  components/   Nav, Footer
  styles/       tokens.css (design system)
  lib/          api client, demo data
api/            Vercel Functions (backend)
scripts/        local API runner, agent setup script
CONTENT.md      all site text, written by our business team
AGENTS.md       rules shared by every AI agent
TASKS.md        task board the agents worked from
WORKFLOW.md     how we ran Claude + Codex in parallel
run.sh          build + run + health check
```

## Roadmap
- Mini-CRM backend: client accounts, product catalogs, audit history and fix approvals.

## Team (LH)
| Name | Role |
|------|------|
| [TODO] | |
