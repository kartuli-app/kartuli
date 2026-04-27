'use client';
import { getCurrentSupportedLocale } from '@game-client/i18n';
import { useNavigation } from '@game-client/navigation/navigation-context';
import { cn } from '@kartuli/ui/utils/cn';
import type { TFunction } from 'i18next';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
import {
  PiArrowsClockwiseBold,
  PiArrowsClockwiseLight,
  PiBookOpenTextFill,
  PiBookOpenTextLight,
} from 'react-icons/pi';
import { DockButtonContent, getDockButtonClassName } from './game-app-dock-button';

const mainLinks = [
  {
    href: '/',
    labelKey: 'learn',
    iconActive: PiBookOpenTextFill,
    iconInactive: PiBookOpenTextLight,
  },
  {
    href: '/translit',
    labelKey: 'translit',
    iconActive: PiArrowsClockwiseBold,
    iconInactive: PiArrowsClockwiseLight,
  },
  {
    href: '/settings',
    labelKey: 'settings',
    iconActive: IoSettingsSharp,
    iconInactive: IoSettingsOutline,
  },
];

function getDockMainLinkLabel(labelKey: string, t: TFunction<'common', undefined>): string {
  const map = t('dock.main_links', { returnObjects: true });
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return labelKey;
  }
  const translatedLabel = (map as Record<string, unknown>)[labelKey];
  return typeof translatedLabel === 'string' ? translatedLabel : labelKey;
}

export function DockMainLinkActiveIndicator({ isActive }: Readonly<{ isActive: boolean }>) {
  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          layoutId="dock-item-active-indicator"
          className={cn(
            'absolute',
            'top-0',
            'left-0',
            'right-0',
            'bottom-0',
            'rounded-lg',
            'bg-ds1-color-primary-900',
            'z-0',
          )}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
          }}
        />
      )}
    </AnimatePresence>
  );
}

export function GameAppDockMainLinks() {
  const { pathname, NavigationLink } = useNavigation();
  const { i18n, t } = useTranslation('common');
  const locale = getCurrentSupportedLocale(i18n.resolvedLanguage);
  const [touchedLink, setTouchedLink] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setTouchedLink(href);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTouchedLink(null);
    }, 300);
  };

  return (
    <ul className="contents">
      {mainLinks.map((link) => {
        const isActive = pathname === link.href;
        const isTouched = touchedLink === link.href;
        const label = getDockMainLinkLabel(link.labelKey, t);
        return (
          <li key={link.href} className="contents">
            <NavigationLink
              onClick={() => handleLinkClick(link.href)}
              href={`/${locale}${link.href}`}
              prefetch={true}
              aria-current={isActive ? 'page' : undefined}
              className={getDockButtonClassName({ isActive, isTouched })}
            >
              <DockButtonContent
                label={label}
                isActive={isActive}
                IconActive={link.iconActive}
                IconInactive={link.iconInactive}
              />
              <DockMainLinkActiveIndicator isActive={isActive} />
            </NavigationLink>
          </li>
        );
      })}
    </ul>
  );
}
