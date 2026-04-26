import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const a11y = enResources.common.accessibility;
const dock = enResources.common.dock.main_links;

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(defaultLocaleBase);
    await expect(page.getByRole('heading', { name: /გამარჯობა/ })).toBeVisible();
  });

  test('renders expected landmarks, headings and skip link', async ({ page }) => {
    await expect(page.getByRole('link', { name: a11y.skip_to_main })).toBeAttached();

    const h1s = page.getByRole('heading', { level: 1 });
    await expect(h1s).toHaveCount(1);

    await expect(page.getByRole('navigation', { name: a11y.landmarks.sections })).toBeVisible();
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'home: initial load' });
  });

  test('renders only Learn and Translit dock links', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: a11y.landmarks.sections });
    await expect(nav.getByRole('link', { name: dock.learn })).toBeVisible();
    await expect(nav.getByRole('link', { name: dock.translit })).toBeVisible();
    await expect(nav.getByRole('link', { name: /profile|saved/i })).toHaveCount(0);
    await expect(nav.getByRole('button', { name: /more/i })).toHaveCount(0);
  });
});
