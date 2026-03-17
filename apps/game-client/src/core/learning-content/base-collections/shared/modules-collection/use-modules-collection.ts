import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createModulesCollection } from './create-modules-collection';

export function useModulesCollection({ contentRevision }: { contentRevision: string }) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createModulesCollection({ queryClient, contentRevision });
  }, [queryClient, contentRevision]);
}
