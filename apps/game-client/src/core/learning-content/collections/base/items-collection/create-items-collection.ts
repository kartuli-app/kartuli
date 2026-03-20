import type { CombinedSharedItemRow } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import { fetchCombinedSharedContentRowsQuery } from '@game-client/core/learning-content/integration/fetch-combined-content-queries';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createItemsCollection({
  queryClient,
  contentRevision,
}: {
  queryClient: QueryClient;
  contentRevision: string;
}) {
  return createCollection(
    queryCollectionOptions<CombinedSharedItemRow>({
      queryKey: ['tanstack-db', 'items-collection', contentRevision],
      queryFn: async () => {
        const combined = await fetchCombinedSharedContentRowsQuery(queryClient, contentRevision);

        return combined.combinedSharedItemsRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
