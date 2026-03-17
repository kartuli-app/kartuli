import { defaultSharedContentDataRepository } from '@game-client/core/learning-content/ingestion/default-data/default-shared-content-data-repository';
import { extendedSharedContentDataRepository } from '@game-client/core/learning-content/ingestion/extended-data/extended-shared-content-data-repository';
import type { SharedContentData } from '@game-client/core/learning-content/ingestion/shared-content-data/shared-content-data';
import type {
  CombinedSharedContentRows,
  SharedAlphabetItemRow,
  SharedVocabularyItemRow,
} from './combined-shared-content-data-rows';

// gets shared content data from different sources
// merges the data and returns a single CombinedSharedContentRows
function mergeSharedContentData(
  defaultData: SharedContentData,
  extendedData: SharedContentData,
): CombinedSharedContentRows {
  // combine modules and flatthem into rows and edges
  const modules = [...defaultData.modules, ...extendedData.modules];
  const modulesRows = modules.map((module) => ({ id: module.id, source: module.source }));
  const moduleToLessonEdgesRows = modules.flatMap((module) =>
    module.lessonIds.map((lessonId, index) => ({
      moduleId: module.id,
      lessonId,
      order: index,
    })),
  );

  // combine lessons and flat them into rows and edges
  const lessons = [...defaultData.lessons, ...extendedData.lessons];
  const lessonsRows = lessons.map((lesson) => ({ id: lesson.id, source: lesson.source }));
  // flat lesson to item edges
  const lessonToItemEdgesRows = lessons.flatMap((lesson) =>
    lesson.itemIds.map((itemId, index) => ({
      lessonId: lesson.id,
      itemId,
      order: index,
    })),
  );

  // combine alphabet items and flat them into rows
  const alphabetItems = [...defaultData.alphabetItems, ...extendedData.alphabetItems];
  const alphabetItemsRows: SharedAlphabetItemRow[] = alphabetItems.map((item) => ({
    id: item.id,
    type: 'letter',
    targetScript: item.targetScript,
    transliteration: item.transliteration,
    soundCategory: item.soundCategory,
    source: item.source,
  }));

  // combine vocabulary items and flat them into rows
  const vocabularyItems = [...defaultData.vocabularyItems, ...extendedData.vocabularyItems];
  const vocabularyItemsRows: SharedVocabularyItemRow[] = vocabularyItems.map((item) => ({
    id: item.id,
    type: 'word',
    targetScript: item.targetScript,
    source: item.source,
  }));

  // combine alphabet and vocabulary items
  const itemsRows = [...alphabetItemsRows, ...vocabularyItemsRows];

  return { modulesRows, lessonsRows, itemsRows, moduleToLessonEdgesRows, lessonToItemEdgesRows };
}

export async function getCombinedSharedContentData(): Promise<CombinedSharedContentRows> {
  console.info('�️🛠️🛠️🛠️🛠️ ~ getCombinedSharedContentData');
  const defaultDataRepository = defaultSharedContentDataRepository();
  const extendedDataRepository = extendedSharedContentDataRepository();
  const [defaultData, extendedData] = await Promise.all([
    defaultDataRepository.get(),
    extendedDataRepository.get(),
  ]);
  return mergeSharedContentData(defaultData, extendedData);
}
