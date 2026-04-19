import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

/**
 * Runs every story as a Vitest browser-mode test via @storybook/addon-vitest.
 * Each story is:
 *   1. Rendered in real Chromium (Playwright) — real CSS, real layout, real DOM.
 *   2. Smoke-tested (renders without errors).
 *   3. Scanned by axe-core if `addon-a11y` is active (fails on violations per
 *      `parameters.a11y.test` in .storybook/preview.tsx).
 *   4. If the story defines a `play()` function, it is executed and any
 *      assertions inside it are validated.
 *
 * Keeping this as a standalone config (not a `projects` entry inside the
 * root vitest.config.mts) means the slower browser run only fires when the
 * user explicitly opts in via `pnpm --filter @kartuli/storybook test`.
 */
export default defineConfig({
  plugins: [
    react(),
    storybookTest({
      configDir: resolve(here, '.storybook'),
      storybookScript: 'pnpm dev',
    }),
  ],
  resolve: {
    alias: {
      // Keep in sync with .storybook/main.ts viteFinal
      '@game-client': resolve(repoRoot, 'apps/game-client/src'),
      '@kartuli/ui': resolve(repoRoot, 'packages/ui/src'),
    },
  },
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      provider: playwright({}),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
    // addon-vitest 10.3+ wires preview annotations automatically — no custom
    // setup file needed unless we add project-specific test setup later.
  },
});
