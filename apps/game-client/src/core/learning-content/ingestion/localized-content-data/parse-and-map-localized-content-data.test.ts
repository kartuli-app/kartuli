import { describe, expect, it } from 'vitest';
import { parseAndMapLocalizedContentData } from './parse-and-map-localized-content-data';

const validFakeLocalizedJson = {
  localizedModules: [{ id: 'm1', title: 'Module One' }],
  localizedLessons: [{ id: 'l1', title: 'Lesson One' }],
  localizedLetterItems: [{ id: 'letter-a', pronunciationHint: 'like a in father' }],
  localizedWordItems: [{ id: 'word-x', translation: 'Georgian' }],
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

    expect(result.localizedItems[0]).toEqual({
      id: 'letter-a',
      pronunciationHint: 'like a in father',
      source: 'my-source',
      type: 'letter',
    });
    expect(result.localizedItems[1]).toEqual({
      id: 'word-x',
      translation: 'Georgian',
      source: 'my-source',
      type: 'word',
    });
  });

  it('throws when JSON is invalid (missing required field)', () => {
    const invalid = {
      ...validFakeLocalizedJson,
      localizedLetterItems: [{ id: 'x' }], // missing pronunciationHint
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
