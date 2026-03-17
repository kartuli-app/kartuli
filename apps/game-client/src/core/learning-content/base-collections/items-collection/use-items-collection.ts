import { createItemsCollection } from '@game-client/core/learning-content/base-collections/items-collection/create-items-collection';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useItemsCollection() {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createItemsCollection(queryClient);
  }, [queryClient]);
}
