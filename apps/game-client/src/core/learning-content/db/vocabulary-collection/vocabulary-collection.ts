import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';
import type { LocalizedVocabularyItem } from '../../localized-content-data/localized-content-data';
import type { SharedVocabularyItem } from '../../shared-content-data/shared-content-data';

/**
 * Result row type of the joined vocabulary collection (inner join).
 */
export interface VocabularyCollectionRow {
  sharedVocabularyItem: SharedVocabularyItem;
  localizedVocabularyItem: LocalizedVocabularyItem;
}

/**
 * Creates a live-query collection that inner-joins shared and localized vocabulary items on `id`.
 */
export function createVocabularyCollection(
  sharedVocabularyCollection: Collection<SharedVocabularyItem>,
  localizedVocabularyCollection: Collection<LocalizedVocabularyItem>,
) {
  return createLiveQueryCollection((q) =>
    q
      .from({ sharedVocabularyItem: sharedVocabularyCollection })
      .innerJoin(
        { localizedVocabularyItem: localizedVocabularyCollection },
        ({ sharedVocabularyItem, localizedVocabularyItem }) =>
          eq(sharedVocabularyItem.id, localizedVocabularyItem.id),
      ),
  );
}
