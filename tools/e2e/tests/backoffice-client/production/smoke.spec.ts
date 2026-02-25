import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

test.describe('Backoffice Client Smoke Tests', () => {
  test('debug page has minimal structure', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/debug');

    await expect(page.getByText(/🔧 Debug Info/)).toBeVisible({
      timeout: 10000,
    });

    await expect(page.getByText('App: @kartuli/backoffice-client')).toBeVisible({
      timeout: 10000,
    });

    await expect(page.getByTestId('backoffice-debug')).toBeVisible({ timeout: 10000 });
  });

  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });
});
