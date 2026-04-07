# SPEC.md — BugBite: From Fear to Fork

---

## Project Info

| Field | Value |
|---|---|
| **Proposer** | Suzy Hong |
| **Developer** | Su hyun Jung |
| **Stack** | Next.js + Supabase + Tailwind CSS, hosted on Vercel |
| **AI Integrations** | Claude API, Google AI Studio, etc (quiz logic, recipe matching, cooking game rating) / MediaPipe Hands (gesture game — stretch) |

---

## Product Summary

BugBite is a gamified web app that helps users overcome their fear of insects and embrace bugs as a sustainable food source. The app has **two levels** — Level 1 eases users in through a progressive quiz and cultural exploration; Level 2 is a virtual bug kitchen with personalized recipes. The two levels are **connected**: quiz answers in Level 1 directly shape the recipe recommendations in Level 2, creating a personalized path from discovery to cooking.

**Emotional arc:** Fear → Fascination → Familiarity → Food

---

## Development Fee Breakdown

Total agreed fee: **30 GIX Bucks**

| Feature | Priority | Est. Difficulty | Fee Portion |
|---|---|---|---|
| Project scaffolding + landing page | P0 | Easy | 1 |
| Bug Quiz — 3-stage interactive flow | P0 | Medium | 5 |
| Quiz → Recipe matching logic | P0 | Medium | 1 |
| Cultural World Map | P1 | Medium | 5 |
| Bug Kitchen — Recipe Library with personalized recommendations | P1 | Medium | 8 |
| Bug Kitchen — Gesture Cooking Game + AI Rating | P2 (stretch) | Hard | 10 |

> Fee for P2 stretch features paid only if delivered.

---

## Core Design: Quiz ↔ Recipe Connection

The quiz isn't just a fun icebreaker — it collects real preference data that determines which recipes the user sees in Level 2. This is the core product loop.

**What the quiz captures → How it maps to recipes:**

| Quiz Dimension | Example Questions | Maps to Recipe Attribute |
|---|---|---|
| **Fear triggers** | "Which bug feature creeps you out most — legs, antennae, eyes, wings?" | **Food form** — if user hates seeing legs → recommend recipes where insects are ground into powder, baked into bars, or blended into smoothies (invisible form). If user is OK with whole bugs → show dishes with visible insects. |
| **Texture preference** | "Crunchy or chewy? Smooth or chunky?" | **Cooking style** — crunchy → roasted/fried crickets, tempura mealworms. Chewy → insect protein pasta, bug dumplings. Smooth → cricket flour pancakes, silkworm smoothie. |
| **Effort level** | "Weeknight dinner or weekend project? How lazy are you feeling?" | **Recipe difficulty** — lazy → 5-min cricket energy balls, protein bar (no cook). Medium → stir-fry, tacos. Ambitious → black ant risotto, full multi-step dish. |
| **Flavor profile** | "Savory or sweet? Spicy or mild? Adventurous or familiar?" | **Flavor tags** — savory+spicy → chili garlic crickets. Sweet+familiar → chocolate chip cookies with cricket flour. Adventurous → scorpion lollipop, ant-egg salad. |

**The flow:**
1. User completes the 3-stage quiz in Level 1
2. Gets their bug persona result + a personalized "Your Top 3 Recipes" teaser
3. CTA: "Ready to cook? Check out your Bug Kitchen →" leads to Level 2
4. Level 2 recipe library is **pre-sorted** based on quiz results (best matches first), but users can still browse everything

---

## User Stories & Acceptance Criteria

### Level 1 — Bug Discovery (Know Your Bugs)

The goal is to **reduce fear and build curiosity** while quietly collecting preference data for recipe matching. Visual style: **cute, illustrated, animated** — friendly cartoon bugs, not realistic images.

**US-1: Three-Stage Bug Quiz**
> As a user, I want to go through a fun, progressive quiz so that I discover my bug personality and get personalized recipe suggestions based on my actual comfort level and taste.

**Stage 1 — "How Brave Are You?"**
- Gauge the user's fear triggers and comfort level with insects
- Questions like: "A bug lands on your arm — what do you do?", "Which bug feature creeps you out most?"
- 3–4 lighthearted questions
- Tone: playful and reassuring, never judgmental
- *Data captured: fear triggers, comfort baseline*

**Stage 2 — "What's Your Flavor?"**
- Shift to food and cooking preferences
- Questions like: "Crunchy or chewy?", "Savory or sweet?", "Weeknight meal or weekend project?"
- 3–4 questions about taste, texture, and effort level
- *Data captured: texture preference, flavor profile, effort level*

