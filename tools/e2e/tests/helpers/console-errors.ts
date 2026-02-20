import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

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
 * and assert no critical errors. Sets Vercel bypass header when env is present.
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

  const bypassSecret = process.env.VERCEL_PROTECTION_BYPASS_SECRET;
  if (bypassSecret) {
    await page.setExtraHTTPHeaders({
      'x-vercel-protection-bypass': bypassSecret,
    });
  }

  await page.goto(path);
  await page.waitForLoadState('networkidle');

  const criticalErrors = consoleErrors.filter((error) => !ignorePatterns.some((fn) => fn(error)));
  expect(criticalErrors).toHaveLength(0);
}
