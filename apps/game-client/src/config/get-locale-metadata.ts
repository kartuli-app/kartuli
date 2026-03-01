import type { Metadata } from 'next';
import { type SupportedLng, supportedLngs } from '../domains/i18n/supported-locales';
import enMetadata from '../locales/en/metadata';
import ruMetadata from '../locales/ru/metadata';
import { siteConfig } from './metadata-config';

const metadataByLocale: Record<
  SupportedLng,
  { title: string; description: string; keywords: readonly string[] }
> = {
  en: enMetadata,
  ru: ruMetadata,
};

const ogLocaleByLang: Record<SupportedLng, string> = {
  en: 'en_US',
  ru: 'ru_RU',
};

/** hreflang locale codes for alternates.languages (Next.js uses these in link tags). */
const hreflangByLang: Record<SupportedLng, string> = {
  en: 'en',
  ru: 'ru',
};

/**
 * Builds canonical URL and language alternates (hreflang) for the current path.
 * pathSegments: full route segments e.g. ['en'] or ['ru', 'learn', 'lesson-1'].
 */
function buildAlternates(
  pathSegments: string[],
  lang: SupportedLng,
): { canonical: string; languages: Record<string, string> } {
  const base = siteConfig.url.replace(/\/$/, '');
  const pathSuffix = pathSegments.slice(1);
  const canonicalPath = pathSegments.length > 0 ? pathSegments : [lang];
  const canonical = `${base}/${canonicalPath.join('/')}`;

  const languages: Record<string, string> = {};
  for (const l of supportedLngs) {
    const segments = [l, ...pathSuffix];
    languages[hreflangByLang[l]] = `${base}/${segments.join('/')}`;
  }
  const enPathSuffix = pathSuffix.length > 0 ? `/${pathSuffix.join('/')}` : '';
  languages['x-default'] = `${base}/en${enPathSuffix}`;

  return { canonical, languages };
}

/**
 * Returns locale-specific metadata (title, description, keywords, openGraph, twitter, optional alternates).
 * Used by generateMetadata in the catch-all page. Merge with layout metadata.
 * When pathSegments is provided, adds alternates.canonical and alternates.languages (hreflang).
 */
export function getLocaleMetadata(lang: SupportedLng, pathSegments?: string[]): Metadata {
  const meta = metadataByLocale[lang] ?? metadataByLocale.en;
  const ogLocale = ogLocaleByLang[lang] ?? ogLocaleByLang.en;

  const result: Metadata = {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords],
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: siteConfig.url,
      title: meta.title,
      description: meta.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [siteConfig.twitterImage],
    },
  };

  if (pathSegments !== undefined) {
    const { canonical, languages } = buildAlternates(pathSegments, lang);
    result.alternates = { canonical, languages };
  }

  return result;
}
