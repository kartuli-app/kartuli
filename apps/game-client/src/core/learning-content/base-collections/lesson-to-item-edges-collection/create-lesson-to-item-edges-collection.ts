import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import {
  getCombinedSharedContentData,
  type LessonToItemEdgeRow,
} from '../../integration/combined-shared-content-data-get';

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
