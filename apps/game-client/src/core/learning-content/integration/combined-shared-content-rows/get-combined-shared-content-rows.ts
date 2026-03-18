import { defaultSharedContentDataRepository } from '@game-client/core/learning-content/ingestion/default-data/default-shared-content-data-repository';
import { extendedSharedContentDataRepository } from '@game-client/core/learning-content/ingestion/extended-data/extended-shared-content-data-repository';
import type { SharedContentData } from '@game-client/core/learning-content/ingestion/shared-content-data/shared-content-data';
import type { CombinedSharedContentRows } from './combined-shared-content-rows';

// gets shared content data from different sources
// merges the data and returns a single CombinedSharedContentRows
function mergeSharedContentData(
  defaultData: SharedContentData,
  extendedData: SharedContentData,
): CombinedSharedContentRows {
  // combine modules and flatthem into rows and edges
  const sharedModules = [...defaultData.sharedModules, ...extendedData.sharedModules];
  const combinedSharedModulesRows = sharedModules;
  const combinedSharedModuleLessonEdgesRows = sharedModules.flatMap((sharedModule) =>
    sharedModule.lessonIds.map((lessonId, index) => ({
      moduleId: sharedModule.id,
      lessonId,
      order: index,
    })),
  );

  // combine lessons and flat them into rows and edges
  const sharedLessons = [...defaultData.sharedLessons, ...extendedData.sharedLessons];
  const combinedSharedLessonsRows = sharedLessons;
  // flat lesson to item edges
  const combinedSharedLessonItemEdgesRows = sharedLessons.flatMap((sharedLesson) =>
    sharedLesson.itemIds.map((itemId, index) => ({
      lessonId: sharedLesson.id,
      itemId,
      order: index,
    })),
  );

  // combine alphabet and vocabulary items
  const combinedSharedItems = [...defaultData.sharedItems, ...extendedData.sharedItems];
  const combinedSharedItemsRows = combinedSharedItems;

  return {
    combinedSharedModulesRows,
    combinedSharedModuleLessonEdgesRows,
    combinedSharedLessonsRows,
    combinedSharedLessonItemEdgesRows,
    combinedSharedItemsRows,
  };
}

export async function getCombinedSharedContentRows(): Promise<CombinedSharedContentRows> {
  console.info('🛠️🛠️🛠️🛠️🛠️ ~ getCombinedSharedContentRows');
  const defaultDataRepository = defaultSharedContentDataRepository();
  const extendedDataRepository = extendedSharedContentDataRepository();
  const [defaultData, extendedData] = await Promise.all([
    defaultDataRepository.get(),
    extendedDataRepository.get(),
  ]);
  return mergeSharedContentData(defaultData, extendedData);
}
