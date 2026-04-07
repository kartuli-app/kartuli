'use client';

import { useCallback } from 'react';
import { batchUpsertItemActivityDeviceViewEvents } from './batch-upsert-item-activity-view-events';
import type { ItemActivityStatesCollection } from './create-item-activity-states-collection';

export function useItemActivityViewEvents({
  itemActivityStatesCollection,
}: {
  itemActivityStatesCollection: ItemActivityStatesCollection;
}) {
  const addViewEventsForItemIdsInternal = useCallback(
    async (itemIds: readonly string[]) => {
      await batchUpsertItemActivityDeviceViewEvents({
        collection: itemActivityStatesCollection,
        itemIds,
      });
    },
    [itemActivityStatesCollection],
  );

  return { addViewEventsForItemIdsInternal };
}
