'use client';
import { Toast } from '@base-ui/react/toast';
import { Tooltip } from '@base-ui/react/tooltip';
import type { Library } from '@game-client/learning-content/library/library';
import {
  getStringTransliterationFromLatin,
  getStringTransliterationFromTargetScript,
} from '@game-client/learning-content/utils/transliteration';
import { TranslitActionTooltip } from '@game-client/ui/screens/translit/translit-action-tooltip';
import { TranslitOutput } from '@game-client/ui/screens/translit/translit-output';
import { getTranslitOutputSegments } from '@game-client/ui/screens/translit/translit-output-segments';
import { cn } from '@kartuli/ui/utils/cn';
import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaRegCopy } from 'react-icons/fa6';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Fill, RiDeleteBin6Line } from 'react-icons/ri';

const toastManager = Toast.createToastManager();
// Compact mode is decided from fixed text-2xl/leading-8 measurement-space with whitespace-pre-wrap.
// Because the real surfaces can switch text size and textarea wrapping differs slightly from div
// wrapping, the threshold can differ by about one rendered line after toggling compact mode.
const compactTextLineThreshold = 7;

function getRenderedLineCount(element: HTMLElement): number {
  const computedStyle = globalThis.getComputedStyle(element);
  const fontSize = Number.parseFloat(computedStyle.fontSize) || 16;
  const lineHeight = Number.parseFloat(computedStyle.lineHeight) || fontSize * 1.5;
  const paddingTop = Number.parseFloat(computedStyle.paddingTop) || 0;
  const paddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0;
  const contentHeight = Math.max(0, element.scrollHeight - paddingTop - paddingBottom);
  return Math.max(1, Math.ceil(contentHeight / lineHeight));
}

