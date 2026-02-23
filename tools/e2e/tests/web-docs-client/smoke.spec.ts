import { expect, test } from '@playwright/test';
import { expectNoCriticalErrors } from '../helpers/expect-no-critical-errors';

test.describe('Web Docs Client Smoke Tests', () => {
  test('loads without critical console errors', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('nav has minimal structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // VitePress docs typically have a nav with links
    const nav = page.getByRole('navigation').first();
    await expect(nav).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link').first()).toBeVisible({ timeout: 5000 });
  });
});
