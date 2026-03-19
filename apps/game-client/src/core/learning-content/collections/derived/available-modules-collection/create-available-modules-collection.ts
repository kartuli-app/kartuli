import type { CombinedLocalizedModuleRow } from '@game-client/core/learning-content/integration/combined-localized-content-rows/combined-localized-content-rows';
import type { CombinedSharedModuleRow } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import { type Collection, createLiveQueryCollection, eq } from '@tanstack/db';

export type AvailableModuleRow = {
  sharedModule: CombinedSharedModuleRow;
  localizedModule: CombinedLocalizedModuleRow;
};

export function createAvailableModulesCollection({
  modulesCollection,
  moduleTextsCollection,
}: {
  modulesCollection: Collection<CombinedSharedModuleRow>;
  moduleTextsCollection: Collection<CombinedLocalizedModuleRow>;
}) {
  return createLiveQueryCollection((q) =>
    q
      .from({ sharedModule: modulesCollection })
      .innerJoin({ localizedModule: moduleTextsCollection }, (q) =>
        eq(q.sharedModule.id, q.localizedModule.id),
      ),
  );
}
