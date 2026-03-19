import { useMemo } from 'react';
import { useModuleTextsCollection } from '../../base/module-texts-collection/use-module-texts-collection';
import { useModulesCollection } from '../../base/modules-collection/use-modules-collection';
import { createAvailableModulesCollection } from './create-available-modules-collection';

export function useAvailableModulesCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const modulesCollection = useModulesCollection({ contentRevision });
  const moduleTextsCollection = useModuleTextsCollection({ contentRevision, locale });

  return useMemo(() => {
    return createAvailableModulesCollection({ modulesCollection, moduleTextsCollection });
  }, [contentRevision, locale]);
}
