import { expect, test } from '@playwright/test';
import { expectNoCriticalConsoleErrors } from '../helpers/console-errors';

test.describe('Backoffice Client Smoke Tests', () => {
  test('app boots and shows backoffice home', async ({ page }) => {
    const bypassSecret = process.env.VERCEL_PROTECTION_BYPASS_SECRET;
    if (bypassSecret) {
      await page.setExtraHTTPHeaders({
        'x-vercel-protection-bypass': bypassSecret,
      });
    }

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Backoffice Client' })).toBeVisible({
      timeout: 10000,
    });

    await expect(page.getByTestId('backoffice-home')).toBeVisible({ timeout: 10000 });
  });

  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalConsoleErrors(page);
  });
});
