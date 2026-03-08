import { enResources } from '@game-client/resources/resources-en';
import { ruResources } from '@game-client/resources/resources-ru';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'common' as const;

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
