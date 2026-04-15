'use client';
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
import { FaRegCopy } from 'react-icons/fa6';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { MdOutlineDelete } from 'react-icons/md';

const t = (key: string) => key;

export function TranslitClient({ library }: Readonly<{ library: Library }>) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<'georgian-to-latin' | 'latin-to-georgian'>(
    'georgian-to-latin',
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const isSyncingScrollRef = useRef(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const getOutput = (direction: 'georgian-to-latin' | 'latin-to-georgian', input: string) => {
    if (direction === 'georgian-to-latin') {
      return getStringTransliterationFromTargetScript(
        library.commonLetterItemsByTargetScript,
        input,
      );
    } else {
      return getStringTransliterationFromLatin(library.commonLetterItemsByTransliteration, input);
    }
  };

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

  const inputLabel = direction === 'georgian-to-latin' ? t('georgian') : t('latin');
  const outputLabel = direction === 'georgian-to-latin' ? t('latin') : t('georgian');
  return (
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
          'hover:bg-brand-text-50',
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
            {inputLabel}
          </label>
          {/* buttons */}
          <div className={cn('flex', 'gap-brand-regular')}>
            <button
              className={cn(iconClassNames, buttonIconClassNames)}
              type="button"
              onClick={clearInput}
              aria-label={t('clear_input')}
            >
              <MdOutlineDelete className="size-5" />
            </button>
            <button
              className={cn(iconClassNames, buttonIconClassNames)}
              type="button"
              onClick={toggleDirection}
              aria-label={t('toggle_direction')}
            >
              <HiOutlineSwitchHorizontal className="size-5" />
            </button>
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
              'focus:outline-none',
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
          'focus:outline-none',
          //
          'bg-white',
          'w-full',
          'rounded-lg',
          'border',
          //
          'border-brand-text-300',
          'hover:bg-brand-text-50',
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
            {outputLabel}
          </label>
          {/* buttons */}
          <div className={cn('flex', 'gap-brand-regular')}>
            <button
              className={cn(iconClassNames, buttonIconClassNames)}
              type="button"
              onClick={copyOutput}
              aria-label={t('copy_output')}
            >
              <FaRegCopy className="size-5" />
            </button>
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
  );
}
