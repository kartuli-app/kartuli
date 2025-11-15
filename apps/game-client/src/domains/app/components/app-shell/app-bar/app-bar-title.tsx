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
    <motion.h1 key={pathname} className={clsx('text-xl')} layout>
      <span className="font-bold text-violet-900">kartuli</span>
      <span className="">.app</span>
      {title && (
        <>
          <span className="">{' - '}</span>
          <span className="font-bold text-violet-900">{title}</span>
        </>
      )}
    </motion.h1>
  );
}
