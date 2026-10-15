import { expect, test } from '@playwright/test';
import { expectA11y } from '../../helpers/expect-a11y';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

test.describe('Backoffice Client Smoke Tests', () => {
  test('root redirects to Home and shared navigation reaches About', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page.getByTestId('backoffice-home')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Home' })).toBeVisible();

    const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
    const homeLink = navigation.getByRole('link', { name: 'Home' });
    const aboutLink = navigation.getByRole('link', { name: 'About' });

    await expect(homeLink).toHaveAttribute('href', '/en');
    await expect(homeLink).toHaveAttribute('aria-current', 'page');
    await expect(aboutLink).toHaveAttribute('href', '/en/about');
    await expect(aboutLink).not.toHaveAttribute('aria-current', 'page');
    await expectA11y(page, { label: 'backoffice Home' });

    await aboutLink.click();
    await expect(page).toHaveURL(/\/en\/about\/?$/);
    await expect(page.getByTestId('backoffice-about')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
    await expect(homeLink).not.toHaveAttribute('aria-current', 'page');
    await expect(aboutLink).toHaveAttribute('aria-current', 'page');
    await expectA11y(page, { label: 'backoffice About after navigation' });

    await homeLink.click();
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  test('About is available as a direct route', async ({ page }) => {
    await page.goto('/en/about');

    await expect(page.getByTestId('backoffice-about')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', {
        name: 'About',
      }),
    ).toHaveAttribute('aria-current', 'page');
  });

  test('no critical console errors on either proof route', async ({ page }) => {
    await expectNoCriticalErrors(page, { path: '/en' });
    await expectNoCriticalErrors(page, { path: '/en/about' });
  });
});
