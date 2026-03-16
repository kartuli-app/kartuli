import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedSharedContentDataGet } from '../../combined-data/combined-shared-content-data-get';
import type { SharedLessonItemEdge } from '../../shared-content-data/shared-content-data';

const SHARED_LESSON_ITEM_EDGES_QUERY_KEY = ['tanstack-db', 'shared-lesson-item-edges'] as const;

/**
 * Creates a TanStack DB collection of shared lesson-item edges,
 * synced from the combined shared content data (default + extended repos).
 */
export function createSharedLessonItemEdgesCollection(
  queryClient: QueryClient,
): Collection<SharedLessonItemEdge> {
  return createCollection(
    queryCollectionOptions({
      queryKey: [...SHARED_LESSON_ITEM_EDGES_QUERY_KEY],
      queryFn: async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data'],
          queryFn: () => combinedSharedContentDataGet(),
        });
        return data.lessonItemEdges;
      },
      queryClient,
      getKey: (edge) => `${edge.lessonId}:${edge.itemId}`,
    }),
  ) as Collection<SharedLessonItemEdge>;
}
