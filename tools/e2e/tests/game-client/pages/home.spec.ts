import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const alphabetTitle = enResources.alphabet.title;
const homeHeading = enResources.home.heading;

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(defaultLocaleBase);
    await expect(page).toHaveURL(`${defaultLocaleBase}/explore/alphabet`);
    await expect(page.getByRole('heading', { name: alphabetTitle })).toBeVisible();
  });

  test('redirects to the localized alphabet landing page', async ({ page }) => {
    await expect(page.getByText(homeHeading)).toBeVisible();
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'home: initial load' });
  });
});
