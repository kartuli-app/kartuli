import './storybook.css';
import { describe, expect, it } from 'vitest';
import storybookCss from './storybook.css?raw';

function readableStyleSheetText(): string {
  return [...document.styleSheets]
    .flatMap((styleSheet) => {
      try {
        return [...styleSheet.cssRules].map((rule) => rule.cssText);
      } catch {
        return [];
      }
    })
    .join('\n');
}

describe('Storybook Tailwind integration', () => {
  it('imports the shared contract and scans only rendered React source trees', () => {
    const tailwindImportIndex = storybookCss.indexOf('@import "tailwindcss";');
    const designSystemImportIndex = storybookCss.indexOf('@import "@kartuli/design-system";');
    const firstSourceIndex = storybookCss.indexOf('@source');

    expect(tailwindImportIndex).toBeGreaterThan(-1);
    expect(designSystemImportIndex).toBeGreaterThan(tailwindImportIndex);
    expect(firstSourceIndex).toBeGreaterThan(designSystemImportIndex);
    expect(storybookCss).toContain('@source "../";');
    expect(storybookCss).toContain('@source "../../../packages/ui/src";');
    expect(storybookCss).toContain('@source "../../../apps/game-client/src";');
    expect(storybookCss).not.toMatch(/@source[^;]*(backoffice-client|packages\/design-system)/);
  });

  it('loads runtime variables from primitive, semantic, and component layers', () => {
    const rootStyle = getComputedStyle(document.documentElement);

    expect(rootStyle.getPropertyValue('--p-color-neutral-500').trim()).not.toBe('');
    expect(rootStyle.getPropertyValue('--s-color-shell-action-selected-bg').trim()).not.toBe('');
    expect(rootStyle.getPropertyValue('--c-height-appbar').trim()).toBe('5rem');
  });

  it('emits utilities discovered from Storybook, shared UI, and Game Client source', () => {
    const compiledCss = readableStyleSheetText();
    const storybookLocalClass = ['max', 'w', '2xl'].join('-');
    const sharedUiClass = `${['md'].join('')}:${['ml', 'width-rail-compact'].join('-')}`;
    const gameClientClass = ['h', '[18rem]'].join('-');

    expect(compiledCss).toContain(`.${CSS.escape(storybookLocalClass)}`);
    expect(compiledCss).toContain(`.${CSS.escape(sharedUiClass)}`);
    expect(compiledCss).toContain(`.${CSS.escape(gameClientClass)}`);
  });
});
