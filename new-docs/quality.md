# Quality

How we keep the codebase healthy: what we check, how we check it, and when it runs.

The goal is **layered** checks — each layer catches a different class of bug, and together they form a safety net without any single layer being overloaded. Cheap checks run on every save / commit; expensive checks run in CI.

---

## The layers at a glance

| Layer | Tool | What it catches | Where it runs |
| --- | --- | --- | --- |
| Static — formatting, lint, a11y rules | Biome | Style, obvious bugs, static a11y rules (`label`, `alt`, roles…) | Editor, pre-commit, CI |
| Static — types | TypeScript (`tsc --noEmit`) | Type errors | Editor, pre-push, CI |
| Static — quality / duplication | SonarCloud | Smells, duplication, security hotspots | CI (GitHub app) |
| Unit / integration | Vitest (happy-dom) | Pure logic, hooks, small component units | Pre-push, CI |
| Component / interaction / a11y | Storybook + `addon-vitest` + `addon-a11y` (Chromium) | Rendering, interactions, ARIA, labels, axe rules on single components | CI (see caveat below) |
| End-to-end + a11y per page | Playwright + `@axe-core/playwright` | Real app flows, portals, landmarks, contrast in-theme | CI (staging + production) |
| Performance / LH audit | Lighthouse CI | Performance, PWA, accessibility score, SEO, best practices | CI (staging + production, against deployed URL) |

Each row is independent; a change usually triggers several at once.

---

## Layer details

### 1. Static — Biome (`pnpm lint:all`)

- Config: [`biome.json`](../biome.json) (workspace packages) + [`biome.root.json`](../biome.root.json) (root-only files).
- Runs both the formatter and the linter.
- Has `recommended: true` plus `a11y: "error"` — static a11y rules (missing alt text, unlabeled inputs, invalid roles, etc.) fail the build.
- Cached by Turbo, so subsequent runs only check changed files.

Commands:

- `pnpm lint:all` / `pnpm lint:all:fix` — all workspaces via Turbo.
- `pnpm lint:root` — root-level files only (CI config, scripts).
- Per-package: `pnpm --filter <pkg> lint`.

### 2. Static — TypeScript (`pnpm typecheck:all`)

- Each package has a `typecheck` script that runs `tsc --noEmit`.
- Enforced independently per package, so an error in `@kartuli/ui` surfaces immediately in its typecheck without waiting for consumers.
- Path aliases are defined in the root [`tsconfig.json`](../tsconfig.json) and mirrored where a runtime needs them (Vite alias config in Storybook, Vitest `resolve.alias` in `apps/game-client`, etc.).

Commands:

- `pnpm typecheck:all` — all packages via Turbo.
- Per-package: `pnpm --filter <pkg> typecheck`.

### 3. Static — SonarCloud

- Integrated via the **GitHub app** (automatic analysis), not a manual CI step. There is no scanner run in our workflows.
- The [`sonar-project.properties`](../sonar-project.properties) file is left as documentation for exclusions; the same exclusions must be set in the SonarCloud UI to take effect.
- SonarCloud catches things Biome doesn't: duplication, cognitive complexity, "unused", security hotspots, etc.

### 4. Unit / integration — Vitest (happy-dom)

- Each runnable package (`apps/*`, `packages/*`, most of `tools/*`) has its own `vitest.config.ts` using `happy-dom`.
- Root [`vitest.config.mts`](../vitest.config.mts) composes them via `projects: ['apps/*', 'packages/*', 'tools/*', '!tools/e2e', '!tools/storybook']`, which is what `pnpm test:all:coverage` runs (`tools/storybook` stays opt-in; see section 5).
- Fast, headless, no browser. Good for:
  - Pure functions, reducers, i18n helpers.
  - React components that don't need real layout (rendering, event handlers, accessibility names via Testing Library).
  - Small integration tests wiring a few components together.

Commands:

