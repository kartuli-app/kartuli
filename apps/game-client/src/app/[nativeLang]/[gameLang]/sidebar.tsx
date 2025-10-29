import { clsx } from 'clsx';
import { Logo } from './logo';
import { SidebarDock } from './sidebar-dock';

function SidebarFixedContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        //
        'fixed',
        'top-0',
        'bottom-0',
        //
        'w-[var(--width-sidebar-with-padding)]',
        //
        'h-auto',
        'py-1',
        // 'bg-red-300',
        className,
      )}
    >
      {children}
    </div>
  );
}

function SidebarFixedNavbar({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const cn = clsx(
    'fixed top-0',
    'flex',
    'w-[var(--width-sidebar-with-padding)]',
    `h-[var(--height-navbar)]`,
    'items-center',
    'justify-center',
    // 'bg-blue-300',
    className,
  );
  return <div className={cn}>{children}</div>;
}

function SidebarFixedNavbarSpaceFiller({ className }: { className?: string }) {
  const cn = clsx('mt-[var(--height-navbar)]', className);
  return <div className={cn}></div>;
}

export function Sidebar({ className }: { className?: string }) {
  const cn = clsx(
    'hidden md:flex',
    'relative',
    'w-[var(--width-sidebar-with-padding)]',
    'h-full',
    className,
  );
  return (
    <div className={cn}>
      <SidebarFixedContainer>
        <SidebarFixedNavbar>
          <Logo className={clsx('w-10 h-10 mx-auto', 'fill-slate-500')} />
        </SidebarFixedNavbar>
        <SidebarFixedNavbarSpaceFiller />
        <SidebarDock />
      </SidebarFixedContainer>
    </div>
  );
}
