'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLocalizedModulesCollection } from './localized-modules-collection';
import { createModulesCollection } from './modules-collection';
import { createSharedModulesCollection } from './shared-modules-collection';

/**
 * Returns the joined modules collection (shared + localized inner-joined on id)
 * for the given locale.
 */
export function useModulesCollection(locale: string) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    const sharedModules = createSharedModulesCollection(queryClient);
    const localizedModules = createLocalizedModulesCollection(queryClient, locale);
    return createModulesCollection(sharedModules, localizedModules);
  }, [queryClient, locale]);
}
