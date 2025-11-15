'use client';
import { Tooltip } from '@base-ui-components/react/tooltip';
import { clsx } from 'clsx';
import { IconButton } from '@/app/app/icon-button';

export function AppBarMascot() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delay={1}>
        <Tooltip.Trigger
          aria-label="Pipo"
          render={(triggerProps) => {
            const { className, ...props } = triggerProps;
            return (
              <IconButton
                {...props}
                className={clsx(
                  className,
                  //
                  'overflow-hidden',
                )}
              >
                <picture>
                  <source srcSet="/mascot-64.webp" type="image/webp" />
                  <img
                    className={clsx(
                      //
                      'scale-120',
                    )}
                    src="/mascot-64.png"
                    alt="mascot"
                  />
                </picture>
              </IconButton>
            );
          }}
        />
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom" align="start" sideOffset={8}>
            <Tooltip.Popup
              className={clsx(
                //
                'p-2',
                'rounded-lg',
                'shadow-lg',
                'text-sm',
                'bg-slate-500 text-white',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
              )}
            >
              Pipo
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
