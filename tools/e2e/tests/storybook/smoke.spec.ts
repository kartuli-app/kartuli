import { expect, test } from '@playwright/test';
import { expectNoCriticalErrors } from '../helpers/expect-no-critical-errors';

test.describe('Storybook Smoke Tests', () => {
  test('loads without critical console errors', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('sidebar has at least one section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Storybook sidebar typically has navigation or list of stories
    const sidebarNav = page.getByRole('navigation').first();
    await expect(sidebarNav).toBeVisible({ timeout: 10000 });
    const links = page.getByRole('link');
    await expect(links.first()).toBeVisible({ timeout: 5000 });
  });
});
