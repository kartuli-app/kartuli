import type { CombinedSharedModuleLessonEdgeRow } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import { getCombinedSharedContentRows } from '@game-client/core/learning-content/integration/combined-shared-content-rows/get-combined-shared-content-rows';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createModuleLessonEdgesCollection({
  queryClient,
  contentRevision,
}: {
  queryClient: QueryClient;
  contentRevision: string;
}) {
  return createCollection(
    queryCollectionOptions<CombinedSharedModuleLessonEdgeRow>({
      queryKey: ['tanstack-db', 'module-lesson-edges-collection', contentRevision],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-rows', contentRevision],
          queryFn: () => getCombinedSharedContentRows(),
        });

        return combined.combinedSharedModuleLessonEdgesRows;
      },
      queryClient,
      getKey: (row) => `${row.moduleId}-${row.lessonId}`,
    }),
  );
}
