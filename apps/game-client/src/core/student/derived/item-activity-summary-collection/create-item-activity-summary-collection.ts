import {
  type Collection,
  concat,
  createLiveQueryCollection,
  eq,
  max,
  min,
  sum,
} from '@tanstack/db';

import type { ItemActivityDeviceStateRow } from '../../device/item-activity-device-states-collection/item-activity-device-state';

export type ItemActivitySummaryRow = {
  id: string;
  ownerId: string;
  itemId: string;

  totalViewCount: number;
  totalSuccessCount: number;
  totalFailCount: number;

  // Stored in IndexedDB as ISO strings (see `ItemActivityDeviceStateRow`).
  firstSeenAt: string | null;
  lastSeenAt: string | null;
  lastSuccessAt: string | null;
  lastFailAt: string | null;

  updatedAt: string;
};

export function createItemActivitySummaryCollection({
  itemActivityDeviceStatesCollection,
}: {
  itemActivityDeviceStatesCollection: Collection<ItemActivityDeviceStateRow>;
}) {
  return createLiveQueryCollection((q) =>
    q
      .from({ activity: itemActivityDeviceStatesCollection })
      .groupBy(({ activity }) => [
        activity.ownerId,
        activity.itemId,
        // `id` is a non-aggregate expression, so it must be present in GROUP BY too.
        concat(activity.ownerId, '-', activity.itemId),
      ])
      .select(({ activity }) => {
        return {
          // Avoid JS template string coercion of TanStack DB expression objects.
          id: concat(activity.ownerId, '-', activity.itemId),
          ownerId: activity.ownerId,
          itemId: activity.itemId,

          totalViewCount: sum(activity.viewCount),
          totalSuccessCount: sum(activity.successCount),
          totalFailCount: sum(activity.failCount),

          firstSeenAt: min(activity.firstViewAt),
          lastSeenAt: max(activity.lastViewAt),
          lastSuccessAt: max(activity.lastSuccessAt),
          lastFailAt: max(activity.lastFailAt),

          updatedAt: max(activity.udpatedAt),
        };
      }),
  );
}
