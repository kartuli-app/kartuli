import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const settings = enResources.settings;
const current_language = settings.current_language.replace('{{language}}', settings.languages.en);

test.describe('Settings page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${defaultLocaleBase}/settings`);
    await expect(page.getByRole('heading', { name: settings.language_section })).toBeVisible();
  });

  test('renders current language and the alternate language action', async ({ page }) => {
    await expect(page.getByText(current_language)).toBeVisible();
    await expect(page.getByRole('button', { name: settings.languages.ru })).toBeVisible();
    await expect(page.getByRole('button', { name: settings.languages.en })).toHaveCount(0);
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'settings: initial load' });
  });
});
