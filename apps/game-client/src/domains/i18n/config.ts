import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../../locales/en/common';
import enDebug from '../../locales/en/debug';
import enGame from '../../locales/en/game';
import enLearn from '../../locales/en/learn';
import ruCommon from '../../locales/ru/common';
import ruDebug from '../../locales/ru/debug';
import ruGame from '../../locales/ru/game';
import ruLearn from '../../locales/ru/learn';

export const defaultNS = 'common' as const;
export const supportedLngs = ['en', 'ru'] as const;
export type SupportedLng = (typeof supportedLngs)[number];

const resources = {
  en: {
    common: enCommon,
    game: enGame,
    learn: enLearn,
    debug: enDebug,
  },
  ru: {
    common: ruCommon,
    game: ruGame,
    learn: ruLearn,
    debug: ruDebug,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS,
  ns: ['common', 'game', 'learn', 'debug'],
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
