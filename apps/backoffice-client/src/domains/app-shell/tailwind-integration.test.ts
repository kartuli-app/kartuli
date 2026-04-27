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
  it('generates the UI-only arbitrary background utility in consumer output', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain(String.raw`.bg-\[rebeccapurple\]`);
  });

  it('falls back to shared brand token defaults when app does not override them', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain('--color-ds1-color-accent: oklch(63.7% 0.237 25.331);');
    expect(css).toContain('--color-ds1-color-accent-muted: oklch(92.5% 0.05 250);');
    expect(css).not.toContain('--color-ds1-color-accent: oklch(72.114% 0.179 155.2);');
  });
});
