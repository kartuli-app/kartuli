import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedSharedContentDataGet } from '../../combined-data/combined-shared-content-data-get';
import type { SharedLesson } from '../../shared-content-data/shared-content-data';

const SHARED_LESSONS_QUERY_KEY = ['tanstack-db', 'shared-lessons'] as const;

/**
 * Creates a TanStack DB collection of shared lessons,
 * synced from the combined shared content data (default + extended repos).
 */
export function createSharedLessonsCollection(queryClient: QueryClient): Collection<SharedLesson> {
  return createCollection(
    queryCollectionOptions({
      queryKey: [...SHARED_LESSONS_QUERY_KEY],
      queryFn: async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data'],
          queryFn: () => combinedSharedContentDataGet(),
        });
        return data.lessons;
      },
      queryClient,
      getKey: (item) => item.id,
    }),
  ) as Collection<SharedLesson>;
}
