import { describe, expect, it } from 'vitest';
import { generateMetadataForSupportedLocale } from './generate-metadata-for-supported-locale';

describe('generateMetadataForSupportedLocale', () => {
  it('uses a localized page title when one is provided for a route', () => {
    const metadata = generateMetadataForSupportedLocale('en', {
      pathSegments: ['en', 'settings'],
      pageTitle: 'Settings',
    });

    expect(metadata.title).toEqual({ absolute: 'Settings | Kartuli' });
    expect(metadata.openGraph?.title).toBe('Settings | Kartuli');
    expect(metadata.twitter?.title).toBe('Settings | Kartuli');
  });

  it('keeps locale-specific SEO copy for non-English routes', () => {
    const metadata = generateMetadataForSupportedLocale('ru', {
      pathSegments: ['ru', 'translit'],
      pageTitle: 'Транслит',
    });

    expect(metadata.title).toEqual({ absolute: 'Транслит | Kartuli' });
    expect(metadata.description).toContain('грузинского языка');
  });
});
