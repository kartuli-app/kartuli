import { describe, expect, it } from 'vitest';
import { parseAndMapLocalizedContentData } from './parse-and-map-localized-content-data';

const validFakeLocalizedJson = {
  localizedModules: [{ id: 'm1', title: 'Module One' }],
  localizedLessons: [{ id: 'l1', title: 'Lesson One' }],
  localizedAlphabetItems: [{ id: 'letter-a', pronunciationHint: 'like a in father' }],
  localizedVocabularyItems: [{ id: 'word-x', translation: 'Georgian' }],
};

describe('parseAndMapLocalizedContentData', () => {
  it('parses valid fake JSON and maps to LocalizedContentData with source on every item', () => {
    const result = parseAndMapLocalizedContentData(validFakeLocalizedJson, 'my-source');

    expect(result.localizedModules).toHaveLength(1);
    expect(result.localizedModules[0]).toEqual({
      id: 'm1',
      title: 'Module One',
      source: 'my-source',
    });

    expect(result.localizedLessons[0]).toEqual({
      id: 'l1',
      title: 'Lesson One',
      source: 'my-source',
    });

    expect(result.localizedAlphabetItems[0]).toEqual({
      id: 'letter-a',
      pronunciationHint: 'like a in father',
      source: 'my-source',
    });
    expect(result.localizedVocabularyItems[0].translation).toBe('Georgian');
    expect(result.localizedVocabularyItems[0].source).toBe('my-source');
  });

  it('throws when JSON is invalid (missing required field)', () => {
    const invalid = {
      ...validFakeLocalizedJson,
      localizedAlphabetItems: [{ id: 'x' }], // missing pronunciationHint
    };

    expect(() => parseAndMapLocalizedContentData(invalid, 'src')).toThrow();
  });

  it('throws when JSON is invalid (wrong type)', () => {
    const invalid = {
      ...validFakeLocalizedJson,
      localizedModules: [{ id: 'm1', title: 123 }], // title must be string
    };

    expect(() => parseAndMapLocalizedContentData(invalid, 'src')).toThrow();
  });

  it('throws when root is not an object', () => {
    expect(() => parseAndMapLocalizedContentData(null, 'src')).toThrow();
    expect(() => parseAndMapLocalizedContentData('string', 'src')).toThrow();
  });
});
