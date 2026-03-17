import type { LocalizedItemRow } from '@game-client/core/learning-content/integration/combined-localized-content-data-rows';
import type { SharedItemRow } from '@game-client/core/learning-content/integration/combined-shared-content-data-rows';
import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';

export type AvailableItemRow = {
  item: SharedItemRow;
  localizedItem: LocalizedItemRow;
};

export function createLocalizedAvailableItemsCollection({
  itemsCollection,
  localizedItemsCollection,
}: {
  itemsCollection: Collection<SharedItemRow>;
  localizedItemsCollection: Collection<LocalizedItemRow>;
}) {
  return createLiveQueryCollection((q) =>
    q
      .from({ item: itemsCollection })
      .innerJoin({ localizedItem: localizedItemsCollection }, ({ item, localizedItem }) =>
        eq(item.id, localizedItem.id),
      )
      .select(({ item, localizedItem }) => ({
        item,
        localizedItem,
      })),
  );
}
