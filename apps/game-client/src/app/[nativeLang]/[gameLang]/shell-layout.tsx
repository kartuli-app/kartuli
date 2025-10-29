'use client';

import { clsx } from 'clsx';
import { LayoutGroup } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { ImVolumeMedium, ImVolumeMute2 } from 'react-icons/im';
import { ContentDock } from './content-dock';
import { Logo } from './logo';
import { getShellSettingsPerPage } from './shell-setttings-per-page';
import { Sidebar } from './sidebar';
import { SurfaceButton } from './surface-button';

/**                                  Hub page
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 **/

export function ShellLayout({
  className,
  children,
}: { className?: string; children: React.ReactNode } & React.PropsWithChildren) {
  const pathname = usePathname();

  const shellSettingsPerPage = getShellSettingsPerPage(pathname);

  const [_isSoundEnabled, _setIsSoundEnabledd] = useState(true);

  const cn = clsx(
    'flex',
    'relative',
    'overflow-auto',
    'h-full',
    'justify-center',
    'app-layout',
    //
    className,
  );

  return (
    <LayoutGroup id="mascot-group">
      <div className={cn}>
        <Sidebar />

        {/* content*/}
        <div
          className={clsx(
            'flex',
            'flex-col',
            'w-full',
            'md:max-w-[var(--content-max-width)]',
            'items-start',
            'justify-start',
            'relative',
            // 'bg-red-500',
          )}
        >
          {/* main content fixed navbar */}
          <div
            className={clsx(
              'fixed top-0 left-[-var(--width-sidebar-with-padding)]',
              'md:max-w-[var(--content-max-width)]',
              'w-full',
              'h-[var(--height-navbar)]',
              'bg-slate-100',
              'z-10',
              'items-center',
              'justify-between',
              'flex',
              'px-2',
            )}
          >
            {/* left side of the navbar */}
            <div className={clsx('flex', 'items-center', 'gap-0', 'w-[15%]')}>
              {shellSettingsPerPage.showBackButton ? (
                <SurfaceButton type="button">
                  <AiOutlineArrowLeft className="size-5" />
                </SurfaceButton>
              ) : (
                <Logo className={clsx('md:hidden w-10 h-10 mx-auto', 'fill-slate-500')} />
              )}
            </div>

            {/* Page title */}
            <h1
              className={clsx(
                'text-xl text-ds-violet-12',
                'flex items-center gap-0 w-[70%] justify-center',
              )}
            >
              {shellSettingsPerPage.title || 'page-title'}
            </h1>

            <div className={clsx('flex', 'items-center', 'gap-0', 'w-[15%] justify-end')}>
              <SurfaceButton type="button" onClick={() => _setIsSoundEnabledd(!_isSoundEnabled)}>
                {_isSoundEnabled ? (
                  <ImVolumeMedium className="size-5" />
                ) : (
                  <ImVolumeMute2 className="size-5" />
                )}
              </SurfaceButton>
            </div>
          </div>

          {/* main content fixed navbar space filler */}
          <div className={clsx(`mt-[var(--height-navbar)]`)}></div>

          {/* main content beggins */}
          <div className={clsx('w-full flex-1 h-full')}>
            {children}
            {/* horizontal dock filler */}
            <div className={clsx('h-[var(--content-dock-height)] w-full shirnk-0 lg:hidden')}></div>
          </div>
          {/* main content ends */}
        </div>

        {/* horizontal dock */}
        <ContentDock />
      </div>
    </LayoutGroup>
  );
}
