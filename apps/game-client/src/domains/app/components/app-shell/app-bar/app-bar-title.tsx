'use client';

import { clsx } from 'clsx';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { routeUtils } from '@/domains/app/routes/route-utils';

export function AppBarTitle() {
  const pathname = usePathname();
  const page = routeUtils.getPageByPath(pathname);
  const title = page?.title;

  return (
    <motion.h1 key={pathname} className={clsx('')} layout>
      <span className="font-bold text-ds-primary-900 text-xl uppercase">kartuli</span>
      <span className="text-lg uppercase">.app</span>
      {title && (
        <>
          <span className="text-lg">{' - '}</span>
          <span className="text-lg font-bold text-ds-primary-900 uppercase">{title}</span>
        </>
      )}
    </motion.h1>
  );
}
