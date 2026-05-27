export const STUDY_SWIPE_MIN_DISTANCE_THRESHOLD = 56;
export const STUDY_SWIPE_DISTANCE_RATIO_THRESHOLD = 0.12;
export const STUDY_SWIPE_VELOCITY_THRESHOLD = 520;

export type StudySwipeNavigationDirection = 'forward' | 'back' | null;

export function getStudySwipeDistanceThreshold(slideWidth: number): number {
  return Math.max(
    STUDY_SWIPE_MIN_DISTANCE_THRESHOLD,
    slideWidth * STUDY_SWIPE_DISTANCE_RATIO_THRESHOLD,
  );
}

export function getStudySwipeNavigationDirection({
  offsetX,
  velocityX,
  slideWidth,
}: Readonly<{
  offsetX: number;
  velocityX: number;
  slideWidth: number;
}>): StudySwipeNavigationDirection {
  const distanceThreshold = getStudySwipeDistanceThreshold(slideWidth);

  if (offsetX <= -distanceThreshold) return 'forward';
  if (offsetX >= distanceThreshold) return 'back';

  if (velocityX <= -STUDY_SWIPE_VELOCITY_THRESHOLD) return 'forward';
  if (velocityX >= STUDY_SWIPE_VELOCITY_THRESHOLD) return 'back';

  return null;
}
