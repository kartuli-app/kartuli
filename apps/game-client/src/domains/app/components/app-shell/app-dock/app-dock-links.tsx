'use client';

import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { routeUtils } from '@/domains/app/routes/route-utils';

const dockButtons = routeUtils
  .getDockPages()
  .filter(
    (route): route is typeof route & { dock: NonNullable<typeof route.dock> } =>
      route.dock !== undefined,
  )
  .map((route) => ({
    href: route.path,
    iconActive: route.dock.iconActive,
    iconInactive: route.dock.iconInactive,
    label: route.dock.label,
    isActive: route.dock.isActive,
  }));

export function AppDockLinks() {
  const pathname = usePathname();
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

  return dockButtons.map((button) => {
    const isActive = button.isActive ? button.isActive(pathname) : pathname === button.href;
    const Icon = isActive ? button.iconActive : button.iconInactive;
    return (
      <Link
        prefetch={false}
        key={button.href}
        href={button.href}
        onClick={() => handleLinkClick(button.href)}
        className={clsx(
          'flex flex-col',
          'justify-center items-center',
          'cursor-pointer',
          'h-14 w-14',
          'relative',
          'focus-ring',
          'text-xs',
          'uppercase',
          'transition-colors duration-300 hover:transition-none',
          {
            'text-slate-800': isActive,
            'text-slate-400 hover:text-slate-200': !isActive,
            'blur-xs': touchedLink === button.href,
          },
        )}
      >
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Icon className="size-6" />
          <span className="font-bold pt-1">{button.label}</span>
        </div>
        {/* active indicator */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              layoutId="active-indicator"
              className={clsx(
                //
                'absolute',
                'top-0',
                'left-0',
                'right-0',
                'bottom-0',
                'rounded-lg',
                'bg-slate-300',
                'z-0',
              )}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 40,
              }}
            />
          )}
        </AnimatePresence>
      </Link>
    );
  });
}
