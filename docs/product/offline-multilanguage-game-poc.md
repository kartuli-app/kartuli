---
section: Product
title: Offline Multilanguage Game POC
description: Approach and phases for the game app PWA — single shell, internal routing, debug migration, offline, versioning, i18n.
type: standard
---

# Offline-first multilingual game PWA — approach and phases

This document captures the proposed architecture and implementation order for the game app: a static Next.js PWA with offline support, internal SPA-style routing, and multiple languages.

---

## Goals

- **Offline-first:** After first successful load, the whole app (home, lobby, game, profile) works offline, regardless of which URL the user landed on first.
- **Dynamic lesson IDs:** New lessons and lesson content can be added without hardcoding routes or prefetching every lesson.
- **No remount on path change:** Startup logic, animations, and global state run once per app session; only the current "page" view swaps.
- **Multilingual:** Support multiple languages (e.g. English, Russian) with shareable URLs.
- **Static-first:** No server-side or client-side data dependency for the shell itself; static generation only.
- **Versioning:** Detect app/UI and content updates and refresh caches so users get new versions after deploy.

---

## Proposed architecture

### 1. Single shell + internal routing

- **Next.js:** One catch-all route (e.g. `app/[[...spaRoute]]/page.tsx`). No separate App Router route per "page" (home, lobby, game, profile). The page uses **params** to render the correct screen in the initial HTML and **generateStaticParams** to pre-render at build time (see §6). So we get one static HTML **per path**, not request-time SSR.
- **Offline:** The service worker precaches the set of static HTMLs (one per path from generateStaticParams) + JS/CSS and any route chunks. Navigation is client-side only, so offline works without RSC fetch per navigation.
- **Rationale:** Avoids RSC/dynamic-route issues offline; path-aware static HTML gives good LCP/CLS/SEO without serverless cost. Dynamic lesson IDs: either list known paths in generateStaticParams or use a fallback static shell for unknown IDs (client loads lesson data).

### 2. Layout vs route (avoid remounts)

- **Persistent layer (layout / shell):**
  - Global providers (state, audio, game engine, animation manager, toasts, error boundary).
  - SW update handling and "new version available" UX.
  - Offline/online status and any sync/queue logic.
  - Preloading/prefetching of lesson catalog or essential assets.
  - Anything that must run once per app session, not per URL.
- **Route-driven layer (internal router):**
  - Mapping from pathname → screen component (Home, Lobby, Game, Profile).
  - Screen transitions and route params (e.g. lesson ID from path).
- **Implementation:** One persistent root that wraps an "outlet." The outlet renders the current screen based on path; do not key the entire shell by pathname so the root stays mounted and only the outlet content swaps.

### 3. Language as internal router state (no `[lang]` route segment)

- **URLs:** Use a language segment in the path from day one: `/en/`, `/en/lobby/lesson-1`, `/en/debug`, etc. The internal router parses the first segment as `lang`.
- **Next.js:** No `[lang]` route segment. One shell for the whole app; language is part of the path parsed and handled inside the shell.
- **Root redirect:** Redirect `/` to the **preferred locale** (saved preference, cookie) with fallback to `/en`, so returning users who had chosen e.g. Russian land on `/ru`. We avoid middleware (no extra serverless cost). Phase 0: use **next.config** redirect `/` → `/en`. When we add multiple locales: use **client-side** redirect — game: let `/` hit the shell, shell detects path `/` and navigates to preferred locale; backoffice: root page at `/` that redirects client-side to preferred locale. See “Preferred locale when user visits `/` (no middleware)” in Phase 0.
- **Benefits:** One shell to cache, one precache list, all code and features shared. Language switching = update locale + `pushState`/`replaceState`; no second document load.
- **When to use a Next `[lang]` segment instead:** Only if we later need to avoid loading/caching other locales (e.g. many languages with large per-locale assets and strict "single locale only" caching). Current choice: one shell, cache everything we need.

### 4. Debug page (game vs backoffice)

