'use client';

/**
 * MascotToast Component
 *
 * Visibility Pattern:
 * - Shows: Latest message only, conditional on viewport
 * - Filter: messages[messages.length - 1]
 * - Display: Single message in toast notification
 * - Behavior: Only shows when mascot is NOT in viewport
 *
 * Note: Each mascot component defines its own visibility/filtering logic.
 * This allows different components (ContentMascot, ToastMascot, ModalMascot)
 * to display the same data in different ways.
 */

import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useMascot } from './mascot-context';

export function MascotToast() {
  const { messages, isMascotInViewport, getSequenceMessageCount, isTransitioning } = useMascot();
  const [visibleSequenceId, setVisibleSequenceId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousMessageCountRef = useRef(0);
  const lastMessageTimestampRef = useRef<number | null>(null);

  // Get latest message and sequence info
  const latestMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  const latestSequenceId = latestMessage?.sequenceId || null;

  // Calculate counter info for current sequence
  const sequenceMessages = latestSequenceId
    ? messages.filter((m) => m.sequenceId === latestSequenceId)
    : [];
  const currentPosition = sequenceMessages.length;
  const totalInSequence = latestSequenceId ? getSequenceMessageCount(latestSequenceId) : 0;

  // Close toast during active transitions, re-open after if there's a message
  useEffect(() => {
    if (isTransitioning && visibleSequenceId) {
      // Transition is happening, close toast temporarily
      setVisibleSequenceId(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (
      !isTransitioning &&
      !visibleSequenceId &&
      latestSequenceId &&
      latestMessage &&
      !isMascotInViewport
    ) {
      // Transition ended, re-open toast if mascot not visible and we have a message
      setVisibleSequenceId(latestSequenceId);
      lastMessageTimestampRef.current = latestMessage.timestamp;
    }
  }, [isTransitioning, visibleSequenceId, latestSequenceId, latestMessage, isMascotInViewport]);

  useEffect(() => {
    // Only react to NEW messages, not existing ones
    if (messages.length === 0 || messages.length <= previousMessageCountRef.current) {
      previousMessageCountRef.current = messages.length;
      return;
    }

    previousMessageCountRef.current = messages.length;

    // Only show toast if mascot is NOT visible and not transitioning
    // With persistent reactions, we show during messages even if currentReaction is set
    if (!isMascotInViewport && latestSequenceId && !isTransitioning && latestMessage) {
      // Show/update the toast (use sequenceId, not message ID)
      setVisibleSequenceId(latestSequenceId);
      lastMessageTimestampRef.current = latestMessage.timestamp;

      // Clear previous timeout (if any)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Close toast after delayBetween + small buffer (step likely complete)
      // Default delayBetween is usually 800ms, so use 1200ms to catch step completion
      const timestampWhenSet = latestMessage.timestamp;
      timeoutRef.current = setTimeout(() => {
        // Check if no new message arrived since we started this timeout
        // (message timestamp hasn't changed = step completed)
        if (
          lastMessageTimestampRef.current === timestampWhenSet &&
          visibleSequenceId === latestSequenceId
        ) {
          // No new message, step likely completed - close toast
          setVisibleSequenceId(null);
          timeoutRef.current = null;
        }
      }, 1200);
    } else if (isMascotInViewport) {
      // Mascot is visible, hide toast
      setVisibleSequenceId(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [messages, isMascotInViewport, latestSequenceId, isTransitioning, latestMessage]);

  // Only show if we have a visible sequence and latest message
  const shouldShow =
    visibleSequenceId && latestMessage && latestMessage.sequenceId === visibleSequenceId;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key={visibleSequenceId}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          layout
          className={clsx('fixed z-50', 'top-16 right-4', 'max-w-sm')}
        >
          <div
            className={clsx(
              'flex gap-3 items-start',
              'bg-white',
              'rounded-lg',
              'shadow-lg',
              'border border-gray-200',
              'p-4',
            )}
          >
            {/* Mascot Avatar */}
            <img
              src="/mascot.png"
              alt="Pipo"
              className={clsx('w-10 h-10 rounded-full object-cover shrink-0')}
            />

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <motion.p
                key={latestMessage.id}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={clsx('text-sm text-gray-900', 'break-words')}
              >
                {latestMessage.text}
              </motion.p>

              {/* Counter */}
              {totalInSequence > 1 && (
                <motion.span
                  key={`counter-${currentPosition}`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={clsx('block', 'text-xs', 'text-gray-500', 'mt-1', 'font-mono')}
                >
                  {currentPosition}/{totalInSequence}
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
