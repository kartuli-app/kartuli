import { expect, test } from '@playwright/test';
import { expectNoCriticalConsoleErrors } from '../helpers/expect-no-critical-console-errors';

test.describe('Storybook Smoke Tests', () => {
  test('loads without critical console errors', async ({ page }) => {
    await expectNoCriticalConsoleErrors(page);
  });

  test('sidebar has at least one section', async ({ page }) => {
    const bypassSecret = process.env.VERCEL_PROTECTION_BYPASS_SECRET;
    if (bypassSecret) {
      await page.setExtraHTTPHeaders({
        'x-vercel-protection-bypass': bypassSecret,
      });
    }

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Storybook sidebar typically has navigation or list of stories
    const sidebarNav = page.getByRole('navigation').first();
    await expect(sidebarNav).toBeVisible({ timeout: 10000 });
    const links = page.getByRole('link');
    await expect(links.first()).toBeVisible({ timeout: 5000 });
  });
});
