import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createModuleToLessonEdgesCollection } from './create-module-to-lesson-edges-collection';

export function useModuleToLessonEdgesCollection({ contentRevision }: { contentRevision: string }) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createModuleToLessonEdgesCollection({ queryClient, contentRevision });
  }, [queryClient, contentRevision]);
}
