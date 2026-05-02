## Purpose

This document defines the execution order for the next cleanup and rebuild pass on the game client.

The goal is to remove the old UI architecture and visual system noise first, preserve only the core behavior that is still valuable, then rebuild the route skeleton and only later start the new design-system and component work.

This is not a controlled migration plan. The app is not in production, nobody depends on the current UI, and temporary instability is acceptable.

## Working decisions

- The first objective is to get rid of the old design-system usage, the shared shell, and other inherited UI structure that makes everything noisy.
- During the transition, hardcoded text is acceptable.
- The i18n system and translation resources stay in the repo, but route and screen work does not need to consume them until the structure is stable again.
- Storybook can remain in place as a tool, but it should not drive app architecture decisions.
- The current Tailwind and CSS-variable setup can stay temporarily, but it should be treated as a fading implementation detail, not as a system to expand.
- `NextNavigationRootLayout` does not need to disappear immediately if it stays small and useful.
- The part that should disappear first is the mandatory shell coupling inside it.

## Validation for every phase

- For every phase that changes the game client, do not rely on `pnpm run validate:all` alone.
- Always run `pnpm run c:preview:game-client` and then `pnpm run c:e2e:game-client` before treating the phase as complete.
- This is required so structural regressions like missing landmarks, missing page-level headings, or route-level production-only issues are caught locally before CI.

## Preserve, remove, defer

### Preserve

- `apps/game-client/src/learning-content`
- `apps/game-client/src/i18n`
- `apps/game-client/src/navigation` as long as it remains lightweight
- translit behavior
- settings behavior, especially locale switching
- locale root redirect behavior
- Storybook theme-wrapper idea based on CSS variable overrides

### Remove or simplify early

- shared app shell as a required wrapper
- game app bar
- game dock
- home screen implementation
- lesson cards and current library-view presentation layer
- old debug panel in `packages/ui`
- backoffice dependency on the shared debug panel
- shell-specific e2e expectations
- page structure assumptions that come only from the old shell

### Defer until later

- new `DESIGN.md` token frontmatter
- new design token package structure
- component catalog expansion
- polished top bars, docks, and navigation chrome
- final translated copy reintroduction
- final screen styling

## Sequence

### Phase 1: Hard reset the UI surface

Goal:
Remove the old app chrome and old presentation layer so the app surface becomes small and easy to reason about.

Actions:

- Stop wrapping all pages in the old shared shell.
- Remove `GameShell` from the main route architecture.
- Remove or replace the `GameAppBar` and `GameAppDock` usage.
- Delete the current home screen implementation and its related lesson-card presentation logic.
- Allow route pages to degrade temporarily to very simple structures such as:
  - one `h1`
  - plain sections
  - plain buttons or links
  - minimal wrappers
- Remove the shared debug panel from `packages/ui`.
- Remove or replace the backoffice debug page dependency on that panel.

Files and areas likely touched:

- `apps/game-client/src/navigation/next-navigation-root-layout.tsx`
- `apps/game-client/src/ui/shared/components/game-shell.tsx`
- `apps/game-client/src/ui/shared/components/game-app-bar/*`
- `apps/game-client/src/ui/shared/components/game-app-dock/*`
- `apps/game-client/src/ui/screens/home/*`
- `packages/ui/src/components/DeploymentDebugPanel.tsx`
- `apps/backoffice-client/src/domains/debug/debug-page.tsx`

Checkpoint state:

- the app no longer depends on the old shell to render pages
- the old home/library presentation layer is gone
- translit and settings are still alive
- the shared UI package is smaller and less noisy

### Phase 2: Keep only the minimum working routes

Goal:
Preserve the useful behavior while shrinking the app to a minimal route surface.

Actions:

- Keep translit route behavior working.
- Keep settings route behavior working.
- Keep locale switching working from settings.
- Keep not-found behavior working.
- Remove the current `/{locale}/learn` placeholder route entirely.
- Treat the future `/{locale}/app/learn` route as a later Phase 3 route-architecture concern, not as something to preserve from the old surface.
- Replace any unstable or noisy pages with simple placeholders.
- If needed, temporarily collapse route screens to basic hardcoded content.
- Do not try to preserve the previous visual hierarchy.

Recommended bias:

- prefer deleting unstable UI over adapting it
- prefer plain markup over carrying forward old class-heavy screens
- do not preserve misleading temporary routes just because they share a future route name

Files and areas likely touched:

- `apps/game-client/src/app/[locale]/*`
- `apps/game-client/src/ui/screens/settings/*`
- `apps/game-client/src/ui/screens/translit/*`
- `apps/game-client/src/ui/screens/not-found/*`
- `apps/game-client/src/ui/screens/learn/*`

Checkpoint state:

- only a small number of routes are active
- translit and settings still behave correctly
- the old `/{locale}/learn` placeholder is gone
- the app is ugly but understandable
- screen ownership is local and explicit

### Phase 3: Rebuild the route skeleton from the product docs

Goal:
Make the route structure match the new product documentation before rebuilding polished UI.

Actions:

