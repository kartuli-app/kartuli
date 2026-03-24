import type {
  CombinedLocalizedItemRow,
  CombinedLocalizedLessonRow,
  CombinedLocalizedModuleRow,
} from '@game-client/core/learning-content/integration/combined-localized-content-rows/combined-localized-content-rows';
import type {
  CombinedSharedItemRow,
  CombinedSharedLessonRow,
  CombinedSharedModuleRow,
} from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';

export interface AvailableModule {
  id: string;
  sharedModule: CombinedSharedModuleRow;
  localizedModule: CombinedLocalizedModuleRow;
}

export interface AvailableLesson {
  id: string;
  sharedLesson: CombinedSharedLessonRow;
  localizedLesson: CombinedLocalizedLessonRow;
}

export interface AvailableItem {
  id: string;
  sharedItem: CombinedSharedItemRow;
  localizedItem: CombinedLocalizedItemRow;
}

export interface AvailableLibrary {
  availableModules: AvailableModule[];
  availableLessons: AvailableLesson[];
  availableItems: AvailableItem[];
}
