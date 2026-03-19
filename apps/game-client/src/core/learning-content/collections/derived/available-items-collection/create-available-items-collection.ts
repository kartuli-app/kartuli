import type { CombinedLocalizedItemRow } from '@game-client/core/learning-content/integration/combined-localized-content-rows/combined-localized-content-rows';
import type { CombinedSharedItemRow } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import { type Collection, createLiveQueryCollection, eq } from '@tanstack/db';

export type AvailableItemRow = {
  sharedItem: CombinedSharedItemRow;
  localizedItem: CombinedLocalizedItemRow;
};

export function createAvailableItemsCollection({
  itemsCollection,
  itemTextsCollection,
}: {
  itemsCollection: Collection<CombinedSharedItemRow>;
  itemTextsCollection: Collection<CombinedLocalizedItemRow>;
}) {
  return createLiveQueryCollection((q) =>
    q
      .from({ sharedItem: itemsCollection })
      .innerJoin({ localizedItem: itemTextsCollection }, (q) =>
        eq(q.sharedItem.id, q.localizedItem.id),
      ),
  );
}
