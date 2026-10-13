import { enResources } from '@game-client/i18n/resources/resources-en';
import { ruResources } from '@game-client/i18n/resources/resources-ru';
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
const initialDocumentCases = [
  {
    locale: 'en',
    path: 'non-existent-page',
    messages: enResources.notFound,
  },
  {
    locale: 'en',
    path: 'saved',
    messages: enResources.notFound,
  },
  {
    locale: 'ru',
    path: 'non-existent-page',
    messages: ruResources.notFound,
  },
  {
    locale: 'ru',
    path: 'saved',
    messages: ruResources.notFound,
  },
] as const;

async function expectLocalizedNotFoundPage(page: Page, path: string) {
  const response = await page.goto(`${defaultLocaleBase}/${path}`);
  expect(response?.status(), `${path} should return HTTP 404`).toBe(404);

  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
}

test.describe('Page not found', () => {
  test.describe('server-rendered localized recovery', () => {
    test.use({ javaScriptEnabled: false, serviceWorkers: 'block' });

    for (const { locale, path, messages } of initialDocumentCases) {
      test(`/${locale}/${path} returns localized recovery content without JavaScript`, async ({
        page,
      }) => {
        const pathname = `/${locale}/${path}`;
        const response = await page.goto(pathname);

        expect(response?.status(), `${pathname} should return HTTP 404`).toBe(404);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page).toHaveTitle(messages.heading);
        await expect(
          page.locator('meta[name="robots"][content*="noindex"]').first(),
        ).toBeAttached();
        await expect(page.getByRole('heading', { name: messages.heading })).toBeVisible();
        await expect(page.getByText(pathname, { exact: true })).toBeVisible();
        await expect(page.getByText(messages.message, { exact: true })).toBeVisible();
      });
    }
  });

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
