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

  it('emits shared token CSS variables from shared-styles', () => {
    // 'p-neutral-500' is the stable color
    expect(css).toMatch(/--p-color-neutral-500: .+;/);
    // p-spacing-3 is the stable spacing
    expect(css).toMatch(/--p-spacing-3: .+;/);
    // p-radius-1 is the stable radius
    expect(css).toMatch(/--p-radius-1: .+;/);
  });

  it('wires shared tokens into the Tailwind theme', () => {
    // 'p-color-neutral-500' wiring is the stable color check
    expect(css).toContain('--color-p-color-neutral-500: var(--p-color-neutral-500);');
    // 'p-spacing-3' wiring is the stable spacing check
    expect(css).toContain('--spacing-p-spacing-3: var(--p-spacing-3);');
    // 'p-radius-1' wiring is the stable radius check
    expect(css).toContain('--radius-p-radius-1: var(--p-radius-1);');
  });
});
