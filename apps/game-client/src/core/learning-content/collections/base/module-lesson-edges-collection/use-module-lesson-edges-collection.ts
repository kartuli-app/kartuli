import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createModuleLessonEdgesCollection } from './create-module-lesson-edges-collection';

export function useModuleLessonEdgesCollection({ contentRevision }: { contentRevision: string }) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createModuleLessonEdgesCollection({ queryClient, contentRevision });
  }, [queryClient, contentRevision]);
}
