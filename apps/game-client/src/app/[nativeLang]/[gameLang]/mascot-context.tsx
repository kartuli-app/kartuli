'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  Message,
  MessageVariant,
  QueueTask,
  Sequence,
  SequenceMetadata,
} from './mascot-types';

// ============================================================
// CONTEXT INTERFACE
// ============================================================

interface MascotContextValue {
  // State (read-only)
  messages: Message[];
  currentReaction: string | null; // Persists until next reaction
  isPlaying: boolean;
  queueLength: number;
  queueDurationMs: number; // Total duration of all queued sequences
  isMascotInViewport: boolean;
  isTransitioning: boolean; // Tracks transition animation state

  // Main API
  playSequence: (sequence: Sequence, metadata: SequenceMetadata) => Promise<void>;

  // Helper methods
  showReaction: (emoji: string, duration?: number) => Promise<void>;
  sayMessages: (
    messages: Omit<Message, 'id' | 'timestamp' | 'sequenceId' | 'activityType' | 'reaction'>[],
    delayBetween?: number,
    metadata?: Partial<SequenceMetadata>,
  ) => Promise<void>;
  say: (
    text: string,
    variant?: MessageVariant,
    metadata?: Partial<SequenceMetadata>,
  ) => Promise<void>;
  pause: (duration: number) => Promise<void>;

  // Queue management
  clearQueue: () => void;
  clearMessages: () => void;
  skipCurrent: () => void;
  getSequenceDuration: (sequence: Sequence) => number;
  setIsMascotInViewport: (visible: boolean) => void;

  // Initial sequence tracking
  shouldPlayInitialSequence: () => boolean;

  // Helper to get total message count for a sequence
  getSequenceMessageCount: (sequenceId: string) => number;
}

const MascotContext = createContext<MascotContextValue | undefined>(undefined);

export function useMascot() {
  const context = useContext(MascotContext);
  if (!context) {
    throw new Error('useMascot must be used within a MascotProvider');
  }
  return context;
}

// ============================================================
// PROVIDER
// ============================================================

interface MascotProviderProps {
  children: ReactNode;
}