- `pnpm test:all` — all packages via Turbo (each package runs its own `vitest run`).
- `pnpm test:all:coverage` — all tests via the root Vitest projects config, with v8 coverage (what CI's `validate-all-monorepo` uses).
- Per-package: `pnpm --filter <pkg> test` / `test:watch`.

### 5. Component / interaction / a11y — Storybook + `addon-vitest` + `addon-a11y`

- Config lives in [`tools/storybook/`](../tools/storybook). Stories are colocated with the source they describe:
  - `packages/ui/src/**/*.stories.tsx` (shared UI components).
  - `apps/game-client/src/**/*.stories.tsx` (app-specific components, currently `TranslitActionTooltip`).
- Runtime: Vitest 4 in **browser mode**, using `@vitest/browser-playwright` + real Chromium. Every story becomes a test that:
  1. Smoke-renders (fails if it throws).
  2. Runs axe-core via `@storybook/addon-a11y` (fails on any violation unless the story opts out).
  3. If it has a `play()` function, runs the interactions and any `expect(...)` calls inside.
- `preview.tsx` sets the same axe tag set as our E2E helper (`wcag2a/aa`, `wcag21a/aa`, `wcag22a/aa`, `best-practice`) and defaults `a11y.test: 'error'`.
- `preview.tsx` also wraps every story canvas in a `<main>` landmark via a global decorator. Components render in isolation in Storybook with no surrounding page, so axe's `region` rule (best-practice, "all page content must sit inside a landmark") would otherwise flag any atomic component (button, badge, input, …) for something the hosting page provides in the real app. The global `<main>` mirrors that. If a future story renders its own `<main>`, opt it out of `landmark-no-duplicate-main` via `parameters.a11y.config.rules`.

Interaction testing notes:

- For stories that need **real hover** (CSS `:hover`, Base UI pointer-enter detection), use `userEvent` from `vitest/browser`, not `storybook/test`. The latter is testing-library's synthetic `userEvent`, which doesn't move the real browser pointer.
- `vitest/browser` throws on evaluation outside a Vitest browser context, and Storybook auto-runs `play()` on mount in dev/preview, so import it via a `try`/`catch` helper that returns `null` when not in the test runner; `play()` can then bail early and the story still renders cleanly in Storybook UI. See [`translit-action-tooltip.stories.tsx`](../apps/game-client/src/ui/screens/translit/translit-action-tooltip.stories.tsx) for the pattern.

Commands:

- `pnpm --filter @kartuli/storybook test` — runs the whole story suite (~3s once Chromium is warm).
- `pnpm --filter @kartuli/storybook test:watch` — watch mode.
- `pnpm --filter @kartuli/storybook dev` — open Storybook UI to debug failing stories (click the "test" icon in the sidebar or use the "Click to debug the error directly in Storybook" link in failing output).

### 6. End-to-end — Playwright + `@axe-core/playwright`

- Specs live in [`tools/e2e/tests/`](../tools/e2e/tests), split per app (`game-client`, `backoffice-client`, `web-docs-client`) and per environment (`production/` for things that only make sense on a live URL).
- Each page spec uses the shared [`expectA11y`](../tools/e2e/tests/helpers/expect-a11y.ts) helper, which runs axe with the same WCAG tags as Storybook and applies a default exclude for Base UI's `data-base-ui-focus-guard` sentinels.
- Locale-aware URLs go through the [`defaultLocaleBase`](../tools/e2e/tests/helpers/locale-url.ts) helper instead of hardcoding `/en`.
- When a rule can't be fixed immediately (e.g. contrast on a dev-only page), the spec uses `disableRules: [...]` with a `TODO` comment, not a full `test.skip`, so the rest of axe still runs.

Commands:

- `pnpm e2e` — run everything.
- `pnpm e2e:ui` — Playwright UI mode.
- `pnpm c:e2e:game-client` / `c:e2e:backoffice-client` / `c:e2e:storybook` / `c:e2e:web-docs-client` — scoped runs against specific base URLs (see `package.json`).

### 7. Performance / Lighthouse

- Runs via `lhci autorun` against deployed URLs (local preview, Vercel preview, or production).
- [`lighthouserc.json`](../lighthouserc.json) asserts ≥0.9 on performance, accessibility, best-practices, SEO under mobile throttling.
- `LIGHTHOUSE_ASSERT_LEVEL` is `warn` on staging (doesn't fail the build) and `error` on production (does fail).
- Reports are posted as PR comments on staging and as job summaries on production.

---

## When it runs

### Local — editor

- Biome via the Biome VS Code extension: format on save + inline lint.
- TypeScript via the language server.
- Vitest via the Vitest extension if installed (stories show pass/fail inline).

### Local — git hooks (lefthook)

Config: [`lefthook.yml`](../lefthook.yml).

- **pre-commit** (parallel, on staged files):
  - `lint` — Turbo-cached Biome across workspaces.
  - `conflict-markers` — greps for `<<<<<<<` / `=======` / `>>>>>>>`.
  - `large-files` — blocks files >5 MB under `src/`.
  - `debug-patterns` — blocks `console.log`, `debugger`, `alert(`.
- **commit-msg**: validates Conventional Commits.
- **pre-push** (sequential, Turbo-scoped to `[HEAD^]`):
  - `typecheck` on affected packages (plus `@kartuli/e2e`).
  - `test` on affected packages (same scope, so it skips `@kartuli/e2e` which has no `test` script).

Bypass with `--no-verify` only in genuine emergencies.

### CI — pull requests (Staging Orchestrator)

Entry point: [`staging-orchestrator.yml`](../.github/workflows/staging-orchestrator.yml).

1. **`detect-affected`** — runs [`scripts/orchestrator/detect-affected.mjs`](../scripts/orchestrator/detect-affected.mjs) against `origin/main`, then maps the affected paths to workflow targets via `map-affected-to-workflows.mjs`.
2. **`validate-all-monorepo`** — always runs. Uses [`ci-validate-all-monorepo`](../.github/actions/ci-validate-all-monorepo/action.yml) which:
   - Runs `pnpm lint:root` first (serial).
   - Sets up Playwright browsers via [`ci-setup-playwright`](../.github/actions/ci-setup-playwright/action.yml) (needed so the Storybook Vitest browser-mode project can launch Chromium during `test:all:coverage`).
   - Then runs `lint:all`, `typecheck:all`, and `test:all:coverage` **in parallel**.
   - Uploads a Vitest coverage report as a PR comment.
3. **Per-target reusable workflows** (only called if that target is affected):
   - Next.js apps → [`staging-w-app-nextjs.yml`](../.github/workflows/staging-w-app-nextjs.yml): per-package validate (typecheck + lint + test), build, start server (or deploy to Vercel Preview), Lighthouse, Playwright E2E against the preview URL. Runs twice: `deploy_target=local` and `deploy_target=vercel` (matrix).
   - Storybook → [`staging-w-tool-storybook.yml`](../.github/workflows/staging-w-tool-storybook.yml): build, start preview server on `:6006`, Playwright E2E against it.
   - Web docs → [`staging-w-tool-web-docs-client.yml`](../.github/workflows/staging-w-tool-web-docs-client.yml).
   - Next.js dependency diagrams → [`staging-w-app-nextjs-diagram.yml`](../.github/workflows/staging-w-app-nextjs-diagram.yml).

All reusable workflows upload their artefacts (`e2e-artifacts-*`, `lighthouse-artifacts-*`) on failure so debugging doesn't require reproducing locally.

### CI — push to `main` (Production)

One workflow per deployed target:

- [`production-w-app-game-client.yml`](../.github/workflows/production-w-app-game-client.yml)
- [`production-w-app-backoffice-client.yml`](../.github/workflows/production-w-app-backoffice-client.yml)
- [`production-w-tool-web-docs-client.yml`](../.github/workflows/production-w-tool-web-docs-client.yml)

Each one: validate the package, deploy to Vercel Production, run E2E specs under `tests/<app>/production/` against the live URL, run Lighthouse with `LIGHTHOUSE_ASSERT_LEVEL=error`, notify the team on Telegram.

Production-only E2E specs are the subset under `tests/game-client/production/` — they're gated there because they depend on real data or real infra (e.g. the live site actually serving an i18n locale, valid robots.txt, etc.).

---

## Where new checks should live

When you add a new check, pick the cheapest layer that can meaningfully run it:

- **Can Biome express it?** Add a rule or a config override — it then runs on every save.
- **Pure logic or hook?** Vitest unit test next to the source.
- **Component rendering, ARIA, a single interaction?** Storybook story with a `play()` function. Gets documentation + interaction test + a11y scan for free.
- **A flow that spans more than one component, or needs real routing / real theme / portals?** Playwright spec under `tools/e2e/tests/<app>/pages/` (use the existing spec as a template).
- **Performance / PWA / SEO?** Add an assertion to `lighthouserc.json`.

---

## Known caveats / follow-ups

1. **Playwright browsers are shared across jobs**

   Both `@kartuli/e2e` (via `@playwright/test`) and `@kartuli/storybook` (via `@vitest/browser-playwright`) resolve to the same `playwright` version, so the browser binaries cached in `~/.cache/ms-playwright` are reused. `ci-setup-playwright` only needs to run once per job, and the `actions/cache@v4` entry inside it is keyed on `tools/e2e/package.json` + `pnpm-lock.yaml` so it survives across runs.

   If the two consumers ever drift to different `playwright` versions, `playwright install chromium` would need to run for each (or we'd need to align versions via the catalog). Check the lockfile if you upgrade either dep.

   For local runs, `pnpm --filter @kartuli/storybook test` works without a manual `playwright install` because the `playwright` library auto-downloads the matching browser on first launch (`pnpm.onlyBuiltDependencies` bypasses the postinstall script, not this runtime path).

2. **AAA rules are not enforced**

   We run WCAG 2.x AAA rules neither in Storybook nor in E2E, by design — AAA is a goal, not a floor (e.g. AAA contrast 7:1 on all text is unrealistic for a product with a branded palette). The docstring on `DEFAULT_TAGS` in [`expect-a11y.ts`](../tools/e2e/tests/helpers/expect-a11y.ts) covers the reasoning. If we ever want to opt specific pages in, the per-scan `includeTags: ['wcag2aaa']` escape hatch is already wired.

3. **SonarCloud exclusions live in two places**

   The `sonar-project.properties` file documents them but isn't actually read by SonarCloud (GitHub-app mode). The authoritative list lives in the project's SonarCloud UI. Keep both in sync manually when adding exclusions.
