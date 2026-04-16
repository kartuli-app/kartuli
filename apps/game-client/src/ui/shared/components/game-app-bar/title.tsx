'use client';

import { useNavigation } from '@game-client/navigation/navigation-context';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

function getPageTitleByPathname(
  pathname: string,
  t: TFunction<'common', undefined>,
): string | undefined {
  if (pathname === '/') {
    return undefined;
  }
  const map = t('app_bar.page_titles_by_pathname', { returnObjects: true });
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return undefined;
  }
  const entries = Object.entries(map as Record<string, unknown>)
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    .sort((a, b) => b[0].length - a[0].length);
  for (const [key, title] of entries) {
    const matches =
      key === '/' ? pathname === '/' : pathname === key || pathname.startsWith(`${key}/`);
    if (matches) {
      return title;
    }
  }
  return undefined;
}

export function Title() {
  const { pathname } = useNavigation();
  const { t } = useTranslation('common');
  const pageTitle = getPageTitleByPathname(pathname, t);
  return (
    <h1 className="flex flex-col flex-wrap text-2xl sm:text-3xl uppercase font-extrabold text-brand-primary-900">
      {pageTitle ? (
        <div className="flex">
          <div className="">{pageTitle}</div>
        </div>
      ) : (
        <div className="flex">
          <div className="">kartuli</div>
          <div className="text-brand-text-600">.app</div>
        </div>
      )}
    </h1>
  );
}
