import type { DeepSameKeys } from '@game-client/i18n/resources/deep-same-keys';
import { enResources } from './resources-en';

const referenceResources = enResources;
/**
 * Use for other language packs so they stay in sync with en.
 */
export type SameKeysAsReferenceResources = DeepSameKeys<typeof referenceResources>;
