import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, type Page, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const heading = enResources.notFound.heading;
const removedPaths = [
  'debug',
  'learn',
  'privacy',
  'profile',
  'saved',
  'search',
  'terms-and-conditions',
] as const;

async function expectLocalizedNotFoundPage(page: Page, path: string) {
  const response = await page.goto(`${defaultLocaleBase}/${path}`);
  expect(response?.status(), `${path} should return HTTP 404`).toBe(404);

  const localizedHeading = page.getByRole('heading', { name: heading });

  // Next.js restores the localized App Router not-found UI after the document's
  // load event, so use that learner-visible UI as the readiness boundary.
  await localizedHeading.waitFor({ state: 'visible' });
  await expect(localizedHeading).toBeVisible();
}

test.describe('Page not found', () => {
  test.describe('generic missing route', () => {
    test.beforeEach(async ({ page }) => {
      await expectLocalizedNotFoundPage(page, 'non-existent-page');
    });

    test('has no a11y violations on initial load', async ({ page }) => {
      await expectA11y(page, { label: 'page-not-found: initial load' });
    });
  });

  for (const removedPath of removedPaths) {
    test(`removed route /${removedPath} returns 404 and renders the localized not-found page`, async ({
      page,
    }) => {
      await expectLocalizedNotFoundPage(page, removedPath);
    });
  }
});
