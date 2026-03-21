import { describe, expect, it } from 'vitest';
import { parseAndMapSharedContentData } from './parse-and-map-shared-content-data';

const validFakeSharedJson = {
  sharedModules: [{ id: 'm1', lessonIds: ['l1'] }],
  sharedLessons: [{ id: 'l1', itemIds: ['letter-a'] }],
  sharedLetterItems: [
    {
      id: 'letter-a',
      targetScript: 'ა',
      transliteration: 'a',
      soundCategory: 'vowel',
    },
  ],
  sharedWordItems: [{ id: 'word-x', targetScript: 'ქართული' }],
};

describe('parseAndMapSharedContentData', () => {
  it('parses valid fake JSON and maps to SharedContentData with source on every item', () => {
    const result = parseAndMapSharedContentData(validFakeSharedJson, 'my-source');

    expect(result.sharedModules).toHaveLength(1);
    expect(result.sharedModules[0]).toEqual({ id: 'm1', lessonIds: ['l1'], source: 'my-source' });

    expect(result.sharedLessons).toHaveLength(1);
    expect(result.sharedLessons[0]).toEqual({
      id: 'l1',
      itemIds: ['letter-a'],
      source: 'my-source',
    });

    expect(result.sharedItems).toHaveLength(2);
    expect(result.sharedItems[0]).toEqual({
      id: 'letter-a',
      targetScript: 'ა',
      transliteration: 'a',
      soundCategory: 'vowel',
      source: 'my-source',
      type: 'letter',
    });
    expect(result.sharedItems[1]).toEqual({
      id: 'word-x',
      targetScript: 'ქართული',
      source: 'my-source',
      type: 'word',
    });
  });

  it('throws when JSON is invalid (letter item missing required field)', () => {
    const invalid = {
      ...validFakeSharedJson,
      sharedLetterItems: [{ id: 'x', targetScript: 'x' }], // missing transliteration, soundCategory
    };

    expect(() => parseAndMapSharedContentData(invalid, 'src')).toThrow();
  });

  it('throws when JSON is invalid (vocabulary item missing required field)', () => {
    const invalid = {
      ...validFakeSharedJson,
      sharedWordItems: [{ id: 'x' }], // missing targetScript
    };

    expect(() => parseAndMapSharedContentData(invalid, 'src')).toThrow();
  });

  it('throws when JSON is invalid (module missing lessonIds)', () => {
    const invalid = {
      ...validFakeSharedJson,
      sharedModules: [{ id: 'm1' }],
    };

    expect(() => parseAndMapSharedContentData(invalid, 'src')).toThrow();
  });

  it('throws when JSON is invalid (lesson missing itemIds)', () => {
    const invalid = {
      ...validFakeSharedJson,
      sharedLessons: [{ id: 'l1' }],
    };

    expect(() => parseAndMapSharedContentData(invalid, 'src')).toThrow();
  });

  it('throws when root is not an object', () => {
    expect(() => parseAndMapSharedContentData(null, 'src')).toThrow();
    expect(() => parseAndMapSharedContentData('string', 'src')).toThrow();
  });
});
