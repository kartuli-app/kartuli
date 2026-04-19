'use client';
import { Toast } from '@base-ui/react/toast';
import { Tooltip } from '@base-ui/react/tooltip';
import type { Library } from '@game-client/learning-content/library/library';
import {
  getStringTransliterationFromLatin,
  getStringTransliterationFromTargetScript,
} from '@game-client/learning-content/utils/transliteration';
import { TranslitActionTooltip } from '@game-client/ui/screens/translit/translit-action-tooltip';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import { cn } from '@kartuli/ui/utils/cn';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaRegCopy } from 'react-icons/fa6';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Fill, RiDeleteBin6Line } from 'react-icons/ri';

const toastManager = Toast.createToastManager();

function AnchoredToasts() {
  const { toasts } = Toast.useToastManager();
  return (
    <Toast.Portal>
      <Toast.Viewport className={cn('fixed', 'inset-0', 'z-50', 'pointer-events-none')}>
        {toasts.map((toast) => (
          <Toast.Positioner
            sideOffset={12}
            key={toast.id}
            toast={toast}
            className={cn('pointer-events-none')}
          >
            <Toast.Root toast={toast}>
              <Toast.Content
                className={cn(
                  'bg-brand-text-600',
                  'text-brand-text-100',
                  'p-brand-regular',
                  'text-lg',
                  'shadow-lg',
                  'rounded-md',
                  'max-w-72',
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
  /** Hides copy tooltip as soon as the button is pressed (before async clipboard), so toast is not doubled with an open hover tooltip */
  const [suppressCopyTooltip, setSuppressCopyTooltip] = useState(false);
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
    setSuppressCopyTooltip(true);
    const clipboard = globalThis.navigator?.clipboard;
    if (!clipboard) {
      setSuppressCopyTooltip(false);
      toastManager.add({
        description: t('toast_copy_failed'),
        timeout: 3200,
        positionerProps: {
          anchor: anchorElement,
          side: 'top',
          align: 'center',
          sideOffset: 8,
          positionMethod: 'fixed',
        },
      });
      return;
    }
    try {
      await clipboard.writeText(output);
    } catch {
      setSuppressCopyTooltip(false);
      toastManager.add({
        description: t('toast_copy_failed'),
        timeout: 3200,
        positionerProps: {
          anchor: anchorElement,
          side: 'top',
          align: 'center',
          sideOffset: 8,
          positionMethod: 'fixed',
        },
      });
      return;
    }
    if (copyFeedbackTimeoutRef.current) {
      globalThis.clearTimeout(copyFeedbackTimeoutRef.current);
    }
    setIsCopySuccess(true);
    copyFeedbackTimeoutRef.current = globalThis.setTimeout(() => {
      setIsCopySuccess(false);
      setSuppressCopyTooltip(false);
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

  const sourceFromLabel = direction === 'georgian-to-latin' ? t('georgian') : t('latin');
  const transliterationToLabel = direction === 'georgian-to-latin' ? t('latin') : t('georgian');

  const switchDirectionLabel =
    direction === 'georgian-to-latin'
      ? t('switch_direction_to_latin_to_georgian')
      : t('switch_direction_to_georgian_to_latin');
  const clearTextLabel = t('clear_text');
  const copyTransliterationLabel = t('copy_transliteration');

  const showEmptyClearIcon = input.trim().length === 0;

  const placeholder =
    direction === 'georgian-to-latin' ? t('placeholder_to_latin') : t('placeholder_to_georgian');

  const inputLang = direction === 'georgian-to-latin' ? 'ka-GE' : 'ka-Latn';
  const outputLang = direction === 'georgian-to-latin' ? 'ka-Latn' : 'ka-GE';

  return (
    <Toast.Provider toastManager={toastManager}>
      <Tooltip.Provider delay={300}>
        <ResponsiveContainer
          className={cn(
            //
            'grow',
            'flex-col',
            'gap-brand-large',
            'pt-brand-large',
          )}
        >
          {/* input area */}
          <div
            className={cn(
              //
              'flex flex-col',
              'grow',
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
                'px-brand-large',
                'py-brand-regular',
                //
                'border-b-2',
                'border-brand-primary-500',
              )}
            >
              {/* label */}
              <label htmlFor="translit-input" className={cn('flex flex-col')}>
                <div className={cn('text-sm uppercase text-brand-primary-900')}>{t('source')}</div>
                <div className={cn('text-2xl uppercase text-brand-text-600')}>
                  {sourceFromLabel}
                </div>
              </label>
              {/* buttons */}
              <div className={cn('flex', 'gap-brand-regular')}>
                <TranslitActionTooltip
                  tooltipLabel={clearTextLabel}
                  side="bottom"
                  onClick={clearInput}
                  aria-label={clearTextLabel}
                >
                  {showEmptyClearIcon ? (
                    <RiDeleteBin6Line className="size-5" />
                  ) : (
                    <RiDeleteBin6Fill className="size-5" />
                  )}
                </TranslitActionTooltip>
                <TranslitActionTooltip
                  tooltipLabel={switchDirectionLabel}
                  side="bottom"
                  onClick={toggleDirection}
                  aria-label={switchDirectionLabel}
                  aria-controls="translit-input translit-output"
                >
                  <HiOutlineSwitchHorizontal className="size-5" />
                </TranslitActionTooltip>
              </div>
            </div>
            {/* text area */}
            <div className={cn('p-brand-large', 'grow')}>
              <textarea
                lang={inputLang}
                className={cn(
                  //
                  'w-full',
                  'h-full',
                  'resize-none',
                  'text-2xl',
                  'p-brand-large',
                  //
                  'caret-black',
                  //
                  'rounded-lg',
                  //
                  'border-2 border-brand-text-200',
                  'focus:border-brand-text-400 focus:outline-none',
                  'placeholder:text-brand-text-400',
                  'font-georgian',
                )}
                id="translit-input"
                value={input}
                onChange={handleInputChange}
                onScroll={handleInputScroll}
                ref={inputRef}
                placeholder={placeholder}
              />
            </div>
          </div>
          {/* output area */}
          <div
            className={cn(
              //
              'flex flex-col',
              'grow',
              //
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
                'px-brand-large',
                'py-brand-regular',
                //
                'border-b-2',
                'border-brand-primary-500',
              )}
            >
              {/* label */}
              <label htmlFor="translit-output" className={cn('flex flex-col')}>
                <div className={cn('text-sm uppercase text-brand-primary-900')}>
                  {t('transliteration')}
                </div>
                <div className={cn('text-2xl uppercase text-brand-text-600')}>
                  {transliterationToLabel}
                </div>
              </label>
              {/* buttons */}
              <div className={cn('flex', 'gap-brand-regular')}>
                <TranslitActionTooltip
                  tooltipLabel={copyTransliterationLabel}
                  side="top"
                  tooltipDisabled={suppressCopyTooltip}
                  onClick={copyOutput}
                  aria-label={copyTransliterationLabel}
                >
                  {isCopySuccess ? (
                    <FaCheck className="size-5" />
                  ) : (
                    <FaRegCopy className="size-5" />
                  )}
                </TranslitActionTooltip>
              </div>
            </div>
            {/* text area */}
            <div className={cn('p-brand-large', 'grow')}>
              <textarea
                lang={outputLang}
                className={cn(
                  //
                  'w-full',
                  'h-full',
                  'resize-none',
                  'text-2xl',
                  'p-brand-large',
                  //
                  'caret-black',
                  //
                  'rounded-lg',
                  //
                  'border-2 border-brand-text-200',
                  'focus:border-brand-text-400 focus:outline-none',
                  'placeholder:text-brand-text-400',
                  'font-georgian',
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
