import type enCommon from '../../locales/en/common';
import type enDebug from '../../locales/en/debug';
import type enGame from '../../locales/en/game';
import type enLearn from '../../locales/en/learn';
import type enMetadata from '../../locales/en/metadata';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof enCommon;
      game: typeof enGame;
      learn: typeof enLearn;
      debug: typeof enDebug;
      metadata: typeof enMetadata;
    };
  }
}
