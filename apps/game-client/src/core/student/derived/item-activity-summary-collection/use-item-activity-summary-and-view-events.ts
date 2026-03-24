'use client';

import { useItemActivityDeviceStatesCollection } from '../../device/item-activity-device-states-collection/use-item-activity-device-states-collection';
import { useItemActivityViewEvents } from '../../device/item-activity-device-states-collection/use-item-activity-view-events';
import { useItemActivitySummaryCollection } from './use-item-activity-summary-collection';

export function useItemActivitySummaryAndViewEvents({ ownerId }: { ownerId: string }) {
  const itemActivityDeviceStatesCollection = useItemActivityDeviceStatesCollection({ ownerId });
  const { addViewEventsForItems } = useItemActivityViewEvents({
    itemActivityDeviceStatesCollection,
  });
  const itemActivitySummaryCollection = useItemActivitySummaryCollection({
    itemActivityDeviceStatesCollection,
  });

  return { itemActivitySummaryCollection, addViewEventsForItems };
}
