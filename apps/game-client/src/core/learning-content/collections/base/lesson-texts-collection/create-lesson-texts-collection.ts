import type { CombinedLocalizedLessonRow } from '@game-client/core/learning-content/integration/combined-localized-content-rows/combined-localized-content-rows';
import { fetchCombinedLocalizedContentRowsQuery } from '@game-client/core/learning-content/integration/fetch-combined-content-queries';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createLessonTextsCollection({
  queryClient,
  contentRevision,
  locale,
}: {
  queryClient: QueryClient;
  contentRevision: string;
  locale: string;
}) {
  return createCollection(
    queryCollectionOptions<CombinedLocalizedLessonRow>({
      queryKey: ['tanstack-db', 'lesson-texts-collection', contentRevision, locale],
      queryFn: async () => {
        const combined = await fetchCombinedLocalizedContentRowsQuery(
          queryClient,
          contentRevision,
          locale,
        );

        return combined.combinedLocalizedLessonsRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
