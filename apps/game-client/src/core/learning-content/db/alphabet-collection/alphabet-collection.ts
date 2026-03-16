import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';
import type { LocalizedAlphabetItem } from '../../localized-content-data/localized-content-data';
import type { SharedAlphabetItem } from '../../shared-content-data/shared-content-data';

/**
 * Result row type of the joined alphabet collection (inner join).
 * Both sides are present for every row.
 */
export interface AlphabetCollectionRow {
  sharedAlphabetItem: SharedAlphabetItem;
  localizedAlphabetItem: LocalizedAlphabetItem;
}

/**
 * Creates a live-query collection that inner-joins shared and localized alphabet items on `id`.
 * Only rows that exist in both collections are included.
 */
export function createAlphabetCollection(
  sharedAlphabetCollection: Collection<SharedAlphabetItem>,
  localizedAlphabetCollection: Collection<LocalizedAlphabetItem>,
) {
  return createLiveQueryCollection((q) =>
    q
      .from({ sharedAlphabetItem: sharedAlphabetCollection })
      .innerJoin(
        { localizedAlphabetItem: localizedAlphabetCollection },
        ({ sharedAlphabetItem, localizedAlphabetItem }) =>
          eq(sharedAlphabetItem.id, localizedAlphabetItem.id),
      ),
  );
}
