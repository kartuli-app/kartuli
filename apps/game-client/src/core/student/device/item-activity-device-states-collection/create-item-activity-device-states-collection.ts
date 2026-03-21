import type { ItemActivityDeviceStateRow } from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { getAllItemActivityDeviceStatesByOwnerId } from './item-activity-device-state-database';

/** TanStack Query key — invalidate after direct IndexedDB writes outside this collection. */
export const itemActivityDeviceStatesCollectionQueryKey = [
  'tanstack-db',
  'item-activity-device-states-collection',
] as const;

export type ItemActivityDeviceStatesCollection = ReturnType<
  typeof createItemActivityDeviceStatesCollection
>;

export function createItemActivityDeviceStatesCollection({
  queryClient,
  ownerId,
}: {
  queryClient: QueryClient;
  ownerId: string;
}) {
  return createCollection(
    queryCollectionOptions<ItemActivityDeviceStateRow>({
      queryKey: [...itemActivityDeviceStatesCollectionQueryKey, ownerId],
      queryFn: async () => getAllItemActivityDeviceStatesByOwnerId(ownerId),
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
