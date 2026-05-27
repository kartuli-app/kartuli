'use client';
import { Tooltip } from '@base-ui/react/tooltip';
import type { Library } from '@game-client/learning-content/library/library';
import {
  getStringTransliterationFromLatin,
  getStringTransliterationFromTargetScript,
} from '@game-client/learning-content/utils/transliteration';
import { HeaderActionButton } from '@game-client/ui/components/header-action-button';
import { Notifications, showNotification } from '@game-client/ui/components/notifications';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelHeader } from '@game-client/ui/components/panel/panel-header';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { TranslitInput } from '@game-client/ui/experiences/translit/components/translit-input';
import { TranslitOutput } from '@game-client/ui/experiences/translit/components/translit-output';
import { getTranslitOutputSegments } from '@game-client/ui/experiences/translit/components/translit-output-segments';
import { cn } from '@kartuli/ui/utils/cn';
import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaRegCopy } from 'react-icons/fa6';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Fill, RiDeleteBin6Line } from 'react-icons/ri';

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

export function TranslitClient({ library }: Readonly<{ library: Library }>) {
  const { t } = useTranslation('translit');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const [isCompactText, setIsCompactText] = useState(false);
  const [direction, setDirection] = useState<'georgian-to-latin' | 'latin-to-georgian'>(
    'georgian-to-latin',
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLElement>(null);
  const inputMeasureRef = useRef<HTMLDivElement>(null);
  const outputMeasureRef = useRef<HTMLDivElement>(null);
  const copyFeedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSyncingScrollRef = useRef(false);

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
  };

  const clearInput = () => {
    setInput('');
    setOutput('');
  };

  const copyOutput = async () => {
    const clipboard = globalThis.navigator?.clipboard;
    if (!clipboard) {
      showNotification({
        description: t('toast_copy_failed'),
        timeout: 3200,
      });
      return;
    }
    try {
      await clipboard.writeText(output);
    } catch {
      showNotification({
        description: t('toast_copy_failed'),
        timeout: 3200,
      });
      return;
    }
    if (copyFeedbackTimeoutRef.current) {
      globalThis.clearTimeout(copyFeedbackTimeoutRef.current);
    }
    setIsCopySuccess(true);
    copyFeedbackTimeoutRef.current = globalThis.setTimeout(() => {
      setIsCopySuccess(false);
      copyFeedbackTimeoutRef.current = null;
    }, 1200);
    showNotification({
      description: t('toast_copied_transliteration'),
      timeout: 1200,
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
  const inputContextId = 'translit-input-context';
  const inputTitleId = 'translit-input-title';
  const outputLabelId = 'translit-output-label';
  const outputContextId = 'translit-output-context';
  const inputScriptClassName = 'font-georgian';
  const outputScriptClassName = 'font-georgian';
  const tooltipScriptClassName = 'font-georgian';
  const surfaceTextSizeClassName = isCompactText ? 'text-xl' : 'text-2xl';

  return (
    <Notifications>
      <Tooltip.Provider delay={300}>
        <main className={cn('flex', 'flex-col', 'gap-4', 'p-0', 'h-full')}>
          <Panel className="flex-1">
            <PanelHeader
              context={t('source')}
              contextId={inputContextId}
              title={sourceFromLabel}
              titleId={inputTitleId}
              trailing={
                <>
                  <HeaderActionButton
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
                  </HeaderActionButton>
                  <HeaderActionButton
                    tooltipLabel={switchDirectionLabel}
                    side="bottom"
                    onClick={toggleDirection}
                    aria-label={switchDirectionLabel}
                    aria-controls="translit-input translit-output"
                  >
                    <HiOutlineSwitchHorizontal className="size-5" />
                  </HeaderActionButton>
                </>
              }
              variant="default"
            />
            <PanelSection className={cn('flex', 'flex-col', 'gap-2', 'p-2', 'h-full')}>
              <TranslitInput
                ariaLabelledBy={`${inputContextId} ${inputTitleId}`}
                className={cn(surfaceTextSizeClassName, inputScriptClassName)}
                id="translit-input"
                lang={inputLang}
                onChange={handleInputChange}
                onScroll={handleInputScroll}
                placeholder={placeholder}
                textareaRef={inputRef}
                value={input}
              />
            </PanelSection>
          </Panel>
          <Panel className="flex-1">
            <PanelHeader
              context={t('transliteration')}
              contextId={outputContextId}
              title={transliterationToLabel}
              titleId={outputLabelId}
              trailing={
                <HeaderActionButton
                  tooltipLabel={copyTransliterationLabel}
                  side="top"
                  onClick={copyOutput}
                  aria-label={copyTransliterationLabel}
                >
                  {isCopySuccess ? (
                    <FaCheck className="size-5" />
                  ) : (
                    <FaRegCopy className="size-5" />
                  )}
                </HeaderActionButton>
              }
              variant="default"
            />
            <PanelSection className={cn('flex', 'flex-col', 'gap-2', 'p-2', 'h-full')}>
              <TranslitOutput
                ariaLabelledBy={`${outputContextId} ${outputLabelId}`}
                className={cn(surfaceTextSizeClassName, outputScriptClassName)}
                containerRef={outputRef}
                lang={outputLang}
                onScroll={handleOutputScroll}
                segments={outputSegments}
                tooltipClassName={tooltipScriptClassName}
              />
            </PanelSection>
          </Panel>
          <div aria-hidden className={cn('invisible', 'absolute', 'overflow-hidden')}>
            <div
              ref={inputMeasureRef}
              className={cn(
                'whitespace-pre-wrap',
                'wrap-break-word',
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
                'wrap-break-word',
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
    </Notifications>
  );
}
