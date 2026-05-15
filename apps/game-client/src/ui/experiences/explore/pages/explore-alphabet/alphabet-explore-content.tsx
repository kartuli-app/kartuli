import { getLibraryServer } from '@game-client/learning-content/library/get-library-server';
import type { Lesson, LetterItem, Library } from '@game-client/learning-content/library/library';
import { ContentCard } from '@game-client/ui/experiences/explore/components/content-card/content-card';
import { ModuleCardsLayout } from '@game-client/ui/experiences/explore/components/module-cards-layout';
import Link from 'next/link';
import { LettersPreviewGrid } from './components/letters-preview-grid';

type AlphabetLesson = {
  id: string;
  name: string;
  items: LetterItem[];
};

function getDataFromLibrary(library: Library) {
  const lessons = library.lessons.filter((lesson: Lesson) =>
    lesson.id.startsWith('lesson-alphabet-'),
  );
  const alphabetLessons = lessons.map(
    (lesson: Lesson): AlphabetLesson => ({
      id: lesson.id,
      name: lesson.title,
      items: lesson.itemIds.map(
        (itemId: string) => library.letterItemsById.get(itemId) as LetterItem,
      ),
    }),
  );
  const allItemsDeduplicated = alphabetLessons
    .flatMap((lesson) => lesson.items)
    .filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));
  const alphabetLessonIds = new Set(lessons.map((l) => l.id));
  const alphabetModule = library.modules.find((m) =>
    m.lessonIds.some((id) => alphabetLessonIds.has(id)),
  );
  return { lessons: alphabetLessons, allItemsDeduplicated, moduleId: alphabetModule?.id };
}

export async function AlphabetExploreContent() {
  const library = await getLibraryServer('en');
  const { lessons, allItemsDeduplicated, moduleId } = getDataFromLibrary(library);
  return (
    <ModuleCardsLayout
      lessonCards={lessons.map((lesson) => (
        <Link
          href={`/en/study/lesson/${lesson.id}`}
          key={lesson.id}
          className="flex grow cursor-pointer active:scale-95 group"
        >
          <ContentCard context="Alphabet" title={lesson.name} variant="secondary">
            <LettersPreviewGrid items={lesson.items} size="grid-item" />
          </ContentCard>
        </Link>
      ))}
      fullReviewCard={
        moduleId ? (
          <Link
            href={`/en/study/module/${moduleId}`}
            className="flex grow cursor-pointer active:scale-95 group"
          >
            <ContentCard context="Alphabet" title="Full Review" variant="primary">
              <LettersPreviewGrid items={allItemsDeduplicated} size="full" />
            </ContentCard>
          </Link>
        ) : undefined
      }
    />
  );
}
