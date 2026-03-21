import { defaultSharedContentDataRepository } from '@game-client/core/learning-content/ingestion/default-data/default-shared-content-data-repository';
import { extendedSharedContentDataRepository } from '@game-client/core/learning-content/ingestion/extended-data/extended-shared-content-data-repository';
import type {
  SharedContentData,
  SharedLetterItem,
  SharedWordItem,
} from '@game-client/core/learning-content/ingestion/shared-content-data/shared-content-data';
import type { CombinedSharedContentRows } from './combined-shared-content-rows';

function getWordTransliterationUsingLettersByTargetScript(
  lettersByTargetScript: Map<string, SharedLetterItem>,
  word: SharedWordItem,
): string {
  const characters = word.targetScript.split('');
  let transliteration = '';
  for (const character of characters) {
    const letter = lettersByTargetScript.get(character);
    if (letter) {
      transliteration += letter.transliteration;
    } else {
      transliteration += character;
      console.error(
        `💀 [integration] 💀 error trainsliterating character "${character}" for word with id "${word.id}" (${word.targetScript})`,
      );
    }
  }
  return transliteration;
}

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

  // combine items and get transliteration for words
  const combinedSharedItems = [...defaultData.sharedItems, ...extendedData.sharedItems];

  // get transliteration for words using letters by target script
  const lettersItems = combinedSharedItems.filter((item) => item.type === 'letter');
  const lettersByTargetScript: Map<string, SharedLetterItem> = new Map();
  for (const letter of lettersItems) {
    lettersByTargetScript.set(letter.targetScript, letter);
  }

  const combinedSharedItemsRows = combinedSharedItems.map((item) => {
    if (item.type === 'word') {
      return {
        ...item,
        transliteration: getWordTransliterationUsingLettersByTargetScript(
          lettersByTargetScript,
          item,
        ),
      };
    }
    return item;
  });

  return {
    combinedSharedModulesRows,
    combinedSharedModuleLessonEdgesRows,
    combinedSharedLessonsRows,
    combinedSharedLessonItemEdgesRows,
    combinedSharedItemsRows,
  };
}

export async function getCombinedSharedContentRows(): Promise<CombinedSharedContentRows> {
  console.info('📖 [integration] 📖 getCombinedSharedContentRows');
  const defaultDataRepository = defaultSharedContentDataRepository();
  const extendedDataRepository = extendedSharedContentDataRepository();
  const [defaultData, extendedData] = await Promise.all([
    defaultDataRepository.get(),
    extendedDataRepository.get(),
  ]);
  return mergeSharedContentData(defaultData, extendedData);
}
