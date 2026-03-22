import { enResources } from '@game-client/i18n/resources/resources-en';
import { ruResources } from '@game-client/i18n/resources/resources-ru';
import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';

const enNotFoundTitle = enResources.notFound.title;
const ruNotFoundTitle = ruResources.notFound.title;

test.describe('Game Client SPA routing', () => {
  test('unlocalized random URL becomes /en/... and shows router not-found', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    const slug = `e2e-random-${Date.now()}`;
    await page.goto(`/${slug}`);

    await expect(page).toHaveURL(new RegExp(`/en/${slug}$`));
    await expect(page.getByTestId('page-not-found')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('heading', { name: enNotFoundTitle })).toBeVisible();
  });

  test('after visiting /ru, unlocalized path normalizes with /ru prefix', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/ru');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru', { timeout: 10000 });

    const slug = `e2e-ru-${Date.now()}`;
    await page.goto(`/${slug}`);

    await expect(page).toHaveURL(new RegExp(`/ru/${slug}$`));
    await expect(page.getByTestId('page-not-found')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('heading', { name: ruNotFoundTitle })).toBeVisible();
  });

  test('/debug normalizes to preferred locale debug route', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/debug');
    await expect(page).toHaveURL(/\/en\/debug$/);
    await expect(page.getByTestId('game-debug')).toBeVisible({ timeout: 15000 });
  });
});
