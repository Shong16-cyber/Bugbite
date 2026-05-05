#!/usr/bin/env bash
# Files the four prepared bug reports as GitHub Issues.
#
# Prerequisites:
#   1) A GitHub personal access token (classic) with `repo` scope, or a
#      fine-grained token with "Issues: Read and write" on this repo.
#      Create one at https://github.com/settings/tokens
#   2) export GITHUB_TOKEN=ghp_xxx... before running this script.
#   3) (Recommended) commit and push the screenshots folder first so the
#      ![image](../screenshots/foo.png) links resolve to https://github.com/.../raw/main/screenshots/foo.png.
#      This script does NOT push for you — see the README block below.
#
# Run from the repo root:
#   GITHUB_TOKEN=ghp_xxx ./bug-reports/file-issues.sh
#
set -euo pipefail

REPO="GIX-Luyao/final-project-codebase-Suzy-Hong"
API="https://api.github.com/repos/${REPO}/issues"

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "ERROR: set GITHUB_TOKEN first (export GITHUB_TOKEN=ghp_xxx)" >&2
  exit 1
fi

post_issue() {
  local title="$1"
  local body_file="$2"
  local body_json
  body_json=$(jq -Rs --arg t "$title" '{title:$t, body:., labels:["bug"]}' < "$body_file")
  echo "Filing: $title"
  curl -sS \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    -X POST "$API" \
    -d "$body_json" \
    | jq -r '"  -> #\(.number): \(.html_url)"'
}

cd "$(dirname "$0")/.."

# Strip the leading "**Issue Title:** " line from each markdown file and use the
# rest as the issue body (so we can use one source of truth per bug).
extract_title() {
  grep -m1 -E '^\*\*Issue Title:\*\*' "$1" | sed -E 's/^\*\*Issue Title:\*\*[[:space:]]*//'
}
extract_body() {
  awk '/^\*\*Issue Title:\*\*/{found=1; next} found' "$1"
}

for f in bug-reports/0[1-4]*.md; do
  title=$(extract_title "$f")
  tmp=$(mktemp)
  extract_body "$f" > "$tmp"
  post_issue "$title" "$tmp"
  rm -f "$tmp"
done
