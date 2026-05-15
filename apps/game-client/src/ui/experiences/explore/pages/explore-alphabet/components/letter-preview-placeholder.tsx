import { cn } from '@kartuli/ui/utils/cn';

export function LetterPreviewPlaceholder({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'aspect-square',
        'justify-center',
        'flex',
        'flex-col',
        'gap-0',
        'pointer-events-none',
        className,
      )}
    >
      <div
        className={cn(
          //
          'font-georgian',
          'text-4xl',
          'text-kartuli-color-primitive-neutral-900',
          'flex',
          'items-center',
          'justify-center',
          'relative',
          '',
        )}
      >
        <span className="absolute top-3/10 left-0 bg-blue-100 w-full h-[2px]"></span>
        <span className="absolute top-6/10 left-0 bg-blue-100 w-full h-[2px]"></span>
        <span className="z-10 text-transparent">{'-'}</span>
      </div>
      <div
        className={cn(
          //
          'text-xl',
          'text-kartuli-color-primitive-neutral-500',
          'flex',
          'items-center',
          'justify-center',
        )}
      >
        <span className="text-transparent">[</span>
        <span className="text-transparent">{'-'}</span>
        <span className="text-transparent">]</span>
      </div>
    </div>
  );
}
