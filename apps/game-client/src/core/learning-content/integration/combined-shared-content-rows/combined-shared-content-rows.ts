import type {
  SharedLesson,
  SharedLetterItem,
  SharedModule,
  SharedWordItem,
} from '@game-client/core/learning-content/ingestion/shared-content-data/shared-content-data';

export type CombinedSharedModuleRow = SharedModule;

export type CombinedSharedLessonRow = SharedLesson;

export type CombinedSharedLetterItemRow = SharedLetterItem;

export type CombinedSharedWordItemRow = SharedWordItem;

export type CombinedSharedItemRow = CombinedSharedLetterItemRow | CombinedSharedWordItemRow;

export type CombinedSharedModuleLessonEdgeRow = {
  moduleId: string;
  lessonId: string;
  order: number;
};

export type CombinedSharedLessonItemEdgeRow = {
  lessonId: string;
  itemId: string;
  order: number;
};

export type CombinedSharedContentRows = {
  combinedSharedModulesRows: CombinedSharedModuleRow[];
  combinedSharedLessonsRows: CombinedSharedLessonRow[];
  combinedSharedModuleLessonEdgesRows: CombinedSharedModuleLessonEdgeRow[];
  combinedSharedLessonItemEdgesRows: CombinedSharedLessonItemEdgeRow[];
  combinedSharedItemsRows: CombinedSharedItemRow[];
};
