import type { Sequence, SequenceMetadata } from './mascot-types';

// ============================================================
// INITIAL SEQUENCE (on page load)
// ============================================================

export const INITIAL_SEQUENCE: Sequence = [
  { type: 'reaction', emoji: 'Happy', duration: 800 },
  {
    type: 'messages',
    messages: [{ text: 'Intro 1', variant: 'bold' }, { text: 'Intro 2' }, { text: 'Intro 3' }],
    delayBetween: 800,
  },
  { type: 'pause', duration: 3000 },
  {
    type: 'messages',
    messages: [{ text: 'Intro 4', variant: 'bold' }, { text: 'Intro 5' }],
    delayBetween: 800,
  },
  { type: 'reaction', emoji: 'Tail wagging', duration: 800 },
  { type: 'pause', duration: 3000 },
];

export const INITIAL_METADATA: SequenceMetadata = {
  activityType: 'intro',
  triggeredAt: Date.now(),
  icon: '👋',
  context: {
    isFirstVisit: true,
  },
};

// ============================================================
// GAME RECOMMENDATION
// ============================================================

export const GAME_RECOMMENDATION_SEQUENCE: Sequence = [
  { type: 'reaction', emoji: 'Thinking', duration: 5000 },
  {
    type: 'messages',
    messages: [
      { text: "Here's a great game!", variant: 'bold' },
      { text: 'Perfect for beginners' },
      { text: 'Try it now! 🎮' },
    ],
    delayBetween: 800,
  },
  { type: 'reaction', emoji: 'Excited', duration: 800 },
];

export const GAME_RECOMMENDATION_METADATA: SequenceMetadata = {
  activityType: 'recommendation',
  triggeredAt: Date.now(),
  icon: '💡',
  context: {
    gameId: 'intro-lesson',
    difficulty: 'beginner',
  },
};

// ============================================================
// START GAME
// ============================================================

export const START_GAME_SEQUENCE: Sequence = [
  { type: 'reaction', emoji: '🎮', duration: 800 },
  {
    type: 'messages',
    messages: [
      { text: "Let's play!", variant: 'bold' },
      { text: 'Have fun!' },
      { text: 'Good luck! 🍀' },
    ],
    delayBetween: 800,
  },
  { type: 'reaction', emoji: '👍', duration: 800 },
];

export const START_GAME_METADATA: SequenceMetadata = {
  activityType: 'game_started',
  triggeredAt: Date.now(),
  icon: '🎮',
  context: {
    gameId: 'intro-lesson',
  },
};
