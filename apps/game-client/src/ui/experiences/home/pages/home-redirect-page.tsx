import { getLocalizedRouteParams, type RouteParamsWithLocalePromise } from '@game-client/i18n';
import { redirect } from 'next/navigation';

export default async function HomeRedirectPage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise;
}>) {
  const { locale } = await getLocalizedRouteParams(params);

  redirect(`/${locale}/explore/alphabet`);
}
