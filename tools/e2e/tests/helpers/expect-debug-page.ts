import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export interface DebugPageOptions {
  path: string;
  heading: string | RegExp;
  appLabel: string;
  testId: string;
}

const DEFAULT_TIMEOUT = 10_000;

/**
 * Asserts that the debug page has minimal structure: heading, app label, and root test id.
 * Use from smoke specs for game-client and backoffice to avoid duplicating the same assertions.
 */
export async function expectDebugPageStructure(
  page: Page,
  options: DebugPageOptions,
  timeout = DEFAULT_TIMEOUT,
): Promise<void> {
  await page.goto(options.path);

  await expect(page.getByText(options.heading)).toBeVisible({ timeout });
  await expect(page.getByText(options.appLabel)).toBeVisible({ timeout });
  await expect(page.getByTestId(options.testId)).toBeVisible({ timeout });
}
