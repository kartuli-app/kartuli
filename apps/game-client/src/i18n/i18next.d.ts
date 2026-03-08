import type { enResources } from '@game-client/resources/resources-en';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof enResources;
  }
}
