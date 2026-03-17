import { getCombinedSharedContentData } from '@game-client/core/learning-content/integration/combined-shared-content-data-get';
import type { SharedLessonRow } from '@game-client/core/learning-content/integration/combined-shared-content-data-rows';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createLessonsCollection({
  queryClient,
  contentRevision,
}: {
  queryClient: QueryClient;
  contentRevision: string;
}) {
  return createCollection(
    queryCollectionOptions<SharedLessonRow>({
      queryKey: ['tanstack-db', 'lessons-collection', contentRevision],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data', contentRevision],
          queryFn: () => getCombinedSharedContentData(),
        });

        return combined.lessonsRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
