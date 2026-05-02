# Roadmap and Decisions

This document owns time-scoped product scope, future work, candidate routes/pages, backlog, and reduced decision history.

Stable product truth belongs in [../PRODUCT.md](../PRODUCT.md). Route, screen, and UI truth belongs in the focused companion docs.

## Current MVP scope

### Included

- Root route `/` resolving to `/{locale}/app/learn` via locale detection
- Localized routing with English (`en`) as default and Russian (`ru`) as supported locale
- Learn entry route redirecting to Explore
- Explore entry page with Alphabet and Vocabulary choices
- Explore Alphabet page for alphabet lessons
- Explore Vocabulary page for vocabulary lessons
- Shared Study route for authored lessons and module review sets
- Shared Play route with:
  - Game Lobby
  - Game Round
  - Game Round Feedback
  - Game Results
- `single-choice` Play format family with multiple alphabet and vocabulary variants
- Translit utility page
- Settings utility page for language, sound, privacy, and about
- Privacy notice page
- Global not-found recovery screen
- Study resource unavailable screen
- Play resource unavailable screen
- Optional analytics with explicit privacy consent
- Non-dismissible privacy consent banner when consent is `unknown`
- Localized metadata fallback per locale
- Page-specific metadata for Privacy, Translit, Explore, and canonical Study routes
- `noindex` routes:
  - `/`
  - `/{locale}/app/learn`
  - `/{locale}/app/learn/lessons/{lessonId}/play`
  - `/{locale}/app/learn/modules/{moduleId}/review/play`
  - `/{locale}/app/settings`

## Post-MVP priorities

- offline mode
- mastery tracking derived from low-level activity
- recommendation mode based on user activity
- anonymous profile/state continuity

## Candidate future work

- more minigames
- search
- favorites
- onboarding
- landing page
- root-route logic for new vs returning users
- auth with activity sync
- broader public pages

## Candidate routes and pages

- `/{locale}/landing`
- `/{locale}/terms`
- `/{locale}/app/learn/recommended`
- `/{locale}/app/learn/explore/vocabulary/modules/{moduleId}`
- `/{locale}/app/learn/explore/grammar`
- `/{locale}/app/learn/explore/grammar/modules/{moduleId}`
- `/{locale}/app/learn/sets/{setId}/study`
- `/{locale}/app/learn/sets/{setId}/play`

## Open questions with roadmap impact

- `Open question`: exact selection logic when Learn eventually supports both Explore and Recommended
- `Open question`: whether root-route visitor-state logic ships with a future landing page or separately
- `Open question`: when grammar becomes real product scope, does it keep the existing module-browser pattern or require a different browse model?

## Reduced decision history

These entries record why a non-obvious choice exists. The current rule itself should be read in the linked canonical doc.

### Explore-first Learn entry

- Decision:
  - `Current MVP`: Learn resolves directly to Explore
- Why:
  - Recommended mode is intentionally deferred, and exposing Learn as an Explore-first route keeps the current product model unambiguous
- Canonical owners:
  - [../PRODUCT.md](../PRODUCT.md)
  - [routing-and-flows.md](routing-and-flows.md)

### Module review sets are first-class resources

- Decision:
  - `Confirmed`: a module review set is not an authored lesson, but it still gets dedicated Study and Play routes
- Why:
  - the generated resource needs shareable, routable behavior and must participate in the same selection, Study, and Play flows as authored lessons
- Canonical owners:
  - [../PRODUCT.md](../PRODUCT.md)
  - [routing-and-flows.md](routing-and-flows.md)
  - [screens.md](screens.md)

### Global not found versus resource unavailable

- Decision:
  - `Current MVP`: valid controlled routes with missing data use route-owned unavailable screens instead of collapsing into global not found
- Why:
  - implementation work needs a clear distinction between an invalid URL and a valid route that failed to load its resource
- Canonical owners:
  - [routing-and-flows.md](routing-and-flows.md)
  - [screens.md](screens.md)

### Global sound versus listening rounds

- Decision:
  - `Current MVP`: global sound is an app preference, while listening rounds are a Lobby-level session choice
- Why:
  - the product needs deterministic audio behavior without making every sound toggle silently regenerate active session structure
- Canonical owners:
  - [../PRODUCT.md](../PRODUCT.md)
  - [routing-and-flows.md](routing-and-flows.md)
  - [screens.md](screens.md)

### Results focus on failed-item review

- Decision:
  - `Current MVP`: Results prioritizes failed-item review rather than replaying the whole session history
- Why:
  - the post-game screen should bias toward immediate learning value and actionable next steps
- Canonical owners:
  - [screens.md](screens.md)

### Semantic-role-first UI system

- Decision:
  - `Confirmed`: reusable UI rules are modeled as semantic roles mapped onto a small foundation family set
- Why:
  - the product needs a coherent design system that scales across routes and components without inventing one-off styling rules per screen
- Canonical owners:
  - [ui-system.md](ui-system.md)
