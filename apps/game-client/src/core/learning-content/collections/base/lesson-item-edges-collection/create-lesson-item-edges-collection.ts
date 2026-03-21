import type { CombinedSharedLessonItemEdgeRow } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import { fetchCombinedSharedContentRowsQuery } from '@game-client/core/learning-content/integration/fetch-combined-content-queries';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createLessonItemEdgesCollection({
  queryClient,
  contentRevision,
}: {
  queryClient: QueryClient;
  contentRevision: string;
}) {
  return createCollection(
    queryCollectionOptions<CombinedSharedLessonItemEdgeRow>({
      queryKey: ['tanstack-db', 'lesson-item-edges-collection', contentRevision],
      queryFn: async () => {
        const combined = await fetchCombinedSharedContentRowsQuery(queryClient, contentRevision);

        return combined.combinedSharedLessonItemEdgesRows;
      },
      queryClient,
      getKey: (row) => `${row.lessonId}-${row.itemId}`,
    }),
  );
}
