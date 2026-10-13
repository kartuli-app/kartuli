import { defineConfig } from '@playwright/test';
import { createPlaywrightConfig } from './src/playwright-config.ts';

export default defineConfig(createPlaywrightConfig(process.env));
