import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedLocalizedContentDataGet } from '../../combined-data/combined-localized-content-data-get';
import type { LocalizedVocabularyItem } from '../../localized-content-data/localized-content-data';

/**
 * Creates a TanStack DB collection of localized vocabulary items for the given locale,
 * synced from the combined localized content data (default + extended repos).
 */
export function createLocalizedVocabularyCollection(
  queryClient: QueryClient,
  locale: string,
): Collection<LocalizedVocabularyItem> {
  return createCollection(
    queryCollectionOptions({
      queryKey: ['tanstack-db', 'localized-vocabulary', locale],
      queryFn: async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['combined-localized-content-data', locale],
          queryFn: () => combinedLocalizedContentDataGet(locale),
        });
        return data.localizedVocabularyItems;
      },
      queryClient,
      getKey: (item) => item.id,
    }),
  ) as Collection<LocalizedVocabularyItem>;
}
