import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['apps/*', 'packages/*', 'tools/*', '!tools/e2e'],
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
