import { supportedLocales } from '@game-client/i18n';
import type { MetadataRoute } from 'next';

/** Canonical site origin (must match metadata in get-locale-metadata). */
const siteUrl = 'https://www.kartuli.app';

const disallowedPaths = [
  //
  ...supportedLocales.map((locale) => `/${locale}/debug`),
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: disallowedPaths,
    },
    host: new URL(siteUrl).host,
  };
}
