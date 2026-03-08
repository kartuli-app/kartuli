import { defaultLng } from '@game-client/i18n/default-locale';
import { resources } from '@game-client/i18n/resources/resources';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'common' as const;

const defaultResources = resources[defaultLng as SupportedLng];

const ns = Object.keys(defaultResources) as (keyof typeof defaultResources)[];

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLng as SupportedLng,
  fallbackLng: false,
  defaultNS,
  ns,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
