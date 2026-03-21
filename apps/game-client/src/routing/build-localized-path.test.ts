import { describe, expect, it } from 'vitest';
import { buildLocalizedPath } from './build-localized-path';

describe('buildLocalizedPath', () => {
  it('replaces locale segment and keeps rest', () => {
    expect(buildLocalizedPath('/en/learn/x', 'ru')).toBe('/ru/learn/x');
    expect(buildLocalizedPath('/ru', 'en')).toBe('/en');
  });
});
