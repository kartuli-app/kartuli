import { getCombinedSharedContentData } from '@game-client/core/learning-content/integration/combined-shared-content-data-get';
import type { ModuleToLessonEdgeRow } from '@game-client/core/learning-content/integration/combined-shared-content-data-rows';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createModuleToLessonEdgesCollection({
  queryClient,
  contentRevision,
}: {
  queryClient: QueryClient;
  contentRevision: string;
}) {
  return createCollection(
    queryCollectionOptions<ModuleToLessonEdgeRow>({
      queryKey: ['tanstack-db', 'module-to-lesson-edges-collection', contentRevision],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data', contentRevision],
          queryFn: () => getCombinedSharedContentData(),
        });

        return combined.moduleToLessonEdgesRows;
      },
      queryClient,
      getKey: (row) => `${row.moduleId}-${row.lessonId}`,
    }),
  );
}
