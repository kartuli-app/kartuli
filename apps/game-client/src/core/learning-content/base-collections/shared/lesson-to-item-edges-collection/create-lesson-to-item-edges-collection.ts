import { getCombinedSharedContentData } from '@game-client/core/learning-content/integration/combined-shared-content-data-get';
import type { LessonToItemEdgeRow } from '@game-client/core/learning-content/integration/combined-shared-content-data-rows';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createLessonToItemEdgesCollection({
  queryClient,
  contentRevision,
}: {
  queryClient: QueryClient;
  contentRevision: string;
}) {
  return createCollection(
    queryCollectionOptions<LessonToItemEdgeRow>({
      queryKey: ['tanstack-db', 'lesson-to-item-edges-collection', contentRevision],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data', contentRevision],
          queryFn: () => getCombinedSharedContentData(),
        });

        return combined.lessonToItemEdgesRows;
      },
      queryClient,
      getKey: (row) => `${row.lessonId}-${row.itemId}`,
    }),
  );
}
