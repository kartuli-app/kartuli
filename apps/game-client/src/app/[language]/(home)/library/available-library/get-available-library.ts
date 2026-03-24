import type { CombinedLocalizedContentRows } from '@game-client/core/learning-content/integration/combined-localized-content-rows/combined-localized-content-rows';
import type { CombinedSharedContentRows } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import type {
  AvailableItem,
  AvailableLesson,
  AvailableLibrary,
  AvailableModule,
} from './available-library';

const getAvailableModules = (
  sharedData: CombinedSharedContentRows,
  localizedData: CombinedLocalizedContentRows,
): AvailableModule[] => {
  const availableModules: AvailableModule[] = [];
  for (const sharedModule of sharedData.combinedSharedModulesRows) {
    const localizedModule = localizedData.combinedLocalizedModulesRows.find(
      (localizedModule) => localizedModule.id === sharedModule.id,
    );
    if (localizedModule) {
      availableModules.push({
        id: sharedModule.id,
        sharedModule,
        localizedModule,
      });
    }
  }
  return availableModules;
};

const getAvailableLessons = (
  sharedData: CombinedSharedContentRows,
  localizedData: CombinedLocalizedContentRows,
): AvailableLesson[] => {
  const availableLessons: AvailableLesson[] = [];
  for (const sharedLesson of sharedData.combinedSharedLessonsRows) {
    const localizedLesson = localizedData.combinedLocalizedLessonsRows.find(
      (localizedLesson) => localizedLesson.id === sharedLesson.id,
    );
    if (localizedLesson) {
      availableLessons.push({
        id: sharedLesson.id,
        sharedLesson,
        localizedLesson,
      });
    }
  }
  return availableLessons;
};

const getAvailableItems = (
  sharedData: CombinedSharedContentRows,
  localizedData: CombinedLocalizedContentRows,
): AvailableItem[] => {
  const availableItems: AvailableItem[] = [];
  for (const sharedItem of sharedData.combinedSharedItemsRows) {
    const localizedItem = localizedData.combinedLocalizedItemsRows.find(
      (localizedItem) => localizedItem.id === sharedItem.id,
    );
    if (localizedItem) {
      availableItems.push({
        id: sharedItem.id,
        sharedItem,
        localizedItem,
      });
    }
  }
  return availableItems;
};

export const getAvailableLibrary = (
  sharedData: CombinedSharedContentRows,
  localizedData: CombinedLocalizedContentRows,
): AvailableLibrary => {
  return {
    availableModules: getAvailableModules(sharedData, localizedData),
    availableLessons: getAvailableLessons(sharedData, localizedData),
    availableItems: getAvailableItems(sharedData, localizedData),
  };
};
