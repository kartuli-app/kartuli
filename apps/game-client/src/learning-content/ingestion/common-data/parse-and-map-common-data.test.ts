import { describe, expect, it } from 'vitest';
import { parseAndMapCommonData } from './parse-and-map-common-data';

const validFakeSharedJson = {
  commonModules: [{ id: 'm1', lessonIds: ['l1'] }],
  commonLessons: [{ id: 'l1', itemIds: ['letter-a'] }],
  commonLetterItems: [
    {
      id: 'letter-a',
      targetScript: 'ა',
      transliteration: 'a',
      soundCategory: 'vowel',
    },
  ],
  commonWordItems: [{ id: 'word-x', targetScript: 'ქართული' }],
};

describe('parseAndMapCommonData', () => {
  it('parses valid fake JSON and maps to CommonData with source on every item', () => {
    const result = parseAndMapCommonData(validFakeSharedJson, 'my-source');

    expect(result.commonModules).toHaveLength(1);
    expect(result.commonModules[0]).toEqual({ id: 'm1', lessonIds: ['l1'], source: 'my-source' });

    expect(result.commonLessons).toHaveLength(1);
    expect(result.commonLessons[0]).toEqual({
      id: 'l1',
      itemIds: ['letter-a'],
      source: 'my-source',
    });

    expect(result.commonLetterItems).toHaveLength(1);
    expect(result.commonLetterItems[0]).toEqual({
      id: 'letter-a',
      targetScript: 'ა',
      transliteration: 'a',
      soundCategory: 'vowel',
      source: 'my-source',
      type: 'letter',
    });
    expect(result.commonWordItems).toHaveLength(1);
    expect(result.commonWordItems[0]).toEqual({
      id: 'word-x',
      targetScript: 'ქართული',
      source: 'my-source',
      type: 'word',
    });
  });

  it('throws when JSON is invalid (letter item missing required field)', () => {
    const invalid = {
      ...validFakeSharedJson,
      commonLetterItems: [{ id: 'x', targetScript: 'x' }], // missing transliteration, soundCategory
    };

    expect(() => parseAndMapCommonData(invalid, 'src')).toThrow();
  });

  it('throws when JSON is invalid (vocabulary item missing required field)', () => {
    const invalid = {
      ...validFakeSharedJson,
      commonWordItems: [{ id: 'x' }], // missing targetScript
    };

    expect(() => parseAndMapCommonData(invalid, 'src')).toThrow();
  });

  it('throws when JSON is invalid (module missing lessonIds)', () => {
    const invalid = {
      ...validFakeSharedJson,
      commonModules: [{ id: 'm1' }],
    };

    expect(() => parseAndMapCommonData(invalid, 'src')).toThrow();
  });

  it('throws when JSON is invalid (lesson missing itemIds)', () => {
    const invalid = {
      ...validFakeSharedJson,
      commonLessons: [{ id: 'l1' }],
    };

    expect(() => parseAndMapCommonData(invalid, 'src')).toThrow();
  });

  it('throws when root is not an object', () => {
    expect(() => parseAndMapCommonData(null, 'src')).toThrow();
    expect(() => parseAndMapCommonData('string', 'src')).toThrow();
  });
});
