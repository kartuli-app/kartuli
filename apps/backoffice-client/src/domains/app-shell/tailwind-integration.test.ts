import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';
import { beforeAll, describe, expect, it } from 'vitest';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
let entryCss = '';
let themeCss = '';
let css = '';

async function compileCssFromEntry(entryFileName: string): Promise<string> {
  const entryPath = path.resolve(currentDir, entryFileName);
  entryCss = await readFile(entryPath, 'utf8');
  const result = await postcss([tailwindcss()]).process(entryCss, { from: entryPath });
  return result.css;
}

describe('tailwind integration (backoffice-client)', () => {
  beforeAll(async () => {
    themeCss = await readFile(path.resolve(currentDir, 'theme.css'), 'utf8');
    css = await compileCssFromEntry('globals.css');
  });

  it('imports the shared contract before the app theme', () => {
    const sharedThemeImportIndex = entryCss.indexOf('@import "@kartuli/design-system";');
    const appThemeImportIndex = entryCss.indexOf('@import "./theme.css";');

    expect(sharedThemeImportIndex).toBeGreaterThan(-1);
    expect(appThemeImportIndex).toBeGreaterThan(sharedThemeImportIndex);
  });

  it('registers app and shared UI React sources', () => {
    expect(entryCss).toContain('@source "../../";');
    expect(entryCss).toContain('@source "../../../../../packages/ui/src";');
  });

  it('emits runtime variables from every token layer', () => {
    expect(css).toMatch(/--p-color-neutral-500: .+;/);
    expect(css).toMatch(/--p-spacing-3: .+;/);
    expect(css).toMatch(/--p-radius-1: .+;/);
    expect(css).toContain('--s-color-panel-control-bg: var(--p-color-neutral-200);');
    expect(css).toContain('--c-height-appbar: 5rem;');
  });

  it('overrides only Backoffice brand and accent primitives', () => {
    const declarations = [...themeCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((match) => match[1]);

    expect(declarations).toHaveLength(22);
    for (const declaration of declarations) {
      expect(declaration).toMatch(
        /^--p-color-(brand|accent)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      );
    }

    expect(css).toContain('--p-color-brand-600: #047857;');
    expect(css).toContain('--p-color-accent-600: #e11d48;');
    expect(css).toContain('--p-spacing-3: 12px;');
    expect(css).toContain('--p-radius-1: 8px;');
    expect(css).toContain('--s-color-shell-action-selected-bg: var(--p-color-brand-600);');
    expect(css).toContain('--s-color-shell-action-selected-ring: var(--p-color-accent-600);');
  });

  it('maps every token layer into the Tailwind theme', () => {
    expect(css).toContain('--color-p-color-neutral-500: var(--p-color-neutral-500);');
    expect(css).toContain('--spacing-p-spacing-3: var(--p-spacing-3);');
    expect(css).toContain('--radius-p-radius-1: var(--p-radius-1);');
    expect(css).toContain('--color-s-color-panel-control-bg: var(--s-color-panel-control-bg);');
    expect(css).toContain('--spacing-height-appbar: var(--c-height-appbar);');
  });

  it('compiles utilities from Backoffice and shared UI source', () => {
    const appLocalMaxWidth = ['max', 'w', '2xl'].join('-');
    const sharedRailOffset = ['ml', 'width-rail-compact'].join('-');
    const sharedDockPadding = ['pb', 'height-dock-mobile'].join('-');

    expect(css).toContain(`.${appLocalMaxWidth}`);
    expect(css).toContain(`.md\\:${sharedRailOffset}`);
    expect(css).toContain(`.${sharedDockPadding}`);
  });
});
