import { useAvailableItemsCollection } from '@game-client/core/learning-content/collections/derived/available-items-collection/use-available-items-collection';
import { useItemActivitySummaryCollection } from '@game-client/core/student/derived/item-activity-summary-collection/use-item-activity-summary-collection';
import { useItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/use-item-activity-device-states-collection';
import { useMemo } from 'react';
import { createAvailableItemsWithActivityCollection } from './create-available-items-with-activity-collection';

export function useAvailableItemsWithActivityCollection({
  locale,
  ownerId,
  contentRevision,
}: {
  locale: string;
  ownerId: string;
  contentRevision: string;
}) {
  const availableItemsCollection = useAvailableItemsCollection({ contentRevision, locale });
  const itemActivityDeviceStatesCollection = useItemActivityDeviceStatesCollection({
    ownerId,
  });
  const itemActivitySummaryCollection = useItemActivitySummaryCollection({
    itemActivityDeviceStatesCollection,
  });

  return useMemo(() => {
    return createAvailableItemsWithActivityCollection({
      availableItemsCollection,
      itemActivitySummaryCollection,
    });
  }, [availableItemsCollection, itemActivitySummaryCollection]);
}
