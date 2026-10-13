import { describe, expect, it } from 'vitest';
import { E2eConfigError } from './errors.ts';
import { E2E_IDENTITY_FILE } from './targets.ts';
import { identityUrlForBase, normalizeBaseUrl } from './urls.ts';

const webDocsBase = 'https://kartuli-app.github.io/kartuli/';

describe('normalizeBaseUrl', () => {
  it('stores origin-only URLs without a trailing slash', () => {
    expect(normalizeBaseUrl('http://localhost:3000')).toBe('http://localhost:3000');
    expect(normalizeBaseUrl('http://localhost:3000/')).toBe('http://localhost:3000');
    expect(normalizeBaseUrl('http://localhost:3001/')).toBe('http://localhost:3001');
    expect(normalizeBaseUrl('https://www.kartuli.app/')).toBe('https://www.kartuli.app');
    expect(new URL('./', normalizeBaseUrl('https://www.kartuli.app/')).href).toBe(
      'https://www.kartuli.app/',
    );
  });

  it('keeps a base-path directory slash so relative navigation stays inside it', () => {
    const normalized = normalizeBaseUrl(webDocsBase);
    expect(normalized).toBe(webDocsBase);
    expect(new URL('./', normalized).href).toBe(webDocsBase);
    expect(new URL('./', normalizeBaseUrl('http://localhost:4173/kartuli///')).href).toBe(
      'http://localhost:4173/kartuli/',
    );
  });

  it('does not turn a non-directory base path into a directory', () => {
    const normalized = normalizeBaseUrl('http://localhost:4173/kartuli');
    expect(normalized).toBe('http://localhost:4173/kartuli');
    expect(new URL('./', normalized).href).toBe('http://localhost:4173/');
  });

  it('drops a fragment and keeps a query', () => {
    expect(normalizeBaseUrl('http://localhost:3000/#section')).toBe('http://localhost:3000');
    expect(normalizeBaseUrl('https://example.com/kartuli/?q=1#section')).toBe(
      'https://example.com/kartuli/?q=1',
    );
    expect(new URL('./', normalizeBaseUrl('https://example.com/kartuli/?q=1#section')).href).toBe(
      'https://example.com/kartuli/',
    );
  });

  it('rejects malformed URLs', () => {
    expect(() => normalizeBaseUrl('')).toThrow(E2eConfigError);
    expect(() => normalizeBaseUrl('/relative')).toThrow(/absolute http/);
    expect(() => normalizeBaseUrl('ftp://example.com')).toThrow(/http and https/);
  });
});

describe('identityUrlForBase', () => {
  it('places the marker inside a base-path directory', () => {
    const identityUrl = identityUrlForBase(webDocsBase);
    expect(identityUrl).toBe(`${webDocsBase}${E2E_IDENTITY_FILE}`);
    expect(new URL('.', identityUrl).href).toBe(webDocsBase);
  });
});
