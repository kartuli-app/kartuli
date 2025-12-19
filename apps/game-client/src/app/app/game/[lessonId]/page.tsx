import { GamePage } from '@/domains/app/pages/game-page';

export default async function GameRoutePage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return <GamePage lessonId={lessonId} />;
}