export function MascotProvider({ children }: MascotProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [queue, setQueue] = useState<QueueTask[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);
  const [isMascotInViewport, setIsMascotInViewport] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isProcessingRef = useRef(false);
  const shouldSkipRef = useRef(false);
  const queueRef = useRef<QueueTask[]>([]);
  const hasPlayedInitialSequenceRef = useRef(false);

  // Keep queueRef in sync with queue state
  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  // ============================================================
  // DURATION CALCULATION
  // ============================================================

  const calculateSequenceDuration = useCallback((sequence: Sequence): number => {
    let totalMs = 0;

    for (const step of sequence) {
      switch (step.type) {
        case 'reaction':
          totalMs += step.duration;
          break;

        case 'messages':
          totalMs += step.messages.length * step.delayBetween;
          break;

        case 'pause':
          totalMs += step.duration;
          break;
      }
    }

    return totalMs;
  }, []);

  const queueDurationMs = useMemo(() => {
    return queue.reduce((total, task) => {
      let taskDuration = calculateSequenceDuration(task.sequence);

      // Subtract the last step's duration if it's a pause
      const lastStep = task.sequence[task.sequence.length - 1];
      if (lastStep?.type === 'pause') {
        taskDuration -= lastStep.duration;
      }

      return total + taskDuration;
    }, 0);
  }, [queue, calculateSequenceDuration]);

  const getSequenceDuration = useCallback(
    (sequence: Sequence): number => {
      return calculateSequenceDuration(sequence);
    },
    [calculateSequenceDuration],
  );

  // ============================================================
  // QUEUE PROCESSOR
  // ============================================================

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current) {
      console.log('[Mascot Queue] Already processing, skipping');
      return;
    }

    const task = queueRef.current[0];
    if (!task) {
      console.log('[Mascot Queue] Queue is empty');
      isProcessingRef.current = false;
      setIsPlaying(false);
      return;
    }

    isProcessingRef.current = true;
    setIsPlaying(true);

    shouldSkipRef.current = false;
    console.log('[Mascot Queue] Processing task:', task.id, task.metadata.activityType);

    // Process each step in the sequence
    for (const step of task.sequence) {
      if (shouldSkipRef.current) {
        console.log('[Mascot Queue] Skipping rest of sequence');
        break;
      }

      switch (step.type) {
        case 'reaction': {
          console.log('[Mascot Queue] Setting reaction:', step.emoji, 'for', step.duration, 'ms');

          // Context-aware transition: detect if we had previous state for UI behavior
          const _hadPreviousState = currentReaction !== null || messages.length > 0;

          setIsTransitioning(true);
          setCurrentReaction(step.emoji); // Set state (persists until next reaction!)

          // Always wait for reaction duration before proceeding to messages
          // UI can hide previous messages during transition if hadPreviousState
          await delay(step.duration);

          setIsTransitioning(false);
          // Note: currentReaction STAYS SET (not cleared) - persists for next messages
          break;
        }

        case 'messages': {
          console.log('[Mascot Queue] Adding', step.messages.length, 'messages');
          for (const msgInput of step.messages) {
            if (shouldSkipRef.current) break;

            const message: Message = {
              ...msgInput,
              id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              timestamp: Date.now(),
              sequenceId: task.id,
              activityType: task.metadata.activityType,
              reaction: currentReaction, // Attach current reaction metadata
            };

            setMessages((prev) => [...prev, message]);
            console.log(
              '[Mascot Queue] Added message:',
              message.text,
              'with reaction:',
              currentReaction,
            );

            await delay(step.delayBetween);
          }
          break;
        }

        case 'pause': {
          console.log('[Mascot Queue] Pausing for', step.duration, 'ms');
          await delay(step.duration);
          break;
        }
      }
    }

    // Task complete, resolve its promise and remove from queue
    console.log('[Mascot Queue] Task complete:', task.id);
    task.resolve();

    // Remove this task and reset processing flag so next task can be processed
    isProcessingRef.current = false;
    setQueue((prev) => prev.slice(1));
  }, []);

  // Trigger queue processing when queue changes
  useEffect(() => {
    if (queue.length > 0 && !isProcessingRef.current) {
      console.log('[Mascot Queue] Queue has items, starting processor');
      processQueue();
    } else if (queue.length === 0) {
      console.log('[Mascot Queue] Queue is empty, setting isPlaying to false');
      setIsPlaying(false);
      isProcessingRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  // ============================================================
  // PUBLIC API
  // ============================================================

  const playSequence = (sequence: Sequence, metadata: SequenceMetadata): Promise<void> => {
    return new Promise((resolve) => {
      const task: QueueTask = {
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sequence,
        metadata: {
          ...metadata,
          triggeredAt: metadata.triggeredAt ?? Date.now(),
        },
        resolve,
      };

      console.log('[Mascot Queue] Adding task to queue:', task.id, metadata.activityType);
      setQueue((prev) => [...prev, task]);
    });
  };

  const showReaction = (emoji: string, duration = 1000): Promise<void> => {
    return playSequence([{ type: 'reaction', emoji, duration }], {
      activityType: 'general',
      triggeredAt: Date.now(),
    });
  };

  const sayMessages = (
    msgs: Omit<Message, 'id' | 'timestamp' | 'sequenceId' | 'activityType' | 'reaction'>[],
    delayBetween = 800,
    metadata: Partial<SequenceMetadata> = {},
  ): Promise<void> => {
    return playSequence([{ type: 'messages', messages: msgs, delayBetween }], {
      activityType: 'general',
      ...metadata,
      triggeredAt: metadata.triggeredAt ?? Date.now(),
    });
  };

  const say = (
    text: string,
    variant: MessageVariant = 'default',
    metadata: Partial<SequenceMetadata> = {},
  ): Promise<void> => {
    return sayMessages([{ text, variant }], 800, metadata);
  };

  const pause = (duration: number): Promise<void> => {
    return playSequence([{ type: 'pause', duration }], {
      activityType: 'general',
      triggeredAt: Date.now(),
    });
  };

  const clearQueue = () => {
    console.log('[Mascot Queue] Clearing queue');
    // Resolve all pending promises
    for (const task of queue) {
      task.resolve();
    }
    setQueue([]);
    setIsPlaying(false);
    setCurrentReaction(null);
    isProcessingRef.current = false;
  };

  const clearMessages = () => {
    console.log('[Mascot Queue] Clearing messages');
    setMessages([]);
  };

  const skipCurrent = () => {
    console.log('[Mascot Queue] Skipping current sequence');
    shouldSkipRef.current = true;
  };

  const shouldPlayInitialSequence = (): boolean => {
    if (hasPlayedInitialSequenceRef.current) {
      return false;
    }
    hasPlayedInitialSequenceRef.current = true;
    return true;
  };

  const getSequenceMessageCount = useCallback(
    (sequenceId: string): number => {
      // Find the task in queue (current or pending)
      const task = queue.find((t) => t.id === sequenceId);

      if (task) {
        // Count messages from all 'messages' steps in the sequence
        let totalCount = 0;
        for (const step of task.sequence) {
          if (step.type === 'messages') {
            totalCount += step.messages.length;
          }
        }
        return totalCount;
      }

      // If not in queue, count messages already added (sequence completed)
      const existingMessages = messages.filter((m) => m.sequenceId === sequenceId);
      return existingMessages.length > 0 ? existingMessages.length : 0;
    },
    [queue, messages],
  );

  return (
    <MascotContext.Provider
      value={{
        messages,
        currentReaction,
        isPlaying,
        queueLength: queue.length,
        queueDurationMs,
        isMascotInViewport,
        isTransitioning,
        playSequence,
        showReaction,
        sayMessages,
        say,
        pause,
        clearQueue,
        clearMessages,
        skipCurrent,
        getSequenceDuration,
        setIsMascotInViewport,
        shouldPlayInitialSequence,
        getSequenceMessageCount,
      }}
    >
      {children}
    </MascotContext.Provider>
  );
}

// ============================================================
// UTILITIES
// ============================================================

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
