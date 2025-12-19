import { LessonLobbyPage } from '@/domains/app/pages/lesson-lobby-page';

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return <LessonLobbyPage lessonId={lessonId} />;
}
