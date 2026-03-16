import { type Collection, createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { combinedLocalizedContentDataGet } from '../../combined-data/combined-localized-content-data-get';
import { combinedSharedContentDataGet } from '../../combined-data/combined-shared-content-data-get';
import type {
  LocalizedAlphabetItem,
  LocalizedVocabularyItem,
} from '../../localized-content-data/localized-content-data';
import type {
  SharedAlphabetItem,
  SharedVocabularyItem,
} from '../../shared-content-data/shared-content-data';
import type {
  MultitypeItemRow,
  MultitypeLetterItemRow,
  MultitypeWordItemRow,
} from './multitype-items-collection-types';

const MULTITYPE_ITEMS_QUERY_KEY = ['tanstack-db', 'multitype-items'] as const;

function buildLetterRow(
  shared: SharedAlphabetItem,
  localized: LocalizedAlphabetItem,
): MultitypeLetterItemRow {
  return {
    id: shared.id,
    type: 'letter',
    targetScript: shared.targetScript,
    transliteration: shared.transliteration,
    pronunciationHint: localized.pronunciationHint,
    soundCategory: shared.soundCategory,
  };
}

function buildWordRow(
  shared: SharedVocabularyItem,
  localized: LocalizedVocabularyItem,
): MultitypeWordItemRow {
  return {
    id: shared.id,
    type: 'word',
    targetScript: shared.targetScript,
    translation: localized.translation,
  };
}

/**
 * Creates a TanStack DB collection that merges alphabet and vocabulary items
 * into a single list with a discriminated `type` field.
 *
 * This collection is locale-dependent: localized fields are taken from the
 * combined localized content data for the given locale, while shared fields
 * come from the combined shared content data.
 */
export function createMultitypeItemsCollection(
  queryClient: QueryClient,
  locale: string,
): Collection<MultitypeItemRow> {
  return createCollection(
    queryCollectionOptions({
      queryKey: [...MULTITYPE_ITEMS_QUERY_KEY, locale],
      queryFn: async () => {
        const [shared, localized] = await Promise.all([
          queryClient.fetchQuery({
            queryKey: ['combined-shared-content-data'],
            queryFn: () => combinedSharedContentDataGet(),
          }),
          queryClient.fetchQuery({
            queryKey: ['combined-localized-content-data', locale],
            queryFn: () => combinedLocalizedContentDataGet(locale),
          }),
        ]);

        const alphabetById = new Map<string, SharedAlphabetItem>();
        for (const item of shared.alphabetItems) {
          alphabetById.set(item.id, item);
        }

        const vocabularyById = new Map<string, SharedVocabularyItem>();
        for (const item of shared.vocabularyItems) {
          vocabularyById.set(item.id, item);
        }

        const rows: MultitypeItemRow[] = [];

        for (const localizedAlphabet of localized.localizedAlphabetItems) {
          const sharedAlphabet = alphabetById.get(localizedAlphabet.id);
          if (!sharedAlphabet) continue;
          rows.push(buildLetterRow(sharedAlphabet, localizedAlphabet));
        }

        for (const localizedVocabulary of localized.localizedVocabularyItems) {
          const sharedVocabulary = vocabularyById.get(localizedVocabulary.id);
          if (!sharedVocabulary) continue;
          rows.push(buildWordRow(sharedVocabulary, localizedVocabulary));
        }

        return rows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  ) as Collection<MultitypeItemRow>;
}
