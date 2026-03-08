import type { enResources } from '@game-client/domains/i18n/resources-en';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof enResources;
  }
}
