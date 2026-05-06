import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';
import { beforeAll, describe, expect, it } from 'vitest';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
let css = '';

async function compileCssFromEntry(entryFileName: string): Promise<string> {
  const entryPath = path.resolve(currentDir, entryFileName);
  const entryCss = await readFile(entryPath, 'utf8');
  const result = await postcss([tailwindcss()]).process(entryCss, { from: entryPath });
  return result.css;
}

describe('tailwind integration (game-client)', () => {
  beforeAll(async () => {
    css = await compileCssFromEntry('globals.css');
  });

  it('emits design token CSS variables from shared-styles', () => {
    // 'primary' is the stable sentinel required by the design.md linter
    expect(css).toMatch(/--primary: .+;/);
    // brand token categories are present (structure, not specific names/values)
    expect(css).toMatch(/--brand-color-[\w-]+: #[0-9a-f]{6};/);
    expect(css).toMatch(/--brand-spacing-\d+: \d+px;/);
    expect(css).toMatch(/--brand-radius-[\w-]+: [\d.]+px;/);
  });

  it('wires design tokens into the Tailwind theme', () => {
    // 'primary' wiring is the stable sentinel check
    expect(css).toContain('--color-primary: var(--primary);');
    // brand token categories are wired (structure, not specific names)
    expect(css).toMatch(/--color-brand-color-[\w-]+: var\(--brand-color-[\w-]+\);/);
    expect(css).toMatch(/--spacing-brand-spacing-\d+: var\(--brand-spacing-\d+\);/);
    expect(css).toMatch(/--radius-brand-radius-[\w-]+: var\(--brand-radius-[\w-]+\);/);
  });
});
