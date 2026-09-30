# TASKS.md — shared task board

Status: TODO -> IN PROGRESS -> REVIEW -> DONE
Owners: Claude (lead), Codex, Human

## Phase 1 — Foundation (DONE in starter kit)
| # | Task | Owner | Files | Status |
|---|------|-------|-------|--------|
| 1 | React/Vite shell, routes, nav, footer, design tokens | Claude | src/App.jsx, src/components/*, src/styles/tokens.css | DONE |
| 2 | README, run.sh, Vercel config, /api/health | Claude | README.md, run.sh, vercel.json, api/ | DONE |

## Phase 2 — Parallel build
| # | Task | Owner | Files | Status |
|---|------|-------|-------|--------|
| 3 | Hero: pitch, the problem (lost visibility + brand damage), "Try the demo" button | Codex | src/sections/Hero.jsx, Hero.css | TODO |
| 4 | Features: 4 steps (Monitor/Analyze/Investigate/Optimize) + "What makes us different" | Codex | src/sections/Features.jsx, Features.css | TODO |
| 5 | Demo: simulated audit of the gaming-laptop example. Run audit → AI answer omits laptop → Analyze → Investigate (watt-hours, no hours) → Approve fix (human review) → Re-test, laptop now included. Labeled "Simulated". | Claude | src/pages/Demo.jsx, Demo.css, src/lib/demoData.js | TODO |
| 6 | About: governance & ethics, impact metrics, team, closing line | Codex | src/pages/About.jsx, About.css | TODO |

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
- Human (business): fill [TODO]s in CONTENT.md: target market, business model, team
