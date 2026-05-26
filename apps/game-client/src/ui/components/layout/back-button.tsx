'use client';
import { getLocalizedPathnameForLocale } from '@game-client/i18n/locale-utils';
import { useCurrentRouteLocale } from '@game-client/navigation';
import { useTranslation } from 'react-i18next';
import { IoArrowBackOutline } from 'react-icons/io5';
import { GameAppBarIconLink } from './app-bar-icon-action';

export function BackButton({ href }: Readonly<{ href: string }>) {
  const { t } = useTranslation('common');
  const locale = useCurrentRouteLocale();
  const localizedHref = getLocalizedPathnameForLocale(href, locale);
  return (
    <GameAppBarIconLink href={localizedHref} label={t('appBar.goBack')} icon={IoArrowBackOutline} />
  );
}
