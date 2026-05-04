import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

async function compileCssFromEntry(entryFileName: string): Promise<string> {
  const entryPath = path.resolve(currentDir, entryFileName);
  const entryCss = await readFile(entryPath, 'utf8');
  const result = await postcss([tailwindcss()]).process(entryCss, { from: entryPath });
  return result.css;
}

describe('tailwind integration (backoffice-client)', () => {
  it('emits design token CSS variables from shared-styles', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain('--brand-color-primary: #ca00e8;');
    expect(css).toContain('--brand-spacing-1: 4px;');
    expect(css).toContain('--brand-radius-1: 8px;');
    expect(css).toContain('--brand-typography-title-font-size: 24px;');
  });

  it('wires design tokens into the Tailwind theme', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain('--color-brand-color-primary: var(--brand-color-primary);');
    expect(css).toContain('--spacing-brand-spacing-1: var(--brand-spacing-1);');
    expect(css).toContain('--radius-brand-radius-1: var(--brand-radius-1);');
  });
});
