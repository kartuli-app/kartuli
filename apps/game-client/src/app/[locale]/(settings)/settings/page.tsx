import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
  getLocalizedRouteParams,
  getMessagesForLocale,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: RouteParamsWithLocalePromise }) {
  const { locale } = await getLocalizedRouteParams(params);
  const commonMessages = getMessagesForLocale(locale, 'common');
  return generateMetadataForSupportedLocale(locale, {
    pathSegments: [locale, 'settings'],
    pageTitle: commonMessages.dock.settings,
  });
}

export { SettingsPage as default } from '@game-client/ui/experiences/settings/pages/settings-page';
