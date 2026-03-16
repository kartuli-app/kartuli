import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';
import type { SharedLessonItemEdge } from '../../shared-content-data/shared-content-data';
import type { MultitypeItemRow } from '../multitype-items-collection/multitype-items-collection-types';

export interface OrderedLessonItemRow {
  lessonId: string;
  order: number;
  item: MultitypeItemRow;
}

/**
 * Creates a live-query collection that joins lesson-item edges with
 * the unified multitype items collection and orders items by edge.order.
 */
export function createOrderedLessonItemsCollection(
  lessonItemEdgesCollection: Collection<SharedLessonItemEdge>,
  multitypeItemsCollection: Collection<MultitypeItemRow>,
) {
  return createLiveQueryCollection((q) =>
    q
      .from({ edge: lessonItemEdgesCollection })
      .innerJoin({ item: multitypeItemsCollection }, ({ edge, item }) => eq(edge.itemId, item.id))
      .orderBy(({ edge }) => edge.order)
      .select(({ edge, item }) => ({
        lessonId: edge.lessonId,
        order: edge.order,
        item,
      })),
  );
}
