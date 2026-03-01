import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';

// Expected metadata per locale (must match apps/game-client locales/{en,ru}/metadata.ts)
// Layout applies title template "%s | Kartuli", so document title is title + " | Kartuli"
const EN_TITLE = 'Kartuli - Learn Georgian Language Through Games';
const RU_TITLE = 'Картули — учите грузинский язык через игры';
const TITLE_SUFFIX = ' | Kartuli';
const EN_DESCRIPTION =
  'Interactive Georgian language learning platform. Master Georgian vocabulary, grammar, and pronunciation through engaging games and exercises.';
const RU_DESCRIPTION =
  'Интерактивная платформа для изучения грузинского языка. Осваивайте лексику, грамматику и произношение с помощью игр и упражнений.';

test.describe('Game Client i18n', () => {
  test('/en has html lang="en", English content, and locale-specific metadata', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(EN_TITLE + TITLE_SUFFIX);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      EN_DESCRIPTION,
    );
    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: /home/i })).toBeVisible();
  });

  test('/ru has html lang="ru", Russian content, and locale-specific metadata', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/ru');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page).toHaveTitle(RU_TITLE + TITLE_SUFFIX);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      RU_DESCRIPTION,
    );
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

  test('root / redirects to preferred locale: after switching to Russian, visiting / shows Russian', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.getByRole('button', { name: /switch to ru/i }).click();
    await expect(page).toHaveURL(/\/ru(\/|$)/);
    await expect(page.getByRole('heading', { name: 'Главная' })).toBeVisible({ timeout: 5000 });

    await page.goto('/');
    await expect(page).toHaveURL(/\/ru(\/|$)/, { timeout: 10000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: 'Главная' })).toBeVisible();
  });
});
