import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createModuleTextsCollection } from './create-module-texts-collection';

export function useModuleTextsCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createModuleTextsCollection({ queryClient, contentRevision, locale });
  }, [queryClient, contentRevision, locale]);
}