- **Game-client:** Debug lives **inside** the main shell as an internal route (e.g. `/en/debug`). One shell, one cache; debug is available offline with the rest of the app.
- **Backoffice:** Debug lives **outside** the shell: a normal Next.js App Router page. Backoffice does **not** use internal routing; it stays a regular Next app with multiple languages. For Phase 0 we add a hardcoded `/en/debug` route (e.g. `app/en/debug/page.tsx` or `app/[lang]/debug/page.tsx` with only `en` for now). URL structure is the same (`/en/debug`), so E2E can target `/debug` for both apps.
- **E2E:** Tests go to `/debug`. Add a redirect `/debug` → `/en/debug` so E2E can use `BASE_URL/debug` without hardcoding locale. E2E does not need to know whether debug is inside or outside the shell; it only checks that `/debug` shows the debug content.
- **Content:** Debug page shows a "Game Client Debug" / "Backoffice Debug" header and the existing DeploymentDebugPanel (app name, version, environment). No other app logic; just the panel for deploy/smoke verification.

### 5. Versioning (design early, implement after offline)

- **App/shell version:** UI and runtime code. Used for SW precache revision and cache invalidation (e.g. new deploy → new cache key → refresh shell).
- **Content version (lessons):** Lesson manifests and data. Can be versioned independently so we can ship new lessons without changing the shell; cache or IndexedDB keyed by (lessonId, contentVersion, lang) as needed.
- **Locale pack version (optional):** If we ever ship large per-locale bundles, we can version them separately.
- **Implementation:** Version in build (e.g. `NEXT_PUBLIC_APP_VERSION` or hash) and in SW cache name/revision. On SW update: delete old caches, precache new assets; optionally show "New version available" or force reload.

### 6. Path-aware static generation (Lighthouse, SEO, cost)

We avoid an empty shell that only fills after client hydration. We also avoid request-time SSR so we don’t pay per request (no 1M users → 1M serverless runs).

- **Path-aware initial HTML:** The catch-all page uses **params** (e.g. `params.spaRoute`) on the **server** to render the correct screen (Home, Debug, Learn, Game, User) in the **first** HTML response. So the user and crawlers get the right content immediately — good for LCP, CLS, and SEO. No “empty shell until hydration.”
- **Static generation, not request-time SSR:** We use **`generateStaticParams`** so Next.js pre-renders one HTML file **per path** at **build time**. At runtime those URLs are served as static assets (CDN); no serverless function runs. Example: 5 users (or 1M) visiting `/en/learn/lesson-1` all get the same pre-built file — 0 function invocations. RSC runs at **build time** for those paths; output is static and cacheable.
- **Offline and RSC:** The build-time output is plain HTML (+ JS/CSS). The service worker can precache or cache-on-first-visit those static files. No conflict with offline; we simply have one static HTML per path we list in `generateStaticParams` (instead of one single HTML for the whole app).
- **Dynamic lesson IDs:** For a **fixed** set of paths (e.g. `/en`, `/en/debug`, `/en/learn/lesson-1`, `/en/learn/lesson-2`, …), list them all in `generateStaticParams` and everything stays static. For **many or unknown** lesson IDs: either (a) pre-generate a subset and use a **fallback** static shell for unknown IDs (e.g. generic “Lesson” shell; client loads lesson data), or (b) allow request-time rendering only for unknown IDs (then only those URLs hit a serverless function; add caching if the platform supports it). Preferred: (a) so the app stays fully static.
- **Lighthouse / redirects:** next.config redirects add one round-trip for `/` and `/debug`; impact is small. Lighthouse measures the final URL; path-aware static HTML gives good LCP and low CLS.

---

## Phases (implementation order)

### Phase 0 — Debug migration (E2E target, both apps)

