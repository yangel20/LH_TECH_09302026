# Nexo: Connecting brands to better answers.

> **Live demo:** https://nexo-one-cyan.vercel.app, no install needed.

## What it does
Shoppers increasingly ask AI assistants what to buy, so a brand that the AI leaves out, or
describes wrongly, loses the customer before they ever reach its website. **Nexo** is a B2B
Generative Engine Optimization (GEO) platform that works in four steps:

1. **Monitor**: asks AI assistants realistic shopping questions and tracks which products they recommend.
2. **Analyze**: checks AI claims against the brand's verified product data.
3. **Investigate**: traces each gap to its source (e.g. battery listed in watt-hours, not hours).
4. **Optimize**: recommends fixes that a human approves, then re-tests to prove the fix worked.

This repo is the Nexo website plus an **interactive demo**: a simulated audit of Niek, a fictional
running brand, from product data to an AI visibility dashboard and a consultation booking.
Everything in the demo is **simulated** (fictional brands, mock numbers, no AI models are called),
so it runs with no API keys.

## How to navigate it (judges start here)
1. Open the **live demo** link above. The menu has four pages: **Home, Mission, About Us, Demo**.
2. **Home**: what Nexo does, the problem, how it works (4 steps), our 90-day goal, testimonials.
3. **Mission** and **About Us**: mission, vision, values, our story, the five founders, governance.
4. **Demo** (5 steps, everything pre-filled, just click **Next**):
   1. **Start**: brand form for Niek (company, email, website, location, industry) with a sample
      product CSV attached. You can replace it with your own CSV; it is only read in your browser.
   2. **Competitors**: remove or add competitor brands (fictional suggestions provided).
   3. **Test data**: click **Generate test data** to see synthetic shopper prompts from Nexo's
      internal AI, then choose which AI models to test against.
   4. **Dashboard**: a CRM-style AI visibility report (KPIs, coverage over time, brand ranking,
      per-prompt results, visibility index). Try the model tabs and hover the chart.
   5. **Consultation**: pick times to meet a Nexo data analyst and consultant, then **Request consultation**.

## Tech / frameworks
- **React 18** + **Vite**, JavaScript, React Router, plain CSS with design tokens
- **Vercel** hosting (free Hobby plan) + a Vercel Function (`api/health.js`) as the backend slot
- Built with a multi-agent AI workflow: **Claude Code** (lead, architect, reviewer) and several
  **OpenAI Codex** agents (parallel builders), coordinated through `AGENTS.md` and `TASKS.md`,
  one git branch per agent

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
  pages/        Home, Mission, About, Demo (demo/ holds the 5 demo steps)
  sections/     Hero, Features, Metrics, Testimonials, CallToAction (home page)
  components/   Nav, Footer, Avatar
  styles/       tokens.css (design system)
  lib/          company.js (site text), demoData.js + dashboardData.js (demo mock data), csv.js
api/            Vercel Functions (backend)
docs/           architecture plan + wireframes for the real product
scripts/        local API runner
CONTENT.md      all site text, written by our business team
AGENTS.md       rules shared by every AI agent
TASKS.md        task board the agents worked from
run.sh          build + run + health check
```

## Roadmap
Planning docs for the real product: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) (system design,
data pipeline, storage, budget) and [docs/WIREFRAMES.md](docs/WIREFRAMES.md) (every screen).

- Mini-CRM backend: client accounts, product catalogs, audit history and fix approvals.

## Team (LH)
| Name | Role |
|------|------|
| Racielly Mella | Chief Executive Officer (CEO) |
| Chiamaka Elezieanya | Chief Financial Officer (CFO) |
| Lena George | Chief Marketing Officer (CMO) |
| Yangel Aguilera | Chief Technology Officer (CTO) |
| Daniela Loveridge | Chief Operating Officer (COO) |
