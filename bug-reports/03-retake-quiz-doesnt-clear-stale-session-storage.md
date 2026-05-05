# Bug Report

**Issue Title:** [Bug] "Retake quiz" does not clear sessionStorage — abandoning a retake mid-flow leaves stale answers on /quiz/result

## Steps to Reproduce

1. Go to `http://localhost:3000/quiz` and complete the quiz with one set of answers (e.g., panic / legs / reject / crunchy / spicy_savory / lazy)
2. On the result page, click **Retake quiz** (this navigates back to `/quiz` but does **not** clear `sessionStorage`)
3. Begin Stage 1 again and answer one or two questions, then close the tab or navigate away (do not finish the new attempt)
4. In a new tab (or via the address bar) visit `http://localhost:3000/quiz/result`

## Expected Behavior

Either:
- The "Retake quiz" button should clear `sessionStorage["bugbite_quiz_answers"]` so an in-progress retake never coexists with a stale completed-quiz blob, **or**
- The result page should detect that the current answers are stale (e.g., timestamp-check or "answers count < expected") and redirect back to `/quiz` with a message.

The SPEC AC *"Quiz can be retaken to get different results"* implies a clean retake flow.

## Actual Behavior

- Clicking **Retake quiz** uses a plain `<Link href="/quiz">` ([`app/quiz/result/page.tsx:55-59`](../app/quiz/result/page.tsx)). It never touches `sessionStorage`.
- The quiz page only writes to `sessionStorage` *after* the user completes Stage 2 ([`app/quiz/page.tsx:41`](../app/quiz/page.tsx)).
- The result page reads whatever is in `sessionStorage` at any time ([`app/quiz/result/page.tsx:11-13`](../app/quiz/result/page.tsx)).
- Net effect: a user who restarts and abandons their retake can still navigate to `/quiz/result` and see their **previous, completed-quiz answers**, which will (once Issue #4 lands) drive a stale persona and stale recipe matches.

## Severity

- [ ] Blocker
- [x] Major — silently misleads the user about whose answers they're seeing; will break the personalization promise once persona/recipe matching is wired up
- [ ] Minor

## Evidence

`screenshots/bug-stale-answers-after-retake.png` — visited `/quiz/result` after starting a retake but never finishing it; the page still shows the previous run's answers:

![Stale answers persist after a retake is abandoned](../screenshots/bug-stale-answers-after-retake.png)

## Environment

| Detail | Value |
|--------|-------|
| Browser | Chromium (Puppeteer headless) |
| Device | Desktop |
| OS | macOS 15.2 (Darwin 24.2.0) |
| Deployed or local? | localhost:3000 (`next dev`, commit `62e4dc1`) |

## Related Issue

Related to #3 (Bug Quiz) and #4 (persona + recipe cards — will inherit the stale state).
