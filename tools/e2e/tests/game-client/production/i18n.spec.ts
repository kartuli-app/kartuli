import { enResources } from '@game-client/i18n/resources/resources-en';
import { ruResources } from '@game-client/i18n/resources/resources-ru';
import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';

const en_description = enResources.metadata.description;
const en_title = enResources.metadata.title;
const en_home_heading = enResources.common.homeHeading;
const en_lang_label = enResources.common.langEn;
const ru_lang_label = enResources.common.langRu;
const ru_description = ruResources.metadata.description;
const ru_title = ruResources.metadata.title;
const ru_home_heading = ruResources.common.homeHeading;

// Layout applies title template "%s | Kartuli", so document title is title + " | Kartuli"
const TITLE_SUFFIX = ' | Kartuli';
const en_full_title = en_title + TITLE_SUFFIX;
const ru_full_title = ru_title + TITLE_SUFFIX;

test.describe('Game Client i18n', () => {
  test('/en has html lang="en", English content, and locale-specific metadata', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(en_full_title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      en_description,
    );
    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: en_home_heading })).toBeVisible();
  });

  test('/ru has html lang="ru", Russian content, and locale-specific metadata', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/ru');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page).toHaveTitle(ru_full_title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      ru_description,
    );
    await expect(page.getByTestId('game-home')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: ru_home_heading })).toBeVisible();
  });

  test('language switcher: from /en switch to Russian updates URL, html lang and content', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('combobox', { name: 'Language' })).toBeVisible();

    await page.getByRole('combobox', { name: 'Language' }).click();
    await page.getByRole('option', { name: ru_lang_label }).click();

    await expect(page).toHaveURL(/\/ru(\/|$)/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: ru_home_heading })).toBeVisible({
      timeout: 5000,
    });
  });

  test('language switcher: from /ru switch to English updates URL, html lang and content', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/ru');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('combobox', { name: 'Language' })).toBeVisible();

    await page.getByRole('combobox', { name: 'Language' }).click();
    await page.getByRole('option', { name: en_lang_label }).click();

    await expect(page).toHaveURL(/\/en(\/|$)/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: en_home_heading })).toBeVisible({
      timeout: 5000,
    });
  });

  test('root / redirects to preferred locale: after switching to Russian, visiting / shows Russian', async ({
    page,
  }) => {
    await applyVercelProtectionBypass(page);
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.getByRole('combobox', { name: 'Language' }).click();
    await page.getByRole('option', { name: ru_lang_label }).click();
    await expect(page).toHaveURL(/\/ru(\/|$)/);
    await expect(page.getByRole('heading', { name: ru_home_heading })).toBeVisible({
      timeout: 5000,
    });

    await page.goto('/');
    await expect(page).toHaveURL(/\/ru(\/|$)/, { timeout: 10000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: ru_home_heading })).toBeVisible();
  });
});
