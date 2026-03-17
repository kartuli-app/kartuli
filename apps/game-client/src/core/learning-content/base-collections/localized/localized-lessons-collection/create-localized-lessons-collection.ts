import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import {
  getCombinedLocalizedContentData,
  type LocalizedLessonRow,
} from '../../../integration/combined-localized-content-data-get';

export function createLocalizedLessonsCollection({
  queryClient,
  contentRevision,
  locale,
}: {
  queryClient: QueryClient;
  contentRevision: string;
  locale: string;
}) {
  return createCollection(
    queryCollectionOptions<LocalizedLessonRow>({
      queryKey: ['tanstack-db', 'localized-lessons-collection', contentRevision, locale],
      queryFn: async () => {
        const combined = await queryClient.fetchQuery({
          queryKey: ['combined-localized-content-data', contentRevision, locale],
          queryFn: () => getCombinedLocalizedContentData(locale),
        });

        return combined.localizedLessonsRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
