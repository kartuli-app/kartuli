import { createItemsCollection } from '@game-client/core/learning-content/base-collections/shared/items-collection/create-items-collection';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useItemsCollection({ contentRevision }: { contentRevision: string }) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createItemsCollection({ queryClient, contentRevision });
  }, [queryClient, contentRevision]);
}
