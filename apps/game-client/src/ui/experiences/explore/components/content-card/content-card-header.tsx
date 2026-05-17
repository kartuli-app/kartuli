import { cn } from '@kartuli/ui/utils/cn';
import { PiStudent } from 'react-icons/pi';
import { ContentCardSection } from './content-card-section';

export function ContentCardHeader({
  context,
  title,
  variant,
}: Readonly<{ context: string; title: string; variant: 'primary' | 'secondary' }>) {
  return (
    <div
      className={cn(
        'uppercase',
        'border-b-3',
        'border-b-p-color-accent-500',
        // 'group-hover:border-b-p-color-neutral-600',

        // 'bg-kartuli-color-primitive-neutral-500',
        variant === 'primary' && 'bg-p-color-accent-500',
        // variant === 'primary' && 'group-hover:bg-p-color-neutral-600',
        // variant === 'secondary' && 'bg-p-color-neutral-300',
        // variant === 'secondary' && 'group-hover:bg-p-color-neutral-400',
      )}
    >
      <ContentCardSection>
        <div className="flex justify-start gap-p-spacing-2 w-full">
          {variant === 'primary' && (
            <div className="flex items-center justify-center borderr h-full aspect-square">
              <PiStudent className="size-11 text-p-color-neutral-200" />
            </div>
          )}
          <div className="flex flex-col">
            <div
              className={cn(
                //
                'text-sm',
                'font-bold',
                variant === 'primary' && 'text-p-color-neutral-300',
                variant === 'secondary' && 'text-p-color-neutral-700',
                // 'text-p-color-neutral-700',
              )}
            >
              {context}
            </div>
            <div
              className={cn(
                //
                'text-xl',
                'font-black',
                variant === 'primary' && 'text-p-color-neutral-50',
                variant === 'secondary' && 'text-p-color-accent-500',
                // 'text-p-color-neutral-900',
              )}
            >
              {title}
            </div>
          </div>
        </div>
      </ContentCardSection>
    </div>
  );
}
