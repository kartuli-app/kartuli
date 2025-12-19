'use client';

import { useParams } from 'next/navigation';
import { LessonLobbyPage } from '@/domains/app/pages/lesson-lobby-page';

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  return <LessonLobbyPage lessonId={lessonId} />;
}
