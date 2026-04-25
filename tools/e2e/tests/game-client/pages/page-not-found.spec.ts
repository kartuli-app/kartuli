import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const heading = enResources.notFound.heading;
const removedPaths = [
  'debug',
  'privacy',
  'profile',
  'saved',
  'search',
  'terms-and-conditions',
] as const;

test.describe('Page not found', () => {
  test.describe('generic missing route', () => {
    test.beforeEach(async ({ page }) => {
      const response = await page.goto(`${defaultLocaleBase}/non-existent-page`);
      expect(response?.status(), 'not-found route should return HTTP 404').toBe(404);
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    });

    test('has a single h1 from the app bar', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    });

    test('has no a11y violations on initial load', async ({ page }) => {
      await expectA11y(page, { label: 'page-not-found: initial load' });
    });
  });

  for (const removedPath of removedPaths) {
    test(`removed route /${removedPath} returns 404 and renders the localized not-found page`, async ({
      page,
    }) => {
      const response = await page.goto(`${defaultLocaleBase}/${removedPath}`);
      expect(response?.status(), `${removedPath} should return HTTP 404`).toBe(404);
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    });
  }
});
