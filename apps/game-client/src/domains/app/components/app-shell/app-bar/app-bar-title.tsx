'use client';

import { clsx } from 'clsx';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { getPageByPath } from '@/app/app/navigation/utils';

export function AppBarTitle() {
  const pathname = usePathname();
  const page = getPageByPath(pathname);
  const title = page?.title;

  return (
    <motion.h1 key={pathname} className={clsx('')} layout>
      <span className="font-bold text-violet-900 text-xl">kartuli</span>
      <span className="text-lg">.app</span>
      {title && (
        <>
          <span className="text-lg">{' - '}</span>
          <span className="text-lg font-bold text-violet-900">{title}</span>
        </>
      )}
    </motion.h1>
  );
}
