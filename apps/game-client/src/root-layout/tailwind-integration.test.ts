import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';
import { beforeAll, describe, expect, it } from 'vitest';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
let entryCss = '';
let css = '';

async function compileCssFromEntry(entryFileName: string): Promise<string> {
  const entryPath = path.resolve(currentDir, entryFileName);
  entryCss = await readFile(entryPath, 'utf8');
  const result = await postcss([tailwindcss()]).process(entryCss, { from: entryPath });
  return result.css;
}

describe('tailwind integration (game-client)', () => {
  beforeAll(async () => {
    css = await compileCssFromEntry('globals.css');
  });

  it('imports the shared contract before the app theme', () => {
    const sharedThemeImportIndex = entryCss.indexOf('@import "@kartuli/tailwind-config";');
    const appThemeImportIndex = entryCss.indexOf('@import "./theme.css";');

    expect(sharedThemeImportIndex).toBeGreaterThan(-1);
    expect(appThemeImportIndex).toBeGreaterThan(sharedThemeImportIndex);
  });

  it('registers app and shared UI React sources', () => {
    expect(entryCss).toContain('@source "./";');
    expect(entryCss).toContain('@source "../";');
    expect(entryCss).toContain('@source "../../../../packages/ui/src";');
  });

  it('emits runtime variables from every token layer', () => {
    expect(css).toMatch(/--p-color-neutral-500: .+;/);
    expect(css).toContain('--p-spacing-0: 0px;');
    expect(css).toMatch(/--p-spacing-3: .+;/);
    expect(css).toContain('--p-spacing-5: 20px;');
    expect(css).toMatch(/--p-radius-1: .+;/);
    expect(css).toContain('--s-color-panel-control-bg: var(--p-color-neutral-200);');
    expect(css).toContain('--s-color-panel-control-interactive-bg: var(--p-color-neutral-200);');
    expect(css).toContain('--c-height-appbar: 5rem;');
  });

  it('maps every token layer into the Tailwind theme', () => {
    expect(css).toContain('--color-p-color-neutral-500: var(--p-color-neutral-500);');
    expect(css).toContain('--spacing-p-spacing-3: var(--p-spacing-3);');
    expect(css).toContain('--radius-p-radius-1: var(--p-radius-1);');
    expect(css).toContain('--color-s-color-panel-control-bg: var(--s-color-panel-control-bg);');
    expect(css).toContain(
      '--color-s-color-panel-control-interactive-bg: var(--s-color-panel-control-interactive-bg);',
    );
    expect(css).toContain('--spacing-height-appbar: var(--c-height-appbar);');
  });

  it('compiles the panel interaction and touched spacing utilities', () => {
    const interactiveBackground = ['bg', 's-color-panel-control-interactive-bg'].join('-');
    const spacingFive = ['p', 'spacing-5'].join('-');
    const spacingZero = ['p', 'spacing-0'].join('-');
    const sharedUiBorder = ['border', 'p-color-neutral-300'].join('-');

    expect(css).toContain(`.${interactiveBackground}`);
    expect(css).toContain(`.hover\\:${interactiveBackground}`);
    expect(css).toContain(`.focus-visible\\:${interactiveBackground}`);
    expect(css).toContain(`.data-\\[popup-open\\]\\:${interactiveBackground}`);
    expect(css).toContain(`.${sharedUiBorder}`);
    expect(css).toMatch(
      new RegExp(
        `\\.size-${spacingFive}\\s*\\{[^}]*width: var\\(--spacing-${spacingFive}\\);[^}]*height: var\\(--spacing-${spacingFive}\\);[^}]*\\}`,
        's',
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.p-${spacingZero}\\s*\\{[^}]*padding: var\\(--spacing-${spacingZero}\\);[^}]*\\}`,
        's',
      ),
    );
  });
});
