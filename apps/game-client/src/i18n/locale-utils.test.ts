import { describe, expect, it } from 'vitest';
import { getCurrentSupportedLocale, getLocalizedPathnameForLocale } from './locale-utils';

describe('getCurrentSupportedLocale', () => {
  it('returns the exact supported locale when resolved language matches', () => {
    expect(getCurrentSupportedLocale('en')).toBe('en');
    expect(getCurrentSupportedLocale('ru')).toBe('ru');
  });

  it('normalizes region-specific locales to the supported base locale', () => {
    expect(getCurrentSupportedLocale('en-US')).toBe('en');
    expect(getCurrentSupportedLocale('ru-RU')).toBe('ru');
  });

  it('falls back to the provided locale when resolved language is unsupported', () => {
    expect(getCurrentSupportedLocale('ka', 'ru')).toBe('ru');
  });
});

describe('getLocalizedPathnameForLocale', () => {
  it('replaces an existing locale prefix', () => {
    expect(getLocalizedPathnameForLocale('/en/settings', 'ru')).toBe('/ru/settings');
  });

  it('preserves query strings and hashes', () => {
    expect(getLocalizedPathnameForLocale('/en/settings?tab=language#section', 'ru')).toBe(
      '/ru/settings?tab=language#section',
    );
  });

  it('adds a locale prefix when none is present', () => {
    expect(getLocalizedPathnameForLocale('/settings', 'en')).toBe('/en/settings');
  });

  it('keeps locale-only paths valid', () => {
    expect(getLocalizedPathnameForLocale('/en', 'ru')).toBe('/ru');
  });
});
