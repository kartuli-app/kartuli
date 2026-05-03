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
  it('generates the shared UI token-demo utilities in consumer output', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain('.bg-color-token-test-primary');
    expect(css).toContain('.text-color-token-test-neutral');
    expect(css).toContain('.gap-spacing-token-test-small');
    expect(css).toContain('.px-spacing-token-test-big');
  });

  it('keeps only the minimal shared theme contract', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain('--color-color-token-test-primary: black;');
    expect(css).toContain('--color-color-token-test-neutral: white;');
    expect(css).toContain('--spacing-spacing-token-test-small: calc(var(--spacing) * 1);');
    expect(css).toContain('--spacing-spacing-token-test-big: calc(var(--spacing) * 4);');
  });
});
