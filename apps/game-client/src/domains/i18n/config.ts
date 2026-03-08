import { enResources } from '@game-client/domains/i18n/resources-en';
import { ruResources } from '@game-client/domains/i18n/resources-ru';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'common' as const;
export { type SupportedLng, supportedLngs } from '@game-client/domains/i18n/supported-locales';

const resources = {
  en: enResources,
  ru: ruResources,
};

const ns = Object.keys(enResources) as (keyof typeof enResources)[];

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: false,
  defaultNS,
  ns,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
