'use client';

import { getOrCreateOwnerId } from '@game-client/student/identifiers/owner-id';
import { useItemActivityStatesCollection } from '@game-client/student/item-activity-device-states-collection/use-item-activity-states-collection';
import { useItemActivityViewEvents } from '@game-client/student/item-activity-device-states-collection/use-item-activity-view-events';
import { concat, max, min, sum } from '@tanstack/db';
import { useLiveQuery } from '@tanstack/react-db';
import { useCallback, useEffect } from 'react';
import type { ItemActivitySummariesById } from './item-activity-summaries-by-id';

export default function ItemActivitySummariesLiveQuery({
  onItemActivitySummariesByIdReady,
  onAddViewEventsForItemIdsReady,
}: Readonly<{
  onItemActivitySummariesByIdReady: (next: ItemActivitySummariesById) => void;
  onAddViewEventsForItemIdsReady?: (add: (itemIds: readonly string[]) => Promise<void>) => void;
}>) {
  const ownerId = getOrCreateOwnerId();

  const itemActivityStatesCollection = useItemActivityStatesCollection({
    ownerId,
  });

  const { addViewEventsForItemIdsInternal } = useItemActivityViewEvents({
    itemActivityStatesCollection,
  });

  const addViewEventsForItemIds = useCallback(
    async (itemIds: readonly string[]) => {
      await addViewEventsForItemIdsInternal(itemIds);
    },
    [addViewEventsForItemIdsInternal],
  );

  useEffect(() => {
    onAddViewEventsForItemIdsReady?.(addViewEventsForItemIds);
  }, [onAddViewEventsForItemIdsReady, addViewEventsForItemIds]);

  const { data: summariesRows } = useLiveQuery(
    (q) => {
      if (!ownerId) return undefined;

      return q
        .from({ activity: itemActivityStatesCollection })
        .groupBy(({ activity }) => [
          activity.ownerId,
          activity.itemId,
          // `id` is non-aggregate, so it must be part of GROUP BY too.
          concat(activity.ownerId, '-', activity.itemId),
        ])
        .select(({ activity }) => {
          return {
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

            updatedAt: max(activity.updatedAt),
          };
        });
    },
    [ownerId, itemActivityStatesCollection],
  );

  useEffect(() => {
    if (!summariesRows) return;
    const next: ItemActivitySummariesById = {};
    for (const row of summariesRows) {
      next[row.itemId] = row;
    }
    onItemActivitySummariesByIdReady(next);
  }, [summariesRows, onItemActivitySummariesByIdReady]);

  return null;
}
