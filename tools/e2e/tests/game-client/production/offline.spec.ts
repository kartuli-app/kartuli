import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';

test.describe('Game Client Offline', () => {
  test.afterEach(async ({ context }) => {
    await context.setOffline(false);
  });

  test('in-shell navigation works after going offline', async ({ page, context }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');

    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });

    await context.setOffline(true);

    await page.getByRole('button', { name: 'lesson-1' }).click();
    await expect(page.getByTestId('game-learn')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('learn-lesson-id')).toHaveText('lesson-1');

    await page.getByRole('button', { name: /back/i }).first().click();
    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 5000 });
  });
});
