import { cn } from '@kartuli/ui/utils/cn';
import { ContentCardHeader } from './content-card-header';
import { ContentCardSection } from './content-card-section';

export function ContentCard({
  context,
  title,
  variant,
  children,
}: Readonly<{
  context: string;
  title: string;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        //
        'w-full min-w-0',
        'flex',
        'flex-col',
        'rounded-p-radius-1',
        'shadow-sm',
        'bg-p-color-neutral-100',
        'hover:bg-p-color-neutral-50',
        'border-p-color-neutral-400',
        'border-transparent',
        'hover:border-p-color-accent-500',
        'active:scale-95',
        'border-3',
        // 'border-kartuli-color-primitive-neutral-200',
        'group',
        // variant === 'secondary' && 'hover:border-kartuli-color-primitive-neutral-500',
        // variant === 'secondary' && 'group-active:border-kartuli-color-primitive-neutral-500',
        // variant === 'primary' && 'bg-kartuli-color-primitive-neutral-500',
        // variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        'overflow-hidden',
      )}
    >
      <ContentCardHeader context={context} title={title} variant={variant} />
      <div
        className={cn(
          // 'bg-kartuli-color-primitive-neutral-50',
          // variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        )}
      >
        <ContentCardSection>{children}</ContentCardSection>
      </div>
    </div>
  );
}
