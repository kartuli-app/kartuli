---
description: Every root and workspace script, invocation context and important execution differences.
status: implemented
intent: reference
---

# Command Reference

## How to use this reference

Run root scripts with `pnpm run <name>`. For a workspace table use `pnpm --filter <package> run <name>`. The command column records the current package script, not a recommendation to invoke its internals directly. This inventory must be updated when scripts change.

Start with [Node/pnpm](./03-technologies/03-node-and-pnpm.md) for setup. `validate:all` sequences lint, typecheck and tests; it does not include every build or E2E run. Test servers and browser runtimes are prerequisites, not installed implicitly by the E2E command. Docs preview builds first; the direct VitePress preview command serves an existing build only.

## Important distinctions

- `*:no-cache` uses Turbo `--force`; `turbo:cache:wipe` removes local `.turbo`.
- `lint:all:fix` and `lint:root:fix` modify files; ordinary lint checks do not.
- `test:all` includes workspace browser tests; `test:all:coverage` uses root Vitest exclusions.
- `c:e2e:*` sets a target URL and selects tests but does not start the target.
- App preview builds then starts. Storybook's current preview script serves existing `storybook-static` through `npx http-server`; it does not build first. That legacy implementation differs from the pnpm-only contributor convention and is recorded here, not silently changed.
- Diagram scripts require local Graphviz `dot`; Lighthouse can upload reports to temporary public storage.

## kartuli

Source: `package.json`.

| Script | Current command |
| --- | --- |
| `prepare` | `if git rev-parse --git-dir >/dev/null 2>&1; then lefthook install; else echo 'Skipping lefthook install (not in git repo)'; fi` |
| `turbo:cache:wipe` | `node -e "require('fs').rmSync('.turbo', { recursive: true, force: true })"` |
| `orchestrator:detect-affected:pr` | `node ./scripts/orchestrator/detect-affected.mjs --pr` |
| `orchestrator:detect-affected:prod` | `node ./scripts/orchestrator/detect-affected.mjs --prod` |
| `dev:all` | `turbo run dev` |
| `build:all` | `turbo run build` |
| `build:all:no-cache` | `turbo run build --force` |
| `lint:root` | `pnpm exec biome check --config-path biome.root.json .` |
| `lint:root:fix` | `pnpm exec biome check --config-path biome.root.json . --write` |
| `lint:all` | `turbo run lint` |
| `lint:all:fix` | `turbo run lint -- --write` |
| `lint:all:no-cache` | `turbo run lint --force` |
| `typecheck:all:no-cache` | `turbo run typecheck --force` |
| `typecheck:all` | `turbo run typecheck` |
| `test:all` | `turbo run test` |
| `test:all:no-cache` | `turbo run test --force` |
| `test:all:coverage` | `vitest run --coverage` |
| `validate:all` | `pnpm run lint:root && pnpm run lint:all && pnpm run typecheck:all && pnpm run test:all` |
| `diagrams:all` | `pnpm --filter @kartuli/diagram-generator run all` |
| `e2e` | `pnpm --filter @kartuli/e2e e2e` |
| `e2e:ui` | `pnpm --filter @kartuli/e2e e2e:ui` |
| `lighthouse` | `lhci autorun` |
| `c:e2e:game-client` | `BASE_URL=http://localhost:3000 pnpm --filter @kartuli/e2e exec playwright test tests/game-client` |
| `c:e2e:backoffice-client` | `BASE_URL=http://localhost:3001 pnpm --filter @kartuli/e2e exec playwright test tests/backoffice-client` |
| `c:e2e:storybook` | `BASE_URL=http://localhost:6006 pnpm --filter @kartuli/e2e exec playwright test tests/storybook` |
| `c:e2e:web-docs-client` | `BASE_URL=http://localhost:4173 pnpm --filter @kartuli/e2e exec playwright test tests/web-docs-client` |
| `c:build:game-client` | `turbo run build --filter=@kartuli/game-client` |
| `c:build:backoffice-client` | `turbo run build --filter=@kartuli/backoffice-client` |
| `c:build:storybook` | `turbo run build --filter=@kartuli/storybook` |
| `c:build:web-docs-client` | `turbo run build --filter=@kartuli/web-docs-client` |
| `c:dev:game-client` | `turbo run dev --filter=@kartuli/game-client` |
| `c:dev:backoffice-client` | `turbo run dev --filter=@kartuli/backoffice-client` |
| `c:dev:storybook` | `turbo run dev --filter=@kartuli/storybook` |
| `c:dev:web-docs-client` | `turbo run dev --filter=@kartuli/web-docs-client` |
| `c:preview:game-client` | `turbo run preview --filter=@kartuli/game-client` |
| `c:preview:backoffice-client` | `turbo run preview --filter=@kartuli/backoffice-client` |
| `c:preview:storybook` | `turbo run preview --filter=@kartuli/storybook` |
| `c:preview:web-docs-client` | `turbo run preview --filter=@kartuli/web-docs-client` |