1. **Game-client:** Introduce the catch-all route and internal router with minimal language support: redirect `/` to preferred locale (default `/en`), first path segment = `lang`. Two screens: `/en` (placeholder home) and `/en/debug` (DebugPage: "Game Client Debug" header + DeploymentDebugPanel). Redirect `/debug` → `/en/debug` so E2E can hit `BASE_URL/debug`. Debug is **inside** the shell.
2. **Game-client:** Update E2E smoke test to go to `/debug` and assert on debug heading + DeploymentDebugPanel. Move or duplicate unit tests for "debug panel with env/version" to the Debug screen (or shell at `/en/debug`).
3. **Backoffice:** Keep a **Backoffice Home** page and add the **Debug** page. Home at `/en` (or `/en/`), Debug at `/en/debug`. Use normal App Router: e.g. `app/en/page.tsx` (Home) and `app/en/debug/page.tsx` (Debug). No internal routing. Add redirects: `/` → `/en`, `/debug` → `/en/debug`. Debug shows "Backoffice Debug" header + DeploymentDebugPanel. Update backoffice E2E to target `/debug`.
4. **Result:** Both apps expose `/debug` (→ `/en/debug`) for E2E. Game: debug inside shell (cached offline later). Backoffice: home at `/en`, debug at `/en/debug`; URL structure matches so E2E is the same for both.

**Done when:** Game-client and backoffice E2E pass using `/debug`. Game uses one shell with debug inside; backoffice has home at `/en`, debug at `/en/debug`, and redirects `/` → `/en`, `/debug` → `/en/debug`.

#### Phase 0 — URL structure and redirects (no middleware)

We avoid **middleware** so we don’t pay for extra serverless invocations. All redirects use **`next.config` `redirects()`** only.

| App | Redirects | Where | URLs available (after redirects) |
|-----|-----------|--------|----------------------------------|
| **Game-client** | `/` → `/en`, `/debug` → `/en/debug` | **next.config** `redirects()`. | **Landing:** `/en` (placeholder home). **Debug:** `/en/debug`. Catch-all serves the shell; internal router shows home for `/en`, debug for `/en/debug`. |
| **Backoffice** | `/` → `/en`, `/debug` → `/en/debug` | **next.config** `redirects()`. | **Home:** `/en`. **Debug:** `/en/debug`. Real routes: `app/en/page.tsx`, `app/en/debug/page.tsx`. |

- **Home at `/en` (not `/`) for future compatibility:** When you add more locales (e.g. `/ru/`), home is already under a locale segment. No refactor.

#### Preferred locale when user visits `/` (no middleware)

When we add multiple languages, we need: if the user goes to the **main domain** (`/`) and they had visited in Russian last time, we should show `/ru`, not `/en`. Direct visits to `/en/login` or `/ru/login` already have a language. The open case is **first hit on `/`** for a returning user.

Because we don’t use middleware, we handle this **client-side** (no serverless cost):

- **Game-client:** When we add preferred locale, **remove** the next.config redirect for `/` so that `/` is handled by the **catch-all**. The shell loads. In the shell (client), if the current path is exactly `/`, read preferred locale from cookie or localStorage and navigate to `/en` or `/ru` (e.g. `window.location.replace('/ru')` or router replace). So the shell is the “redirector” for `/`; no middleware.
- **Backoffice (when it has multiple locales):** **Remove** the next.config redirect for `/`. Add a root page **`app/page.tsx`** that is a minimal client component: on mount, read preferred locale (cookie/localStorage), then `window.location.replace('/en')` or `'/ru'`. So `/` loads this tiny page once, then client redirects. No middleware.

Same pattern for both: **preferred locale = client-side redirect from `/`**; no middleware, no extra serverless calls.

### Phase 1 — Shell + internal routing (four screens, one language)

1. Implement the full set of screens in the internal router: Home, Learn, Game, User (and keep Debug from Phase 0). Paths: `/en` (home), `/en/learn/lesson-x`, `/en/game/lesson-x`, `/en/user`, `/en/debug`.
2. **HomePage:** "Home" header, list of lessons (e.g. lesson-1, lesson-2); clicking a lesson navigates to `/en/learn/lesson-x`.
3. **LearnPage:** "Learn" header, lesson id, "Play" button → `/en/game/lesson-x`. "Back" button → `history.back()`.
4. **GamePage:** "Game" header, lesson id. "Back" button → `history.back()`.
5. **UserPage:** "User" header, "anonymous user" text. "Back" button → `history.back()`.
6. Define the persistent layout (shell + outlet) so the app does not remount on path change.
7. Ensure the shell is statically generated. Verify deep links and back/forward work via the internal router.
8. Unit tests for each screen component; integration test for "path → screen" and no remount. Optional E2E: navigate home → learn → back, assert still on home.

