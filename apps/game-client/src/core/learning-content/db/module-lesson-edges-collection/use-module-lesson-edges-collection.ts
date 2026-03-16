'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createSharedModuleLessonEdgesCollection } from './shared-module-lesson-edges-collection';

/**
 * Returns the shared module-lesson edges collection (no locale; edges are shared only).
 */
export function useModuleLessonEdgesCollection() {
  const queryClient = useQueryClient();

  return useMemo(() => createSharedModuleLessonEdgesCollection(queryClient), [queryClient]);
}
