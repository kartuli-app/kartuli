export const supportedLocales = ['en', 'ru'] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = 'en';

export const PREFERRED_LOCALE_KEY = 'preferred-locale';
