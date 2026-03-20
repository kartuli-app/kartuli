import type { AvailableItemRow } from '@game-client/core/learning-content/collections/derived/available-items-collection/create-available-items-collection';
import type { ItemActivitySummaryRow } from '@game-client/core/student/derived/item-activity-summary-collection/create-item-activity-summary-collection';
import { type Collection, createLiveQueryCollection, eq } from '@tanstack/db';

export type AvailableItemWithActivityRow = {
  sharedItem: AvailableItemRow['sharedItem'];
  localizedItem: AvailableItemRow['localizedItem'];
  // TanStack DB `leftJoin` keeps the joined row object shape, but when the
  // join doesn't match, each field becomes `undefined`.
  activitySummary: {
    [K in keyof ItemActivitySummaryRow]: ItemActivitySummaryRow[K] | undefined;
  };
};

export function createAvailableItemsWithActivityCollection({
  availableItemsCollection,
  itemActivitySummaryCollection,
}: {
  availableItemsCollection: Collection<AvailableItemRow>;
  itemActivitySummaryCollection: Collection<ItemActivitySummaryRow>;
}) {
  return createLiveQueryCollection((q) =>
    q
      .from({ availableItem: availableItemsCollection })
      .leftJoin(
        { activitySummary: itemActivitySummaryCollection },
        ({ availableItem, activitySummary }) =>
          eq(availableItem.sharedItem.id, activitySummary.itemId),
      )
      .select(({ availableItem, activitySummary }) => ({
        sharedItem: availableItem.sharedItem,
        localizedItem: availableItem.localizedItem,
        activitySummary,
      })),
  );
}
