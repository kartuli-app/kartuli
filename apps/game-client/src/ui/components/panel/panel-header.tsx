import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';
import { PanelSection } from './panel-section';

type PanelHeaderVariant = 'default' | 'inverted';

type PanelHeaderProps = {
  className?: string;
  context: string;
  contextId?: string;
  leading?: ReactNode;
  title: string;
  titleId?: string;
  trailing?: ReactNode;
  variant: PanelHeaderVariant;
};

function getSecondaryContentClassName(variant: PanelHeaderVariant) {
  return cn(
    variant === 'default' && 'text-s-color-panel-header-content-secondary',
    variant === 'inverted' && 'text-s-color-panel-header-inverted-content-secondary',
  );
}

function getPrimaryContentClassName(variant: PanelHeaderVariant) {
  return cn(
    variant === 'default' && 'text-s-color-panel-header-content-primary',
    variant === 'inverted' && 'text-s-color-panel-header-inverted-content-primary',
  );
}

export function PanelHeader({
  className,
  context,
  contextId,
  leading,
  title,
  titleId,
  trailing,
  variant,
}: Readonly<PanelHeaderProps>) {
  const secondaryContentClassName = getSecondaryContentClassName(variant);
  const primaryContentClassName = getPrimaryContentClassName(variant);

  return (
    <div
      className={cn(
        'border-b-(length:--s-width-panel-border)',
        'border-b-s-color-panel-header-border',
        variant === 'default' && 'bg-s-color-panel-header-bg',
        variant === 'inverted' && 'bg-s-color-panel-header-inverted-bg',
        className,
      )}
    >
      <PanelSection>
        <div className={cn('flex', 'w-full', 'items-stretch', 'gap-p-spacing-2')}>
          {leading ? (
            <div
              className={cn(
                'flex',
                'shrink-0',
                'items-center',
                'justify-center',
                'self-stretch',
                secondaryContentClassName,
              )}
            >
              {leading}
            </div>
          ) : null}

          <div
            className={cn('flex', 'min-w-0', 'flex-1', 'flex-col', 'justify-center', 'uppercase')}
          >
            <div id={contextId} className={cn('text-sm', 'font-bold', secondaryContentClassName)}>
              {context}
            </div>
            <div id={titleId} className={cn('text-xl', 'font-black', primaryContentClassName)}>
              {title}
            </div>
          </div>

          {trailing ? (
            <div
              className={cn(
                'flex',
                'shrink-0',
                'flex-nowrap',
                'items-center',
                'gap-p-spacing-2',
                'self-stretch',
                secondaryContentClassName,
              )}
            >
              {trailing}
            </div>
          ) : null}
        </div>
      </PanelSection>
    </div>
  );
}
