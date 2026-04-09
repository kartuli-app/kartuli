import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  createItemActivityStatesCollection,
  type ItemActivityStatesCollection,
} from './create-item-activity-states-collection';

export function useItemActivityStatesCollection({
  ownerId,
}: {
  ownerId: string;
}): ItemActivityStatesCollection {
  const queryClient = useQueryClient();

  return useMemo(
    () => createItemActivityStatesCollection({ queryClient, ownerId }),
    [queryClient, ownerId],
  );
}