## @kartuli/backoffice-client

Source: `apps/backoffice-client/package.json`.

| Script | Current command |
| --- | --- |
| `dev` | `next dev --turbo --port 3001` |
| `build` | `next build` |
| `start` | `next start --port 3000` |
| `preview` | `next build && next start --port 3000` |
| `test` | `vitest run` |
| `lint` | `biome check .` |
| `typecheck` | `tsc --noEmit` |

## @kartuli/game-client

Source: `apps/game-client/package.json`.

| Script | Current command |
| --- | --- |
| `dev` | `next dev --turbo --port 3000` |
| `build` | `next build` |
| `start` | `next start --port 3000` |
| `preview` | `next build && next start --port 3000` |
| `test` | `vitest run` |
| `lint` | `biome check .` |
| `typecheck` | `tsc --noEmit` |

## @kartuli/tailwind-config

Source: `packages/tailwind-config/package.json`.

| Script | Current command |
| --- | --- |
| `lint` | `biome check .` |

## @kartuli/ui

Source: `packages/ui/package.json`.

| Script | Current command |
| --- | --- |
| `build:components` | `tsc --project tsconfig.build.json` |
| `build` | `pnpm run build:components` |
| `dev:components` | `tsc --watch` |
| `dev` | `pnpm run dev:components` |
| `lint` | `biome check .` |
| `typecheck` | `tsc --noEmit` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |

## @kartuli/diagram-generator

Source: `tools/diagram-generator/package.json`.

