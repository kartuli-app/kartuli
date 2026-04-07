import { resources } from '@game-client/i18n/resources/resources';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLocale } from './i18n-constants';

export const defaultNS = 'common' as const;

const defaultResources = resources[defaultLocale];

const ns = Object.keys(defaultResources) as (keyof typeof defaultResources)[];

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: false,
  defaultNS,
  ns,
  interpolation: {
    escapeValue: false,
  },
  showSupportNotice: false,
});

export { i18n };
