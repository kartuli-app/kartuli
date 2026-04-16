'use client';

import { useNavigation } from '@game-client/navigation/navigation-context';
import {
  buttonIconClassNames,
  iconClassNames,
} from '@game-client/ui/shared/components/game-app-bar/game-app-bar-elements';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LuArrowLeft } from 'react-icons/lu';

function BackButton({ href, className }: Readonly<{ href: string; className?: string }>) {
  const { NavigationLink } = useNavigation();
  const { t } = useTranslation('common');
  return (
    <NavigationLink
      className={clsx(iconClassNames, buttonIconClassNames, className)}
      href={href}
      aria-label={t('app_bar.back')}
    >
      <LuArrowLeft className="size-5" />
    </NavigationLink>
  );
}

export function AnimatedBackButton() {
  const { pathname } = useNavigation();
  const { i18n } = useTranslation('common');
  const currentLocale = i18n.resolvedLanguage;
  const isRootPath = pathname === '/';
  const shouldShowBackButton = !isRootPath;
  return (
    <div className={clsx('overflow-hidden')}>
      <AnimatePresence initial={false}>
        {shouldShowBackButton ? (
          <motion.div
            key="back-button"
            initial={{ opacity: 0, x: -8, width: '0rem' }}
            animate={{ opacity: 1, x: 0, width: '52px' }}
            exit={{ opacity: 0, x: -8, width: '0rem' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <BackButton href={`/${currentLocale}`} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
