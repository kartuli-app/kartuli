import { enResources } from '@game-client/i18n/resources/resources-en';
import { ruResources } from '@game-client/i18n/resources/resources-ru';
import { expect, test } from '@playwright/test';

const en_description = enResources.metadata.description;
const en_current_language = enResources.settings.current_language.replace(
  '{{language}}',
  enResources.settings.languages.en,
);
const en_language_section = enResources.settings.language_section;
const en_switch_to_ru_label = enResources.settings.languages.ru;
const en_title = enResources.metadata.title;
const en_home_heading = enResources.home.heading;
const ru_current_language = ruResources.settings.current_language.replace(
  '{{language}}',
  ruResources.settings.languages.ru,
);
const ru_description = ruResources.metadata.description;
const ru_language_section = ruResources.settings.language_section;
const ru_switch_to_en_label = ruResources.settings.languages.en;
const ru_title = ruResources.metadata.title;
const ru_home_heading = ruResources.home.heading;

test.describe('Game Client i18n', () => {
  test('/en has html lang="en", English content, and locale-specific metadata', async ({
    page,
  }) => {
    await page.goto('/en');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(en_title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      en_description,
    );
    await expect(page.getByRole('heading', { name: en_home_heading })).toBeVisible();
  });

  test('/ru has html lang="ru", Russian content, and locale-specific metadata', async ({
    page,
  }) => {
    await page.goto('/ru');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page).toHaveTitle(ru_title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      ru_description,
    );
    await expect(page.getByRole('heading', { name: ru_home_heading })).toBeVisible();
  });

  test('settings language switcher: from /en/settings switch to Russian updates URL, html lang and content', async ({
    page,
  }) => {
    await page.goto('/en/settings');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: en_language_section })).toBeVisible();
    await expect(page.getByText(en_current_language)).toBeVisible();
    await expect(page.getByRole('button', { name: en_switch_to_ru_label })).toBeVisible();

    await page.getByRole('button', { name: en_switch_to_ru_label }).click();

    await expect(page).toHaveURL(/\/ru\/settings\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: ru_language_section })).toBeVisible();
    await expect(page.getByText(ru_current_language)).toBeVisible();
  });

  test('settings language switcher: from /ru/settings switch to English updates URL, html lang and content', async ({
    page,
  }) => {
    await page.goto('/ru/settings');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: ru_language_section })).toBeVisible();
    await expect(page.getByText(ru_current_language)).toBeVisible();
    await expect(page.getByRole('button', { name: ru_switch_to_en_label })).toBeVisible();

    await page.getByRole('button', { name: ru_switch_to_en_label }).click();

    await expect(page).toHaveURL(/\/en\/settings\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: en_language_section })).toBeVisible();
    await expect(page.getByText(en_current_language)).toBeVisible();
  });

  test('root / redirects to preferred locale: after switching to Russian, visiting / shows Russian', async ({
    page,
  }) => {
    await page.goto('/en/settings');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.getByRole('button', { name: en_switch_to_ru_label }).click();
    await expect(page).toHaveURL(/\/ru\/settings\/?$/);
    await expect(page.getByText(ru_current_language)).toBeVisible();

    await page.goto('/');
    await expect(page).toHaveURL(/\/ru(\/|$)/, { timeout: 10000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: ru_home_heading })).toBeVisible();
  });
});
