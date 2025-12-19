'use client';

import { useParams } from 'next/navigation';
import { GamePage } from '@/domains/app/pages/game-page';

export default function GameRoutePage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  return <GamePage lessonId={lessonId} />;
}
