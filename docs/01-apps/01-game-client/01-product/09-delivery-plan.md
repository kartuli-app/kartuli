---
description: Current implementation plan for finishing the MVP slice without mixing scope, refactors, and readiness work into one stream.
---

# Delivery Plan

This document owns the current delivery plan for the game client MVP slice.

It should answer one question clearly: what should we build next, in what order, and in which kind of PRs?

This document does **not** redefine MVP scope.
Scope lives in the roadmap.
This document is about sequencing and implementation strategy.

## Current foundation

The current product foundation already includes:

- `Translit`
- `Explore Alphabet`
- `Study Alphabet` lesson and module routes
- `Settings`

The largest blocker so far has been UI and UX alignment.
That work is already improving the shell, shared tokens, panels, and route-level screens.

## Current milestone

The current milestone is:

**Finish one polished alphabet slice, then add a thinner vocabulary slice on top of that foundation.**

That means the first meaningful "complete" milestone is:

- alphabet `explore`
- alphabet `study`
- alphabet `game`
- `translit`
- `settings`
- shell, routing, i18n, SEO, and accessibility readiness for those routes

Vocabulary remains in MVP scope, but it should follow the alphabet slice rather than being finished in parallel with all platform cleanup.

## Why this order

The repo currently has several active workstreams at once:

- token extraction
- screen/component extraction
- folder and architecture cleanup
- route-level feature completion
- readiness work: accessibility, SEO, routing, i18n, and E2E

Trying to move all of them across the whole app at the same time creates too much churn.

The better strategy is:

1. finish one product slice
2. stabilize the shared shell and patterns used by that slice
3. do the readiness pass for that slice
4. use that cleaner base for the next slice

## Delivery tracks

### 1. Token track

Goal:
move current MVP routes onto the token system so screen code mostly consumes semantic tokens instead of raw Tailwind values or primitive colors.

Working rules:

- feature code should prefer semantic color tokens
- raw primitive color tokens should stay mostly inside the shared token contract
- spacing and radius should prefer token-backed utilities such as `p-spacing-*`, `gap-spacing-*`, `rounded-p-radius-*`
- raw Tailwind utilities remain fine for structure and layout behavior such as `flex`, `grid`, `overflow`, `absolute`, and breakpoints

Priority order:

- `translit`
- `settings`
- alphabet `explore`
- alphabet `study`
- alphabet `game`

Near-term semantic token gaps to close:

- panel body spacing
- panel body content colors
- panel action variants
- app bar content roles
- page section spacing
- form control spacing and borders
- repeated study screen roles if they become stable

### 2. Screen composition track

Goal:
break large route screens into smaller pieces only where that improves clarity, testing, and reuse.

Working rules:

- extract in place before moving folders
- prefer co-located files near the current route or feature
- do not split tiny screens just for symmetry

Current highest-priority candidate:

- `study-screen.tsx`

Expected direction for Study:

- navigation controls
- summary card
- detail card
- layout shell
- keep route state and swipe logic close unless reuse becomes real

### 3. Folder organization track

Goal:
move toward a consistent feature-first structure without doing a repo-wide churn PR too early.

Current reality:

- `app/` owns route entrypoints
- `ui/screens/` contains several route-oriented implementations
- `ui/experiences/` contains some newer feature work
- `ui/components/` contains shared building blocks

Target direction:

```text
apps/game-client/src/ui/
  components/
    layout/
    panel/
    surface/
    feedback/
  features/
    translit/
    settings/
    alphabet/
      explore/
      study/
      game/
    vocabulary/
      explore/
      study/
      game/
```

Working rules:

- `app/` stays thin and route-focused
- `components/` contains reusable UI building blocks
- `features/` contains route-specific and domain-specific UI and logic
- move finished slices into the target structure; avoid big mechanical folder moves while the slice is still changing daily

### 4. Readiness track

Goal:
make the polished alphabet slice production-ready in the areas that affect public quality and CI confidence.

This pass should cover:

- shell landmarks and regions
- heading structure
- keyboard and focus flow
- accessible names and labels
- localized routing behavior
- localized metadata and SEO essentials
- E2E smoke coverage
- E2E accessibility coverage
- Storybook coverage for the shared pieces that the slice depends on

This is not a whole-app polish pass.
It is a focused pass for the currently active MVP slice.

## Recommended sequence

1. Finish token extraction for current MVP routes already in flight.
2. Finish alphabet `game`.
3. Extract only the biggest high-friction route screens, starting with Study.
4. Do the shared-shell and route readiness pass for:
   - `/[locale]`
   - `/[locale]/explore/alphabet`
   - `/[locale]/study/...`
   - `/[locale]/translit`
   - `/[locale]/settings`
5. Treat that as the polished alphabet milestone.
6. Start the thinner vocabulary vertical slice on top of those patterns.

## PR strategy

Preferred PR style:

- one focused concern per PR
- avoid mixing feature completion, token migration, architecture moves, and readiness fixes in the same change unless the overlap is unavoidable

Recommended near-term PR types:

- shell and landmark fixes needed for E2E accessibility
- token migration for one route family at a time
- study screen composition cleanup
- alphabet game implementation
- route metadata and SEO pass
- vocabulary slice bootstrap

## Definition of done for the polished alphabet milestone

The alphabet milestone should be considered complete when:

- alphabet `explore`, `study`, and `game` are implemented
- `translit` and `settings` are in stable MVP shape
- shared shell semantics are correct
- current slice routes use the token system consistently enough to stop reworking basic styling
- route metadata and localized routing are clean
- Storybook covers the shared UI contracts used by the slice
- E2E smoke and accessibility checks pass for the slice

## After the alphabet milestone

Vocabulary should be added as the next vertical slice, but intentionally thinner at first.

Preferred order:

- vocabulary `explore`
- vocabulary `study`
- vocabulary `game`
- follow-up polish

The goal is to reuse the shell, token, screen, and readiness patterns proven by the alphabet slice rather than re-solving the same problems during vocabulary work.
