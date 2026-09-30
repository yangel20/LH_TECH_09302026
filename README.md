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
**Website + demo (built):**
| Layer | What we use |
|---|---|
| Front end | **React 18**, **Vite 5**, **React Router 6**, plain JavaScript (JSX) |
| Styling | Plain CSS with a design-token system (`src/styles/tokens.css`): brand colors, light + dark mode, accessibility-checked contrast |
| Charts | Hand-built **SVG** charts (line chart with hover and keyboard support, quadrant chart), using a colorblind-safe palette we validated. No chart library |
| Data | A small in-browser **CSV parser** (`src/lib/csv.js`); uploaded files never leave the browser |
| Backend | **Vercel Function** (`api/health.js`), also run locally by `scripts/local-api.js` |
| Hosting | **Vercel** (free plan): every push to `main` deploys the live site |
| Dependencies | Only 3 runtime packages: `react`, `react-dom`, `react-router-dom` |

**Real product (planned, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)):** Node.js modular
monolith on **AWS** (ECS Fargate web + worker, SQS, PostgreSQL on RDS, Redis, S3 → Glacier,
SES), an open model on **Ollama** for question generation and answer judging, and the
**OpenAI API** for AI answers.

## How we used AI to build this
Our CTO, Yangel Aguilera, is the team's only technical person. To build a full website, an
interactive demo and a product plan in a hackathon, he ran a small **AI development team**
and kept the decisions for himself:

- **Claude Code (lead / architect):** planned the work, built the design system, routes,
  navigation and the demo, wrote the architecture and wireframe docs, and **reviewed and merged**
  every other agent's work (checking file ownership, colors, text, mobile layout and the build).
- **OpenAI Codex (builders):** three agents worked **in parallel**, each in its own git
  worktree and branch, building the Home sections, the Mission page and the About Us page.
- **The business team** wrote every word of site copy in a shared doc, which became `CONTENT.md`;
  agents may read it but never invent copy.
- **Yangel (human in charge):** set the direction, sketched the real product on a whiteboard,
  made every product decision (demo flow, dashboard, pricing tiers, storage, security), and
  approved each change before it went live.

**Workflow and guardrails:**
1. **Rules in the repo:** `AGENTS.md` (shared rules and file ownership, so agents never edit the
   same files), `CLAUDE.md` (the lead's role) and `TASKS.md` (the task board every agent updates).
2. **One branch per task:** agents work on `agent/*` branches; `main` is the live site and only
   receives reviewed work that passes `npm run build`.
3. **Review before merge:** the lead checks each branch against the rules and CONTENT.md, takes
   screenshots at phone and desktop size in light and dark mode, and sends a numbered fix list
   back to the agent when something is off (e.g. a wrong heading).
4. **Local first, deploy in batches:** changes are merged and previewed locally; Yangel pushes
   to `main` (which updates the live site) only when a meaningful batch is ready.
5. **Honesty rules:** goals are labeled as goals, testimonials as illustrative, and everything
   simulated as "Simulated". The demo uses only fictional brands.
6. **From whiteboard to plan:** Yangel's whiteboard sketch of the real system was turned into
   [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/WIREFRAMES.md](docs/WIREFRAMES.md)
   through a question-and-answer session with the lead agent.

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
