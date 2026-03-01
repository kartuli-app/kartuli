import type { Metadata } from 'next';
import enMetadata from '../locales/en/metadata';

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

export const siteConfig = {
  name: 'Kartuli',
  /** Title and description live in locales/{lang}/metadata.ts; default (en) used by layout. */
  url: 'https://www.kartuli.app',
  ogImage: '/og-image.png', // Will need to be created
  twitterImage: '/twitter-image.png', // Will need to be created
  /** Keywords live in locales/{lang}/metadata.ts (translated per locale for SEO). */
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

export const metadataConfig: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: enMetadata.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: enMetadata.description,
  keywords: [...enMetadata.keywords],
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

  // Open Graph (default locale en; page-level generateMetadata overrides for /ru etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: enMetadata.title,
    description: enMetadata.description,
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

  // Twitter (default locale en; page-level generateMetadata overrides for /ru etc.)
  twitter: {
    card: 'summary_large_image',
    title: enMetadata.title,
    description: enMetadata.description,
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
    'msapplication-tooltip': enMetadata.description,
    'msapplication-starturl': '/',
    'mobile-web-app-capable': 'yes',
  },

  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },

  // alternates (canonical + hreflang) are set per-page in generateMetadata via getLocaleMetadata(lang, pathSegments)
};
