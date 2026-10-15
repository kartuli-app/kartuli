import { expect, type Page, test } from '@playwright/test';
import { expectA11y } from '../helpers/expect-a11y';
import { expectNoCriticalErrors } from '../helpers/expect-no-critical-errors';

const sharedShellStoryPath = '/?path=/story/design-system-workshop-shared-shell--review';

const themes = [
  { id: 'game-default', label: 'Game / Default', brand: undefined, accent: undefined },
  { id: 'backoffice', label: 'Backoffice', brand: '#047857', accent: '#e11d48' },
  { id: 'stress-emerald', label: 'Stress: Emerald', brand: '#047857', accent: undefined },
  { id: 'stress-rose', label: 'Stress: Rose', brand: '#be123c', accent: undefined },
] as const;

interface PreviewThemeValues {
  computedBrand: string;
  computedAccent: string;
  inlineBrand: string;
  inlineAccent: string;
}

async function readPreviewTheme(page: Page): Promise<PreviewThemeValues> {
  return page
    .frameLocator('#storybook-preview-iframe')
    .locator('html')
    .evaluate((element) => {
      const computedStyle = getComputedStyle(element);
      return {
        computedBrand: computedStyle.getPropertyValue('--p-color-brand-600').trim(),
        computedAccent: computedStyle.getPropertyValue('--p-color-accent-600').trim(),
        inlineBrand: element.style.getPropertyValue('--p-color-brand-600'),
        inlineAccent: element.style.getPropertyValue('--p-color-accent-600'),
      };
    });
}

async function selectTheme(page: Page, label: string): Promise<void> {
  await page.getByRole('button', { name: /Design System review theme/ }).click();
  await page.getByRole('option').filter({ hasText: label }).click();
}

test.describe('Storybook Smoke Tests', () => {
  test('loads without critical console errors', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('sidebar has at least one section', async ({ page }) => {
    await page.goto('/');

    const sidebarNav = page.getByRole('navigation').first();
    await expect(sidebarNav).toBeVisible({ timeout: 10000 });
    const links = page.getByRole('link');
    await expect(links.first()).toBeVisible({ timeout: 5000 });
  });

  test('exposes every review theme and cleans variables across toolbar transitions', async ({
    page,
  }) => {
    await page.goto(sharedShellStoryPath);
    await expect(
      page.frameLocator('#storybook-preview-iframe').getByRole('heading', { name: 'Shared shell' }),
    ).toBeVisible();

    const defaultValues = await readPreviewTheme(page);
    expect(defaultValues.inlineBrand).toBe('');
    expect(defaultValues.inlineAccent).toBe('');

    await page.getByRole('button', { name: /Design System review theme/ }).click();
    for (const theme of themes) {
      await expect(page.getByRole('option').filter({ hasText: theme.label })).toBeVisible();
    }
    await page.keyboard.press('Escape');

    await selectTheme(page, 'Backoffice');
    await expect
      .poll(() => readPreviewTheme(page))
      .toMatchObject({
        inlineBrand: '#047857',
        inlineAccent: '#e11d48',
      });

    await selectTheme(page, 'Stress: Emerald');
    await expect
      .poll(() => readPreviewTheme(page))
      .toEqual({
        computedBrand: '#047857',
        computedAccent: defaultValues.computedAccent,
        inlineBrand: '#047857',
        inlineAccent: '',
      });

    await selectTheme(page, 'Stress: Rose');
    await expect
      .poll(() => readPreviewTheme(page))
      .toEqual({
        computedBrand: '#be123c',
        computedAccent: defaultValues.computedAccent,
        inlineBrand: '#be123c',
        inlineAccent: '',
      });

    await selectTheme(page, 'Backoffice');
    await expect
      .poll(() => readPreviewTheme(page))
      .toMatchObject({
        inlineBrand: '#047857',
        inlineAccent: '#e11d48',
      });

    await selectTheme(page, 'Game / Default');
    await expect.poll(() => readPreviewTheme(page)).toEqual(defaultValues);
  });

  for (const theme of themes) {
    test(`renders an accessible shared shell in ${theme.label}`, async ({ page }) => {
      const path = `/iframe.html?id=design-system-workshop-shared-shell--review&viewMode=story&globals=theme:${theme.id}`;
      await expectNoCriticalErrors(page, { path });

      await expect(page.getByRole('heading', { name: 'Shared shell' })).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Workshop navigation' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Overview' })).toHaveAttribute(
        'aria-current',
        'page',
      );

      const rootTheme = await page.locator('html').evaluate((element) => ({
        brand: element.style.getPropertyValue('--p-color-brand-600'),
        accent: element.style.getPropertyValue('--p-color-accent-600'),
      }));
      expect(rootTheme.brand).toBe(theme.brand ?? '');
      expect(rootTheme.accent).toBe(theme.accent ?? '');

      await expectA11y(page, { label: `shared shell: ${theme.label}` });
    });
  }
});
