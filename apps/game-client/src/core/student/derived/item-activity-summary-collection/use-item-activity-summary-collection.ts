import { useMemo } from 'react';
import { useItemActivityDeviceStatesCollection } from '../../device/item-activity-device-states-collection/use-item-activity-device-states-collection';
import { createItemActivitySummaryCollection } from './create-item-activity-summary-collection';

export function useItemActivitySummaryCollection() {
  const itemActivityDeviceStatesCollection = useItemActivityDeviceStatesCollection();

  return useMemo(() => {
    return createItemActivitySummaryCollection({ itemActivityDeviceStatesCollection });
  }, [itemActivityDeviceStatesCollection]);
}
