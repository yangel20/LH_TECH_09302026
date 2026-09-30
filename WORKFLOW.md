# How to run the Claude + Codex workflow

**Roles**
- **You**: dispatcher. You start the agents, paste their prompts, and tell Claude when to review.
- **Claude Code**: lead. Builds the demo page, reviews Codex's work, merges to `main`.
- **Codex**: builder. Builds the Hero, Features and About sections in parallel, one folder each.
- **Business team**: writes the words in the Google Doc → you paste them into `CONTENT.md`.

The agents never talk to each other. They coordinate through **TASKS.md** (who does what and its status), **AGENTS.md** (rules), and **git branches**.

```
 main  ──●──────────────●──────●──────●────────▶  (Vercel deploys every push = live site)
          \            /      /      /
 claude    ●──demo────●      /      /
            \               /      /
 codex-hero  ●──hero───────●      /
              \                  /
 codex-feat    ●──features──────●         ...about works the same way
```

---

## Step 0: One-time setup (about 15 min)
Install: Node.js LTS, Git, GitHub CLI (`gh`), then
```bash
npm install -g @anthropic-ai/claude-code @openai/codex
```
Create the repo and connect Vercel:
```bash
cd LH_TECH_09302026
git init -b main && git add . && git commit -m "chore: Nexo starter kit"
gh auth login
gh repo create LH_TECH_09302026 --public --source=. --push
```
Then go to **vercel.com → Add New → Project → Import** `LH_TECH_09302026` → **Deploy** (it auto-detects Vite).
Copy the URL it gives you (e.g. `https://lh-tech-09302026.vercel.app`) into `README.md` and `run.sh` (`LIVE_URL`).

## Step 1: Start the parallel build (about 5 min)
```bash
./scripts/setup-agents.sh hero features about
```
This creates 3 sibling folders, each with its own branch. Open **4 terminal windows**:

| Window | Command | Agent works on |
|---|---|---|
| 1 | `cd LH_TECH_09302026 && git switch -c agent/claude-demo && claude` | Demo page (#5) |
| 2 | `cd LH_TECH_09302026-codex-hero && codex` | Hero (#3) |
| 3 | `cd LH_TECH_09302026-codex-features && codex` | Features (#4) |
| 4 | `cd LH_TECH_09302026-codex-about && codex` | About (#6) |

Start with only 1 or 2 Codex agents if 4 windows is too much to watch.

## Step 2: Paste the build prompts

**Window 1, Claude:**
```
Read CLAUDE.md, AGENTS.md, TASKS.md and CONTENT.md. Do task #5 on this branch.
Build the demo as a step-by-step simulated audit of the gaming-laptop example in CONTENT.md.
Put the fake data in src/lib/demoData.js. Make the "Approve fix" step show human review.
Label it "Simulated". Run npm run build, commit, push the branch, set #5 to REVIEW.
```

**Windows 2–4, Codex** (change the number: hero = 3, features = 4, about = 6):
```
Read AGENTS.md, TASKS.md and CONTENT.md. You own task #3 only; edit only its files.
Set it IN PROGRESS. Build it with the classes and CSS variables from src/styles/tokens.css,
using text from CONTENT.md. Check it at 375px and 1280px with npm run dev.
Run npm run build. Commit, then `git push -u origin HEAD`. Set the task to REVIEW.
```

While they work, check Vercel's **preview URL** for each pushed branch (shown on the Vercel dashboard and on GitHub).

## Step 3: Review and merge (repeat for each branch)
When a Codex task says REVIEW, go to **window 1** and paste:
```
Review branch agent/codex-hero against AGENTS.md: git fetch && git diff main...origin/agent/codex-hero
Check file ownership, hard-coded colors, text matches CONTENT.md, mobile layout, accessibility.
If it passes: merge it into main, run npm run build, push main, set the task to DONE.
If not: give me a numbered list of fixes to paste to Codex.
```
If fixes are needed, paste the list into that Codex window, then review again.

For a second opinion on Claude's work, paste into any **Codex** window:
```
Review branch agent/claude-demo against AGENTS.md. Don't edit anything.
List bugs, accessibility and mobile problems, most severe first.
```
Paste Codex's list back into Claude, then have Claude merge its own branch.

## Step 4: When the business team changes the Doc
Paste the new text into `CONTENT.md`, commit to `main`, then tell Claude:
```
CONTENT.md changed: git diff HEAD~1 CONTENT.md. List which components now show outdated
text. Fix the ones you own and add tasks to TASKS.md for the Codex-owned ones.
```

## Step 5: Submit
Tell Claude:
```
Final check: open the live Vercel URL and check every page and link works, then run ./run.sh
from a fresh clone. Check the README has the live link, what it does, tech used,
how to navigate, and how to run. List anything missing.
```
Add a screenshot to `public/screenshot.png`, push, and submit the GitHub repo link.

---

## Golden rules
- **`main` = live site.** Only merge things that build. Broke it? `git revert HEAD && git push`.
- **One task = one agent = one folder.** Never run two agents in the same folder.
- **Agents stay in their lane.** If they need someone else's file, they write a Request in TASKS.md, and you pass it to Claude.
- **Merge often.** Small branches merged every 30–60 minutes cause far fewer conflicts than one big merge at the end.
- **Conflict in TASKS.md?** That's normal; keep both sides' status lines.
