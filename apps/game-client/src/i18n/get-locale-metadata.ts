import { resources } from '@game-client/i18n/resources/resources';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import type { Metadata } from 'next';

const enMetadata = resources.en.metadata;
const ruMetadata = resources.ru.metadata;

// Social Media URLs and External Links
const socialLinks = {
  twitter: '@kartuli', // Update with actual Twitter handle
  instagram: '@kartuli', // Update with actual Instagram handle
  facebook: 'https://facebook.com/kartuli', // Update with actual Facebook page
  linkedin: 'https://linkedin.com/company/kartuli', // Update with actual LinkedIn page
  github: 'https://github.com/kartuli-app', // Update with actual GitHub organization
  youtube: 'https://youtube.com/@kartuli', // Update with actual YouTube channel
  tiktok: '@kartuli', // Update with actual TikTok handle
};

// Analytics and Verification Tokens
const verificationTokens = {
  google: '', // Add Google Search Console verification token
  bing: '', // Add Bing Webmaster Tools verification token
  yandex: '', // Add Yandex Webmaster verification token
  facebook: '', // Add Facebook Domain Verification token
  pinterest: '', // Add Pinterest verification token
};

const siteConfig = {
  name: 'Kartuli',
  url: 'https://www.kartuli.app',
  ogImage: '/og-image.png', // Will need to be created
  twitterImage: '/twitter-image.png', // Will need to be created
  authors: [
    {
      name: 'Kartuli Team',
      url: 'https://www.kartuli.app',
    },
  ],
  creator: 'Kartuli',
  publisher: 'Kartuli',
  category: 'Education',
  classification: 'Educational Software',
};

const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  category: siteConfig.category,
  classification: siteConfig.classification,
  referrer: 'origin-when-cross-origin' as const,

  // Application Information
  applicationName: siteConfig.name,
  generator: 'Next.js',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph (locale, title, description, url set per-locale in getLocaleMetadata)
  openGraph: {
    type: 'website',
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

  // Twitter (title, description set per-locale in getLocaleMetadata)
  twitter: {
    card: 'summary_large_image',
    images: [siteConfig.twitterImage],
    creator: socialLinks.twitter,
    site: socialLinks.twitter,
  },

  // Verification
  verification: {
    google: verificationTokens.google,
    yandex: verificationTokens.yandex,
    other: {
      'msvalidate.01': verificationTokens.bing,
      'facebook-domain-verification': verificationTokens.facebook,
      'p:domain_verify': verificationTokens.pinterest,
    },
  },

  // Icons - Next.js will automatically handle icon.svg
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },

  // Additional meta tags
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': siteConfig.name,
    'application-name': siteConfig.name,
    'msapplication-tooltip': siteConfig.name,
    'msapplication-starturl': '/',
    'mobile-web-app-capable': 'yes',
  },

  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
};

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
 * Returns full metadata by extending baseMetadata with locale-specific title, description, keywords,
 * openGraph locale/title/description (and url + alternates when pathSegments is provided).
 * Used by root layout and by generateMetadata in the SPA catch-all route.
 */
export function getLocaleMetadata(lang: SupportedLng, pathSegments?: string[]): Metadata {
  const meta = metadataByLocale[lang] ?? metadataByLocale.en;
  const ogLocale = ogLocaleByLang[lang] ?? ogLocaleByLang.en;

  const alternates = pathSegments !== undefined ? buildAlternates(pathSegments, lang) : undefined;

  return {
    ...baseMetadata,
    title: {
      default: meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: meta.description,
    keywords: [...meta.keywords],
    openGraph: {
      ...baseMetadata.openGraph,
      locale: ogLocale,
      title: meta.title,
      description: meta.description,
      ...(alternates && { url: alternates.canonical }),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: meta.title,
      description: meta.description,
    },
    ...(alternates && {
      alternates: { canonical: alternates.canonical, languages: alternates.languages },
    }),
  };
}
