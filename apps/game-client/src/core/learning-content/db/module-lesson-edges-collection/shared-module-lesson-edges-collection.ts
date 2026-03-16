import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedSharedContentDataGet } from '../../combined-data/combined-shared-content-data-get';
import type { SharedModuleLessonEdge } from '../../shared-content-data/shared-content-data';

const SHARED_MODULE_LESSON_EDGES_QUERY_KEY = ['tanstack-db', 'shared-module-lesson-edges'] as const;

/**
 * Creates a TanStack DB collection of shared module-lesson edges,
 * synced from the combined shared content data (default + extended repos).
 */
export function createSharedModuleLessonEdgesCollection(
  queryClient: QueryClient,
): Collection<SharedModuleLessonEdge> {
  return createCollection(
    queryCollectionOptions({
      queryKey: [...SHARED_MODULE_LESSON_EDGES_QUERY_KEY],
      queryFn: async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data'],
          queryFn: () => combinedSharedContentDataGet(),
        });
        return data.moduleLessonEdges;
      },
      queryClient,
      getKey: (edge) => `${edge.moduleId}:${edge.lessonId}`,
    }),
  ) as Collection<SharedModuleLessonEdge>;
}
