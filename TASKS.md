# TASKS.md — shared task board

Status: TODO -> IN PROGRESS -> REVIEW -> DONE
Owners: Claude (lead), Codex, Human

## Phase 1 — Foundation (DONE in starter kit)
| # | Task | Owner | Files | Status |
|---|------|-------|-------|--------|
| 1 | React/Vite shell, routes, nav, footer, design tokens | Claude | src/App.jsx, src/components/*, src/styles/tokens.css | DONE |
| 2 | README, run.sh, Vercel config, /api/health | Claude | README.md, run.sh, vercel.json, api/ | DONE |

## Phase 2 — Company website (text data: src/lib/company.js, from CONTENT.md)
| # | Task | Owner | Files | Status |
|---|------|-------|-------|--------|
| 2b | Company setup: brand tokens, logo nav, routes, company.js, Avatar, footer, placeholders | Claude | tokens.css, App.jsx, main.jsx, index.html, src/components/*, src/lib/company.js | DONE |
| 3 | Home sections: Hero (slogan, description, 2 buttons, the problem + 2 risks), How it works (4 steps + "What makes us different", keep `id="how-it-works"`), Metrics (20% headline WITH the goals label), Testimonials (3 quotes + disclaimer line, always), Call to action | Codex (hero) | src/sections/Hero.jsx+.css, Features.jsx+.css, Metrics.jsx+.css, Testimonials.jsx+.css, CallToAction.jsx+.css | DONE |
| 4 | Mission page: Mission, Vision, Values (4), Metrics: goals under "Our 90-day goals for every client" + "How we work" process facts | Codex (mission) | src/pages/Mission.jsx, Mission.css | DONE |
| 5 | Demo: 7-step simulated audit for fictional brand Niek (form, competitors, monitor, analyze, investigate, optimize, re-test) | Claude | src/pages/Demo.jsx+.css, src/pages/demo/*, src/lib/demoData.js, src/lib/csv.js, public/demo/ | DONE |
| 6 | About Us page: Our story, "Meet the founders" grid (5, use `<Avatar>`), "How we keep AI answers honest" (6 items), `<CallToAction />` at the bottom | Codex (about) | src/pages/About.jsx, About.css | DONE |

## Phase 3 — Review & polish
| # | Task | Owner | Files | Status |
|---|------|-------|-------|--------|
| 7 | Cross-review: Codex reviews Claude's demo branch (no edits, list issues) | Codex | — | TODO |
| 8 | Review + merge each Codex branch | Claude | — | TODO |
| 9 | Accessibility + mobile pass on main | Claude | any | TODO |
| 10 | Screenshot for README, check live Vercel URL, submit repo link | Human | README.md, public/ | TODO |

## Later (not now)
- Mini-CRM backend: clients, products, audits, approvals (Vercel Functions + a database)

## Requests (need a change in a file you don't own)
- Human (business): real team email for "Contact us" (placeholder contact@nexo.example in use) → Lead sets `cta.email` in src/lib/company.js
- Human (business): optional one-line founder bios → Lead sets `bio` in src/lib/company.js