function AnchoredToasts() {
  const { toasts } = Toast.useToastManager();
  return (
    <Toast.Portal>
      <Toast.Viewport className={cn('pointer-events-none', 'fixed', 'inset-0', 'z-50')}>
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
                  'pointer-events-auto',
                  'max-w-72',
                  'rounded-md',
                  'border',
                  'bg-black',
                  'px-3',
                  'py-2',
                  'text-sm',
                  'text-white',
                  'shadow-lg',
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
  const [isCompactText, setIsCompactText] = useState(false);
  /** Hides copy tooltip as soon as the button is pressed (before async clipboard), so toast is not doubled with an open hover tooltip */
  const [suppressCopyTooltip, setSuppressCopyTooltip] = useState(false);
  const [direction, setDirection] = useState<'georgian-to-latin' | 'latin-to-georgian'>(
    'georgian-to-latin',
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLElement>(null);
  const inputMeasureRef = useRef<HTMLDivElement>(null);
  const outputMeasureRef = useRef<HTMLDivElement>(null);
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

  const syncScroll = (from: HTMLElement, to: HTMLElement) => {
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
    // Keep proportional sync as long as textarea/div wrapping stays acceptably close.
    // If manual testing shows drift, prefer source-driven sync over forcing symmetry.
    syncScroll(inputRef.current, outputRef.current);
  }, [output]);

  const updateTextSize = useEffectEvent(() => {
    if (
      !inputRef.current ||
      !outputRef.current ||
      !inputMeasureRef.current ||
      !outputMeasureRef.current
    ) {
      return;
    }

    inputMeasureRef.current.style.width = `${inputRef.current.clientWidth}px`;
    outputMeasureRef.current.style.width = `${outputRef.current.clientWidth}px`;

    const renderedLineCount = Math.max(
      getRenderedLineCount(inputMeasureRef.current),
      getRenderedLineCount(outputMeasureRef.current),
    );
    setIsCompactText(renderedLineCount >= compactTextLineThreshold);
  });

  useLayoutEffect(() => {
    updateTextSize();
  }, [input, output, direction]);

  useEffect(() => {
    if (!inputRef.current || !outputRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateTextSize();
    });

    resizeObserver.observe(inputRef.current);
    resizeObserver.observe(outputRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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
  const outputSegments = getTranslitOutputSegments(input, output);
  const outputLabelId = 'translit-output-label';
  const inputScriptClassName = direction === 'georgian-to-latin' ? 'font-georgian' : undefined;
  const outputScriptClassName = direction === 'georgian-to-latin' ? undefined : 'font-georgian';
  const tooltipScriptClassName = direction === 'georgian-to-latin' ? 'font-georgian' : undefined;
  const surfaceTextSizeClassName = isCompactText ? 'text-xl' : 'text-2xl';

  return (
    <Toast.Provider toastManager={toastManager}>
      <Tooltip.Provider delay={300}>
        <main className={cn('flex', 'min-h-0', 'w-full', 'grow', 'flex-col', 'overflow-hidden')}>
          <h1 className="sr-only">Translit</h1>
          <div
            className={cn(
              'mx-auto',
              'flex',
              'min-h-0',
              'w-full',
              'max-w-4xl',
              'grow',
              'flex-col',
              'gap-4',
              'overflow-hidden',
              'p-4',
            )}
          >
            <div
              className={cn('flex', 'min-h-0', 'grow', 'basis-0', 'flex-col', 'border', 'bg-white')}
            >
              <div
                className={cn(
                  'flex',
                  'items-center',
                  'justify-between',
                  'gap-4',
                  'border-b',
                  'px-4',
                  'py-2',
                )}
              >
                <label htmlFor="translit-input" className={cn('flex', 'flex-col')}>
                  <div className={cn('text-xs', 'uppercase', 'tracking-[0.12em]', 'text-gray-600')}>
                    {t('source')}
                  </div>
                  <div className={cn('text-xl', 'uppercase')}>{sourceFromLabel}</div>
                </label>
                <div className={cn('flex', 'gap-2')}>
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
              <div className={cn('min-h-0', 'grow', 'p-4')}>
                <textarea
                  lang={inputLang}
                  className={cn(
                    'h-full',
                    'min-h-0',
                    'w-full',
                    'resize-none',
                    'border',
                    'p-4',
                    'caret-black',
                    'focus:outline-none',
                    'focus:ring-1',
                    'focus:ring-black',
                    'placeholder:text-gray-500',
                    surfaceTextSizeClassName,
                    inputScriptClassName,
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
            <div
              className={cn('flex', 'min-h-0', 'grow', 'basis-0', 'flex-col', 'border', 'bg-white')}
            >
              <div
                className={cn(
                  'flex',
                  'items-center',
                  'justify-between',
                  'gap-4',
                  'border-b',
                  'px-4',
                  'py-2',
                )}
              >
                <div id={outputLabelId} className={cn('flex', 'flex-col')}>
                  <div className={cn('text-xs', 'uppercase', 'tracking-[0.12em]', 'text-gray-600')}>
                    {t('transliteration')}
                  </div>
                  <div className={cn('text-xl', 'uppercase')}>{transliterationToLabel}</div>
                </div>
                <div className={cn('flex', 'gap-2')}>
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
              <div className={cn('min-h-0', 'grow', 'p-4')}>
                <TranslitOutput
                  ariaLabelledBy={outputLabelId}
                  className={cn(surfaceTextSizeClassName, outputScriptClassName)}
                  containerRef={outputRef}
                  lang={outputLang}
                  onScroll={handleOutputScroll}
                  segments={outputSegments}
                  tooltipClassName={tooltipScriptClassName}
                />
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className={cn(
              'invisible',
              'pointer-events-none',
              'fixed',
              'left-0',
              'top-0',
              '-z-10',
              'size-0',
              'overflow-hidden',
            )}
          >
            <div
              ref={inputMeasureRef}
              className={cn(
                'whitespace-pre-wrap',
                'break-words',
                'text-2xl',
                'leading-8',
                'p-4',
                inputScriptClassName,
              )}
            >
              {input || ' '}
            </div>
            <div
              ref={outputMeasureRef}
              className={cn(
                'whitespace-pre-wrap',
                'break-words',
                'text-2xl',
                'leading-8',
                'p-4',
                outputScriptClassName,
              )}
            >
              {output || ' '}
            </div>
          </div>
        </main>
      </Tooltip.Provider>
      <AnchoredToasts />
    </Toast.Provider>
  );
}
