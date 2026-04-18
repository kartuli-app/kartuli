import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto(defaultLocaleBase);
    await expect(page.getByRole('heading', { name: /გამარჯობა/ })).toBeVisible();
  });

  test('renders expected landmarks, headings and skip link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeAttached();

    const h1s = page.getByRole('heading', { level: 1 });
    await expect(h1s).toHaveCount(1);

    await expect(page.getByRole('navigation', { name: 'Sections' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Language' })).toBeVisible();
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'home: initial load' });
  });

  test('has no a11y violations with language combobox open', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Language' }).click();
    await expect(page.getByRole('option').first()).toBeVisible();
    await expectA11y(page, {
      label: 'home: language combobox open',
      // Base UI's Select portals its popup to document.body (outside any
      // landmark), which axe's best-practice `region` rule flags. We disable
      // only that rule for this scan instead of `exclude`ing the popup subtree
      // — otherwise every rule inside the popup (contrast, ARIA, labels, …)
      // would be skipped too. The rest of the page already passes `region`,
      // so disabling it for this test is safe; the initial-load test still
      // enforces it.
      disableRules: ['region'],
    });
  });

  test('has no a11y violations with dock More menu open', async ({ page }) => {
    const moreTrigger = page.getByRole('button', { name: 'More' });
    await expect(moreTrigger).toBeEnabled();
    await moreTrigger.click();
    await expect(page.getByRole('navigation', { name: 'More' })).toBeVisible();
    await expectA11y(page, { label: 'home: more menu open' });
  });
});
