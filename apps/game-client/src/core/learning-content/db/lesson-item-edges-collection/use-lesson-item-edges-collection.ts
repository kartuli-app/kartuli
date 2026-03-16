'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createSharedLessonItemEdgesCollection } from './shared-lesson-item-edges-collection';

/**
 * Returns the shared lesson-item edges collection (no locale; edges are shared only).
 */
export function useLessonItemEdgesCollection() {
  const queryClient = useQueryClient();

  return useMemo(() => createSharedLessonItemEdgesCollection(queryClient), [queryClient]);
}
