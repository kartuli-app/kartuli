import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import {
  getCombinedSharedContentData,
  type SharedItemRow,
} from '../../../integration/combined-shared-content-data-get';

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
