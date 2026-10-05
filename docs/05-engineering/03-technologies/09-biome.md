---
description: Biome configuration scope, root/workspace lint execution, safe fixes and failure diagnosis.
status: implemented
intent: reference
---

# Biome

## Role and configuration

Biome formats and lints repository JavaScript, TypeScript, JSON and CSS. `biome.json` is the shared
configuration: two-space indentation, single quotes and semicolons for JavaScript, a 100-column width,
recommended lint rules and accessibility rules at error severity. Tailwind directives are enabled for
the CSS parser and unknown at-rules are allowed so Tailwind 4 syntax is accepted.

`biome.root.json` extends the shared file but excludes every app, package and tool. Root lint therefore
checks root-owned scripts/config only. Each workspace `lint` task runs `biome check .` from that
workspace and uses `biome.json` through upward discovery. This split prevents root lint and workspace
lint from checking the same source twice while allowing Turbo to cache workspace tasks independently.

Markdown, lockfiles, generated build directories, coverage, dependency diagrams and public diagram
assets are excluded. A passing Biome run does not validate documentation prose or generated links;
use the [Web Docs checks](../../03-tools/03-web-docs-client.md) for those.

## Commands and mutation boundaries

Run commands from the repository root:

```bash
pnpm run lint:root
pnpm run lint:all
pnpm --filter @kartuli/game-client run lint
pnpm run lint:root:fix
pnpm run lint:all:fix
```

The first three are read-only checks. The `*:fix` commands pass `--write` and can reformat or rewrite
files, so inspect `git diff` afterwards and do not use them as a substitute for understanding a lint
finding. `pnpm run validate:all` runs root lint before workspace lint, typecheck and tests.

Next.js 16 builds do not run a linter automatically; the repository's explicit lint scripts and CI
steps are the enforcement path. Do not infer a lint pass from `next build`.

## Changing rules or schema versions

Edit `biome.json` for shared behavior and `biome.root.json` only for root ownership/exclusion changes.
Before adding an exclusion, identify which other check owns the omitted files. Run both root and all
workspace lint because an `extends` or include change can shift ownership.

The `$schema` URLs are versioned. Renovate's custom JSONata manager tracks Biome schema versions in
both Biome files, while the executable version is declared in root `package.json`. Review those diffs
together; a newer schema URL with an older binary can produce misleading configuration errors.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| “No files were processed” for a direct path | The selected config may intentionally exclude that workspace; run its package lint |
| Tailwind CSS parse error | Confirm `css.parser.tailwindDirectives` and that the file is not using unsupported syntax |
| Rule differs locally and in CI | Verify pinned Node/pnpm, installed Biome version and both config files |
| Undeclared environment-variable warning | Check Turbo `env`/`passThroughEnv`; warnings can indicate a cache-input gap even when lint exits zero |
| Large unrelated rewrite after a fix | Restore only unintended formatting with care, then run a focused check before the full gate |

Biome catches source-level accessibility issues but does not render components or measure contrast.
See [Accessibility](../../06-quality/02-accessibility.md), [Testing](../../06-quality/01-testing.md)
and [SonarCloud](../../10-services/03-sonarcloud.md) for complementary checks.
