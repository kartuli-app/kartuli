import { lessons } from '@game-client/core/library';
import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectDebugPageStructure } from '../../helpers/expect-debug-page';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

test.describe('Game Client Smoke Tests', () => {
  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('debug page has minimal structure', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await expectDebugPageStructure(page, {
      path: '/en/debug',
      heading: /🔧 Debug Info/,
      appLabel: 'App: @kartuli/game-client',
      testId: 'game-debug',
    });
  });

  test('navigate home → learn → back returns to home', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');

    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: /გამარჯობა /i })).toBeVisible();

    await page.getByRole('button', { name: lessons[0].title }).click();
    await expect(page.getByTestId('game-learn')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('learn-lesson-id')).toHaveText(lessons[0].id);

    await page.getByRole('button', { name: /back/i }).first().click();
    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 5000 });
  });
});
