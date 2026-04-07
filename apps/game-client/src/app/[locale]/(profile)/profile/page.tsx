import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { ProfilePageServer as default } from '@game-client/ui/screens/profile/profile-page-server';
