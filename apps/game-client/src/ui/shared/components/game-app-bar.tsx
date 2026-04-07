'use client';

import { useNavigation } from '@game-client/navigation/navigation-context';
import { LanguageSelector } from '@game-client/ui/shared/components/language-selector';
import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import clsx from 'clsx';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { LuArrowLeft } from 'react-icons/lu';

function BackButton({ href }: Readonly<{ href: string }>) {
  const { NavigationLink } = useNavigation();
  const { t } = useTranslation('common');
  return (
    <NavigationLink
      className={clsx(
        'size-10',
        'shrink-0',
        'rounded-full',
        'flex',
        'justify-center',
        'items-center',
        //
        'cursor-pointer',
        'focus-ring',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'bg-slate-200',
        'hover:bg-slate-300',
      )}
      href={href}
      aria-label={t('app_bar.back')}
    >
      <LuArrowLeft className="size-5" />
    </NavigationLink>
  );
}

function getPageTitleByPathname(
  pathname: string,
  t: TFunction<'common', undefined>,
): string | undefined {
  if (pathname === '/') {
    return undefined;
  }
  const map = t('page_texts_by_pathname', { returnObjects: true });
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

export function GameAppBar() {
  const { pathname } = useNavigation();
  const { i18n, t } = useTranslation('common');
  const currentLocale = i18n.resolvedLanguage;
  const isRootPath = pathname === '/';
  const shouldShowBackButton = !isRootPath;
  const pageTitle = getPageTitleByPathname(pathname, t);
  return (
    <AppBar isSticky>
      {/* left area */}
      <div className={clsx('flex items-center gap-brand-regular')}>
        {/* back button */}
        {shouldShowBackButton ? <BackButton href={`/${currentLocale}`} /> : null}
        {/* mascot */}
        <div
          className={clsx(
            'size-10',
            'shrink-0',
            'rounded-full',
            'flex',
            'justify-center',
            'items-center',
          )}
        >
          <picture>
            <source srcSet="/images/mascot-64.webp" type="image/webp" />
            <img
              className={clsx(
                //
                'scale-120',
              )}
              src="/images/mascot-64.png"
              alt="mascot"
            />
          </picture>
        </div>
        <h1 className="flex flex-col flex-wrap">
          {pageTitle ? (
            <div className="flex">
              <div className="font-bold text-brand-primary-900 text-xl uppercase">{pageTitle}</div>
            </div>
          ) : (
            <div className="flex">
              <div className="font-bold text-brand-primary-900 text-xl uppercase">kartuli</div>
              <div className="font-bold text-lg uppercase">.app</div>
            </div>
          )}
        </h1>
      </div>
      {/* right area */}
      <div className="flex gap-brand-regular">
        <LanguageSelector />
      </div>
    </AppBar>
  );
}
