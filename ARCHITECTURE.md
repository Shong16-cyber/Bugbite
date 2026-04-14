# BugBite: From Fear to Fork

> Developer: Su hyun Jung  
> Proposer: Suzy Hong  
> Last Updated: 2026

---

## 1. System Overview (C4 - Level 1: Context)

BugBite is a gamified, AI-powered web application. Users interact with it through a browser (no installation required). The system integrates with three external AI services and one database platform.

```
┌──────────────────────────────────────────────────────────────┐
│                        BugBite Web App                        │
│                  (Next.js, hosted on Vercel)                  │
└────────┬────────────────┬────────────────┬────────────────────┘
         │                │                │
         ▼                ▼                ▼
   ┌──────────┐    ┌────────────┐   ┌────────────────┐
   │ Supabase │    │ Claude API │   │ Google AI      │
   │ (DB/Auth)│    │ (Quiz logic│   │ Studio         │
   │          │    │  AI rating)│   │ (Recipe match) │
   └──────────┘    └────────────┘   └────────────────┘
```

**External Actors:**
- **User** - visits the app via browser, completes the quiz, browses recipes
- **Supabase** - stores quiz results, recipe data, and user sessions
- **Claude API** - powers quiz persona generation and cooking game AI rating
- **Google AI Studio** - used for recipe matching logic (optional fallback / comparison)

---

