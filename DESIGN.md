# Design System — BugBite

## Product Context
- **What this is:** Gamified web app guiding users from insect-phobia to insect-foodie
- **Who it's for:** Insect-curious people who feel squeamish — not entomology nerds
- **Space/industry:** Food-tech, sustainability, behavior-change
- **Project type:** Web app (quiz + world map + recipe kitchen)
- **Memorable thing:** "This makes eating bugs feel fun, not scary"

## Aesthetic Direction
- **Direction:** Elevated Nature Brand — confident, not timid
- **Decoration level:** Intentional — illustrated insects as characters, not hidden
- **Mood:** Naturalist field-guide energy meets game progression. Specimen cards that come alive.
- **Emotional arc as UI:** Fear → Fascination → Familiarity → Food is the primary nav metaphor

## Typography
- **Display/Hero:** Satoshi 700 (via Fontshare) — confident geometric sans, no insect brand uses this
- **Accent/Emphasis:** Fraunces 700 (non-italic) — reserved for pull quotes and emotional moments only
- **Body:** DM Sans 400/500 — clean, readable, warmer than Plus Jakarta Sans
- **Data/Labels/Badges:** JetBrains Mono 400/500 — specimen-tag energy for nutritional stats, progress
- **Loading:** Satoshi via `https://api.fontshare.com/v2/css?f[]=satoshi@700,600,500,400&display=swap` · Fraunces + DM Sans + JetBrains Mono via Google Fonts
- **No italic anywhere**

## Color
- **Approach:** Elevated green — richer and more confident than the original mint
- **Background:** `#FAFFF7` — barely-there mint (lighter, cooler than original #F0FFF4)
- **Surface/Card:** `#EEF7F2` — clean mint card background
- **Border:** `#C8E2D4`
- **Primary text:** `#0D2B19` — deep forest (darker than original #1A3A2A, more contrast)
- **Muted text:** `#4A7A5A`
- **Accent (main):** `#2A7D50` — emerald (richer, bolder than original #48BB78)
- **Accent hover:** `#1F6040`
- **Warm secondary:** `#E8B84B` — golden honey (for tags, warm moments)
- **Celebration:** `#FFD60A` — bright gold (level unlocks, quiz results)

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable
- **Scale:** 2(2px) 4(4px) 8(8px) 12(12px) 16(16px) 24(24px) 32(32px) 48(48px) 64(64px)

## Layout
- **Approach:** Hybrid — editorial poster on landing/map, disciplined grid on quiz/kitchen
- **Max content width:** max-w-5xl (1024px)
- **Border radius:** sm:6px md:10px lg:16px full:9999px

## Motion
- **Approach:** Intentional — Fear→Food stage transitions feel like level unlocks
- **Library:** Framer Motion (existing)
- **Easing:** ease-out for enter, ease-in for exit
- **Duration:** micro 100ms / short 200ms / medium 350ms

## Quiz Selected State
- Border: `2px solid #2A7D50`
- Background: `rgba(42, 125, 80, 0.08)` — light green tint, not solid

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-17 | Switched from Plus Jakarta Sans to Satoshi + Fraunces + DM Sans | Jakarta Sans is overused; Satoshi is distinctive without being precious |
| 2026-05-17 | Replaced mint #48BB78 with emerald #2A7D50 | Richer, more confident — breaks from the insect-brand green cliché |
| 2026-05-17 | Added golden honey #E8B84B as warm secondary | Appetite-triggering warmth without alarming orange |
| 2026-05-17 | No italic anywhere | User preference |
