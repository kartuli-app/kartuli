import type { ItemActivityDeviceStateRow } from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { getAllItemActivityDeviceStates } from './item-activity-device-state-database';

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
}: {
  queryClient: QueryClient;
}) {
  return createCollection(
    queryCollectionOptions<ItemActivityDeviceStateRow>({
      queryKey: [...itemActivityDeviceStatesCollectionQueryKey],
      queryFn: async () => getAllItemActivityDeviceStates(),
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
