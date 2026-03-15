import { describe, expect, it } from 'vitest';
import { mergeLocalizedContentData } from './merge-localized-content-data';

describe('mergeLocalizedContentData', () => {
  it('merges by id with extended overwriting default', () => {
    const defaultData = {
      localizedModules: [{ id: 'module-1', title: 'Default Title', source: 'default' }],
      localizedLessons: [{ id: 'lesson-1', title: 'Default Lesson', source: 'default' }],
      localizedAlphabetItems: [],
      localizedVocabularyItems: [],
    };
    const extendedData = {
      localizedModules: [{ id: 'module-1', title: 'Extended Title', source: 'extended' }],
      localizedLessons: [],
      localizedAlphabetItems: [],
      localizedVocabularyItems: [],
    };
    const merged = mergeLocalizedContentData(defaultData, extendedData);
    expect(merged.localizedModules).toHaveLength(1);
    expect(merged.localizedModules[0].title).toBe('Extended Title');
    expect(merged.localizedModules[0].source).toBe('extended');
    expect(merged.localizedLessons).toHaveLength(1);
    expect(merged.localizedLessons[0].title).toBe('Default Lesson');
  });

  it('unions when ids differ', () => {
    const defaultData = {
      localizedModules: [{ id: 'module-a', title: 'Module A', source: 'default' }],
      localizedLessons: [{ id: 'lesson-a', title: 'Lesson A', source: 'default' }],
      localizedAlphabetItems: [],
      localizedVocabularyItems: [],
    };
    const extendedData = {
      localizedModules: [{ id: 'module-b', title: 'Module B', source: 'extended' }],
      localizedLessons: [{ id: 'lesson-b', title: 'Lesson B', source: 'extended' }],
      localizedAlphabetItems: [],
      localizedVocabularyItems: [],
    };
    const merged = mergeLocalizedContentData(defaultData, extendedData);
    expect(merged.localizedModules).toHaveLength(2);
    expect(merged.localizedModules.map((m) => m.id).sort()).toEqual(['module-a', 'module-b']);
    expect(merged.localizedLessons).toHaveLength(2);
  });
});
