# Nexo: Connecting brands to better answers.

> **Live demo:** https://nexo-one-cyan.vercel.app, no install needed.

## What it does
Shoppers increasingly ask AI assistants what to buy. If the AI leaves a brand out, or describes
its product wrongly, the brand loses the customer before they ever reach its website. **Nexo** is
a B2B Generative Engine Optimization (GEO) platform for small, medium and large US brands:

1. **Monitor**: ask AI assistants realistic shopper questions built from the brand's own product data.
2. **Analyze**: check what the AI claims against the brand's verified product data.
3. **Investigate**: trace each gap to the exact field that caused it (e.g. "sealed weather
   membrane" but never "waterproof").
4. **Optimize**: a consultant recommends fixes, the client approves them, and Nexo re-tests to
   prove they worked.

## How Nexo is different
Most AI-visibility tools stop at **counting mentions**. Nexo goes from "you're missing" to
"here's why, here's the fix, and here's proof it worked":

| Typical AI-visibility tracker | Nexo |
|---|---|
| Tracks whether the brand is mentioned | Also checks **whether what AI says is true**, against the brand's verified product data |
| Reports a score | **Traces the root cause** to the exact product field or page |
| Leaves the fix to the client | **Human-approved fixes** (analyst + consultant), then a **re-test** that proves the change worked |
| Generic or hand-written prompts | **Synthetic shopper questions generated from the brand's own products and target customers**, by an open model we run ourselves (low cost, data stays private) |
| Built for large marketing teams | Built so **small and local businesses** can compete too |

## What's real vs simulated in this demo
The demo shows the product flow end to end so judges can click through it in two minutes.
It runs with **no API keys**, so AI answers and scores are **simulated** and clearly labeled.

| Real (working in the browser) | Simulated (mock data, labeled) |
|---|---|
| Uploading and parsing your own CSV (read in the browser only, nothing is uploaded) | Question generation ("Nexo's internal AI") |
| Form validation, competitor add/remove (1–8), AI model selection | AI answers and every dashboard number |
| Dashboard recalculates for the competitors and models you chose; model tabs, hoverable chart, legend toggles | The consultation request (nothing is sent) |
| Availability picker and confirmation | Niek and all competitors (fictional brands, `.example` sites) |

The real product (accounts, database, AWS pipeline, real AI calls) is planned in
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/WIREFRAMES.md](docs/WIREFRAMES.md).

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
**Next for the demo** (make core pieces real, still no API keys):
- Generate test questions from *your* uploaded CSV (target customer, features, price) instead of a fixed list.
- "Analyze an AI answer": paste a real ChatGPT answer and get real mention, position and
  wrong-claim detection against your product data.
- A wrong-claims drill-down on the dashboard: AI claim → verified data → root-cause field → suggested fix.

**The real product** ([architecture](docs/ARCHITECTURE.md) · [wireframes](docs/WIREFRAMES.md)):
accounts and login → file upload + ETL → question generation (open model) → AI runs with
caching and budget limits → scoring + dashboard → human-approved fixes and re-tests → scale
(more AI tools, GPU, billing).

## Team (LH)
| Name | Role |
|------|------|
| Racielly Mella | Chief Executive Officer (CEO) |
| Chiamaka Elezieanya | Chief Financial Officer (CFO) |
| Lena George | Chief Marketing Officer (CMO) |
| Yangel Aguilera | Chief Technology Officer (CTO) |
| Daniela Loveridge | Chief Operating Officer (COO) |
