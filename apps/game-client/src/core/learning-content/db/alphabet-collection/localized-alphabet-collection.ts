import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedLocalizedContentDataGet } from '../../combined-data/combined-localized-content-data-get';
import type { LocalizedAlphabetItem } from '../../localized-content-data/localized-content-data';

/**
 * Creates a TanStack DB collection of localized alphabet items for the given locale,
 * synced from the combined localized content data (default + extended repos).
 * Use a new collection per locale so that changing language refetches and updates the join.
 */
export function createLocalizedAlphabetCollection(
  queryClient: QueryClient,
  locale: string,
): Collection<LocalizedAlphabetItem> {
  return createCollection(
    queryCollectionOptions({
      queryKey: ['tanstack-db', 'localized-alphabet', locale],
      queryFn: async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['combined-localized-content-data', locale],
          queryFn: () => combinedLocalizedContentDataGet(locale),
        });
        return data.localizedAlphabetItems;
      },
      queryClient,
      getKey: (item) => item.id,
    }),
  ) as Collection<LocalizedAlphabetItem>;
}