- Add the route placeholders that matter for the documented product structure.
- Build page holders for the routes you want next, without trying to finish their UI.
- Align route naming and grouping to the docs, not to the old implementation.
- Keep each route independent enough that it can later receive its own top bar, dock, and layout decisions.
- Prefer explicit route files over hiding behavior inside a global shell.

Examples of the kind of work this phase should support:

- route holders for Explore
- route holders for future catalog pages
- route holders for Study and Play flows
- page-level metadata ownership per route

Checkpoint state:

- the app route tree reflects the documented product structure
- page placeholders exist where needed
- shell structure is no longer deciding route architecture

### Phase 4: Stabilize navigation, locale flow, and metadata

Goal:
Make the simplified app structurally correct before visual rebuild work begins.

Actions:

- verify root locale redirect behavior
- verify localized route switching behavior
- improve page metadata so it is not effectively one shared root-layout metadata blob
- verify canonical and alternate language behavior where relevant
- keep the i18n infrastructure in place even if route copy remains hardcoded for now

Important stance:

- do not reintroduce full translated screen copy yet
- only use i18n where it is necessary for structural behavior

Files and areas likely touched:

- `apps/game-client/src/proxy.ts`
- `apps/game-client/src/i18n/generate-metadata-for-supported-locale.ts`
- route-level metadata helpers and route files

Checkpoint state:

- locale redirect still works
- settings language switch still works
- per-route metadata can evolve cleanly
- the app structure is stable enough for UI work

### Phase 5: Reset the test suite around the new reality

Goal:
Make tests protect the new structure instead of blocking it with old assumptions.

Actions:

- remove or rewrite e2e tests that assume the old app bar and dock
- remove or rewrite tests that assume the shell provides the main `h1`
- keep tests that still matter during the transition:
  - learning-content parsing tests
  - translit behavior tests
  - locale utility tests
  - settings locale-switch tests
  - root redirect and i18n production checks
- allow temporary gaps in page-level e2e coverage if those pages are being intentionally rebuilt

Files and areas likely touched:

- `tools/e2e/tests/game-client/pages/*`
- `tools/e2e/tests/game-client/production/*`
- any helper files coupled to old UI structure

Checkpoint state:

- tests describe the new structure instead of the old shell
- failures are meaningful again
- test maintenance noise is lower

### Phase 6: Re-baseline Storybook and shared UI

Goal:
Keep only the useful tooling and shared primitives before starting the new design-system pass.

Actions:

- keep Storybook as an isolation tool
- keep the CSS-variable theme-switching idea
- remove stories and wrappers that only exist because of the old UI system
- keep `packages/ui` small and honest
- avoid inventing new shared components until the new design-system direction is defined

Checkpoint state:

- Storybook remains useful
- shared UI is not pretending to be a finished design system
- theme switching still exists as a mechanism, not as a design commitment

### Phase 7: Start the new design-system pass

Goal:
Define the new token source of truth only after the app surface is quiet.

Actions:

- formalize the new token vocabulary
- add YAML frontmatter to `DESIGN.md`
- define minimal token groups first:
  - colors
  - typography
  - spacing
  - rounded
- export tokens into Tailwind v4 `@theme`
- decide later whether `@kartuli/tailwind-config` is kept, renamed, or replaced
- only after that start rebuilding reusable components and screen styling

Important stance:

- do not mix this phase with route cleanup
- do not redesign while the route and shell structure are still changing

Checkpoint state:

- `DESIGN.md` becomes machine-readable
- token naming is stable
- Tailwind token generation has a real source of truth
- component work can begin on a clean base

## Position on `NextNavigationRootLayout`

Recommendation:

- keep the concept for now
- remove the shell responsibility from it

Reason:

It is not the main source of noise by itself. The noisy part is that it currently couples navigation context with the old shell. If it becomes just a thin navigation provider, it can stay without hurting the cleanup. If later SPA-specific work wants a different structure, it can be revisited then.

So the likely move is:

- do not prioritize deleting `NextNavigationRootLayout`
- do prioritize stripping `GameShell` out of it

## Transition rules

- Prefer deletion over adaptation when old UI structure is clearly in the way.
- Prefer simple hardcoded route content over carrying forward old abstractions.
- Keep the behavioral core alive even if the temporary UI is crude.
- Avoid introducing new shared UI primitives during the cleanup.
- Reintroduce translations near the end, once structure and ownership are stable.
- Reintroduce polished navigation chrome only after route ownership is clear.

## End state before new UI work starts

Before starting the new design-system and new component pass, the repo should look like this:

- learning-content is intact
- i18n infrastructure is intact
- root locale redirect works
- settings locale switching works
- translit behavior works
- route skeleton matches the product docs
- old shell is gone as an architectural dependency
- old debug panel is gone
- old home/library UI layer is gone
- tests no longer enforce the old shell
- Storybook still works as a simple isolation tool

Once that state exists, the next effort should be:

- define the new token contract
- formalize `DESIGN.md`
- wire token export into Tailwind
- rebuild reusable components and screens intentionally
