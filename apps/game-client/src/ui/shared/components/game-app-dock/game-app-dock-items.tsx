'use client';
import { useNavigation } from '@game-client/navigation/navigation-context';
import clsx from 'clsx';
import type { TFunction } from 'i18next';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiSearchAlt, BiSearchAlt2, BiSolidUserCircle, BiUserCircle } from 'react-icons/bi';
import {
  PiArrowsClockwiseBold,
  PiArrowsClockwiseLight,
  PiBookOpenTextFill,
  PiBookOpenTextLight,
  PiDotsThreeOutline,
  PiDotsThreeOutlineFill,
} from 'react-icons/pi';

const links = [
  {
    href: '/profile',
    labelKey: 'profile',
    iconActive: BiSolidUserCircle,
    iconInactive: BiUserCircle,
  },
  {
    href: '/saved',
    labelKey: 'saved',
    iconActive: AiFillHeart,
    iconInactive: AiOutlineHeart,
  },
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
    href: '/search',
    labelKey: 'search',
    iconActive: BiSearchAlt,
    iconInactive: BiSearchAlt2,
  },
  {
    href: '/more',
    labelKey: 'more',
    iconActive: PiDotsThreeOutlineFill,
    iconInactive: PiDotsThreeOutline,
  },
];

function getDockButtonLabel(labelKey: string, t: TFunction<'common', undefined>): string {
  const map = t('dock.buttons', { returnObjects: true });
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return labelKey;
  }
  const translatedLabel = (map as Record<string, unknown>)[labelKey];
  return typeof translatedLabel === 'string' ? translatedLabel : labelKey;
}

export function GameAppDockItems() {
  const { NavigationLink, pathname } = useNavigation();
  const { i18n, t } = useTranslation('common');
  const locale = i18n.resolvedLanguage;
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
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = isActive ? link.iconActive : link.iconInactive;
        return (
          <NavigationLink
            onClick={() => handleLinkClick(link.href)}
            href={`/${locale}${link.href}`}
            key={link.href}
            prefetch={true}
            className={clsx(
              'flex flex-col',
              'justify-center items-center',
              'cursor-pointer',
              'h-17 w-17',
              'relative',
              'focus-ring',
              'uppercase',
              'transition-colors duration-300 hover:transition-none',
              {
                // 'text-brand-text-800': isActive,
                'text-brand-text-400 hover:text-brand-text-200': !isActive,
                'blur-xs': touchedLink === link.href,
              },
            )}
          >
            <div className="relative z-20 flex flex-col items-center justify-center">
              <Icon className="size-6" />
              <span className="font-bold pt-1 text-[0.6rem]">
                {getDockButtonLabel(link.labelKey, t)}
              </span>
            </div>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  layoutId="dock-item-active-indicator"
                  className={clsx(
                    //
                    'absolute',
                    'top-0',
                    'left-0',
                    'right-0',
                    'bottom-0',
                    'rounded-lg',
                    'bg-brand-primary-900',
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
          </NavigationLink>
        );
      })}
    </>
  );
}
