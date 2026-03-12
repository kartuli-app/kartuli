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

describe('tailwind integration (game-client)', () => {
  it('generates the UI-only arbitrary background utility in consumer output', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain(String.raw`.bg-\[rebeccapurple\]`);
  });

  it('keeps shared token defaults and applies app override for only one token', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain('--color-brand: oklch(72.114% 0.179 155.2);');
    expect(css).toContain('--color-brand-muted: oklch(92.5% 0.05 250);');
  });
});
