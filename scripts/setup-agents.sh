#!/usr/bin/env bash
# Creates one folder (git worktree) + branch per Codex task, so agents work in parallel
# without touching each other's files. Run from the repo root:
#
#   ./scripts/setup-agents.sh hero features about
#
set -e
ROOT="$(git rev-parse --show-toplevel)"
PARENT="$(dirname "$ROOT")"
NAME="$(basename "$ROOT")"

[ $# -eq 0 ] && { echo "Usage: $0 <task-name> [task-name...]   e.g. $0 hero features about"; exit 1; }

git -C "$ROOT" pull --ff-only origin main 2>/dev/null || true

for task in "$@"; do
  dir="$PARENT/${NAME}-codex-$task"
  branch="agent/codex-$task"
  if [ -d "$dir" ]; then echo "exists: $dir"; continue; fi
  git -C "$ROOT" worktree add -b "$branch" "$dir" main
  (cd "$dir" && npm install --silent --no-audit --no-fund)
  echo "created: $dir  (branch $branch)"
done

echo
echo "Now open one terminal per agent:"
echo "  Claude (lead):  cd $ROOT && git switch -c agent/claude-demo && claude"
for task in "$@"; do
  echo "  Codex ($task):  cd $PARENT/${NAME}-codex-$task && codex"
done
echo
echo "Cleanup after merge:  git worktree remove <folder> && git branch -d <branch>"
