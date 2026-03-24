'use client';

import { batchUpsertItemActivityDeviceViewEvents } from '@game-client/core/student/device/item-activity-device-states-collection/batch-upsert-item-activity-view-events';
import { useItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/use-item-activity-device-states-collection';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
import { useHomeModulesView } from '@game-client/core/views/home/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';

export const useModulesList = () => {
  const locale = useLang();
  const ownerId = getOrCreateOwnerId();
  const contentRevision = '1.0.0';
  const itemsDeviceActivityStatesCollection = useItemActivityDeviceStatesCollection({ ownerId });
  const { data, isLoading, isError } = useHomeModulesView({ locale, contentRevision, ownerId });

  const addViewEventsForLessonItems = async (itemIds: readonly string[]) => {
    await batchUpsertItemActivityDeviceViewEvents({
      collection: itemsDeviceActivityStatesCollection,
      itemIds,
    });
  };

  return { data, isLoading, isError, addViewEventsForLessonItems };
};
