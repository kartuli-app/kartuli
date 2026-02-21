import { expect, test } from '@playwright/test';
import { expectNoCriticalConsoleErrors } from '../helpers/expect-no-critical-console-errors';
import { applyVercelProtectionBypass } from '../helpers/apply-vercel-protection-bypass';

test.describe('Game Client Smoke Tests', () => {
  test('app boots and shows game home', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Game Client' })).toBeVisible({
      timeout: 10000,
    });

    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });
  });

  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalConsoleErrors(page);
  });
});
