'use client';

import { clsx } from 'clsx';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/domains/shared/components/container';

export function HubModeSwitch() {
  const pathname = usePathname();
  const isForYouActive = pathname === '/app';
  const prefersReducedMotion = useReducedMotion();

  const toggleTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: 'spring' as const,
        visualDuration: 0.2,
        bounce: 0.2,
      };

  return (
    <Container
      className={clsx(
        'p-1',
        'flex',
        'text-sm',
        'justify-center items-center gap-0 relative borderr border-slate-300',
        'font-bold',
        'uppercase',
        'bg-green-500',
      )}
    >
      <div
        className={clsx(
          `${isForYouActive ? 'justify-start' : 'justify-end'}`,
          'flex',
          'items-center',
          'cursor-pointer',
          'w-50',
          'absolute',
          'pointer-events-none',
          '',
        )}
      >
        <motion.div
          className={clsx(
            'toggle-handle',
            'rounded-full',
            'text-xl',
            'w-3',
            'h-3',
            'bg-violet-800',
          )}
          layout
          transition={toggleTransition}
        />
      </div>
      <Link
        href="/app"
        prefetch
        className={clsx(
          //
          'text-left',
          'w-22',
          'p-2',
          'borderr',
          'focus-ring',
          {
            'text-violet-800': isForYouActive,
            'text-slate-500 hover:underline cursor-pointer': !isForYouActive,
          },
        )}
      >
        For you
      </Link>
      <Link
        href="/app/freestyle"
        prefetch
        className={clsx(
          //
          'text-right',
          'w-22',
          'p-2',
          'borderr',
          'focus-ring',
          {
            'text-violet-800': !isForYouActive,
            'text-slate-500 hover:underline cursor-pointer': isForYouActive,
          },
        )}
      >
        Freestyle
      </Link>
    </Container>
  );
}
