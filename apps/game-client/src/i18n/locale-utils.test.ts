import { describe, expect, it } from 'vitest';
import {
  getCurrentSupportedLocale,
  getLocalizedPathnameForLocale,
  getPathSuffixForBareLocaleRewrite,
  getPreferredSupportedLocale,
} from './locale-utils';

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

  it('falls back to the default supported locale when no fallback is provided', () => {
    expect(getCurrentSupportedLocale('ka')).toBe('en');
    expect(getCurrentSupportedLocale(undefined)).toBe('en');
  });
});

describe('getPreferredSupportedLocale', () => {
  it('returns the cookie locale when it is supported', () => {
    expect(getPreferredSupportedLocale('ru', 'en')).toBe('ru');
    expect(getPreferredSupportedLocale('en', 'ru')).toBe('en');
  });

  it('falls back to accept-language when cookie is absent or unsupported', () => {
    expect(getPreferredSupportedLocale(undefined, 'ru')).toBe('ru');
    expect(getPreferredSupportedLocale('ka', 'ru')).toBe('ru');
  });

  it('parses the primary subtag from accept-language', () => {
    expect(getPreferredSupportedLocale(undefined, 'ru-RU,ru;q=0.9,en;q=0.8')).toBe('ru');
    expect(getPreferredSupportedLocale(undefined, 'en-US,en;q=0.9')).toBe('en');
  });

  it('falls back to defaultLocale when no signal matches', () => {
    expect(getPreferredSupportedLocale()).toBe('en');
    expect(getPreferredSupportedLocale('ka', 'fr')).toBe('en');
  });
});

describe('getPathSuffixForBareLocaleRewrite', () => {
  it('returns empty for root', () => {
    expect(getPathSuffixForBareLocaleRewrite('/')).toBe('');
  });

  it('preserves single-segment paths without a locale prefix', () => {
    expect(getPathSuffixForBareLocaleRewrite('/settings')).toBe('settings');
  });

  it('strips a two-letter unsupported prefix when more segments follow', () => {
    expect(getPathSuffixForBareLocaleRewrite('/de/settings')).toBe('settings');
    expect(getPathSuffixForBareLocaleRewrite('/fr/translit')).toBe('translit');
  });

  it('returns empty when only a two-letter unsupported prefix is present', () => {
    expect(getPathSuffixForBareLocaleRewrite('/de')).toBe('');
  });

  it('keeps multi-segment paths that do not start with a two-letter tag', () => {
    expect(getPathSuffixForBareLocaleRewrite('/foo/bar')).toBe('foo/bar');
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
