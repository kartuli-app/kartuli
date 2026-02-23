/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    environmentOptions: {
      'happy-dom': {
        pretendToBeVisual: true,
      },
    },
    setupFiles: ['./setupTests.ts'],
    globals: true,
  },
});
