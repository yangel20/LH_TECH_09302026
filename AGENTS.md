# AGENTS.md — shared rules for every AI agent on this repo

Both Codex (reads this file automatically) and Claude Code (imports it via CLAUDE.md) follow these rules.

## Project
- **Nexo**: website + interactive demo for a hackathon. All site wording comes from `CONTENT.md`.
- Stack: **React 18 + Vite**, plain JavaScript (JSX, no TypeScript), React Router, plain CSS files.
- Backend: Vercel Functions in `api/` (currently only `api/health.js`). No database yet; a CRM is planned later.
- Hosting: **Vercel** (free Hobby plan). Every push to `main` deploys production; every other branch gets a preview URL.

## Commands
- `npm install`: install
- `npm run dev`: dev server with hot reload (also runs `/api` routes locally)
- `npm run build`: production build. **Must pass before you mark a task REVIEW.**
- `./run.sh`: build + serve + health check (what judges run)

## File ownership (prevents merge conflicts)
Only edit files your task owns. Need a change elsewhere? Add it under "Requests" in TASKS.md.

```
src/styles/tokens.css        -> Lead (Claude) only: colors, spacing, fonts, shared classes (.btn .card .badge)
src/App.jsx, src/main.jsx    -> Lead (Claude) only: routes
src/components/Nav*, Footer  -> Lead (Claude) only
src/pages/Home.jsx           -> Lead (Claude) only: just arranges sections
src/sections/<Name>.jsx+.css -> owner listed in TASKS.md
src/pages/<Name>.jsx+.css    -> owner listed in TASKS.md
src/lib/                     -> Lead (Claude); others may ADD new files
public/                      -> anyone may ADD images; never rename/delete others'
api/, scripts/, vite.config.js, vercel.json, package.json -> Lead (Claude) only
README.md, run.sh, TASKS.md structure -> Lead (Claude) only (anyone may update their own task's Status)
CONTENT.md                   -> Human (business team) only. Agents read it, never edit it.
```

## Coding rules
- All visible text comes from CONTENT.md. Don't invent claims or stats. If something is missing, render `<span className="todo">[TODO: ...]</span>` and add a Request in TASKS.md.
- Function components + hooks only. One component per file. Each component imports its own `.css` file.
- Use CSS variables from `src/styles/tokens.css`. Never hard-code colors. Reuse `.btn`, `.card`, `.badge`, `.container`, `.section`.
- Prefix your CSS class names with your component name (`.hero__title`) so styles don't collide.
- Adding an npm package? Don't. Ask the Lead via Requests. (Keeps package.json conflict-free.)
- Internal links use `<Link to="...">` from react-router-dom, not `<a href>`.
- Mobile first: must look right at 375px and 1280px wide. Accessible: alt text, labels, visible focus, semantic HTML.
- Anything simulated (fake AI answers etc.) must be visibly labeled "Simulated".
- Never put secrets/API keys in `src/`. Anything in `src/` is public.

## Workflow rules
1. Work only on your own branch: `agent/claude-*` or `agent/codex-*`.
2. Before starting, set your task to `IN PROGRESS` in TASKS.md. When done, `REVIEW`.
3. Small commits: `feat(hero): add problem stats`.
4. Never push to `main`. The Lead merges after review.
5. Before `REVIEW`: `npm run build` passes, page renders in `npm run dev` with no console errors.
6. Do not modify this file unless the human asks.
