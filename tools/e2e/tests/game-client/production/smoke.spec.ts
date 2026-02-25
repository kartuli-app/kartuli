import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

test.describe('Game Client Smoke Tests', () => {
  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('debug page has minimal structure', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/debug');

    await expect(page.getByText(/🔧 Debug Info/)).toBeVisible({
      timeout: 10000,
    });

    await expect(page.getByText('App: @kartuli/game-client')).toBeVisible({
      timeout: 10000,
    });

    await expect(page.getByTestId('game-debug')).toBeVisible({ timeout: 10000 });
  });
});
