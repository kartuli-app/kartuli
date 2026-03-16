import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';
import type { LocalizedModule } from '../../localized-content-data/localized-content-data';
import type { SharedModule } from '../../shared-content-data/shared-content-data';

/**
 * Result row type of the joined modules collection (inner join).
 */
export interface ModulesCollectionRow {
  sharedModule: SharedModule;
  localizedModule: LocalizedModule;
}

/**
 * Creates a live-query collection that inner-joins shared and localized modules on `id`.
 */
export function createModulesCollection(
  sharedModulesCollection: Collection<SharedModule>,
  localizedModulesCollection: Collection<LocalizedModule>,
) {
  return createLiveQueryCollection((q) =>
    q
      .from({ sharedModule: sharedModulesCollection })
      .innerJoin(
        { localizedModule: localizedModulesCollection },
        ({ sharedModule, localizedModule }) => eq(sharedModule.id, localizedModule.id),
      ),
  );
}
