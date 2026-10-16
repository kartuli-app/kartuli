import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@game-client': resolve(repoRoot, 'apps/game-client/src'),
      '@kartuli/ui': resolve(repoRoot, 'packages/ui/src'),
    },
  },
  test: {
    name: 'storybook-integration',
    include: ['.storybook/**/*.test.ts'],
    browser: {
      enabled: true,
      provider: playwright({}),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
});
