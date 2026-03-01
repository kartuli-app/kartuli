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
 * pathSegments: full route segments e.g. [] (root), ['en'], or ['ru', 'learn', 'lesson-1'].
 * Root ([]) is treated as default locale: canonical and x-default point to /en.
 */
function buildAlternates(
  pathSegments: string[],
  _lang: SupportedLng,
): { canonical: string; languages: Record<string, string> } {
  const base = siteConfig.url.replace(/\/$/, '');
  const isRoot = pathSegments.length === 0;
  const pathSuffix = isRoot ? [] : pathSegments.slice(1);
  const canonical = isRoot ? `${base}/en` : `${base}/${pathSegments.join('/')}`;

  const languages: Record<string, string> = {};
  for (const l of supportedLngs) {
    const segments = [l, ...pathSuffix];
    languages[hreflangByLang[l]] = `${base}/${segments.join('/')}`;
  }
  languages['x-default'] = `${base}/en`;
  if (pathSuffix.length > 0) {
    languages['x-default'] = `${base}/en/${pathSuffix.join('/')}`;
  }

  return { canonical, languages };
}

/**
 * Returns locale-specific metadata (title, description, keywords, openGraph, twitter, optional alternates).
 * Used by generateMetadata in the catch-all page. Merged with layout metadata (layout provides
 * openGraph.type, url, siteName, images and twitter.card, images).
 * When pathSegments is provided, adds alternates and sets openGraph.url to the page canonical URL.
 */
export function getLocaleMetadata(lang: SupportedLng, pathSegments?: string[]): Metadata {
  const meta = metadataByLocale[lang] ?? metadataByLocale.en;
  const ogLocale = ogLocaleByLang[lang] ?? ogLocaleByLang.en;

  const result: Metadata = {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords],
    openGraph: {
      locale: ogLocale,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };

  if (pathSegments !== undefined) {
    const { canonical, languages } = buildAlternates(pathSegments, lang);
    result.alternates = { canonical, languages };
    result.openGraph = { ...result.openGraph, url: canonical };
  }

  return result;
}
