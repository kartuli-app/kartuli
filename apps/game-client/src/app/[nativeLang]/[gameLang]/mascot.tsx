'use client';

/**
 * ContentMascot Component
 *
 * Visibility Pattern:
 * - Shows: Only latest sequence
 * - Filter: messages.filter(m => m.sequenceId === latestSequenceId).slice(-maxVisible)
 * - Display: Latest N messages of current sequence
 *
 * Note: Each mascot component defines its own visibility/filtering logic.
 * This allows different components (ContentMascot, ToastMascot, ModalMascot)
 * to display the same data in different ways.
 */

import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useMascot } from './mascot-context';

interface MascotProps {
  maxVisible?: number;
}

export function Mascot({ maxVisible = 3 }: MascotProps) {
  const {
    messages,
    currentReaction,
    queueDurationMs,
    isPlaying,
    isTransitioning,
    setIsMascotInViewport,
  } = useMascot();

  // Countdown timer state
  const [remainingMs, setRemainingMs] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const totalDurationRef = useRef(0);

  // Viewport detection
  const mascotRef = useRef<HTMLDivElement>(null);

  // Track if mascot is in viewport
  useEffect(() => {
    const element = mascotRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMascotInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [setIsMascotInViewport]);

  // Update countdown timer
  useEffect(() => {
    if (!isPlaying && queueDurationMs === 0) {
      // Reset when done
      setRemainingMs(0);
      startTimeRef.current = null;
      totalDurationRef.current = 0;
      return;
    }

    if (isPlaying && startTimeRef.current === null) {
      // Start new countdown
      startTimeRef.current = Date.now();
      totalDurationRef.current = queueDurationMs;
      setRemainingMs(queueDurationMs);
    }

    // Update countdown every 500ms
    const interval = setInterval(() => {
      if (startTimeRef.current === null) return;

      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, totalDurationRef.current - elapsed);
      setRemainingMs(remaining);
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, queueDurationMs]);

  // Show all messages from the latest sequence (derived state!)
  const latestSequenceId = messages.length > 0 ? messages[messages.length - 1].sequenceId : null;
  const messagesInLatestSequence = latestSequenceId
    ? messages.filter((msg) => msg.sequenceId === latestSequenceId)
    : [];

  const visibleMessages = messagesInLatestSequence.slice(-maxVisible);

  console.log(
    '[Mascot] Total messages:',
    messages.length,
    'Latest sequence:',
    latestSequenceId,
    'Visible:',
    visibleMessages.length,
  );

  const hasHiddenMessages = messages.length > visibleMessages.length;
  const hiddenMessagesCount = messages.length - visibleMessages.length;
  console.log('🚀 ~ Mascot ~ visibleMessages.length:', visibleMessages.length);
  console.log('🚀 ~ Mascot ~ messages.length:', messages.length);

  return (
    <div
      ref={mascotRef}
      className={clsx(
        'flex flex-row',
        'items-end',
        'justify-end',
        'mx-auto',
        'shrink-0',
        'w-full',
        'h-64',
      )}
    >
      {/* Image + Text Wrapper */}
      <div className={clsx('flex', 'items-end', 'gap-2', 'p-2', 'mx-auto', 'max-w-lg', 'w-full')}>
        {/* Button + Image Wrapper */}
        <div
          className={clsx('w-26 shrink-0', 'flex flex-col items-center justify-center relative')}
        >
          {/* Countdown Timer - separate from other indicators */}
          {remainingMs > 0 && (
            <div className={clsx('absolute top-[-65px]', 'left-1/2 -translate-x-1/2')}>
              <div
                className={clsx(
                  'px-3',
                  'py-1',
                  'rounded-md',
                  'bg-blue-100',
                  'border border-blue-300',
                  'text-blue-700 text-xs font-mono font-bold',
                  'whitespace-nowrap',
                )}
              >
                {Math.ceil(remainingMs / 1000)}s
              </div>
            </div>
          )}

          {/* Indicators above mascot */}
          {currentReaction && (
            <div className={clsx('absolute top-[-115px]', 'flex gap-2')}>
              {/* Reaction Emoji */}
              {currentReaction && (
                <span
                  className={clsx(
                    'inline-flex',
                    'rounded-lg',
                    'items-center',
                    'justify-center',
                    'px-1',
                    'py-1',
                    'animate-pulse',
                  )}
                >
                  <span className="text-lg text-center">
                    Reaction:
                    <span className="text-3xl"></span>
                    {currentReaction}
                  </span>
                </span>
              )}
            </div>
          )}

          {/* Indicators above mascot */}
          <div className={clsx('absolute top-[-35px]', 'flex gap-2')}>
            {/* Queue Counter - show only when > 0 */}
            {hasHiddenMessages && (
              <span
                className={clsx(
                  'inline-flex',
                  'rounded-lg',
                  'items-center',
                  'justify-center',
                  'gap-1',
                  'px-2',
                  'py-1',
                  'bg-slate-200',
                  'border border-slate-400',
                  'text-slate-700 text-sm font-bold',
                )}
              >
                +{hiddenMessagesCount} 💬
              </span>
            )}
          </div>

          {/* Mascot Image */}
          <div className={clsx('flex items-center justify-center', 'w-26 h-26', 'shrink-0')}>
            <img
              src="/mascot.png"
              alt="Mascot"
              className={clsx('object-cover rounded-full translate-y-4 scale-150')}
            />
          </div>
        </div>

        {/* Mascot Messages */}
        <div className={clsx('flex flex-col gap-2', 'pl-2', 'flex-grow')}>
          {!isTransitioning &&
            visibleMessages.map((message, index) => {
              const variant = message.variant || 'default';
              const isLastMessage = index === visibleMessages.length - 1;

              return (
                <div
                  key={message.id}
                  className={clsx('text-left', 'flex', 'items-center', {
                    'text-4xl': variant === 'emoji',
                    'text-xl font-bold': variant === 'bold',
                    'text-xl': variant === 'default',
                  })}
                >
                  {/* Triangle for last message */}
                  <div className="flex shrink-0 w-3 h-4 rounded-tl-full">
                    {isLastMessage && (
                      <svg
                        className="rotate-90"
                        role="img"
                        aria-label="Triangle"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0 L100 0 L50 100 Z" className="fill-green-700" />
                      </svg>
                    )}
                  </div>

                  {/* Message bubble */}
                  <span
                    className={clsx('inline-block', 'rounded-xl', 'px-4', 'py-2', 'text-white', {
                      'bg-green-800': !isLastMessage,
                      'bg-green-400': isLastMessage,
                    })}
                  >
                    {message.text}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
