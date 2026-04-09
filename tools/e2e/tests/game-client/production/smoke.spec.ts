import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectDebugPageStructure } from '../../helpers/expect-debug-page';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';
import { getFirstLessonFixtureEn } from '../../helpers/first-lesson-fixture';

const { firstLessonTitleEn } = await getFirstLessonFixtureEn();

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
    });
  });

  test('navigate home → learn → back returns to home', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');

    await expect(page.getByRole('heading', { name: /გამარჯობა /i })).toBeVisible();

    await page.getByRole('link', { name: firstLessonTitleEn }).click();

    await page.getByRole('link', { name: /Back/i }).first().click();
  });
});
