# AGENTS.md - BugBite

## Project Summary
BugBite is a gamified web app that guides users from insect-phobia to insect-foodie.
Emotional arc: Fear -> Fascination -> Familiarity -> Food

## Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS
- Supabase (PostgreSQL)
- Codex API (persona generation, cooking game rating)
- Vercel (hosting)

## Folder Structure
```
app/          - Next.js App Router pages and API routes
components/   - Reusable React components
lib/          - Supabase client, utilities
public/       - Static assets (illustrations, icons)
```

## Rules
- Always use TypeScript (no .js files)
- Always import Supabase client from `lib/supabase.ts`
- Never hardcode API keys - always use process.env
- All AI API calls go through /api/* routes (never call Codex/Supabase directly from client components)
- Use Tailwind utility classes only (no inline styles)
- Prefer server components unless interactivity is required

## Data Model (key tables)
- `quiz_sessions` - stores user quiz answers (fear_triggers, texture_pref, flavor_profile, effort_level)
- `personas` - bug persona definitions with match_rules
- `recipes` - recipe library with tags matching quiz dimensions
- `world_map_pins` - cultural map data

## Key Quiz -> Recipe Mapping
- fear_triggers: legs/antennae -> prefer food_form: powder/invisible
- texture_pref -> maps to recipe texture tag
- effort_level -> maps to recipe difficulty
- flavor_profile -> maps to recipe flavor_tags

## Design System
Always read DESIGN.md before making any visual or UI decisions.
- Colors: `#FAFFF7` bg / `#0D2B19` text / `#2A7D50` accent / `#E8B84B` warm / `#FFD60A` gold
- Fonts: Satoshi (headings) · Fraunces non-italic (accent only) · DM Sans (body) · JetBrains Mono (data)
- No italic font-style anywhere
- Quiz selected state: rgba(42,125,80,0.08) fill + 2px emerald border
