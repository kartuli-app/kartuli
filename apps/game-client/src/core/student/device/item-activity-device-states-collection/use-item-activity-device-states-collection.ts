import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  createItemActivityDeviceStatesCollection,
  type ItemActivityDeviceStatesCollection,
} from './create-item-activity-device-states-collection';

export function useItemActivityDeviceStatesCollection({
  ownerId,
}: {
  ownerId: string;
}): ItemActivityDeviceStatesCollection {
  const queryClient = useQueryClient();

  return useMemo(
    () => createItemActivityDeviceStatesCollection({ queryClient, ownerId }),
    [queryClient, ownerId],
  );
}
