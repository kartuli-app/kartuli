import { describe, expect, it } from 'vitest';
import {
  getExplicitLocaleFromPath,
  getPathLocaleKind,
  normalizeUnlocalizedPath,
} from './path-normalization';

describe('getPathLocaleKind', () => {
  it('classifies root', () => {
    expect(getPathLocaleKind('/')).toBe('root');
    expect(getPathLocaleKind('')).toBe('root');
  });

  it('classifies localized paths', () => {
    expect(getPathLocaleKind('/en')).toBe('localized');
    expect(getPathLocaleKind('/en/foo')).toBe('localized');
    expect(getPathLocaleKind('/en/')).toBe('localized');
    expect(getPathLocaleKind('/ru/learn/x')).toBe('localized');
  });

  it('classifies paths with query-like segments in the string (first segment still locale)', () => {
    expect(getPathLocaleKind('/en?foo=bar')).toBe('localized');
    expect(getPathLocaleKind('/ru/learn/x#hash')).toBe('localized');
  });

  it('classifies unlocalized paths', () => {
    expect(getPathLocaleKind('/banana')).toBe('unlocalized');
    expect(getPathLocaleKind('/debug')).toBe('unlocalized');
    expect(getPathLocaleKind('/foo/bar')).toBe('unlocalized');
  });
});

describe('getExplicitLocaleFromPath', () => {
  it('returns locale only when first segment is supported', () => {
    expect(getExplicitLocaleFromPath('/en')).toBe('en');
    expect(getExplicitLocaleFromPath('/ru/learn/a')).toBe('ru');
    expect(getExplicitLocaleFromPath('/')).toBeNull();
    expect(getExplicitLocaleFromPath('/banana')).toBeNull();
    expect(getExplicitLocaleFromPath('/fr/hello')).toBeNull();
    expect(getExplicitLocaleFromPath('/en?x=1')).toBe('en');
    expect(getExplicitLocaleFromPath('/banana?q=1')).toBeNull();
  });
});

describe('normalizeUnlocalizedPath', () => {
  it('leaves root and localized paths unchanged', () => {
    expect(normalizeUnlocalizedPath('/', 'en')).toBe('/');
    expect(normalizeUnlocalizedPath('/en', 'ru')).toBe('/en');
    expect(normalizeUnlocalizedPath('/en/foo', 'ru')).toBe('/en/foo');
    expect(normalizeUnlocalizedPath('/en/', 'ru')).toBe('/en/');
  });

  it('prefixes preferred locale for unlocalized paths', () => {
    expect(normalizeUnlocalizedPath('/banana', 'en')).toBe('/en/banana');
    expect(normalizeUnlocalizedPath('/foo/bar', 'ru')).toBe('/ru/foo/bar');
    expect(normalizeUnlocalizedPath('/debug', 'en')).toBe('/en/debug');
  });
});
