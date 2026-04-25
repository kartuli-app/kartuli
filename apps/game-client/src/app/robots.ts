import type { MetadataRoute } from 'next';

/** Canonical site origin (must match metadata in get-locale-metadata). */
const siteUrl = 'https://www.kartuli.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    host: new URL(siteUrl).host,
  };
}
