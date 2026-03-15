import { describe, expect, it } from 'vitest';
import { parseAndMapSharedContentData } from './parse-and-map-shared-content-data';

const validFakeSharedJson = {
  modules: [{ id: 'm1', lessonIds: ['l1'] }],
  lessons: [{ id: 'l1' }],
  moduleLessonEdges: [{ moduleId: 'm1', lessonId: 'l1', order: 0 }],
  alphabetItems: [
    {
      id: 'letter-a',
      targetScript: 'ა',
      transliteration: 'a',
      soundCategory: 'vowel',
    },
  ],
  vocabularyItems: [{ id: 'word-x', targetScript: 'ქართული' }],
  lessonItemEdges: [{ lessonId: 'l1', itemId: 'letter-a', order: 0 }],
};

describe('parseAndMapSharedContentData', () => {
  it('parses valid fake JSON and maps to SharedContentData with source on every item', () => {
    const result = parseAndMapSharedContentData(validFakeSharedJson, 'my-source');

    expect(result.modules).toHaveLength(1);
    expect(result.modules[0]).toEqual({ id: 'm1', lessonIds: ['l1'], source: 'my-source' });

    expect(result.lessons).toHaveLength(1);
    expect(result.lessons[0]).toEqual({ id: 'l1', source: 'my-source' });

    expect(result.moduleLessonEdges[0].source).toBe('my-source');
    expect(result.alphabetItems).toHaveLength(1);
    expect(result.alphabetItems[0]).toEqual({
      id: 'letter-a',
      targetScript: 'ა',
      transliteration: 'a',
      soundCategory: 'vowel',
      source: 'my-source',
    });
    expect(result.vocabularyItems[0].targetScript).toBe('ქართული');
    expect(result.vocabularyItems[0].source).toBe('my-source');
    expect(result.lessonItemEdges[0].source).toBe('my-source');
  });

  it('throws when JSON is invalid (missing required field)', () => {
    const invalid = {
      ...validFakeSharedJson,
      alphabetItems: [{ id: 'x', targetScript: 'x' }], // missing transliteration, soundCategory
    };

    expect(() => parseAndMapSharedContentData(invalid, 'src')).toThrow();
  });

  it('throws when JSON is invalid (wrong type)', () => {
    const invalid = {
      ...validFakeSharedJson,
      moduleLessonEdges: [{ moduleId: 'm1', lessonId: 'l1', order: 'not-a-number' }],
    };

    expect(() => parseAndMapSharedContentData(invalid, 'src')).toThrow();
  });

  it('throws when root is not an object', () => {
    expect(() => parseAndMapSharedContentData(null, 'src')).toThrow();
    expect(() => parseAndMapSharedContentData('string', 'src')).toThrow();
  });
});
