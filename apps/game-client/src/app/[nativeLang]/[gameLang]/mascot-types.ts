// ============================================================
// MESSAGE TYPES
// ============================================================

export type MessageVariant = 'default' | 'bold' | 'emoji';

export interface Message {
  id: string;
  text: string;
  variant?: MessageVariant;
  timestamp: number;
  // Links back to the activity that created it
  sequenceId: string;
  activityType: ActivityType;
  // Emotion state when message was created (persists for grouping)
  reaction: string | null;
}

// ============================================================
// ACTIVITY TYPES
// ============================================================

export type ActivityType =
  | 'intro'
  | 'game_started'
  | 'game_completed'
  | 'round_completed'
  | 'recommendation'
  | 'profile_update'
  | 'achievement'
  | 'tip'
  | 'general';

// ============================================================
// SEQUENCE TYPES
// ============================================================

export type SequenceStep =
  | { type: 'reaction'; emoji: string; duration: number }
  | {
      type: 'messages';
      messages: Omit<Message, 'id' | 'timestamp' | 'sequenceId' | 'activityType' | 'reaction'>[];
      delayBetween: number;
    }
  | { type: 'pause'; duration: number };

export type Sequence = SequenceStep[];

// ============================================================
// METADATA
// ============================================================

export interface SequenceMetadata {
  /** When this sequence was triggered */
  triggeredAt: number;

  /** What type of activity triggered this */
  activityType: ActivityType;

  /** Icon for this activity (shown in feed/timeline) */
  icon?: string;

  /** Arbitrary context data */
  context?: Record<string, unknown>;
}

// ============================================================
// QUEUE
// ============================================================

export interface QueueTask {
  id: string;
  sequence: Sequence;
  metadata: SequenceMetadata;
  resolve: () => void; // Promise resolver
}
