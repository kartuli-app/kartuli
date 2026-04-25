import { cn } from '@kartuli/ui/utils/cn';
import type { IconType } from 'react-icons/lib';

export function getDockButtonClassName({
  isActive,
  isTouched = false,
}: {
  isActive: boolean;
  isTouched?: boolean;
}) {
  return cn(
    'flex flex-col',
    'justify-center items-center',
    'cursor-pointer',
    'h-17 w-17',
    'relative',
    'focus-ring',
    'uppercase',
    'transition-colors duration-300 hover:transition-none',
    'text-ds1-color-text-400',
    'hover:text-ds1-color-text-200',
    isActive && 'text-ds1-color-text-200',
    isTouched && 'blur-xs',
  );
}

export function DockButtonContent({
  label,
  isActive,
  IconActive,
  IconInactive,
}: Readonly<{
  label: string;
  isActive: boolean;
  IconActive: IconType;
  IconInactive: IconType;
}>) {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center">
      {isActive ? <IconActive className="size-6" /> : <IconInactive className="size-6" />}
      <span className="font-bold pt-1 text-[0.6rem]">{label}</span>
    </div>
  );
}
