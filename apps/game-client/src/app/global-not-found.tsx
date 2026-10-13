import '@game-client/root-layout/globals.css';
import { getCurrentSupportedLocale, getMessagesForLocale } from '@game-client/i18n';
import { ROUTE_LOCALE_HEADER, ROUTE_PATHNAME_HEADER } from '@game-client/navigation/route-headers';
import { RootDocument } from '@game-client/root-layout/root-layout';
import { NotFoundPage } from '@game-client/ui/experiences/not-found/pages/not-found-page';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const locale = getCurrentSupportedLocale((await headers()).get(ROUTE_LOCALE_HEADER) ?? undefined);

  return {
    title: getMessagesForLocale(locale, 'notFound').heading,
    robots: { index: false, follow: false },
  };
}

export default async function GlobalNotFound() {
  const requestHeaders = await headers();
  const locale = getCurrentSupportedLocale(requestHeaders.get(ROUTE_LOCALE_HEADER) ?? undefined);
  const pathname = requestHeaders.get(ROUTE_PATHNAME_HEADER) ?? `/${locale}`;

  return (
    <RootDocument locale={locale}>
      <NotFoundPage locale={locale} pathname={pathname} />
    </RootDocument>
  );
}
