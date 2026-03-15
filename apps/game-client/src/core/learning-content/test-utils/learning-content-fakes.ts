/**
 * Test-only fakes and fixtures for learning-content.
 * Use in *.test.ts only; do not import in production code.
 */
import type { LocalizedContentData } from '../localized-content-data/localized-content-data';
import type { LocalizedContentDataRepository } from '../localized-content-data/localized-content-data-repository';
import type { SharedContentData } from '../shared-content-data/shared-content-data';
import type { SharedContentDataRepository } from '../shared-content-data/shared-content-data-repository';

const SOURCE_DEFAULT = 'default';
const SOURCE_EXTENDED = 'extended';

/** Minimal SharedContentData for tests (one module, one lesson, one edge, one item). */
export const minimalSharedContentDataDefault: SharedContentData = {
  modules: [{ id: 'module-a', lessonIds: ['lesson-a'], source: SOURCE_DEFAULT }],
  lessons: [{ id: 'lesson-a', source: SOURCE_DEFAULT }],
  moduleLessonEdges: [
    { moduleId: 'module-a', lessonId: 'lesson-a', order: 0, source: SOURCE_DEFAULT },
  ],
  alphabetItems: [
    {
      id: 'letter-a',
      targetScript: 'ა',
      transliteration: 'a',
      soundCategory: 'vowel',
      source: SOURCE_DEFAULT,
    },
  ],
  vocabularyItems: [{ id: 'word-a', targetScript: 'ქართული', source: SOURCE_DEFAULT }],
  lessonItemEdges: [{ lessonId: 'lesson-a', itemId: 'letter-a', order: 0, source: SOURCE_DEFAULT }],
};

/** Minimal SharedContentData from "extended" source for merge tests. */
export const minimalSharedContentDataExtended: SharedContentData = {
  modules: [{ id: 'module-b', lessonIds: ['lesson-b'], source: SOURCE_EXTENDED }],
  lessons: [{ id: 'lesson-b', source: SOURCE_EXTENDED }],
  moduleLessonEdges: [
    { moduleId: 'module-b', lessonId: 'lesson-b', order: 0, source: SOURCE_EXTENDED },
  ],
  alphabetItems: [],
  vocabularyItems: [],
  lessonItemEdges: [
    { lessonId: 'lesson-a', itemId: 'letter-a', order: 99, source: SOURCE_EXTENDED },
  ],
};

/** Minimal LocalizedContentData for tests. */
export const minimalLocalizedContentDataDefault: LocalizedContentData = {
  localizedModules: [{ id: 'module-a', title: 'Module A', source: SOURCE_DEFAULT }],
  localizedLessons: [{ id: 'lesson-a', title: 'Lesson A', source: SOURCE_DEFAULT }],
  localizedAlphabetItems: [{ id: 'letter-a', pronunciationHint: 'Like a', source: SOURCE_DEFAULT }],
  localizedVocabularyItems: [{ id: 'word-a', translation: 'word a', source: SOURCE_DEFAULT }],
};

/** Minimal LocalizedContentData from "extended" for merge tests. */
export const minimalLocalizedContentDataExtended: LocalizedContentData = {
  localizedModules: [{ id: 'module-b', title: 'Module B', source: SOURCE_EXTENDED }],
  localizedLessons: [{ id: 'lesson-b', title: 'Lesson B', source: SOURCE_EXTENDED }],
  localizedAlphabetItems: [],
  localizedVocabularyItems: [],
};

export type SharedContentDataOverrides = Partial<SharedContentData>;
export type LocalizedContentDataOverrides = Partial<LocalizedContentData>;

/** Merge partial overrides into a full fixture (shallow merge top-level arrays). */
function applySharedOverrides(
  base: SharedContentData,
  overrides: SharedContentDataOverrides | undefined,
): SharedContentData {
  if (!overrides) return base;
  return {
    modules: overrides.modules ?? base.modules,
    lessons: overrides.lessons ?? base.lessons,
    moduleLessonEdges: overrides.moduleLessonEdges ?? base.moduleLessonEdges,
    alphabetItems: overrides.alphabetItems ?? base.alphabetItems,
    vocabularyItems: overrides.vocabularyItems ?? base.vocabularyItems,
    lessonItemEdges: overrides.lessonItemEdges ?? base.lessonItemEdges,
  };
}

function applyLocalizedOverrides(
  base: LocalizedContentData,
  overrides: LocalizedContentDataOverrides | undefined,
): LocalizedContentData {
  if (!overrides) return base;
  return {
    localizedModules: overrides.localizedModules ?? base.localizedModules,
    localizedLessons: overrides.localizedLessons ?? base.localizedLessons,
    localizedAlphabetItems: overrides.localizedAlphabetItems ?? base.localizedAlphabetItems,
    localizedVocabularyItems: overrides.localizedVocabularyItems ?? base.localizedVocabularyItems,
  };
}

/** Returns a SharedContentDataRepository that resolves to the fixture (or overrides). */
export function createMockSharedContentDataRepository(
  overrides?: SharedContentDataOverrides,
): SharedContentDataRepository {
  const data = applySharedOverrides(minimalSharedContentDataDefault, overrides);
  return {
    get: async () => data,
  };
}

/** Returns a LocalizedContentDataRepository that resolves to the fixture (or overrides). */
export function createMockLocalizedContentDataRepository(
  overrides?: LocalizedContentDataOverrides,
): LocalizedContentDataRepository {
  const data = applyLocalizedOverrides(minimalLocalizedContentDataDefault, overrides);
  return {
    get: async () => data,
  };
}

/** Returns a LocalizedContentDataRepository that rejects with the given error. */
export function createMockLocalizedContentDataRepositoryThatThrows(
  error: Error,
): LocalizedContentDataRepository {
  return {
    get: async () => {
      throw error;
    },
  };
}
