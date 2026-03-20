import type { CombinedLocalizedModuleRow } from '@game-client/core/learning-content/integration/combined-localized-content-rows/combined-localized-content-rows';
import { fetchCombinedLocalizedContentRowsQuery } from '@game-client/core/learning-content/integration/fetch-combined-content-queries';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createModuleTextsCollection({
  queryClient,
  contentRevision,
  locale,
}: {
  queryClient: QueryClient;
  contentRevision: string;
  locale: string;
}) {
  return createCollection(
    queryCollectionOptions<CombinedLocalizedModuleRow>({
      queryKey: ['tanstack-db', 'module-texts-collection', contentRevision, locale],
      queryFn: async () => {
        const combined = await fetchCombinedLocalizedContentRowsQuery(
          queryClient,
          contentRevision,
          locale,
        );

        return combined.combinedLocalizedModulesRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
