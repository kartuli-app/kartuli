import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Kartuli',
  title: 'Kartuli - Learn Georgian Language Through Games',
  description:
    'Interactive Georgian language learning platform. Master Georgian vocabulary, grammar, and pronunciation through engaging games and exercises.',
  url: 'https://www.kartuli.app',
  ogImage: '/og-image.png', // Will need to be created
  keywords: [
    'Georgian language',
    'language learning',
    'learn Georgian',
    'Georgian games',
    'Georgian vocabulary',
    'Georgian grammar',
    'kartuli',
    'educational games',
  ],
  authors: [
    {
      name: 'Kartuli Team',
      url: 'https://www.kartuli.app',
    },
  ],
  creator: 'Kartuli',
  publisher: 'Kartuli',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,

  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@kartuli', // Update with actual Twitter handle if available
  },

  // Verification (add tokens when available)
  verification: {
    google: '', // Add Google Search Console verification token
    // yandex: '',
    // other: '',
  },

  // Icons (Next.js auto-handles icon.svg)
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },

  // Manifest for PWA (future consideration)
  // manifest: '/manifest.json',
};
