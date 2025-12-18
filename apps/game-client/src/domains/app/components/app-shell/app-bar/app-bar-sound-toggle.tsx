'use client';

import { Toggle } from '@base-ui-components/react/toggle';
import { Tooltip } from '@base-ui-components/react/tooltip';
import { clsx } from 'clsx';
import type { Ref, RefObject } from 'react';
import { ImVolumeMedium, ImVolumeMute2 } from 'react-icons/im';
import { useAppContext } from '@/domains/app/components/app-context';
import { IconButton } from '@/domains/shared/components/icon-button';

export function AppBarSoundToggle() {
  const { globalState, setGlobalState } = useAppContext();
  const isSoundEnabled = globalState.isSoundEnabled;
  const tooltipLabel = isSoundEnabled ? 'Disable sound' : 'Enable sound';

  return (
    <Tooltip.Provider>
      <Tooltip.Root delay={1}>
        <Tooltip.Trigger
          aria-label={tooltipLabel}
          render={(triggerProps) => {
            const {
              className: triggerClassName,
              ref: triggerRef,
              ...triggerRestProps
            } = triggerProps;
            return (
              <Toggle
                aria-label="Toggle sound"
                pressed={isSoundEnabled}
                onPressedChange={(pressed) => {
                  setGlobalState((prev) => ({
                    ...prev,
                    isSoundEnabled: pressed,
                  }));
                }}
                render={(toggleProps, state) => {
                  const {
                    className: toggleClassName,
                    ref: toggleRef,
                    ...toggleRestProps
                  } = toggleProps;
                  const combinedRef = composeRefs(triggerRef, toggleRef);
                  return (
                    <IconButton
                      ref={combinedRef}
                      {...triggerRestProps}
                      {...toggleRestProps}
                      className={clsx(
                        triggerClassName,
                        toggleClassName,
                        //
                      )}
                    >
                      {state.pressed ? (
                        <ImVolumeMedium
                          className={clsx(
                            //
                            'size-6',
                          )}
                        />
                      ) : (
                        <ImVolumeMute2
                          className={clsx(
                            //
                            'size-6',
                          )}
                        />
                      )}
                    </IconButton>
                  );
                }}
              />
            );
          }}
        />
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom" align="end" sideOffset={8}>
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
              {tooltipLabel}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

function composeRefs(...refs: Array<Ref<HTMLButtonElement | null> | undefined>) {
  return (node: HTMLButtonElement | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as RefObject<HTMLButtonElement | null>).current = node;
      }
    });
  };
}
