'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { ResponsiveContainer } from '../containers/responsive-container';

export type BannerAction = {
  label: string;
  onClick: () => void;
  children?: ReactNode;
};

export function BannerMessage({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <p
      className={clsx(
        //
        'text-md',
        'font-bold',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function BannerButton({
  label,
  onClick,
  children,
  className,
}: Readonly<BannerAction & { className?: string }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        //
        'p-brand-regular',
        'rounded-lg',
        'text-sm',
        'cursor-pointer',
        'border-brand-neutral-100',
        'text-brand-neutral-900',
        'bg-brand-neutral-200',
        'hover:bg-brand-neutral-300',
        className,
      )}
      aria-label={label}
    >
      {children ?? label}
    </button>
  );
}

export function BannerCloseButton({
  onDismiss,
  dismissLabel,
  className,
}: Readonly<{
  onDismiss: () => void;
  dismissLabel: string;
  className?: string;
}>) {
  return (
    <button
      type="button"
      onClick={onDismiss}
      className={clsx(
        //
        'p-brand-regular',
        'rounded-lg',
        'text-sm',
        'cursor-pointer',
        'border-brand-neutral-100',
        'text-brand-neutral-900',
        'bg-brand-neutral-200',
        'hover:bg-brand-neutral-300',
        className,
      )}
      aria-label={dismissLabel}
    >
      {dismissLabel}
    </button>
  );
}

type BannerProps = {
  children: ReactNode;
  actions?: BannerAction[];
  onDismiss: () => void;
  dismissLabel: string;
  showDismissButton?: boolean;
  testId?: string;
  ariaLive?: 'polite' | 'assertive';
  className?: string;
};

export function Banner({
  children,
  actions,
  onDismiss,
  dismissLabel,
  showDismissButton = true,
  testId,
  ariaLive = 'polite',
  className,
}: Readonly<BannerProps>) {
  return (
    <output
      data-testid={testId}
      className={clsx(
        //
        'flex flex-wrap',
        'w-full',
        //
        'bg-brand-primary-600',
        'text-brand-neutral-100',
        //
        'border-b-2',
        'border-brand-primary-600',
        className,
      )}
      aria-live={ariaLive}
    >
      <ResponsiveContainer
        className={clsx(
          //
          'justify-between',
          'items-center',
        )}
      >
        <div
          className={clsx(
            //
            'flex flex-1',
          )}
        >
          {children}
        </div>
        <div
          className={clsx(
            //
            'flex',
            //
            'items-center',
            //
            'gap-brand-regular',
          )}
        >
          {actions?.map((action) => (
            <BannerButton key={action.label} label={action.label} onClick={action.onClick}>
              {action.children}
            </BannerButton>
          ))}
          {showDismissButton && (
            <BannerCloseButton onDismiss={onDismiss} dismissLabel={dismissLabel} />
          )}
        </div>
      </ResponsiveContainer>
    </output>
  );
}
