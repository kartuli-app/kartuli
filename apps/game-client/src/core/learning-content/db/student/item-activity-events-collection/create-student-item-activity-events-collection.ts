import { createCollection } from '@tanstack/db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import type { QueryClient } from '@tanstack/react-query';

type ItemActivityEventRow = {
  id: string;
  timestamp: number;
  itemId: string;
  eventType: 'view' | 'click' | 'complete';
};

const MockItemActivityEventRows: ItemActivityEventRow[] = [
  {
    id: '1',
    timestamp: Date.now(),
    itemId: 'letter-ani',
    eventType: 'view',
  },
  {
    id: '2',
    timestamp: Date.now(),
    itemId: 'letter-ani',
    eventType: 'click',
  },
  {
    id: '3',
    timestamp: Date.now(),
    itemId: 'letter-bani',
    eventType: 'complete',
  },
];

export function createStudentItemActivityEventsCollection({
  queryClient,
}: {
  queryClient: QueryClient;
}) {
  console.info('🚀 ~ createStudentItemActivityEventsCollection ~ createCollection');
  return createCollection(
    queryCollectionOptions<ItemActivityEventRow>({
      queryKey: ['tanstack-db', 'item-activity-events-collection'],
      queryFn: async () => {
        return MockItemActivityEventRows;
      },
      queryClient,
      getKey: (row) => row.id,
    }),
  );
}
