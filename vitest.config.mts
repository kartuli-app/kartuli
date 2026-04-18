import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // `tools/storybook` is excluded on purpose: its vitest.config.ts runs
    // every story in browser mode (Chromium via Playwright) and boots a
    // Storybook dev server via `storybookScript: 'pnpm dev'`. That suite is
    // opt-in via `pnpm --filter @kartuli/storybook test` (see
    // new-docs/quality.md). Including it here would hang `test:all:coverage`
    // on CI waiting for the dev server.
    // `tools/e2e` is excluded because it's a Playwright suite (pnpm e2e),
    // not a Vitest suite.
    projects: ['apps/*', 'packages/*', 'tools/*', '!tools/e2e', '!tools/storybook'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'json', 'json-summary'],
      outputDir: 'coverage',
      exclude: [
        'node_modules/',
        '**/*.test.{ts,tsx}',
        '**/*.config.{ts,js}',
        'setupTests.ts',
        '**/types/**',
      ],
    },
  },
});
