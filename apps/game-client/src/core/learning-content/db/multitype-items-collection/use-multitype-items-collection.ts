'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createMultitypeItemsCollection } from './multitype-items-collection';

/**
 * Returns the unified multitype items collection (alphabet + vocabulary)
 * for the given locale. Each row includes a `type` discriminator
 * so the UI can distinguish letters from words.
 */
export function useMultitypeItemsCollection(locale: string) {
  const queryClient = useQueryClient();

  return useMemo(() => createMultitypeItemsCollection(queryClient, locale), [queryClient, locale]);
}
