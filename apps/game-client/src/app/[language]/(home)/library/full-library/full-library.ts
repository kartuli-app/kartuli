import type { CombinedLocalizedContentRows } from '@game-client/core/learning-content/integration/combined-localized-content-rows/combined-localized-content-rows';
import type { CombinedSharedContentRows } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import type { AvailableLibrary } from '../available-library/available-library';

export interface FullLibrary {
  sharedData: CombinedSharedContentRows;
  localizedData: CombinedLocalizedContentRows;
  availableLibrary: AvailableLibrary;
}
