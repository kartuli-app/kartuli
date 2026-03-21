import { describe, expect, it } from 'vitest';
import {
  getExplicitLocaleFromPath,
  getPathLocaleKind,
  normalizeUnlocalizedPath,
  type PathLocaleKind,
} from './path-normalization';

describe('getPathLocaleKind', () => {
  it.each<{ path: string; kind: PathLocaleKind }>([
    { path: '/', kind: 'root' },
    { path: '', kind: 'root' },
    { path: '/en', kind: 'localized' },
    { path: '/en/foo', kind: 'localized' },
    { path: '/en/', kind: 'localized' },
    { path: '/ru/learn/x', kind: 'localized' },
    { path: '/en?foo=bar', kind: 'localized' },
    { path: '/ru/learn/x#hash', kind: 'localized' },
    { path: '/banana', kind: 'unlocalized' },
    { path: '/debug', kind: 'unlocalized' },
    { path: '/foo/bar', kind: 'unlocalized' },
  ])('getPathLocaleKind($path) → $kind', ({ path, kind }) => {
    expect(getPathLocaleKind(path)).toBe(kind);
  });
});

describe('getExplicitLocaleFromPath', () => {
  it.each<{ path: string; locale: 'en' | 'ru' | null }>([
    { path: '/en', locale: 'en' },
    { path: '/ru/learn/a', locale: 'ru' },
    { path: '/', locale: null },
    { path: '/banana', locale: null },
    { path: '/fr/hello', locale: null },
    { path: '/en?x=1', locale: 'en' },
    { path: '/banana?q=1', locale: null },
  ])('getExplicitLocaleFromPath($path)', ({ path, locale }) => {
    expect(getExplicitLocaleFromPath(path)).toBe(locale);
  });
});

describe('normalizeUnlocalizedPath', () => {
  it.each<{ path: string; preferred: 'en' | 'ru'; expected: string }>([
    { path: '/', preferred: 'en', expected: '/' },
    { path: '/en', preferred: 'ru', expected: '/en' },
    { path: '/en/foo', preferred: 'ru', expected: '/en/foo' },
    { path: '/en/', preferred: 'ru', expected: '/en/' },
    { path: '/banana', preferred: 'en', expected: '/en/banana' },
    { path: '/foo/bar', preferred: 'ru', expected: '/ru/foo/bar' },
    { path: '/debug', preferred: 'en', expected: '/en/debug' },
    { path: '', preferred: 'en', expected: '/' },
    { path: '/debug?foo=bar', preferred: 'en', expected: '/en/debug?foo=bar' },
    { path: '/foo/bar#section', preferred: 'ru', expected: '/ru/foo/bar#section' },
  ])('normalizeUnlocalizedPath($path, $preferred)', ({ path, preferred, expected }) => {
    expect(normalizeUnlocalizedPath(path, preferred)).toBe(expected);
  });
});
