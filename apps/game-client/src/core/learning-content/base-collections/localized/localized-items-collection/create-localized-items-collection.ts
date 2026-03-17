import { getCombinedLocalizedContentData } from '@game-client/core/learning-content/integration/combined-localized-content-data-get';
import type { LocalizedItemRow } from '@game-client/core/learning-content/integration/combined-localized-content-data-rows';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createLocalizedItemsCollection({
  queryClient,
  contentRevision,
  locale,
}: {
  queryClient: QueryClient;
  contentRevision: string;
  locale: string;
}) {
  return createCollection(
    queryCollectionOptions<LocalizedItemRow>({
      queryKey: ['tanstack-db', 'localized-items-collection', contentRevision, locale],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-localized-content-data', contentRevision, locale],
          queryFn: () => getCombinedLocalizedContentData(locale),
        });

        return combined.localizedItemsRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
