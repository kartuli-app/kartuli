import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const heading = enResources.learn.heading;

test.describe('Learn page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${defaultLocaleBase}/learn`);
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'learn: initial load' });
  });
});
