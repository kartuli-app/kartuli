import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';

test.describe('Game Client i18n', () => {
  test('/en has html lang="en" and English content', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: /home/i })).toBeVisible();
  });

  test('/ru has html lang="ru" and Russian content', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/ru');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Главная' })).toBeVisible();
  });

  test('language switcher: from /en switch to Russian updates URL, html lang and content', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('button', { name: /switch to ru/i })).toBeVisible();

    await page.getByRole('button', { name: /switch to ru/i }).click();

    await expect(page).toHaveURL(/\/ru(\/|$)/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: 'Главная' })).toBeVisible({ timeout: 5000 });
  });

  test('language switcher: from /ru switch to English updates URL, html lang and content', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/ru');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('button', { name: /switch to en/i })).toBeVisible();

    await page.getByRole('button', { name: /switch to en/i }).click();

    await expect(page).toHaveURL(/\/en(\/|$)/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: /home/i })).toBeVisible({ timeout: 5000 });
  });
});