**Stage 3 — "Your Bug Persona"**
- Match the user with a "spirit bug" based on combined Stage 1 + 2 results
- Result screen shows: bug name, cute animated illustration, personality blurb, 2–3 fun facts, and edibility info
- **Below the persona: "Your Top 3 Recipes" preview cards** — personalized based on quiz answers (e.g., someone who hates legs + likes crunchy + is lazy → "5-Min Roasted Cricket Crumble Topping")
- CTA button: "Explore Your Bug Kitchen →" linking to Level 2

Acceptance Criteria:
- [ ] Quiz flows through 3 stages sequentially with smooth transitions
- [ ] Each stage has 3–4 multiple-choice questions with illustrated options
- [ ] Final result screen shows bug persona with name, illustration, personality, fun facts, and edibility info
- [ ] Result screen includes 3 personalized recipe recommendation cards based on quiz answers
- [ ] Recipe cards link to the corresponding recipe detail in Level 2
- [ ] Visual style is cute and animated throughout
- [ ] Quiz can be retaken to get different results

**US-2: Cultural World Map**
> As a user, I want to explore a world map showing insect dishes from different cultures so that I see how normal and diverse insect-eating is around the world.

Acceptance Criteria:
- [ ] Interactive map with clickable pins on 8–10 regions/countries
- [ ] Each pin opens a card showing: dish name, cute illustrated icon, short description, cultural context, and which insect is used
- [ ] Illustrations match the app's cute/cartoon style
- [ ] Accessible from main nav without completing the quiz first

---

### Level 2 — Bug Kitchen (Cook & Play)

The goal is to let users **engage with insects as ingredients** in a personalized, fun, virtual environment. Recipes are sorted by how well they match the user's quiz profile.

**US-3: Personalized Recipe Library**
> As a user, I want to browse a recipe library that's sorted by my quiz preferences so that I see the most approachable recipes for me first.

Acceptance Criteria:
- [ ] Recipe cards displayed in a browsable grid
- [ ] Each card shows: dish name, cartoon illustration, insect used, difficulty tag, brief description, and food form tag (whole / pieces / powder / invisible)
- [ ] **Default sort: best match to user's quiz profile first** (if quiz completed). Users who skip the quiz see recipes sorted by difficulty (easiest first)
- [ ] User can also manually filter by: insect type, difficulty, food form (whole vs. powder), flavor profile
- [ ] Clicking a card opens a detail view with: ingredients, steps, nutrition breakdown, and why this recipe was recommended ("Picked for you because you like crunchy + savory")
- [ ] At least 10–12 recipes at launch, tagged across all quiz dimensions
- [ ] Visual style: cartoon/illustrated, consistent with Level 1

**US-4: Gesture Cooking Game with AI Rating (Stretch)**
> As a user, I want to play a cooking mini-game where I drag and combine ingredients to DIY an insect dish, and get a fun AI rating on my creation.

Acceptance Criteria:
- [ ] User selects ingredients from a visual panel to assemble a custom recipe
- [ ] Gesture recognition (MediaPipe Hands via webcam) detects basic actions: drag ingredients, chop, stir
- [ ] Flat/2D visual style — animated ingredients on a virtual cutting board/pan
- [ ] After "cooking," Claude API evaluates the combination based on nutrition and flavor compatibility
- [ ] AI gives a fun, opinionated rating (e.g., "🤤 Cricket + garlic + chili = classic street food combo! High protein, low regret." or "🤢 Interesting... mealworms in orange juice. You're a pioneer, not a chef.")
- [ ] Rating includes a brief nutrition summary
- [ ] Works on desktop Chrome with webcam

---

## MVP Scope & Priority

| Priority | Features | Notes |
|---|---|---|
| **P0 (MVP must-have)** | Scaffolding, landing page, 3-stage Bug Quiz with recipe recommendation cards | The quiz → recipe connection is the core product value |
| **P1 (Important)** | Cultural World Map, Personalized Recipe Library | Makes both levels feel complete and gives the quiz results a payoff |
| **P2 (Stretch)** | Gesture Cooking Game + AI Rating | High-impact but high-effort; only if time permits |

---

## GitHub Issue Decomposition

| # | Issue Title | Priority | Relates to |
|---|---|---|---|
| 1 | Set up project scaffolding (Next.js + Supabase + Tailwind + Vercel deploy) | P0 | — |
| 2 | Build landing page with app intro and navigation to Level 1 / Level 2 | P0 | — |
| 3 | Implement 3-stage Bug Quiz with preference data capture | P0 | US-1 |
| 4 | Build quiz result screen with bug persona + 3 personalized recipe cards | P0 | US-1 |
| 5 | Build Cultural World Map with region pins and dish cards | P1 | US-2 |
| 6 | Build Recipe Library with personalized sorting and filter/detail views | P1 | US-3 |
| 7 | Implement Gesture Cooking Game with DIY recipe builder + AI rating | P2 | US-4 |

---
