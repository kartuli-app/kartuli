import type { SupportedLocale } from './i18n-constants';

/**
 * Route params after the `/[locale]` segment has been accepted by the app.
 *
 * The edge proxy normalizes incoming requests to supported locale URLs before
 * the App Router matches this segment, so route files should treat `locale` as
 * a trusted `SupportedLocale` instead of re-resolving it in every page.
 */
export type LocalizedRouteParams<T extends object = object> = T & {
  locale: SupportedLocale;
};

export type RouteParamsWithLocale<T extends object = object> = T & {
  locale: string;
};

export type RouteParamsWithLocalePromise<T extends object = object> = Promise<
  RouteParamsWithLocale<T>
>;

export async function getLocalizedRouteParams<T extends object>(
  params: RouteParamsWithLocalePromise<T>,
): Promise<LocalizedRouteParams<T>> {
  const resolvedParams = await params;

  return {
    ...resolvedParams,
    locale: resolvedParams.locale as SupportedLocale,
  };
}
