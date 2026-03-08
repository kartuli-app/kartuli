import type { DeepSameKeys } from '@game-client/i18n/deep-same-keys';
import type { enResources } from '@game-client/resources/resources-en';
/**
 * Use for other language packs so they stay in sync with en.
 */
export type SameKeysAsEnResources = DeepSameKeys<typeof enResources>;
