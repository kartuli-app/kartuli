import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const heading = enResources.privacy.heading;

test.describe('Privacy page', () => {
  test.beforeEach(async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto(`${defaultLocaleBase}/privacy`);
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  });

  test('has a single h1 from the app bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'privacy: initial load' });
  });
});