## 2. Container Diagram (C4 - Level 2)

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Application                   │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Pages /    │  │  API Routes  │  │  Components   │  │
│  │  App Router │  │  /api/*      │  │  (UI Layer)   │  │
│  │             │  │              │  │               │  │
│  │  - /        │  │  - /quiz     │  │  - QuizFlow   │  │
│  │  - /quiz    │  │  - /recipes  │  │  - WorldMap   │  │
│  │  - /kitchen │  │  - /persona  │  │  - RecipeCard │  │
│  │  - /map     │  │  - /rating   │  │  - CookGame   │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌────────────┐   ┌────────────┐   ┌───────────────┐
   │  Supabase  │   │ Claude API │   │ Google AI     │
   │            │   │            │   │ Studio API    │
   │ - users    │   │ - /messages│   │               │
   │ - sessions │   │            │   │               │
   │ - recipes  │   └────────────┘   └───────────────┘
   │ - personas │
   └────────────┘
```

**Key Containers:**

| Container | Technology | Responsibility |
|---|---|---|
| Frontend (Pages) | Next.js App Router | Page routing, SSR/SSG |
| UI Components | React + Tailwind CSS | Quiz flow, map, recipe cards |
| API Routes | Next.js API Routes (Edge/Node) | Proxy to AI services, DB calls |
| Database | Supabase (PostgreSQL) | Persist quiz answers, recipes, sessions |
| AI Layer | Claude API + Google AI Studio | Persona generation, recipe matching, cooking rating |

---

## 3. Component Diagram (C4 - Level 3)

### Level 1 - Bug Discovery

```
QuizFlow Component
├── Stage1 (Fear Assessment)
│   ├── QuizQuestion (multiple choice)
│   └── AnswerCapture -> writes to quizState
├── Stage2 (Flavor/Effort Preferences)
│   ├── QuizQuestion
│   └── AnswerCapture -> writes to quizState
└── Stage3 (Persona Result)
    ├── PersonaCard (bug name, illustration, fun facts)
    ├── RecipePreviewCards (top 3, personalized)
    └── CTA -> /kitchen

WorldMap Component
├── InteractiveMap (SVG or Mapbox GL)
├── RegionPin (clickable, 8-10 regions)
└── DishCard (dish name, bug, cultural context)
```

### Level 2 - Bug Kitchen

```
RecipeLibrary Component
├── RecipeGrid (sorted by quiz match score)
├── RecipeCard (name, bug, difficulty, food form)
├── FilterBar (insect type, difficulty, food form, flavor)
└── RecipeDetail (ingredients, steps, nutrition, "why picked")

CookingGame Component (P2 Stretch)
├── IngredientPanel (draggable items)
├── CookingCanvas (2D flat, animated)
├── GestureController (MediaPipe Hands via webcam)
└── AIRatingPanel <- Claude API response
```

---

## 4. Data Model

### `users`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key (Supabase Auth) |
| `created_at` | timestamp | |
| `session_id` | text | For anonymous users |

### `quiz_sessions`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK -> users (nullable for anon) |
| `created_at` | timestamp | |
| `fear_triggers` | text[] | e.g. `["legs", "antennae"]` |
| `texture_pref` | text | `"crunchy"` / `"chewy"` / `"smooth"` |
| `flavor_profile` | text[] | e.g. `["savory", "spicy"]` |
| `effort_level` | text | `"lazy"` / `"medium"` / `"ambitious"` |
| `persona_id` | text | FK -> personas |

### `personas`
| Column | Type | Notes |
|---|---|---|
| `id` | text | e.g. `"cricket_curious"` |
| `name` | text | Display name |
| `description` | text | Personality blurb |
| `fun_facts` | text[] | |
| `edibility_info` | text | |
| `illustration_url` | text | Cartoon bug image |
| `match_rules` | jsonb | Logic for matching quiz answers to persona |

### `recipes`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | |
| `insect_type` | text | e.g. `"cricket"`, `"mealworm"` |
| `food_form` | text | `"whole"` / `"pieces"` / `"powder"` / `"invisible"` |
| `difficulty` | text | `"easy"` / `"medium"` / `"hard"` |
| `flavor_tags` | text[] | e.g. `["savory", "spicy"]` |
| `texture` | text | `"crunchy"` / `"chewy"` / `"smooth"` |
| `effort_level` | text | |
| `description` | text | |
| `ingredients` | jsonb | |
| `steps` | jsonb | |
| `nutrition` | jsonb | |
| `illustration_url` | text | |

### `world_map_pins`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `region` | text | e.g. `"Thailand"` |
| `dish_name` | text | |
| `insect_used` | text | |
| `description` | text | |
| `cultural_context` | text | |
| `illustration_url` | text | |
| `lat` | float | Map coordinates |
| `lng` | float | |

---

## 5. Tech Stack Justification

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js (App Router) | SSR for fast initial load; API routes eliminate need for a separate backend; Vercel deployment is zero-config |
| **Styling** | Tailwind CSS | Utility-first makes rapid iteration easy with AI-assisted development; no CSS context-switching |
| **Database** | Supabase (PostgreSQL) | Instant REST + realtime APIs, built-in Auth, free tier sufficient for class project scale |
| **AI - Quiz + Rating** | Claude API | Best-in-class instruction following for persona generation; fun, opinionated tone for cooking game ratings |
| **AI - Recipe Matching** | Claude API / Google AI Studio | Either works; Claude preferred for consistency; Google AI Studio as fallback if latency is a concern |
| **Gesture (Stretch)** | MediaPipe Hands | Browser-native, no server round-trip, WebGL-accelerated; best option for real-time hand tracking without a GPU backend |
| **Hosting** | Vercel | Native Next.js integration, preview deploys per PR, free for class-scale traffic |

---

## 6. Quiz -> Recipe Matching Logic

Recipe matching is computed server-side in `/api/recipes/match` and stored in the `quiz_sessions` table as `match_scores`.

**Scoring algorithm (per recipe):**

```
score = 0

if user.fear_triggers includes "legs" or "antennae":
  if recipe.food_form in ["powder", "invisible"] -> score += 3
  if recipe.food_form == "whole" -> score -= 2

if user.texture_pref == recipe.texture -> score += 2

if user.effort_level == recipe.effort_level -> score += 2

overlap = intersection(user.flavor_profile, recipe.flavor_tags)
score += overlap.length * 1.5

return score
```

Recipes are returned sorted descending by score. Users who skip the quiz see recipes sorted by `difficulty ASC` (easiest first).

Claude API is called once at the end of Stage 2 to:
1. Generate the user's **bug persona** based on quiz answers
2. Return the **top 3 recipe IDs** with a brief "why this was picked for you" explanation per recipe

Prompt structure sent to Claude:
```
System: You are BugBite's persona engine. Given a user's quiz answers, 
        return a JSON object with: persona_id, persona_name, description, 
        fun_facts[], and top3_recipe_ids[] with explanations.

User: [structured quiz answers as JSON]
```

---

## 7. Key API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/quiz/submit` | POST | Save quiz answers, call Claude for persona + recipe match, return result |
| `/api/recipes` | GET | Fetch all recipes (sorted by match score if session exists) |
| `/api/recipes/[id]` | GET | Fetch single recipe detail |
| `/api/map/pins` | GET | Fetch all world map pin data |
| `/api/cooking/rate` | POST | Send user's ingredient combo to Claude, return fun AI rating |

---

## 8. Agentic Engineering Plan

All development is AI-first using **Claude Code** (terminal) and **Cursor** (IDE). The goal is to write as little code by hand as possible; the developer's role is to prompt effectively, verify output, and iterate.

### CLAUDE.md Setup

A `CLAUDE.md` file at the repo root will include:
- Project summary and emotional arc
- Component map (which files do what)
- Data model reference
- Tailwind color palette and design tokens
- Rules: always use TypeScript, always use Supabase client from `lib/supabase.ts`, never hardcode API keys

### .cursorrules Setup

```
- Use Next.js App Router conventions (not pages/)
- Prefer server components unless interactivity required
- Use Tailwind utility classes only (no inline styles)
- All API calls go through /api/* routes (never call Supabase or Claude directly from client)
- Animations: use Framer Motion for quiz transitions
- Illustrations: use <Image> from next/image with alt text
```

### Development Workflow per Issue

```
1. Read GitHub Issue + acceptance criteria
2. Prompt Claude Code / Cursor with issue context + CLAUDE.md
3. Review generated code for correctness and security
4. Run locally, test against acceptance criteria
5. Write/run automated tests (Playwright for E2E, Jest for utils)
6. Open PR referencing the issue, request proposer review
7. Address review comments, merge
```

### Issue -> PR Map

| GitHub Issue | AI Tool Focus | Prompting Approach |
|---|---|---|
| #1 Scaffolding | Claude Code | "Scaffold a Next.js + Supabase + Tailwind project with these env vars and folder structure..." |
| #2 Landing Page | Cursor | "Build a landing page with this emotional arc and navigation structure..." |
| #3 Bug Quiz UI | Cursor | "Build a 3-stage quiz component with animated transitions using Framer Motion..." |
| #4 Persona + Recipe Cards | Claude Code | "Write the Claude API prompt and server route for persona generation..." |
| #5 World Map | Cursor | "Build an SVG interactive world map with these 10 pins and popover cards..." |
| #6 Recipe Library | Cursor | "Build a recipe grid with filter bar and match-score sorting..." |
| #7 Cooking Game (stretch) | Claude Code + manual | "Integrate MediaPipe Hands for gesture detection and build the ingredient canvas..." |

### Testing Strategy

- **Unit tests (Jest):** Quiz scoring algorithm, persona matching logic, recipe sort function
- **Integration tests:** API routes (`/api/quiz/submit`, `/api/recipes`) with mock Supabase + Claude
- **E2E tests (Playwright):** Full quiz flow, persona result, recipe library navigation

### Security Checklist

- [ ] All AI API keys stored in `.env.local` (never committed)
- [ ] Supabase Row Level Security (RLS) enabled on all tables
- [ ] API routes validate input before passing to Claude (no prompt injection via user input)
- [ ] Webcam access (stretch) requested only on the cooking game page with clear user consent prompt

---

## 9. Check-In Milestones

| Check-In | Target | Expected State |
|---|---|---|
| Week 4 | PR #1 | ARCHITECTURE.md merged. Scaffolding deployed on Vercel. Landing page live. Quiz UI clickable with placeholder questions. |
| Week 6 | PR #2-#4 | Bug Quiz fully functional (Claude API integrated). Persona result screen with 3 recipe cards. Cultural World Map live. |
| Week 9 | PR #5-#6 | Recipe Library complete with sorting, filters, detail views. Full polish pass. All P0 + P1 closed. Stretch PR #7 if time allows. |
