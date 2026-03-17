import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLocalizedModulesCollection } from './create-localized-modules-collection';

export function useLocalizedModulesCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createLocalizedModulesCollection({ queryClient, contentRevision, locale });
  }, [queryClient, contentRevision, locale]);
}
