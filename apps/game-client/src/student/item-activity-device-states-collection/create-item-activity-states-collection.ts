import type { ItemActivityState } from '@game-client/student/item-activity-device-states-collection/item-activity-state';
import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';
import { getAllItemActivityStatesByOwnerId } from './item-activity-state-database';

/** TanStack Query key — invalidate after direct IndexedDB writes outside this collection. */
export const itemActivityDeviceStatesCollectionQueryKey = [
  'tanstack-db',
  'item-activity-device-states-collection',
] as const;

export type ItemActivityStatesCollection = ReturnType<typeof createItemActivityStatesCollection>;

export function createItemActivityStatesCollection({
  queryClient,
  ownerId,
}: {
  queryClient: QueryClient;
  ownerId: string;
}) {
  return createCollection(
    queryCollectionOptions<ItemActivityState>({
      queryKey: [...itemActivityDeviceStatesCollectionQueryKey, ownerId],
      queryFn: async () => getAllItemActivityStatesByOwnerId(ownerId),
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
