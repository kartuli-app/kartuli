import { getCombinedLocalizedContentData } from '@game-client/core/learning-content/integration/combined-localized-content-data-get';
import type { LocalizedModuleRow } from '@game-client/core/learning-content/integration/combined-localized-content-data-rows';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

export function createLocalizedModulesCollection({
  queryClient,
  contentRevision,
  locale,
}: {
  queryClient: QueryClient;
  contentRevision: string;
  locale: string;
}) {
  return createCollection(
    queryCollectionOptions<LocalizedModuleRow>({
      queryKey: ['tanstack-db', 'localized-modules-collection', contentRevision, locale],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-localized-content-data', contentRevision, locale],
          queryFn: () => getCombinedLocalizedContentData(locale),
        });

        return combined.localizedModulesRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
