import { type Collection, createLiveQueryCollection, max, min, sum } from '@tanstack/db';

import type { ItemActivityDeviceStateRow } from '../../device/item-activity-device-states-collection/item-activity-device-state';

export type ItemActivitySummaryRow = {
  id: string;
  ownerId: string;
  itemId: string;

  totalViewCount: number;
  totalSuccessCount: number;
  totalFailCount: number;

  firstSeenAt?: number;
  lastSeenAt?: number;
  lastSuccessAt?: number;
  lastFailAt?: number;

  updatedAt: number;
};

export function createItemActivitySummaryCollection({
  itemActivityDeviceStatesCollection,
}: {
  itemActivityDeviceStatesCollection: Collection<ItemActivityDeviceStateRow>;
}) {
  return createLiveQueryCollection((q) =>
    q
      .from({ activity: itemActivityDeviceStatesCollection })
      .groupBy(({ activity }) => [activity.ownerId, activity.itemId])
      .select(({ activity }) => ({
        id: `${activity.ownerId}-${activity.itemId}`,
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
      })),
  ) as Collection<ItemActivitySummaryRow>;
}
