import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedLocalizedContentDataGet } from '../../combined-data/combined-localized-content-data-get';
import type { LocalizedLesson } from '../../localized-content-data/localized-content-data';

/**
 * Creates a TanStack DB collection of localized lessons for the given locale,
 * synced from the combined localized content data (default + extended repos).
 */
export function createLocalizedLessonsCollection(
  queryClient: QueryClient,
  locale: string,
): Collection<LocalizedLesson> {
  return createCollection(
    queryCollectionOptions({
      queryKey: ['tanstack-db', 'localized-lessons', locale],
      queryFn: async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['combined-localized-content-data', locale],
          queryFn: () => combinedLocalizedContentDataGet(locale),
        });
        return data.localizedLessons;
      },
      queryClient,
      getKey: (item) => item.id,
    }),
  ) as Collection<LocalizedLesson>;
}
