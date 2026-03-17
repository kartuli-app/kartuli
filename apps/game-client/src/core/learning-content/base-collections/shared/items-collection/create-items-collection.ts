import { getCombinedSharedContentData } from '@game-client/core/learning-content/integration/combined-shared-content-data-get';
import type { SharedItemRow } from '@game-client/core/learning-content/integration/combined-shared-content-data-rows';
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
    queryCollectionOptions<SharedItemRow>({
      queryKey: ['tanstack-db', 'items-collection', contentRevision],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data', contentRevision],
          queryFn: () => getCombinedSharedContentData(),
        });

        return combined.itemsRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
