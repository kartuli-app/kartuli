import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createModuleToLessonEdgesCollection } from './create-module-to-lesson-edges-collection';

export function useModuleToLessonEdgesCollection() {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createModuleToLessonEdgesCollection(queryClient);
  }, [queryClient]);
}
