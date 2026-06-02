import { enResources } from '@game-client/i18n/resources/resources-en';
import { ruResources } from '@game-client/i18n/resources/resources-ru';
import { expect, test } from '@playwright/test';

const EN_DESCRIPTION = enResources.metadata.description;
const EN_SETTINGS_TITLE = enResources.common.dock.settings;
const EN_LANGUAGE_SECTION = enResources.settings.language_section;
const EN_SWITCH_TO_RU_LABEL = enResources.settings.languages.ru;
const EN_ALPHABET_TITLE = enResources.alphabet.title;
const EN_HOME_HEADING = enResources.home.heading;
const RU_DESCRIPTION = ruResources.metadata.description;
const RU_SETTINGS_TITLE = ruResources.common.dock.settings;
const RU_LANGUAGE_SECTION = ruResources.settings.language_section;
const RU_SWITCH_TO_EN_LABEL = ruResources.settings.languages.en;
const RU_ALPHABET_TITLE = ruResources.alphabet.title;
const RU_HOME_HEADING = ruResources.home.heading;

test.describe('Game Client i18n', () => {
  test('/en has html lang="en", English content, and locale-specific metadata', async ({
    page,
  }) => {
    await page.goto('/en');

    await expect(page).toHaveURL(/\/en\/explore\/alphabet\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(`${EN_ALPHABET_TITLE} | Kartuli`);
    await expect(page.locator('meta[name="description"]').first()).toHaveAttribute(
      'content',
      EN_DESCRIPTION,
    );
    await expect(page.getByRole('heading', { name: EN_ALPHABET_TITLE })).toBeVisible();
    await expect(page.getByText(EN_HOME_HEADING)).toBeVisible();
  });

  test('/ru has html lang="ru", Russian content, and locale-specific metadata', async ({
    page,
  }) => {
    await page.goto('/ru');

    await expect(page).toHaveURL(/\/ru\/explore\/alphabet\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page).toHaveTitle(`${RU_ALPHABET_TITLE} | Kartuli`);
    await expect(page.locator('meta[name="description"]').first()).toHaveAttribute(
      'content',
      RU_DESCRIPTION,
    );
    await expect(page.getByRole('heading', { name: RU_ALPHABET_TITLE })).toBeVisible();
    await expect(page.getByText(RU_HOME_HEADING)).toBeVisible();
  });

  test('settings language switcher: from /en/settings switch to Russian updates URL, html lang and content', async ({
    page,
  }) => {
    await page.goto('/en/settings');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: EN_SETTINGS_TITLE })).toBeVisible();
    await expect(page.getByText(EN_LANGUAGE_SECTION).first()).toBeVisible();
    await expect(page.getByRole('radio', { name: EN_SWITCH_TO_RU_LABEL })).toBeVisible();

    await page.getByRole('radio', { name: EN_SWITCH_TO_RU_LABEL }).click();

    await expect(page).toHaveURL(/\/ru\/settings\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: RU_SETTINGS_TITLE })).toBeVisible();
    await expect(page.getByText(RU_LANGUAGE_SECTION).first()).toBeVisible();
    await expect(page.getByRole('radio', { name: EN_SWITCH_TO_RU_LABEL })).toBeChecked();
  });

  test('settings language switcher: from /ru/settings switch to English updates URL, html lang and content', async ({
    page,
  }) => {
    await page.goto('/ru/settings');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: RU_SETTINGS_TITLE })).toBeVisible();
    await expect(page.getByText(RU_LANGUAGE_SECTION).first()).toBeVisible();
    await expect(page.getByRole('radio', { name: RU_SWITCH_TO_EN_LABEL })).toBeVisible();

    await page.getByRole('radio', { name: RU_SWITCH_TO_EN_LABEL }).click();

    await expect(page).toHaveURL(/\/en\/settings\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: EN_SETTINGS_TITLE })).toBeVisible();
    await expect(page.getByText(EN_LANGUAGE_SECTION).first()).toBeVisible();
    await expect(page.getByRole('radio', { name: RU_SWITCH_TO_EN_LABEL })).toBeChecked();
  });

  test('root / redirects to preferred locale: after switching to Russian, visiting / shows Russian', async ({
    page,
  }) => {
    await page.goto('/en/settings');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.getByRole('radio', { name: EN_SWITCH_TO_RU_LABEL }).click();
    await expect(page).toHaveURL(/\/ru\/settings\/?$/);
    await expect(page.getByRole('radio', { name: EN_SWITCH_TO_RU_LABEL })).toBeChecked();

    await page.goto('/');
    await expect(page).toHaveURL(/\/ru\/explore\/alphabet\/?$/, { timeout: 10000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { name: RU_ALPHABET_TITLE })).toBeVisible();
    await expect(page.getByText(RU_HOME_HEADING)).toBeVisible();
  });
});
