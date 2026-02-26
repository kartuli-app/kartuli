import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { applyVercelProtectionBypass } from './apply-vercel-protection-bypass';

const DEFAULT_IGNORE_PATTERNS = [
  (error: string) => error.includes('401') || error.includes('403'),
  (error: string) => error.includes("Provider's accounts list is empty"),
  (error: string) => error.includes('Failed to load resource'),
];

export interface ExpectNoCriticalErrorsOptions {
  path?: string;
  ignorePatterns?: ((error: string) => boolean)[];
}

/**
 * Navigate to the given path, collect console errors and uncaught page errors,
 * filter known acceptable ones, and assert no critical errors.
 * Applies Vercel bypass header when env is present.
 */
export async function expectNoCriticalErrors(
  page: Page,
  options: ExpectNoCriticalErrorsOptions = {},
): Promise<void> {
  const { path = '/', ignorePatterns = DEFAULT_IGNORE_PATTERNS } = options;

  const consoleErrors: string[] = [];
  const onConsole = (msg: { type: () => string; text: () => string }) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  };
  const onPageError = (err: unknown) => {
    let message: string;
    if (err instanceof Error) {
      message = err.stack ?? (err.message || '(Error with no message)');
    } else if (typeof err === 'string') {
      message = err || '(empty string)';
    } else {
      try {
        message = JSON.stringify(err);
      } catch {
        message = String(err);
      }
    }
    if (message === '' || message === '{}') {
      message = `(non-Error: ${Object.prototype.toString.call(err)})`;
    }
    consoleErrors.push(`pageerror: ${message}`);
  };

  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  try {
    await applyVercelProtectionBypass(page);
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    // Capture late console errors from hydration/chunk loading.
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(250);
  } finally {
    page.off('console', onConsole);
    page.off('pageerror', onPageError);
  }

  const criticalErrors = consoleErrors.filter((error) => !ignorePatterns.some((fn) => fn(error)));

  if (criticalErrors.length > 0) {
    console.error('[expectNoCriticalErrors] All captured errors:', consoleErrors);
    console.error('[expectNoCriticalErrors] Critical (non-ignored):', criticalErrors);
  }

  expect(criticalErrors).toHaveLength(0);
}
