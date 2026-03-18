import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLessonItemEdgesCollection } from './create-lesson-item-edges-collection';

export function useLessonItemEdgesCollection({ contentRevision }: { contentRevision: string }) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createLessonItemEdgesCollection({ queryClient, contentRevision });
  }, [queryClient, contentRevision]);
}
