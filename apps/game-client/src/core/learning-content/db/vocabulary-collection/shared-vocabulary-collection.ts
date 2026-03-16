import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedSharedContentDataGet } from '../../combined-data/combined-shared-content-data-get';
import type { SharedVocabularyItem } from '../../shared-content-data/shared-content-data';

const SHARED_VOCABULARY_QUERY_KEY = ['tanstack-db', 'shared-vocabulary'] as const;

/**
 * Creates a TanStack DB collection of shared vocabulary items,
 * synced from the combined shared content data (default + extended repos).
 */
export function createSharedVocabularyCollection(
  queryClient: QueryClient,
): Collection<SharedVocabularyItem> {
  return createCollection(
    queryCollectionOptions({
      queryKey: [...SHARED_VOCABULARY_QUERY_KEY],
      queryFn: async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['combined-shared-content-data'],
          queryFn: () => combinedSharedContentDataGet(),
        });
        return data.vocabularyItems;
      },
      queryClient,
      getKey: (item) => item.id,
    }),
  ) as Collection<SharedVocabularyItem>;
}