**Done when:** Changing path only swaps the outlet; root stays mounted. Back button and internal links work; E2E still passes on `/debug`.

**Phase 1 — URLs (game-client):** Same redirects as Phase 0. Available: `/en` (home), `/en/learn/lesson-x`, `/en/game/lesson-x`, `/en/user`, `/en/debug`. Backoffice unchanged (still home + debug only).

### Phase 2 — Offline (PWA + service worker)

1. Add a service worker (e.g. Serwist, next-pwa, or custom Workbox); precache the static HTMLs (one per path from generateStaticParams) and required JS/CSS (and any lazy route chunks if used).
2. Define "offline contract": e.g. "After first successful load, all in-shell pages (home, learn, game, user, debug) are available offline."
3. If lesson content is fetched or lazy-loaded, ensure those assets or chunks are precached or cached on first use so they work offline.
4. Test: load app once (any path), go offline, navigate to all in-shell routes and confirm they work.

**Done when:** First load then offline works for the full in-shell experience.

### Phase 3 — Versioning

1. Design cache keys and update policy (app version, optional content version) and document in this file or an ADR.
2. Add app version to build (e.g. `NEXT_PUBLIC_APP_VERSION` or build hash) and to SW precache revision/cache name.
3. On SW install/activate: new version → refresh caches (delete old, precache new).
4. Optionally: client checks version on load and shows "New version available" or triggers reload.

**Done when:** Deploying a new build results in updated caches and users receiving the new shell.

### Phase 4 — Internationalization (more locales and content)

1. Language segment and redirect are already in place from Phase 0; here we add more locales (e.g. `ru`) and real translation content.
2. Parse first path segment as `lang`; validate and fallback to default if unknown. Wire `lang` to translation provider and message loading; set `html lang`.
3. Persist language choice (e.g. localStorage) and keep URL in sync (`/en/`, `/ru/`, etc.). Optionally: language picker on root or in shell.
4. Ensure all locale bundles or chunks used offline are included in precache or cached on first use so switching language works offline after those locales have been used.

**Done when:** URLs like `/en/` and `/ru/lobby/lesson-1` work; language can be switched without full reload; offline works for each locale after it has been loaded once.

---

## Project management

This doc (`docs/product/offline-multilanguage-game-poc.md`) is the **source of truth**. Issues and the milestone reference it; they don’t duplicate the full spec.

### Epic vs phase issues

- **Epic (one issue):** The whole POC. Product-level: why we’re doing it, success criteria (e.g. “works offline after first load”, “language in URL”), link to this doc. No implementation steps.
- **Phase issues (one per phase):** Deliverable chunks. Each has scope, acceptance criteria, and “Part of Epic #X”. Use a **checklist inside** the phase issue (e.g. Game client, Backoffice, E2E) instead of separate sub-issues unless you need to assign or track them separately.
- **Milestone:** Create a milestone (e.g. `offline-multilanguage-game-poc`) and add the epic + all phase issues to it. Close phase issues when the phase PR is merged; close the epic when all phases are done.

### Step-by-step order

1. **Doc in repo:** Open a PR that adds (or updates) this doc at `docs/product/offline-multilanguage-game-poc.md`. Merge it so the spec exists on the default branch.
2. **Epic + milestone:** Create the epic issue and the milestone. Add the epic to the milestone. In the epic body: problem/success criteria and a link to this doc.
3. **Phase 0 issue:** Create the Phase 0 issue (see table below). Link to this doc and to the epic; add to the milestone.
4. **Phase 0 work:** Branch (e.g. `feat/phase-0-debug-migration`), implement, open PR, merge. Close the Phase 0 issue.
5. **Repeat for Phase 1, 2, 3, 4:** Create the phase issue, do the work, PR, merge, close the issue.
6. **Done:** When all phase issues are closed, close the epic.

