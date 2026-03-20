import type { CombinedSharedModuleRow } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import { fetchCombinedSharedContentRowsQuery } from '@game-client/core/learning-content/integration/fetch-combined-content-queries';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createModulesCollection({
  queryClient,
  contentRevision,
}: {
  queryClient: QueryClient;
  contentRevision: string;
}) {
  return createCollection(
    queryCollectionOptions<CombinedSharedModuleRow>({
      queryKey: ['tanstack-db', 'modules-collection', contentRevision],
      queryFn: async () => {
        const combined = await fetchCombinedSharedContentRowsQuery(queryClient, contentRevision);

        return combined.combinedSharedModulesRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
