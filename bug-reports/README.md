# Mid-point Bug Reports — 2026-05-04

Four bug reports filed against commit `62e4dc1` (PR #12 merged), prepared by
the proposer (Suzy Hong) during the Week 4 mid-point check.

| # | File | Title | Severity |
|---|---|---|---|
| 1 | [01-quiz-progress-label-says-stage-1-of-2.md](01-quiz-progress-label-says-stage-1-of-2.md) | Quiz progress label reads "Stage 1 of 2" but the SPEC defines a 3-stage quiz | Major |
| 2 | [02-quiz-auto-advances-no-back-button.md](02-quiz-auto-advances-no-back-button.md) | Quiz answers auto-advance on click — single misclick is unrecoverable | Major |
| 3 | [03-retake-quiz-doesnt-clear-stale-session-storage.md](03-retake-quiz-doesnt-clear-stale-session-storage.md) | "Retake quiz" does not clear sessionStorage — abandoning a retake leaves stale answers on /quiz/result | Major |
| 4 | [04-mobile-navbar-overflow.md](04-mobile-navbar-overflow.md) | Navbar overflows / wraps on mobile widths (≤ 414px) | Minor |

## How to file these as GitHub Issues

### Option A — Web UI (no extra tooling)

1. **Push the `screenshots/` folder first** so the `![alt](../screenshots/...)` links resolve once the bug-report files are committed:
   ```bash
   git add screenshots bug-reports README.md
   git commit -m "docs: mid-point bug reports + screenshots"
   git push
   ```
2. Open https://github.com/GIX-Luyao/final-project-codebase-Suzy-Hong/issues/new
3. For each bug report file:
   - Copy everything **after** the `**Issue Title:** …` line into the issue body.
   - Paste the title (everything after `**Issue Title:**`) into the title field.
   - Add the `bug` label.
   - Submit.

### Option B — `gh` CLI

```bash
brew install gh
gh auth login
cd <repo-root>
for f in bug-reports/0[1-4]*.md; do
  title=$(grep -m1 -E '^\*\*Issue Title:\*\*' "$f" | sed -E 's/^\*\*Issue Title:\*\*[[:space:]]*//')
  body=$(awk '/^\*\*Issue Title:\*\*/{found=1;next} found' "$f")
  gh issue create --title "$title" --body "$body" --label bug
done
```

### Option C — `curl` + a token (no `gh` install)

```bash
export GITHUB_TOKEN=ghp_xxx   # token with `repo` (or fine-grained Issues:RW) scope
./bug-reports/file-issues.sh
```

The script lives at [`file-issues.sh`](file-issues.sh) and uses `curl` + `jq` against `POST /repos/{owner}/{repo}/issues`. It strips the `**Issue Title:**` line from each `.md` file, uses the rest as the body, and labels each issue `bug`.
