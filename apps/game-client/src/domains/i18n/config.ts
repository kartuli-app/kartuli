import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../../locales/en/common';
import enDebug from '../../locales/en/debug';
import enGame from '../../locales/en/game';
import enLearn from '../../locales/en/learn';
import enMetadata from '../../locales/en/metadata';
import ruCommon from '../../locales/ru/common';
import ruDebug from '../../locales/ru/debug';
import ruGame from '../../locales/ru/game';
import ruLearn from '../../locales/ru/learn';
import ruMetadata from '../../locales/ru/metadata';

export const defaultNS = 'common' as const;
export { type SupportedLng, supportedLngs } from './supported-locales';

const resources = {
  en: {
    common: enCommon,
    game: enGame,
    learn: enLearn,
    debug: enDebug,
    metadata: enMetadata,
  },
  ru: {
    common: ruCommon,
    game: ruGame,
    learn: ruLearn,
    debug: ruDebug,
    metadata: ruMetadata,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS,
  ns: ['common', 'game', 'learn', 'debug', 'metadata'],
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
