import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

const placeholderHeading = 'Kartuli is in cleanup mode';
const placeholderBody =
  'The old home screen has been removed so the new route structure can be rebuilt with less noise.';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(defaultLocaleBase);
    await expect(page.getByRole('heading', { name: placeholderHeading })).toBeVisible();
  });

  test('renders the Phase 1 placeholder with a single h1', async ({ page }) => {
    const h1s = page.getByRole('heading', { level: 1 });
    await expect(h1s).toHaveCount(1);
    await expect(page.getByText(placeholderBody)).toBeVisible();
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'home: initial load' });
  });
});
