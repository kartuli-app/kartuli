import { describe, expect, it } from 'vitest';
import { buildLocalizedPath } from './build-localized-path';

describe('buildLocalizedPath', () => {
  it('replaces locale segment and keeps rest', () => {
    expect(buildLocalizedPath('/en/learn/x', 'ru')).toBe('/ru/learn/x');
    expect(buildLocalizedPath('/ru', 'en')).toBe('/en');
  });

  it('prepends locale for unlocalized paths (preserves route segments)', () => {
    expect(buildLocalizedPath('/learn/x', 'ru')).toBe('/ru/learn/x');
    expect(buildLocalizedPath('/debug', 'en')).toBe('/en/debug');
  });

  it('strips query from pathname input before rewriting', () => {
    expect(buildLocalizedPath('/en/learn/x?q=1', 'ru')).toBe('/ru/learn/x');
  });
});
