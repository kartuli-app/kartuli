import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedLocalizedContentDataGet } from '../../combined-data/combined-localized-content-data-get';
import type { LocalizedModule } from '../../localized-content-data/localized-content-data';

/**
 * Creates a TanStack DB collection of localized modules for the given locale,
 * synced from the combined localized content data (default + extended repos).
 */
export function createLocalizedModulesCollection(
  queryClient: QueryClient,
  locale: string,
): Collection<LocalizedModule> {
  return createCollection(
    queryCollectionOptions({
      queryKey: ['tanstack-db', 'localized-modules', locale],
      queryFn: async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['combined-localized-content-data', locale],
          queryFn: () => combinedLocalizedContentDataGet(locale),
        });
        return data.localizedModules;
      },
      queryClient,
      getKey: (item) => item.id,
    }),
  ) as Collection<LocalizedModule>;
}
