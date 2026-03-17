import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLessonToItemEdgesCollection } from './create-lesson-to-item-edges-collection';

export function useLessonToItemEdgesCollection({ contentRevision }: { contentRevision: string }) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createLessonToItemEdgesCollection({ queryClient, contentRevision });
  }, [queryClient, contentRevision]);
}
