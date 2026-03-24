'use client';

import { useCallback } from 'react';
import { batchUpsertItemActivityDeviceViewEvents } from './batch-upsert-item-activity-view-events';
import type { ItemActivityDeviceStatesCollection } from './create-item-activity-device-states-collection';

export function useItemActivityViewEvents({
  itemActivityDeviceStatesCollection,
}: {
  itemActivityDeviceStatesCollection: ItemActivityDeviceStatesCollection;
}) {
  const addViewEventsForItems = useCallback(
    async (itemIds: readonly string[]) => {
      await batchUpsertItemActivityDeviceViewEvents({
        collection: itemActivityDeviceStatesCollection,
        itemIds,
      });
    },
    [itemActivityDeviceStatesCollection],
  );

  return { addViewEventsForItems };
}
