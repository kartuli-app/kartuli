'use client';

import { ShellActionButton } from '@game-client/ui/components/actions/shell-action';
import { cn } from '@kartuli/ui/utils/cn';
import type { ComponentType, SVGProps } from 'react';

export type StudyNavigationButtonSize = 'pill' | 'icon';

export interface StudyNavigationButtonProps {
  className?: string;
  disabled?: boolean;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconPosition?: 'left' | 'right';
  label: string;
  onClick?: () => void;
  size?: StudyNavigationButtonSize;
  visualLabel?: string;
}

function getStudyNavigationButtonIconClassName({
  iconPosition,
  size,
}: Pick<StudyNavigationButtonProps, 'iconPosition' | 'size'>) {
  return cn(
    iconPosition === 'right' && 'order-1',
    'shrink-0',
    size === 'icon' ? 'size-5' : 'size-4',
    'text-inherit',
  );
}

export function StudyNavigationButton({
  className,
  disabled = false,
  icon,
  iconPosition = 'left',
  label,
  onClick,
  size = 'pill',
  visualLabel,
}: Readonly<StudyNavigationButtonProps>) {
  const Icon = icon;
  const rendersLabel = size === 'pill';

  return (
    <ShellActionButton
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex',
        'min-w-0',
        'items-center',
        'justify-center',
        rendersLabel && 'gap-1',
        className,
      )}
      size={size}
      variant="secondary"
    >
      <Icon className={getStudyNavigationButtonIconClassName({ iconPosition, size })} />
      {rendersLabel ? (
        <div className="text-sm text-inherit uppercase">{visualLabel ?? label}</div>
      ) : null}
    </ShellActionButton>
  );
}
