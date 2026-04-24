import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

// The debug page has no page-level heading — it renders the deployment info
// panel directly. We look for the panel's label text as the landing signal.
const debugInfoLabel = enResources.debug.debugInfo;

test.describe('Debug page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${defaultLocaleBase}/debug`);
    await expect(page.getByText(debugInfoLabel)).toBeVisible();
  });

  test('has a single h1 from the app bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, {
      label: 'debug: initial load',
    });
  });
});
