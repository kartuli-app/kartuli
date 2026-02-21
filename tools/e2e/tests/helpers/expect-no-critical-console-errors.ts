import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { applyVercelProtectionBypass } from './apply-vercel-protection-bypass';

const DEFAULT_IGNORE_PATTERNS = [
  (error: string) => error.includes('401') || error.includes('403'),
  (error: string) => error.includes("Provider's accounts list is empty"),
  (error: string) => error.includes('Failed to load resource'),
];

export interface ExpectNoCriticalConsoleErrorsOptions {
  path?: string;
  ignorePatterns?: ((error: string) => boolean)[];
}

/**
 * Navigate to the given path, collect console errors, filter known acceptable ones,
 * and assert no critical errors. Applies Vercel bypass header when env is present.
 */
export async function expectNoCriticalConsoleErrors(
  page: Page,
  options: ExpectNoCriticalConsoleErrorsOptions = {},
): Promise<void> {
  const { path = '/', ignorePatterns = DEFAULT_IGNORE_PATTERNS } = options;

  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await applyVercelProtectionBypass(page);
  await page.goto(path);
  await page.waitForLoadState('networkidle');

  const criticalErrors = consoleErrors.filter((error) => !ignorePatterns.some((fn) => fn(error)));
  expect(criticalErrors).toHaveLength(0);
}
