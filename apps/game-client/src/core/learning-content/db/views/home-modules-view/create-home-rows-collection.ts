import type {
  CombinedSharedLessonItemEdgeRow,
  CombinedSharedModuleLessonEdgeRow,
} from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';
import type { AvailableItemRow } from '../../derived/available-items-collection/create-available-items-collection';
import type { AvailableLessonRow } from '../../derived/available-lessons-collection/create-available-lessons-collection';
import type { AvailableModuleRow } from '../../derived/available-modules-collection/create-available-modules-collection';

export type HomeRow = {
  module: AvailableModuleRow;
  lesson: AvailableLessonRow;
  item: AvailableItemRow;
  moduleLessonEdge: CombinedSharedModuleLessonEdgeRow;
  lessonItemEdge: CombinedSharedLessonItemEdgeRow;
};

export function createHomeRowsCollection({
  availableModulesCollection,
  availableLessonsCollection,
  availableItemsCollection,
  moduleLessonEdgesCollection,
  lessonItemEdgesCollection,
}: {
  availableModulesCollection: Collection<AvailableModuleRow>;
  availableLessonsCollection: Collection<AvailableLessonRow>;
  availableItemsCollection: Collection<AvailableItemRow>;
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
      .innerJoin({ item: availableItemsCollection }, ({ lessonItemEdge, item }) =>
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
