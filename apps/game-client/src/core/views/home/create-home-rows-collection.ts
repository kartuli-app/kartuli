import type { AvailableLessonRow } from '@game-client/core/learning-content/collections/derived/available-lessons-collection/create-available-lessons-collection';
import type { AvailableModuleRow } from '@game-client/core/learning-content/collections/derived/available-modules-collection/create-available-modules-collection';
import type {
  CombinedSharedLessonItemEdgeRow,
  CombinedSharedModuleLessonEdgeRow,
} from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';
import type { AvailableItemWithActivityRow } from '../shared/available-items-with-activity-collection/create-available-items-with-activity-collection';

export type HomeRow = {
  module: AvailableModuleRow;
  lesson: AvailableLessonRow;
  item: AvailableItemWithActivityRow;
  moduleLessonEdge: CombinedSharedModuleLessonEdgeRow;
  lessonItemEdge: CombinedSharedLessonItemEdgeRow;
};

export function createHomeRowsCollection({
  availableModulesCollection,
  availableLessonsCollection,
  availableItemsWithActivityCollection,
  moduleLessonEdgesCollection,
  lessonItemEdgesCollection,
}: {
  availableModulesCollection: Collection<AvailableModuleRow>;
  availableLessonsCollection: Collection<AvailableLessonRow>;
  availableItemsWithActivityCollection: Collection<AvailableItemWithActivityRow>;
  moduleLessonEdgesCollection: Collection<CombinedSharedModuleLessonEdgeRow>;
  lessonItemEdgesCollection: Collection<CombinedSharedLessonItemEdgeRow>;
}) {
  return createLiveQueryCollection((q) =>
    q
      .from({ moduleLessonEdge: moduleLessonEdgesCollection })
      .innerJoin({ module: availableModulesCollection }, ({ moduleLessonEdge, module }) =>
        eq(moduleLessonEdge.moduleId, module.sharedModule.id),
      )
      .innerJoin({ lesson: availableLessonsCollection }, ({ moduleLessonEdge, lesson }) =>
        eq(moduleLessonEdge.lessonId, lesson.sharedLesson.id),
      )
      .innerJoin({ lessonItemEdge: lessonItemEdgesCollection }, ({ lesson, lessonItemEdge }) =>
        eq(lesson.sharedLesson.id, lessonItemEdge.lessonId),
      )
      .innerJoin({ item: availableItemsWithActivityCollection }, ({ lessonItemEdge, item }) =>
        eq(lessonItemEdge.itemId, item.sharedItem.id),
      )
      .select(({ module, moduleLessonEdge, lesson, lessonItemEdge, item }) => ({
        module,
        moduleLessonEdge,
        lesson,
        lessonItemEdge,
        item,
      })),
  );
}
