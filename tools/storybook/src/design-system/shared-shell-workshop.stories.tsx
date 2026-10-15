import { AppBar } from '@kartuli/ui/components/layout/app-bar/app-bar';
import { Dock } from '@kartuli/ui/components/layout/dock/dock';
import { DockItem, type DockItemLinkProps } from '@kartuli/ui/components/layout/dock/dock-item';
import { AppShell } from '@kartuli/ui/components/layout/shell/app-shell';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createContext, type SVGProps, useContext, useEffect, useState } from 'react';
import { expect, userEvent } from 'storybook/test';

interface SharedShellWorkshopProps {
  activeItem: NavigationItemId;
}

type NavigationItemId = (typeof navigationItems)[number]['id'];

const WorkshopNavigationContext = createContext<((activeItem: NavigationItemId) => void) | null>(
  null,
);

function StoryLink({ children, href, ...props }: Readonly<DockItemLinkProps>) {
  const setActiveItem = useContext(WorkshopNavigationContext);
  const navigationItem = navigationItems.find((item) => `#${item.id}` === href);

  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        if (navigationItem) {
          setActiveItem?.(navigationItem.id);
        }
      }}
    >
      {children}
    </a>
  );
}

function OverviewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <title>Overview</title>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

function OverviewActiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <title>Selected overview</title>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

function LibraryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <title>Library</title>
      <path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4V4Z" />
    </svg>
  );
}

function LibraryActiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <title>Selected library</title>
      <path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4V4Z" />
    </svg>
  );
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <title>Settings</title>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" />
    </svg>
  );
}

function SettingsActiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <title>Selected settings</title>
      <circle cx="12" cy="12" r="4" />
      <path d="M11 2h2l1 3 3 1 3-1 1 2-2 3 1 3 3 2-1 2-4-1-2 2-1 4h-2l-1-4-2-2-4 1-1-2 3-2 1-3-2-3 1-2 3 1 3-1 1-3Z" />
    </svg>
  );
}

const navigationItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: OverviewIcon,
    activeIcon: OverviewActiveIcon,
  },
  { id: 'library', label: 'Library', icon: LibraryIcon, activeIcon: LibraryActiveIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, activeIcon: SettingsActiveIcon },
] as const;

function ShellTitle() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start justify-center uppercase">
      <div className="w-full truncate text-xs font-bold text-s-color-shell-content-secondary">
        Design System
      </div>
      <h1 className="w-full truncate text-lg font-black text-s-color-shell-content-primary">
        Shared shell
      </h1>
    </div>
  );
}

function ShellAction({ label }: Readonly<{ label: string }>) {
  return (
    <button
      type="button"
      aria-label={label}
      className="size-12 rounded-p-radius-full border border-s-color-shell-action-secondary-border bg-s-color-shell-action-secondary-bg text-s-color-shell-action-secondary-content focus-visible:outline-none focus-visible:ring-(length:--s-width-focus-ring) focus-visible:ring-s-color-shell-action-secondary-ring hover:bg-s-color-shell-action-secondary-hover-bg"
    >
      {label.slice(0, 1)}
    </button>
  );
}

function SharedShellWorkshop({ activeItem }: Readonly<SharedShellWorkshopProps>) {
  const [selectedItem, setSelectedItem] = useState(activeItem);
  const activeLabel = navigationItems.find((item) => item.id === selectedItem)?.label ?? 'Overview';

  useEffect(() => {
    setSelectedItem(activeItem);
  }, [activeItem]);

  return (
    <WorkshopNavigationContext.Provider value={setSelectedItem}>
      <div className="flex h-dvh">
        <AppShell
          appBar={
            <AppBar
              leading={<ShellAction label="Menu" />}
              title={<ShellTitle />}
              trailingSecondary={<ShellAction label="Search" />}
              trailingPrimary={<ShellAction label="Profile" />}
            />
          }
          startRailContent={
            <Dock ariaLabel="Workshop navigation">
              {navigationItems.map((item) => (
                <DockItem
                  key={item.id}
                  href={`#${item.id}`}
                  label={item.label}
                  icon={item.icon}
                  activeIcon={item.activeIcon}
                  active={item.id === selectedItem}
                  linkComponent={StoryLink}
                />
              ))}
            </Dock>
          }
          endRailContent={
            <aside
              aria-label="Review context"
              className="flex h-full flex-col gap-p-spacing-2 p-p-spacing-4 text-s-color-shell-content-secondary"
            >
              <div className="font-bold uppercase text-s-color-shell-content-primary">
                Review context
              </div>
              <p>Optional rail content remains product-owned.</p>
            </aside>
          }
        >
          <section
            aria-labelledby="workshop-content-heading"
            className="flex max-w-2xl flex-col gap-p-spacing-4 rounded-p-radius-2 border border-s-color-panel-border bg-s-color-panel-bg p-p-spacing-4 text-s-color-panel-content-primary"
          >
            <div className="flex flex-col gap-p-spacing-1">
              <div className="text-sm font-bold uppercase text-s-color-panel-content-secondary">
                Selected destination
              </div>
              <h2 id="workshop-content-heading" className="text-2xl font-black">
                {activeLabel}
              </h2>
            </div>
            <p className="text-s-color-panel-content-secondary">
              This neutral fixture exposes the shared app bar, navigation, rails, content container,
              and semantic states without representing an application product.
            </p>
          </section>
        </AppShell>
      </div>
    </WorkshopNavigationContext.Provider>
  );
}

const meta: Meta<typeof SharedShellWorkshop> = {
  title: 'Design System/Workshop/Shared Shell',
  component: SharedShellWorkshop,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete product-neutral composition of the shared shell contract for cross-theme and responsive review.',
      },
    },
  },
  argTypes: {
    activeItem: {
      control: 'inline-radio',
      options: navigationItems.map((item) => item.id),
    },
  },
  args: { activeItem: 'overview' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Review: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('link', { name: 'Library' }));
    await expect(
      await canvas.findByRole('link', { name: 'Library', current: 'page' }),
    ).toBeVisible();
    await expect(await canvas.findByRole('heading', { name: 'Library' })).toBeVisible();

    await userEvent.click(canvas.getByRole('link', { name: 'Settings' }));
    await expect(
      await canvas.findByRole('link', { name: 'Settings', current: 'page' }),
    ).toBeVisible();
    await expect(await canvas.findByRole('heading', { name: 'Settings' })).toBeVisible();

    await userEvent.click(canvas.getByRole('link', { name: 'Overview' }));
    await expect(
      await canvas.findByRole('link', { name: 'Overview', current: 'page' }),
    ).toBeVisible();
    await expect(await canvas.findByRole('heading', { name: 'Overview' })).toBeVisible();
  },
};
