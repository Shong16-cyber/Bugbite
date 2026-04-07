# 🐛 BugBite — From Fear to Fork

A playful, AI-powered web app that guides users from insect-phobia to insect-foodie through a two-level gamified journey.

---

## The Problem

Insects are one of the most sustainable protein sources on the planet, but fear and disgust prevent most people from even learning about them. BugBite bridges that gap — not with lectures, but with play.

**Emotional arc:** Fear → Fascination → Familiarity → Food

---

## How It Works

The two levels are **connected** — your quiz answers in Level 1 shape the recipes you see in Level 2.

### 🌱 Level 1 — Bug Discovery

- **3-Stage Bug Quiz**
  - Stage 1: How scared are you? What bug features creep you out? → determines food form (e.g., hates legs → powder-based recipes)
  - Stage 2: What flavors and textures do you like? How lazy are you? → determines cooking style and difficulty
  - Stage 3: Get matched with your "spirit bug" persona + a preview of your top 3 personalized recipes
- **Cultural World Map** — Explore insect dishes from 8–10 cultures around the world

### 🍳 Level 2 — Bug Kitchen

- **Personalized Recipe Library** — Cartoon-style recipes sorted by your quiz profile. Someone who's squeamish + likes crunchy + is lazy sees "5-Min Roasted Cricket Crumble" first, not "Whole Scorpion Stir-Fry."
- **Gesture Cooking Game** *(stretch goal)* — DIY an insect dish by combining ingredients with hand gestures, then get a fun AI rating on your creation

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js (React) + Tailwind CSS |
| AI | Claude API (quiz logic, recipe matching, cooking game rating) |
| Gesture Recognition | MediaPipe Hands (stretch goal) |
| Backend & DB | Supabase |
| Hosting | Vercel |

---

## Team

| Role | Name |
|---|---|
| **Proposer** | [Your Name] |
| **Developer** | Su hyun Jung |

---

## Timeline & Check-In Points

| Check-In | Target Date | Expected Progress |
|---|---|---|
| **Check-in 1** | Week [X] | Scaffolding complete and deployed on Vercel. Landing page with navigation live. Quiz UI built — 3 stages clickable with placeholder questions. |
| **Check-in 2** | Week [X] | Bug Quiz fully functional with Claude API (3 stages → persona result + 3 personalized recipe cards). Cultural World Map implemented. |
| **Check-in 3** | Week [X] | Recipe Library complete with personalized sorting, filters, and detail views. Full polish pass (animations, transitions, visual consistency). All P0 + P1 issues closed. Stretch: gesture cooking game if time allows. |

> Dates to be filled in after confirming with developer.

---

## Links

- [SPEC.md](./SPEC.md) — User stories, acceptance criteria, fee breakdown
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design (to be added by developer)
