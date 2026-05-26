# Bug Report

**Issue Title:** [Bug] Navbar overflows / wraps onto two lines on mobile widths (≤ 414px); "World Map" splits across rows

## Steps to Reproduce

1. Open `http://localhost:3000/` in Chrome DevTools
2. Toggle device toolbar and pick a phone preset such as **iPhone X (375 × 812)**
3. Observe the top navigation bar

## Expected Behavior

The navbar should be readable and tap-friendly on a 375px-wide viewport. Either:
- The three nav items (Quiz, World Map, Kitchen) collapse into a hamburger menu, or
- The label "World Map" stays on a single line (e.g., shorten to "Map", reduce horizontal padding, or use a smaller font on `sm:` breakpoints).

The CLAUDE.md / `.cursorrules` design rules call for cute, polished, mobile-friendly visuals, and the rest of the layout is responsive (hero copy, feature grid stack into a single column).

## Actual Behavior

In [`components/Navbar.tsx:16-22`](../components/Navbar.tsx) the nav uses `flex items-center justify-between` with `gap-1` and `px-5 py-2` on each pill. There is no responsive collapse and no `sm:` breakpoint. At 375px the row width is exceeded and "World Map" wraps onto two lines, breaking the pill alignment and pushing the active pill out of vertical alignment with its neighbors.

## Severity

- [ ] Blocker
- [ ] Major
- [x] Minor — cosmetic but visible to anyone testing on a phone, which the SPEC implies is a primary form factor for casual demo

## Evidence

`screenshots/bug-mobile-navbar-overflow.png` — full-page mobile screenshot at 375 × 812:

![Mobile navbar wraps World Map onto two lines](../screenshots/bug-mobile-navbar-overflow.png)

## Environment

| Detail | Value |
|--------|-------|
| Browser | Chromium (Puppeteer, emulating iPhone X viewport) |
| Device | Mobile, 375 × 812 |
| OS | macOS 15.2 host |
| Deployed or local? | localhost:3000 (`next dev`, commit `62e4dc1`) |

## Related Issue

Related to #2 (landing page + navbar).
