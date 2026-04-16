'use client';
import { Toast } from '@base-ui/react/toast';
import { Tooltip } from '@base-ui/react/tooltip';
import type { Library } from '@game-client/learning-content/library/library';
import {
  getStringTransliterationFromLatin,
  getStringTransliterationFromTargetScript,
} from '@game-client/learning-content/utils/transliteration';
import {
  buttonIconClassNames,
  iconClassNames,
} from '@game-client/ui/shared/components/game-app-bar/game-app-bar-elements';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import { cn } from '@kartuli/ui/utils/cn';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaRegCopy } from 'react-icons/fa6';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { MdOutlineDelete } from 'react-icons/md';

const toastManager = Toast.createToastManager();

function AnchoredToasts() {
  const { toasts } = Toast.useToastManager();
  return (
    <Toast.Portal>
      <Toast.Viewport className={cn('fixed', 'inset-0', 'z-50', 'pointer-events-none')}>
        {toasts.map((toast) => (
          <Toast.Positioner key={toast.id} toast={toast} className={cn('pointer-events-none')}>
            <Toast.Root toast={toast}>
              <Toast.Content
                className={cn(
                  'rounded-md',
                  'border',
                  'border-brand-text-300',
                  'bg-white',
                  'text-black',
                  'shadow-lg',
                  'px-brand-regular',
                  'py-brand-xsmall',
                  'text-sm',
                  'pointer-events-auto',
                )}
              >
                <Toast.Description />
              </Toast.Content>
            </Toast.Root>
          </Toast.Positioner>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function TranslitClient({ library }: Readonly<{ library: Library }>) {
  const { t } = useTranslation('translit');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const [direction, setDirection] = useState<'georgian-to-latin' | 'latin-to-georgian'>(
    'georgian-to-latin',
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const copyFeedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSyncingScrollRef = useRef(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getOutput = (directionValue: 'georgian-to-latin' | 'latin-to-georgian', text: string) => {
    if (directionValue === 'georgian-to-latin') {
      return getStringTransliterationFromTargetScript(
        library.commonLetterItemsByTargetScript,
        text,
      );
    }
    return getStringTransliterationFromLatin(library.commonLetterItemsByTransliteration, text);
  };

  const toggleDirection = () => {
    const newDirection =
      direction === 'georgian-to-latin' ? 'latin-to-georgian' : 'georgian-to-latin';
    const newInput = output;
    const newOutput = getOutput(newDirection, newInput);
    setDirection(newDirection);
    setInput(newInput);
    setOutput(newOutput);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    setInput('');
    setOutput('');
  };

  const copyOutput = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const anchorElement = event.currentTarget;
    await navigator.clipboard.writeText(output);
    if (copyFeedbackTimeoutRef.current) {
      globalThis.clearTimeout(copyFeedbackTimeoutRef.current);
    }
    setIsCopySuccess(true);
    copyFeedbackTimeoutRef.current = globalThis.setTimeout(() => {
      setIsCopySuccess(false);
      copyFeedbackTimeoutRef.current = null;
    }, 1200);
    toastManager.add({
      description: t('toast_copied_transliteration'),
      timeout: 1200,
      positionerProps: {
        anchor: anchorElement,
        side: 'top',
        align: 'center',
        sideOffset: 8,
        positionMethod: 'fixed',
      },
    });
  };

  useEffect(() => {
    return () => {
      if (copyFeedbackTimeoutRef.current) {
        globalThis.clearTimeout(copyFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setOutput(getOutput(direction, e.target.value));
  };

  const syncScroll = (from: HTMLTextAreaElement, to: HTMLTextAreaElement) => {
    const fromMaxScrollTop = Math.max(1, from.scrollHeight - from.clientHeight);
    const toMaxScrollTop = Math.max(0, to.scrollHeight - to.clientHeight);
    const scrollProgress = from.scrollTop / fromMaxScrollTop;
    to.scrollTop = scrollProgress * toMaxScrollTop;
  };

  const handleInputScroll = () => {
    if (isSyncingScrollRef.current || !inputRef.current || !outputRef.current) {
      return;
    }
    isSyncingScrollRef.current = true;
    syncScroll(inputRef.current, outputRef.current);
    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  };

  const handleOutputScroll = () => {
    if (isSyncingScrollRef.current || !inputRef.current || !outputRef.current) {
      return;
    }
    isSyncingScrollRef.current = true;
    syncScroll(outputRef.current, inputRef.current);
    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  };

  useLayoutEffect(() => {
    if (!inputRef.current || !outputRef.current) {
      return;
    }
    syncScroll(inputRef.current, outputRef.current);
  }, [output]);

  const sourceLabel =
    direction === 'georgian-to-latin' ? t('source_text_georgian') : t('source_text_latin');
  const transliterationLabel =
    direction === 'georgian-to-latin' ? t('transliteration_latin') : t('transliteration_georgian');
  const switchDirectionLabel =
    direction === 'georgian-to-latin'
      ? t('switch_direction_to_latin_to_georgian')
      : t('switch_direction_to_georgian_to_latin');
  const clearTextLabel = t('clear_text');
  const copyTransliterationLabel = t('copy_transliteration');

  return (
    <Toast.Provider toastManager={toastManager}>
      <Tooltip.Provider delay={300}>
        <ResponsiveContainer
          className={cn(
            //
            'grow',
            'flex-col',
            'gap-brand-large',
            'pt-0',
          )}
        >
          {/* input area */}
          <div
            className={cn(
              //
              'bg-orange-200',
              'flex flex-col',
              'grow',
              //
              'caret-black',
              'focus:outline-none',
              //
              'bg-white',
              'w-full',
              'rounded-lg',
              'border',
              //
              'border-brand-text-300',
              //
              'shadow-sm',
              'overflow-hidden',
            )}
          >
            {/* bar */}
            <div
              className={cn(
                //
                'flex',
                'items-center',
                'justify-between',
                //
                'p-brand-regular',
                'border-b-2',
                'border-brand-primary-500',
              )}
            >
              {/* label */}
              <label htmlFor="translit-input" className={cn('text-2xl')}>
                {sourceLabel}
              </label>
              {/* buttons */}
              <div className={cn('flex', 'gap-brand-regular')}>
                <Tooltip.Root>
                  <Tooltip.Trigger
                    className={cn(iconClassNames, buttonIconClassNames)}
                    type="button"
                    onClick={clearInput}
                    aria-label={clearTextLabel}
                  >
                    <MdOutlineDelete className="size-5" />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="bottom" sideOffset={8}>
                      <Tooltip.Popup
                        className={cn(
                          'z-50',
                          'rounded-md',
                          'border',
                          'border-brand-text-300',
                          'bg-white',
                          'px-brand-regular',
                          'py-brand-xsmall',
                          'text-sm',
                          'shadow-lg',
                        )}
                      >
                        <Tooltip.Arrow
                          className={cn(
                            'data-[side=top]:bottom-[-7px]',
                            'data-[side=bottom]:top-[-7px]',
                            'data-[side=bottom]:rotate-180',
                          )}
                        >
                          <div
                            className={cn(
                              'size-3',
                              'rotate-45',
                              'bg-white',
                              'border-r',
                              'border-b',
                              'border-brand-text-300',
                            )}
                          />
                        </Tooltip.Arrow>
                        {clearTextLabel}
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
                <Tooltip.Root>
                  <Tooltip.Trigger
                    className={cn(iconClassNames, buttonIconClassNames)}
                    type="button"
                    onClick={toggleDirection}
                    aria-label={switchDirectionLabel}
                    aria-controls="translit-input translit-output"
                  >
                    <HiOutlineSwitchHorizontal className="size-5" />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="bottom" sideOffset={8}>
                      <Tooltip.Popup
                        className={cn(
                          'z-50',
                          'rounded-md',
                          'border',
                          'border-brand-text-300',
                          'bg-white',
                          'px-brand-regular',
                          'py-brand-xsmall',
                          'text-sm',
                          'shadow-lg',
                        )}
                      >
                        <Tooltip.Arrow
                          className={cn(
                            'data-[side=top]:bottom-[-7px]',
                            'data-[side=bottom]:top-[-7px]',
                            'data-[side=bottom]:rotate-180',
                          )}
                        >
                          <div
                            className={cn(
                              'size-3',
                              'rotate-45',
                              'bg-white',
                              'border-r',
                              'border-b',
                              'border-brand-text-300',
                            )}
                          />
                        </Tooltip.Arrow>
                        {switchDirectionLabel}
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </div>
            {/* text area */}
            <div className={cn('p-brand-regular', 'grow')}>
              <textarea
                className={cn(
                  //
                  'w-full',
                  'h-full',
                  'resize-none',
                  'text-2xl',
                  'p-brand-regular',
                  //
                  'caret-black',
                  //
                  'rounded-lg',
                  //
                  'focus:outline-none',
                  'focus:ring-1 focus:ring-brand-primary-500',
                  'focus:bg-brand-text-100',
                  direction === 'georgian-to-latin' && 'font-georgian',
                )}
                id="translit-input"
                value={input}
                onChange={handleInputChange}
                onScroll={handleInputScroll}
                ref={inputRef}
              />
            </div>
          </div>
          {/* output area */}
          <div
            className={cn(
              //
              'bg-orange-200',
              'flex flex-col',
              'grow',
              //
              'caret-black',
              //
              'bg-white',
              'w-full',
              'rounded-lg',
              'border',
              //
              'border-brand-text-300',
              //
              'shadow-sm',
            )}
          >
            {/* bar */}
            <div
              className={cn(
                //
                'flex',
                'items-center',
                'justify-between',
                //
                'p-brand-regular',
                'border-b-2',
                'border-brand-primary-500',
              )}
            >
              {/* label */}
              <label htmlFor="translit-output" className={cn('text-2xl')}>
                {transliterationLabel}
              </label>
              {/* buttons */}
              <div className={cn('flex', 'gap-brand-regular')}>
                <Tooltip.Root>
                  <Tooltip.Trigger
                    className={cn(iconClassNames, buttonIconClassNames)}
                    type="button"
                    onClick={copyOutput}
                    aria-label={copyTransliterationLabel}
                  >
                    {isCopySuccess ? (
                      <FaCheck className="size-5" />
                    ) : (
                      <FaRegCopy className="size-5" />
                    )}
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner sideOffset={8}>
                      <Tooltip.Popup
                        className={cn(
                          'z-50',
                          'rounded-md',
                          'border',
                          'border-brand-text-300',
                          'bg-white',
                          'px-brand-regular',
                          'py-brand-xsmall',
                          'text-sm',
                          'shadow-lg',
                        )}
                      >
                        <Tooltip.Arrow className={cn('data-[side=top]:bottom-[-7px]')}>
                          <div
                            className={cn(
                              'size-3',
                              'rotate-45',
                              'bg-white',
                              'border-r',
                              'border-b',
                              'border-brand-text-300',
                            )}
                          />
                        </Tooltip.Arrow>
                        {copyTransliterationLabel}
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </div>
            {/* text area */}
            <div className={cn('p-brand-regular', 'grow')}>
              <textarea
                className={cn(
                  'w-full',
                  'h-full',
                  'resize-none',
                  'text-2xl',
                  'p-brand-regular',
                  direction === 'latin-to-georgian' && 'font-georgian',
                )}
                id="translit-output"
                value={output}
                readOnly
                onScroll={handleOutputScroll}
                ref={outputRef}
              />
            </div>
          </div>
        </ResponsiveContainer>
      </Tooltip.Provider>
      <AnchoredToasts />
    </Toast.Provider>
  );
}
