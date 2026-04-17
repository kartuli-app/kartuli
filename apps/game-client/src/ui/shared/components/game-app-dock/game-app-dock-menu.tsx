'use client';
import { Drawer } from '@base-ui/react/drawer';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import { useNavigation } from '@game-client/navigation/navigation-context';
import { cn } from '@kartuli/ui/utils/cn';
import type { TFunction } from 'i18next';
import { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiDotsThreeOutline, PiDotsThreeOutlineFill } from 'react-icons/pi';
import { DockButtonContent, getDockButtonClassName } from './game-app-dock-button';

const menuLinks = [
  { href: '/debug', labelKey: 'debug' },
  { href: '/privacy', labelKey: 'privacy' },
  { href: '/terms-and-conditions', labelKey: 'terms_and_conditions' },
];

function getDockMenuLinkLabel(labelKey: string, t: TFunction<'common', undefined>): string {
  const map = t('dock.menu.links', { returnObjects: true });
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return labelKey;
  }
  const translatedLabel = (map as Record<string, unknown>)[labelKey];
  return typeof translatedLabel === 'string' ? translatedLabel : labelKey;
}

const dockMenuLinkRowClassName = cn(
  'flex',
  'cursor-pointer',
  'select-none',
  'items-center',
  'px-3',
  'py-3',
  'text-sm',
  'font-semibold',
  'text-brand-text-800',
  'transition-colors',
  'hover:bg-brand-text-600',
  'hover:text-brand-text-50',
);

function DockMenuContent({
  locale,
  menuType,
  onClick,
}: Readonly<{
  locale: string | undefined;
  menuType: 'nav-menu' | 'drawer';
  onClick?: () => void;
}>) {
  const { NavigationLink } = useNavigation();
  const { t } = useTranslation('common');
  return (
    <div className={cn(menuType === 'nav-menu' ? 'min-w-60' : 'min-w-0', 'flex flex-col')}>
      {menuLinks.map((menuLink) => {
        const href = `/${locale}${menuLink.href}`;
        const label = getDockMenuLinkLabel(menuLink.labelKey, t);
        if (menuType === 'nav-menu') {
          return (
            <NavigationMenu.Link
              key={menuLink.href}
              closeOnClick
              href={href}
              render={
                <NavigationLink href={href} prefetch className={dockMenuLinkRowClassName}>
                  {label}
                </NavigationLink>
              }
            />
          );
        }
        return (
          <NavigationLink
            key={menuLink.href}
            href={href}
            prefetch
            className={dockMenuLinkRowClassName}
            onClick={onClick}
          >
            {label}
          </NavigationLink>
        );
      })}
    </div>
  );
}

function DockMenuDesktop() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.resolvedLanguage;
  const [activeMenuValue, setActiveMenuValue] = useState<string | null>(null);
  const isMenuOpen = activeMenuValue === 'dock-menu';

  return (
    <NavigationMenu.Root
      delay={0}
      closeDelay={0}
      orientation="vertical"
      value={activeMenuValue}
      onValueChange={(value) => setActiveMenuValue(value)}
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="dock-menu">
          <NavigationMenu.Trigger className={getDockButtonClassName({ isActive: isMenuOpen })}>
            <DockButtonContent
              label={t('dock.buttons.more')}
              isActive={isMenuOpen}
              IconActive={PiDotsThreeOutlineFill}
              IconInactive={PiDotsThreeOutline}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="contents">
            <DockMenuContent locale={locale} menuType="nav-menu" />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          side="right"
          align="start"
          sideOffset={8}
          positionMethod="fixed"
          collisionAvoidance={{ side: 'flip', align: 'shift' }}
          collisionPadding={12}
          className="z-80"
        >
          <NavigationMenu.Popup
            className={cn(
              'mt-0',
              'w-60',
              'overflow-hidden',
              'rounded-lg',
              'border',
              'border-brand-text-300',
              'bg-brand-text-50',
              'text-brand-text-800',
              'shadow-lg',
            )}
          >
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

function DockMenuMobile() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.resolvedLanguage;
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} modal swipeDirection="down">
      <Drawer.Trigger type="button" className={getDockButtonClassName({ isActive: open })}>
        <DockButtonContent
          label={t('dock.buttons.more')}
          isActive={open}
          IconActive={PiDotsThreeOutlineFill}
          IconInactive={PiDotsThreeOutline}
        />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-80 bg-black/60" />
        <Drawer.Viewport className="fixed inset-x-0 bottom-36 z-80 flex max-h-[min(70vh,100dvh)] justify-center p-0">
          <Drawer.Popup
            className={cn(
              'w-full max-w-sm rounded-xl border border-brand-text-300 bg-brand-text-50 text-brand-text-800 shadow-lg',
            )}
          >
            <Drawer.Content
              aria-labelledby={titleId}
              className="flex max-h-[min(70vh,100dvh)] flex-col overflow-y-auto p-0 outline-none"
            >
              <Drawer.Title id={titleId} className="sr-only">
                {t('dock.buttons.more')}
              </Drawer.Title>
              <div className="border-b border-brand-text-200">
                <Drawer.Close
                  type="button"
                  className={cn(
                    'w-full h-full',
                    'cursor-pointer',
                    'px-4 py-3',
                    'text-left',
                    'text-sm',
                    'font-semibold',
                    'text-brand-text-600',
                    'underline-offset-2',
                    'hover:underline',
                  )}
                >
                  {t('dock.menu.close')}
                </Drawer.Close>
              </div>
              <div className="px-2 py-2">
                <DockMenuContent locale={locale} menuType="drawer" onClick={() => setOpen(false)} />
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function DockMenuPlaceholder() {
  const { t } = useTranslation('common');
  return (
    <button
      type="button"
      disabled
      aria-busy
      aria-label={t('dock.buttons.more')}
      className={cn(getDockButtonClassName({ isActive: false }), 'cursor-wait')}
    >
      <DockButtonContent
        label={t('dock.buttons.more')}
        isActive={false}
        IconActive={PiDotsThreeOutlineFill}
        IconInactive={PiDotsThreeOutline}
      />
    </button>
  );
}

function DockMenuBranch({
  mounted,
  isDesktop,
}: Readonly<{ mounted: boolean; isDesktop: boolean }>) {
  if (!mounted) {
    return <DockMenuPlaceholder />;
  }
  if (isDesktop) {
    return <DockMenuDesktop />;
  }
  return <DockMenuMobile />;
}

export function GameAppDockMenu() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    setMounted(true);
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return (
    <div className="shrink-0">
      <DockMenuBranch mounted={mounted} isDesktop={isDesktop} />
    </div>
  );
}
