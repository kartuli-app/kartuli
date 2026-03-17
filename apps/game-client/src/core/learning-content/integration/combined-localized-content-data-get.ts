import { defaultLocalizedContentDataRepository } from '@game-client/core/learning-content/ingestion/default-data/default-localized-content-data-repository';
import { extendedLocalizedContentDataRepository } from '@game-client/core/learning-content/ingestion/extended-data/extended-localized-content-data-repository';
import type { LocalizedContentData } from '@game-client/core/learning-content/ingestion/localized-content-data/localized-content-data';

export type LocalizedModuleRow = {
  id: string; // same as moduleId
  title: string;
  source: string;
};

export type LocalizedLessonRow = {
  id: string; // same as lessonId
  title: string;
  description?: string;
  source: string;
};

type LocalizedAlphabetItemRow = {
  id: string; // same as itemId
  type: 'letter';
  pronunciationHint: string;
  source: string;
};

type LocalizedVocabularyItemRow = {
  id: string; // same as itemId
  type: 'word';
  translation: string;
  source: string;
};

export type LocalizedItemRow = LocalizedAlphabetItemRow | LocalizedVocabularyItemRow;

export type CombinedLocalizedContentRows = {
  locale: string;
  localizedModulesRows: LocalizedModuleRow[];
  localizedLessonsRows: LocalizedLessonRow[];
  localizedItemsRows: LocalizedItemRow[];
};

function mergeLocalizedContentData(
  defaultData: LocalizedContentData,
  extendedData: LocalizedContentData,
  locale: string,
): CombinedLocalizedContentRows {
  // combine modules and flat them into rows
  const localizedModules = [...defaultData.localizedModules, ...extendedData.localizedModules];
  const localizedModulesRows = localizedModules.map((module) => ({
    id: module.id,
    title: module.title,
    source: module.source,
  }));
  // combine lessons and flat them into rows
  const localizedLessons = [...defaultData.localizedLessons, ...extendedData.localizedLessons];
  const localizedLessonsRows = localizedLessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    source: lesson.source,
  }));
  // combine alphabet items and flat them into rows
  const localizedAlphabetItems = [
    ...defaultData.localizedAlphabetItems,
    ...extendedData.localizedAlphabetItems,
  ];
  const localizedAlphabetItemsRows: LocalizedAlphabetItemRow[] = localizedAlphabetItems.map(
    (item) => ({
      id: item.id,
      type: 'letter',
      pronunciationHint: item.pronunciationHint,
      source: item.source,
    }),
  );
  // combine vocabulary items and flat them into rows
  const localizedVocabularyItems = [
    ...defaultData.localizedVocabularyItems,
    ...extendedData.localizedVocabularyItems,
  ];
  const localizedVocabularyItemsRows: LocalizedVocabularyItemRow[] = localizedVocabularyItems.map(
    (item) => ({
      id: item.id,
      type: 'word',
      translation: item.translation,
      source: item.source,
    }),
  );
  // combine alphabet and vocabulary items
  const localizedItemsRows = [...localizedAlphabetItemsRows, ...localizedVocabularyItemsRows];
  return { locale, localizedModulesRows, localizedLessonsRows, localizedItemsRows };
}

export async function getCombinedLocalizedContentData(
  locale: string,
): Promise<CombinedLocalizedContentRows> {
  console.info('🚀 ~ getCombinedLocalizedContentData ~ locale:', locale);
  const defaultDataRepository = defaultLocalizedContentDataRepository();
  const extendedDataRepository = extendedLocalizedContentDataRepository();
  const [defaultData, extendedData] = await Promise.all([
    defaultDataRepository.get(locale),
    extendedDataRepository.get(locale),
  ]);
  return mergeLocalizedContentData(defaultData, extendedData, locale);
}
