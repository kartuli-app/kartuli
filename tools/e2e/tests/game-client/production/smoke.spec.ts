import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

test.describe('Game Client Smoke Tests', () => {
  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('landing has minimal structure', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Game Client' })).toBeVisible({
      timeout: 10000,
    });

    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });
  });
});
