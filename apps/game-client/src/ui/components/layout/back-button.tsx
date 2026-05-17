'use client';
import type { SupportedLocale } from '@game-client/i18n/i18n-constants';
import { getLocalizedPathnameForLocale } from '@game-client/i18n/locale-utils';
import { useTranslation } from 'react-i18next';
import { IoArrowBackOutline } from 'react-icons/io5';
import { GameAppBarIconLink } from './app-bar-icon-action';

export function BackButton({ href }: Readonly<{ href: string }>) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.resolvedLanguage as SupportedLocale;
  const localizedHref = getLocalizedPathnameForLocale(href, locale);
  return (
    <GameAppBarIconLink href={localizedHref} label={t('appBar.goBack')} icon={IoArrowBackOutline} />
  );
}
