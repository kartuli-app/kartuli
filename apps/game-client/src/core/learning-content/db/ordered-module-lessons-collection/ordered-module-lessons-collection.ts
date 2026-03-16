import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';
import type { SharedModuleLessonEdge } from '../../shared-content-data/shared-content-data';
import type { LessonsCollectionRow } from '../lessons-collection/lessons-collection';

export interface OrderedModuleLessonRow {
  moduleId: string;
  order: number;
  lesson: LessonsCollectionRow;
}

/**
 * Creates a live-query collection that joins module-lesson edges with
 * the joined lessons collection and orders lessons by edge.order.
 */
export function createOrderedModuleLessonsCollection(
  moduleLessonEdgesCollection: Collection<SharedModuleLessonEdge>,
  lessonsCollection: Collection<LessonsCollectionRow>,
) {
  return createLiveQueryCollection((q) =>
    q
      .from({ edge: moduleLessonEdgesCollection })
      .innerJoin({ lesson: lessonsCollection }, ({ edge, lesson }) =>
        eq(edge.lessonId, lesson.sharedLesson.id),
      )
      .orderBy(({ edge }) => edge.order)
      .select(({ edge, lesson }) => ({
        moduleId: edge.moduleId,
        order: edge.order,
        lesson,
      })),
  );
}
