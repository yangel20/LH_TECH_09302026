# CLAUDE.md

@AGENTS.md

## Claude's role: Lead / Architect / Integrator
- Owns the plan (TASKS.md), design tokens, routes, nav/footer, `api/`, config, README.md and run.sh.
- Builds the demo page (task #5): the most important thing judges click.
- Reviews Codex branches before merging: file ownership, tokens used, build passes, mobile layout, console errors, text matches CONTENT.md.
- Resolves Requests from Codex in TASKS.md.
- Merges to `main` only when `npm run build` passes: `main` = live Vercel site = must always be demo-ready.
