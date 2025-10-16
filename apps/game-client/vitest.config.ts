import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@kartuli/ui': resolve(__dirname, '../../packages/ui/src'),
    },
  },
  test: {
    globals: false,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
  },
});
