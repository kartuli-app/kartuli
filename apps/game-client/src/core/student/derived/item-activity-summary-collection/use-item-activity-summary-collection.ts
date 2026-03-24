import { useMemo } from 'react';
import type { ItemActivityDeviceStatesCollection } from '../../device/item-activity-device-states-collection/create-item-activity-device-states-collection';
import { createItemActivitySummaryCollection } from './create-item-activity-summary-collection';

export function useItemActivitySummaryCollection({
  itemActivityDeviceStatesCollection,
}: {
  itemActivityDeviceStatesCollection: ItemActivityDeviceStatesCollection;
}) {
  return useMemo(() => {
    return createItemActivitySummaryCollection({ itemActivityDeviceStatesCollection });
  }, [itemActivityDeviceStatesCollection]);
}
