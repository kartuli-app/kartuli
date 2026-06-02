import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const settingsTitle = enResources.common.dock.settings;
const settings = enResources.settings;

test.describe('Settings page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${defaultLocaleBase}/settings`);
    await expect(page.getByRole('heading', { name: settingsTitle })).toBeVisible();
    await expect(page.getByText(settings.app_settings)).toBeVisible();
    await expect(page.getByText(settings.language_section).first()).toBeVisible();
  });

  test('renders language options as radio buttons with current locale selected', async ({
    page,
  }) => {
    const enRadio = page.getByRole('radio', { name: settings.languages.en });
    const ruRadio = page.getByRole('radio', { name: settings.languages.ru });

    await expect(enRadio).toBeVisible();
    await expect(enRadio).toBeChecked();
    await expect(ruRadio).toBeVisible();
    await expect(ruRadio).not.toBeChecked();
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'settings: initial load' });
  });
});
