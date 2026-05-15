import { cn } from '@kartuli/ui/utils/cn';
import { ContentCardSection } from './content-card-section';

export function ContentCardHeader({
  context,
  title,
  variant,
}: Readonly<{ context: string; title: string; variant: 'primary' | 'secondary' }>) {
  return (
    <div
      className={cn(
        //
        'border-b-2',
        //
        variant === 'primary' && 'bg-kartuli-color-primitive-neutral-500',
        variant === 'primary' && 'border-kartuli-color-primitive-neutral-500',
        variant === 'primary' && 'group-hover:bg-kartuli-color-primitive-neutral-900',
        variant === 'primary' && 'group-active:bg-kartuli-color-primitive-neutral-950',
        //
        variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        variant === 'secondary' && 'border-kartuli-color-primitive-neutral-200',
        variant === 'secondary' && 'group-hover:border-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'group-active:border-kartuli-color-primitive-neutral-500',
        'uppercase',
      )}
    >
      <ContentCardSection>
        <div className="flex flex-col">
          <div
            className={cn(
              //
              'text-sm',
              'font-bold',
              variant === 'primary' && 'text-kartuli-color-primitive-neutral-200',
              variant === 'secondary' && 'text-kartuli-color-primitive-neutral-500',
            )}
          >
            {context}
          </div>
          <div
            className={cn(
              'text-xl',
              'font-black',
              variant === 'primary' && 'text-kartuli-color-primitive-neutral-50',
              variant === 'secondary' && 'text-kartuli-color-primitive-neutral-900',
            )}
          >
            {title}
          </div>
        </div>
      </ContentCardSection>
    </div>
  );
}
