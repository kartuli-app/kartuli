import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
  getLocalizedRouteParams,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n';
import { SettingsPageServer } from '@game-client/ui/screens/settings/settings-page-server';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: RouteParamsWithLocalePromise }) {
  const { locale } = await getLocalizedRouteParams(params);
  return generateMetadataForSupportedLocale(locale, [locale, 'settings']);
}

export default async function SettingsPage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise;
}>) {
  const { locale } = await getLocalizedRouteParams(params);

  return <SettingsPageServer locale={locale} />;
}
