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
  it('generates the shared UI token-demo utilities in consumer output', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain('.bg-color-token-test-primary');
    expect(css).toContain('.text-color-token-test-neutral');
    expect(css).toContain('.gap-spacing-token-test-small');
    expect(css).toContain('.px-spacing-token-test-big');
  });

  it('applies the app token-demo color overrides', async () => {
    const css = await compileCssFromEntry('globals.css');
    expect(css).toContain('--color-color-token-test-primary: oklch(20.13% 0.05785 148.293);');
    expect(css).toContain('--color-color-token-test-neutral: oklch(80.668% 0.0999 252.641);');
  });
});
