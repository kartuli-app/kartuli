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
        'rounded-3xl',
        'border-2',
        'border-kartuli-color-primitive-neutral-200',
        'group',
        variant === 'secondary' && 'hover:border-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'group-active:border-kartuli-color-primitive-neutral-500',
        variant === 'primary' && 'bg-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        'overflow-hidden',
      )}
    >
      <ContentCardHeader context={context} title={title} variant={variant} />
      <div className="bg-kartuli-color-primitive-neutral-50">
        <ContentCardSection>{children}</ContentCardSection>
      </div>
    </div>
  );
}
