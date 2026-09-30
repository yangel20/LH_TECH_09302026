# HANDOFF.md — context from the planning chat (read this first)

This file summarizes decisions made with Claude in a separate planning chat, so a Claude Code
session in the terminal can pick up where it left off. Written 2026-09-30.

## The hackathon
- Team **LH**. Repo and submission name: `LH_TECH_09302026` (GitHub user: yangel20).
- Submission rules: public GitHub repo link; README must explain what the app does, tech used,
  how judges navigate it, how to run it; a `run.sh` in the root that builds/runs the app;
  hosting strongly recommended (we use **Vercel**, free Hobby plan).
- Yangel (CTO) is the only technical person; teammates are business-side and write in a Google Doc.
  Yangel is most comfortable with JavaScript. Machine: Intel MacBook, zsh, nvm Node v23.7.0.
  Avoid `brew install` (Intel Macs are unsupported by Homebrew now, so it compiles from source).

## The product: Nexo
- Nexo is a B2B GEO (Generative Engine Optimization) consulting and analytics company that
  researches how AI recommends products, finds why brands are overlooked or misrepresented, and
  helps companies improve the information AI relies on.
- Slogan: **Connecting brands to better answers.**
- 4-step method: Monitor → Analyze → Investigate → Optimize (human-approved fixes, then re-test).
- Founders: Racielly Mella (CEO), Chiamaka Elezieanya (CFO), Lena George (CMO),
  Yangel Aguilera (CTO), Daniela Loveridge (COO).
- ALL site copy lives in `CONTENT.md`. Don't invent copy.

## Honesty rules we agreed on (keep these)
- Metrics: "20%" figures are shown as **"Our 90-day goals for every client"**, not past results.
- Testimonials are fictional small-business owners and must show the line:
  "Illustrative testimonials. Nexo is a new company; these represent the small businesses we're built to serve."
- Anything simulated (the future demo) is labeled "Simulated". Demo uses fictional brands only.

## Tech stack (already scaffolded)
- React 18 + Vite, plain JavaScript (JSX), React Router, plain CSS with design tokens.
- `src/styles/tokens.css` = design tokens. `api/health.js` = a Vercel Function; `scripts/local-api.js`
  runs `/api/*` locally during `npm run dev`/`preview`. No database. A mini-CRM backend is planned for LATER, not now.
- `vercel.json` rewrites all non-/api routes to index.html (SPA).
- `run.sh`: npm install → build → vite preview on :4173 → curls /api/health and / (matches judges' example).

## Brand
- Logo files in `public/brand/`: `nexo-logo.svg` (light backgrounds), `nexo-logo-light.svg`
  (dark mode: purple swapped to near-white), `nexo-icon.svg` + `nexo-icon-512.png` (N mark).
  Favicons in `public/`: `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`.
  The SVG uses #3b1b5c / #00bd83, visually identical to the brand #351B5C / #00BB7D.
- Colors from the logo: purple **#351B5C** (primary), green **#00BB7D** (accent only; never white
  text on green, it fails contrast). Lighten the purple for dark mode.
- Team photos go in `public/team/<first-last>.jpg` (e.g. `racielly-mella.jpg`), 600px, <300 KB.
  Missing photo → show initials (Avatar component).

## Multi-agent workflow
- Claude Code = Lead: owns tokens, routes, nav/footer, `src/lib/`, `api/`, config, README, run.sh,
  TASKS.md structure; reviews and merges Codex branches into `main`.
- Codex = builders, one git worktree per task, created with `./scripts/setup-agents.sh <names>`,
  living next to the main folder (e.g. `../LH_TECH_09302026-codex-hero`), on branches `agent/codex-<name>`.
- Rules are in `AGENTS.md` (Codex reads it automatically; CLAUDE.md imports it). Task board is `TASKS.md`.
- `main` = live Vercel site. Only merge what passes `npm run build`.

## Current site plan (priority now: the company website; the demo is paused)
| Route | Page | Built by |
|---|---|---|
| `/` | Home: Hero (slogan + description), How it works, 20% metric, Testimonials, Call to action | Codex (hero) |
| `/mission` | Mission, Vision, Values, Metrics (goals vs process facts) | Codex (mission) |
| `/about` | Our story, Founders grid with photos, Governance & ethics, CTA | Codex (about) |
| `/demo` | Simulated audit of the gaming-laptop example | Claude, LATER |

## Where we are
- [x] Tools installed (gh, claude, codex); repo created and pushed to GitHub.
- [x] `codex-hero` worktree exists.
- [x] Logo + favicon files in `public/` (SVG logos, 2026-09-29)
- [x] Team photos in `public/team/` (all five founders; Racielly's is 200px, others 400px)
- [ ] Assets pushed to GitHub (committed locally on main; Yangel runs `git push origin main`)
- [ ] New CONTENT.md (with SITE MAP section) committed to main: BLOCKS the company setup task
- [ ] Vercel project connected (confirm; put the live URL in README.md and run.sh LIVE_URL)
- [ ] NEXT FOR CLAUDE: the "company setup" task below
- [ ] Then: `./scripts/setup-agents.sh mission about`; merge origin/main into codex-hero; start 3 Codex agents
- [ ] Review + merge each Codex branch; final README/run.sh check; submit repo link
- [ ] Still needed from the team: contact email for the CTA; optional founder bios

## NEXT TASK FOR CLAUDE: company setup (branch agent/claude-company-setup)
1. tokens.css: primary #351B5C, accent #00BB7D, soft/hover shades, dark-mode purple, contrast-safe.
2. Nav shows the logo (<picture> with dark-mode source), favicons + theme-color in index.html.
3. Routes /, /mission, /about, /demo; nav: Home, Mission, About Us, Demo; works at 375px.
4. `src/lib/company.js`: all copy from CONTENT.md as data (slogan, description, steps, values,
   metrics split into goals vs process facts, founders with photo paths, testimonials + disclaimer, CTA).
5. `src/components/Avatar.jsx`: photo with initials fallback.
6. Footer line + small N icon; page title "Nexo | Connecting brands to better answers".
7. Placeholder sections for Codex: Metrics, Testimonials, CallToAction; Home order:
   Hero, Features, Metrics, Testimonials, CallToAction. Placeholder Mission page.
8. Update TASKS.md: #3 Home sections (Codex hero), #4 Mission (Codex mission),
   #6 About Us (Codex about), #5 Demo moved to Later. List exact files per task.
9. `npm run build` passes; check 375px/1280px, light/dark. Merge to main, push.
   Then give Yangel the three Codex prompts (one per worktree) based on company.js.
