# BugBite - From Fear to Fork

A gamified web app that guides users from insect-phobia to insect-foodie through a two-level journey.

**Emotional arc:** Fear -> Fascination -> Familiarity -> Food

## Stack

- [Next.js 15](https://nextjs.org) (App Router + TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com) (hosting)

## Getting Started

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Fill in your Supabase keys
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Team

| Role | Name |
|---|---|
| Proposer | Suzy Hong |
| Developer | Su hyun Jung |

## Timeline

| Check-In | Target Date | Original Plan | Actual Status (as of 2026-05-04) | On Track? |
|---|---|---|---|---|
| Week 4 (Mid-Point) | 2026-05-04 | ARCHITECTURE.md merged. Scaffolding deployed on Vercel. Landing page live. Quiz UI clickable with placeholder questions. | ARCHITECTURE.md merged (PR #?). Scaffolding merged (PR #10). Landing page merged (PR #11). 3-stage Bug Quiz with real preference data capture merged (PR #12). Vercel deploy not verified by proposer. | Yes — quiz UI is more complete than the milestone required (real questions, not placeholders). Persona result + recipe cards (Issue #4) still pending and is the next blocker. |
| Week 6 | 2026-05-18 | Bug Quiz fully functional (Claude API integrated). Persona result screen with 3 recipe cards. Cultural World Map live. | Pending — Issue #4 (persona + recipe matching via Claude API) and Issue #5 (Cultural World Map) not yet started. /map currently a "Coming soon" placeholder. | At risk — both Issues #4 and #5 must land in the next 2 weeks. Recommend prioritizing #4 first since it unblocks the core quiz→recipe loop. |
| Week 9 | 2026-06-08 | Recipe Library complete with sorting, filters, detail views. Full polish pass. All P0 + P1 closed. Stretch PR #7 if time allows. | Pending — Issue #6 (Recipe Library) not started. /kitchen currently a "Coming soon" placeholder. | Achievable if Week 6 milestones land on time. P2 stretch (gesture cooking game) is unlikely without scope cut. |

**Mid-point check completed: 2026-05-04 (proposer: Suzy Hong).** See open Issues for bugs filed against the current build.
