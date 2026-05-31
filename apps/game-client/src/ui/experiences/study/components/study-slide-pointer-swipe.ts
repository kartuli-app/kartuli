'use client';

import type { MotionValue } from 'motion/react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useRef } from 'react';

export const STUDY_POINTER_GESTURE_SLOP_PX = 10;

export type StudyPointerGestureMode = 'pending' | 'horizontal' | 'vertical';

export function classifyStudyPointerGesture(
  deltaX: number,
  deltaY: number,
  slopPx = STUDY_POINTER_GESTURE_SLOP_PX,
): StudyPointerGestureMode {
  if (Math.abs(deltaX) < slopPx && Math.abs(deltaY) < slopPx) return 'pending';

  return Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
}

export function clampStudyTrackOffsetX(
  dragOffsetX: number,
  currentSlideIndex: number,
  slideStride: number,
  lastSlideIndex: number,
): number {
  const restOffsetX = -currentSlideIndex * slideStride;
  const minOffsetX = -lastSlideIndex * slideStride;
  const maxOffsetX = 0;

  return Math.max(minOffsetX, Math.min(maxOffsetX, restOffsetX + dragOffsetX));
}

interface StudySummarySlidePointerSwipeEndInfo {
  offsetX: number;
  velocityX: number;
}

interface UseStudySummarySlidePointerSwipeOptions {
  enabled: boolean;
  currentSlideIndex: number;
  slideStride: number;
  lastSlideIndex: number;
  trackX: MotionValue<number>;
  stopTrackAnimation: () => void;
  onSwipeEnd: (info: StudySummarySlidePointerSwipeEndInfo) => void;
}

interface PointerGestureState {
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastTime: number;
  velocityX: number;
  mode: StudyPointerGestureMode;
  captureTarget: HTMLElement | null;
}

function createInitialGestureState(): PointerGestureState {
  return {
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0,
    mode: 'pending',
    captureTarget: null,
  };
}

export function useStudySummarySlidePointerSwipe({
  enabled,
  currentSlideIndex,
  slideStride,
  lastSlideIndex,
  trackX,
  stopTrackAnimation,
  onSwipeEnd,
}: UseStudySummarySlidePointerSwipeOptions) {
  const gestureRef = useRef<PointerGestureState>(createInitialGestureState());

  const releaseCapturedPointer = () => {
    const gesture = gestureRef.current;

    if (!gesture.captureTarget || gesture.pointerId === -1) return;

    try {
      gesture.captureTarget.releasePointerCapture(gesture.pointerId);
    } catch {
      // Pointer capture may already be released.
    }
  };

  const resetGesture = () => {
    releaseCapturedPointer();
    gestureRef.current = createInitialGestureState();
  };

  const onPointerDownCapture = (event: ReactPointerEvent<HTMLElement>) => {
    if (!enabled || !event.isPrimary || event.button !== 0) return;

    stopTrackAnimation();

    const gesture = gestureRef.current;
    gesture.pointerId = event.pointerId;
    gesture.startX = event.clientX;
    gesture.startY = event.clientY;
    gesture.lastX = event.clientX;
    gesture.lastTime = event.timeStamp;
    gesture.velocityX = 0;
    gesture.mode = 'pending';
    gesture.captureTarget = event.currentTarget;
    // Capture is deferred to the first horizontal move so that taps on child
    // buttons still receive their click event (setPointerCapture re-targets
    // pointerup — and therefore click — to the capturing element).
  };

  const onPointerMoveCapture = (event: ReactPointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (!enabled || event.pointerId !== gesture.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (gesture.mode === 'pending') {
      const mode = classifyStudyPointerGesture(deltaX, deltaY);

      if (mode === 'pending') return;

      gesture.mode = mode;

      if (mode === 'vertical') {
        resetGesture();
        return;
      }

      gesture.captureTarget?.setPointerCapture(gesture.pointerId);
    }

    if (gesture.mode !== 'horizontal') return;

    event.preventDefault();
    trackX.set(clampStudyTrackOffsetX(deltaX, currentSlideIndex, slideStride, lastSlideIndex));

    const deltaTimeMs = event.timeStamp - gesture.lastTime;

    if (deltaTimeMs > 0) {
      gesture.velocityX = ((event.clientX - gesture.lastX) / deltaTimeMs) * 1000;
    }

    gesture.lastX = event.clientX;
    gesture.lastTime = event.timeStamp;
  };

  const onPointerUpCapture = (event: ReactPointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (!enabled || event.pointerId !== gesture.pointerId) return;

    if (gesture.mode === 'horizontal') {
      event.preventDefault();
      onSwipeEnd({
        offsetX: event.clientX - gesture.startX,
        velocityX: gesture.velocityX,
      });
    }

    resetGesture();
  };

  return {
    onPointerDownCapture,
    onPointerMoveCapture,
    onPointerUpCapture,
    onPointerCancelCapture: onPointerUpCapture,
  };
}