### Epic issue (suggested content)

- **Title:** e.g. `Epic: Offline-first multilingual game POC` or `Game app: offline + i18n POC`.
- **Body:** Why (e.g. support offline and multiple languages without per-request server cost). Success criteria: app works offline after first load; user can switch language and URL reflects it; no middleware; redirects and preferred locale without extra serverless cost. Link: “Spec and phases are in the repo at `docs/product/offline-multilanguage-game-poc.md` (link to that file on the default branch when creating the epic).”

### Phase issues (titles and scope)

| Phase | Issue title | Scope / acceptance criteria |
|-------|-------------|-----------------------------|
| 0 | **Phase 0: Debug migration and E2E target (game-client + backoffice)** | **Game:** catch-all + internal router; `/` → `/en`, `/debug` → `/en/debug`; `/en` placeholder home, `/en/debug` DebugPage; update E2E and unit tests. **Backoffice:** home at `/en`, debug at `/en/debug`; redirects in next.config; update E2E. Both E2E pass on `/debug`. |
| 1 | **Phase 1: Internal routing — Home, Learn, Game, User screens** | Four page components (Home, Learn, Game, User), back button, unit/integration tests, optional E2E for navigate + back. Shell uses params + generateStaticParams for path-aware static HTML. |
| 2 | **Phase 2: Offline (PWA + service worker)** | SW; precache static HTMLs (per path) + assets; offline contract; test offline. |
| 3 | **Phase 3: Versioning** | Cache keys; app version in build and SW; cache refresh on update. |
| 4 | **Phase 4: Internationalization — more locales and content** | Add locales (e.g. `ru`), translation provider, language picker/persistence, offline locale bundles. |

- **Branching:** One feature branch per phase (e.g. `feat/phase-0-debug-migration`). Merge phase PR → close phase issue.

---

## Caveats and alternatives

- **"Offline on first visit"** means "after the first successful load." The very first request often isn't controlled by the SW yet.
- **Bundle size:** If the shell imports every screen, the initial bundle can grow. Use lazy loading (e.g. `next/dynamic` with `ssr: false` or `React.lazy` + Suspense) for screen components and precache those chunks so they're available offline.
- **Alternative:** Keep normal Next routes and use a single SW offline fallback page that renders the correct view from the URL when a route isn't cached. Conceptually similar "one shell when offline" but with file-based routes; we chose one catch-all for simplicity and explicit control.
- **SEO / Lighthouse:** We use path-aware **static** generation (`generateStaticParams` + params in the catch-all), so each URL gets the correct content in the initial HTML. Crawlers and users see the right content without waiting for hydration. No request-time SSR for known paths, so no per-request serverless cost.

---

## Summary

| Decision | Choice |
|----------|--------|
| Routing | Single catch-all route + internal client-side router |
| Shell | One static HTML per path; no `[lang]` route segment; path-aware content in initial HTML |
| Initial HTML / cost | Path-aware server render using **params** in catch-all; **generateStaticParams** so all known paths are built at **build time** (static). No request-time SSR for those paths — no serverless cost. RSC runs at build time; output cacheable for offline. |
| Language | First path segment = `lang` from day one; `/` → preferred locale (default `/en`) so returning users keep their language |
| Debug | **Game:** inside shell at `/en/debug`; cached offline with shell. **Backoffice:** normal route at `/en/debug`; no internal routing. Both: redirect `/debug` → `/en/debug` for E2E. |
| Versioning | App (shell) + content (lessons); design early, implement after offline |
| Order | Phase 0 (debug) → Phase 1 (screens) → Phase 2 (offline) → Phase 3 (versioning) → Phase 4 (i18n) |
| Tracking | Milestone `offline-multilanguage-game-poc`; one issue per phase (see Project management) |

This document can be updated as we implement each phase or change decisions (e.g. move to `[lang]` segment if we need per-locale shells later).