| Script | Current command |
| --- | --- |
| `lint` | `biome check .` |
| `all` | `pnpm run game-client && pnpm run backoffice-client && pnpm run monorepo` |
| `game-client:dot` | `mkdir -p ../../diagrams/output/current && (cd ../../apps/game-client && ../../tools/diagram-generator/node_modules/.bin/dependency-cruise --config ../../tools/diagram-generator/config/dependency-cruiser.nextjs-app.js ./src/ --output-type dot) \| dot -T svg > ../../diagrams/output/current/diagram-game-client.svg` |
| `game-client:mermaid` | `mkdir -p ../../diagrams/output/current && cd ../../apps/game-client && ../../tools/diagram-generator/node_modules/.bin/dependency-cruise --config ../../tools/diagram-generator/config/dependency-cruiser.nextjs-app.js ./src/ --output-type mermaid -f ../../diagrams/output/current/diagram-game-client.mmd` |
| `game-client:web` | `mkdir -p ../../diagrams/output/current && (cd ../../apps/game-client && ../../tools/diagram-generator/node_modules/.bin/dependency-cruise --config ../../tools/diagram-generator/config/dependency-cruiser.nextjs-app.js ./src/ --output-type dot) \| dot -T svg \| node ./scripts/run-wrap-from-stdin.mjs > ../../diagrams/output/current/diagram-game-client.html` |
| `game-client` | `pnpm run game-client:dot && pnpm run game-client:mermaid && pnpm run game-client:web` |
| `backoffice-client:dot` | `mkdir -p ../../diagrams/output/current && (cd ../../apps/backoffice-client && ../../tools/diagram-generator/node_modules/.bin/dependency-cruise --config ../../tools/diagram-generator/config/dependency-cruiser.nextjs-app.js ./src/ --output-type dot) \| dot -T svg > ../../diagrams/output/current/diagram-backoffice-client.svg` |
| `backoffice-client:mermaid` | `mkdir -p ../../diagrams/output/current && cd ../../apps/backoffice-client && ../../tools/diagram-generator/node_modules/.bin/dependency-cruise --config ../../tools/diagram-generator/config/dependency-cruiser.nextjs-app.js ./src/ --output-type mermaid -f ../../diagrams/output/current/diagram-backoffice-client.mmd` |
| `backoffice-client:web` | `mkdir -p ../../diagrams/output/current && (cd ../../apps/backoffice-client && ../../tools/diagram-generator/node_modules/.bin/dependency-cruise --config ../../tools/diagram-generator/config/dependency-cruiser.nextjs-app.js ./src/ --output-type dot) \| dot -T svg \| node ./scripts/run-wrap-from-stdin.mjs > ../../diagrams/output/current/diagram-backoffice-client.html` |
| `backoffice-client` | `pnpm run backoffice-client:dot && pnpm run backoffice-client:mermaid && pnpm run backoffice-client:web` |
| `monorepo:dot` | `mkdir -p ../../diagrams/output/current && (cd ../.. && tools/diagram-generator/node_modules/.bin/dependency-cruise --config tools/diagram-generator/config/dependency-cruiser.monorepo.js . --output-type dot \| dot -T svg > diagrams/output/current/diagram-monorepo.svg)` |
| `monorepo:mermaid` | `mkdir -p ../../diagrams/output/current && cd ../.. && tools/diagram-generator/node_modules/.bin/dependency-cruise --config tools/diagram-generator/config/dependency-cruiser.monorepo.js . --output-type mermaid -f diagrams/output/current/diagram-monorepo.mmd` |
| `monorepo:web` | `mkdir -p ../../diagrams/output/current && (cd ../.. && tools/diagram-generator/node_modules/.bin/dependency-cruise --config tools/diagram-generator/config/dependency-cruiser.monorepo.js . --output-type dot \| dot -T svg \| node tools/diagram-generator/scripts/run-wrap-from-stdin.mjs > diagrams/output/current/diagram-monorepo.html)` |
| `monorepo` | `pnpm run monorepo:dot && pnpm run monorepo:mermaid && pnpm run monorepo:web` |

## @kartuli/e2e

Source: `tools/e2e/package.json`.

| Script | Current command |
| --- | --- |
| `e2e` | `playwright test` |
| `e2e:headed` | `playwright test --headed` |
| `e2e:debug` | `playwright test --debug` |
| `e2e:ui` | `playwright test --ui` |
| `lint` | `biome check .` |
| `typecheck` | `tsc --noEmit` |

## @kartuli/storybook

Source: `tools/storybook/package.json`.

| Script | Current command |
| --- | --- |
| `dev` | `storybook dev -p 6006 --no-open` |
| `build` | `storybook build` |
| `preview` | `npx http-server ./storybook-static -p 6006` |
| `lint` | `biome check .` |
| `typecheck` | `tsc --noEmit` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |

## @kartuli/web-docs-client

Source: `tools/web-docs-client/package.json`.

| Script | Current command |
| --- | --- |
| `lint` | `biome check .` |
| `dev` | `pnpm generate-llm-bundle && vitepress dev` |
| `build` | `pnpm generate-llm-bundle && cd ../.. && pnpm exec vitepress build tools/web-docs-client && cd tools/web-docs-client && pnpm copy-llm-bundle` |
| `preview` | `pnpm build && vitepress preview` |
| `generate-llm-bundle` | `node scripts/generate-llm-bundle.js` |
| `copy-llm-bundle` | `node scripts/copy-llm-bundle.js` |
| `check-docs` | `node scripts/check-docs.js` |
| `test` | `node --test scripts/site-navigation.node-test.js` |

## @kartuli/docs

Source: `docs/package.json`.

| Script | Current command |
| --- | --- |
| `build` | `echo 'Docs content only; built by web-docs-client.'` |
