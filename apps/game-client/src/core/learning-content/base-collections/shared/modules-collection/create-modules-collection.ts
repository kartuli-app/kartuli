import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import {
  getCombinedSharedContentData,
  type SharedModuleRow,
} from '../../../integration/combined-shared-content-data-get';

export function createModulesCollection({
  queryClient,
  contentRevision,
}: {
  queryClient: QueryClient;
  contentRevision: string;
}) {
  return createCollection(
    queryCollectionOptions<SharedModuleRow>({
      queryKey: ['tanstack-db', 'modules-collection', contentRevision],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data', contentRevision],
          queryFn: () => getCombinedSharedContentData(),
        });

        return combined.modulesRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
