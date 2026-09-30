# Nexo: Connecting brands to better answers.

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
1. Open the **live demo** link above. The menu has four pages: **Home, Mission, About Us, Demo**.
2. **Home**: what Nexo does, the problem, how it works (4 steps), our 90-day goal, testimonials.
3. **Mission**: mission, vision, values, and our goals vs. how we work.
4. **About Us**: our story, the five founders, and how we keep AI answers honest.
5. **Demo** (coming next): a simulated audit of a gaming laptop that AI assistants leave out.

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
  pages/        Home, Mission, About, Demo
  sections/     Hero, Features, Metrics, Testimonials, CallToAction (home page)
  components/   Nav, Footer, Avatar
  styles/       tokens.css (design system)
  lib/          company.js (all site text, from CONTENT.md), api client
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
| Racielly Mella | Chief Executive Officer (CEO) |
| Chiamaka Elezieanya | Chief Financial Officer (CFO) |
| Lena George | Chief Marketing Officer (CMO) |
| Yangel Aguilera | Chief Technology Officer (CTO) |
| Daniela Loveridge | Chief Operating Officer (COO) |
