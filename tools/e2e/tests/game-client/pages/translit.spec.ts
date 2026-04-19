import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectA11y } from '../../helpers/expect-a11y';
import { defaultLocaleBase } from '../../helpers/locale-url';

// The translit page has no page-level heading — it's a two-pane transliteration
// tool. We land on the "source" label (associated with the input textarea).
const sourceLabel = enResources.translit.source;
const switchToLatinGeorgian = enResources.translit.switch_direction_to_latin_to_georgian;
const switchToGeorgianLatin = enResources.translit.switch_direction_to_georgian_to_latin;

test.describe('Translit page', () => {
  test.beforeEach(async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await page.goto(`${defaultLocaleBase}/translit`);
    await expect(page.getByText(sourceLabel)).toBeVisible();
  });

  test('has a single h1 from the app bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  test('has no a11y violations on initial load', async ({ page }) => {
    await expectA11y(page, { label: 'translit: initial load' });
  });

  test('sets textarea lang from direction and updates after toggling', async ({ page }) => {
    const input = page.locator('#translit-input');
    const output = page.locator('#translit-output');

    await expect(input).toHaveAttribute('lang', 'ka-GE');
    await expect(output).toHaveAttribute('lang', 'ka-Latn');

    await page.getByRole('button', { name: switchToLatinGeorgian }).click();
    await expect(input).toHaveAttribute('lang', 'ka-Latn');
    await expect(output).toHaveAttribute('lang', 'ka-GE');

    await page.getByRole('button', { name: switchToGeorgianLatin }).click();
    await expect(input).toHaveAttribute('lang', 'ka-GE');
    await expect(output).toHaveAttribute('lang', 'ka-Latn');
  });
});
