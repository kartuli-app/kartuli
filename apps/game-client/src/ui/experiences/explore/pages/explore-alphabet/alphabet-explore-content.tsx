import { getLibraryServer } from '@game-client/learning-content/library/get-library-server';
import type { Lesson, LetterItem, Library } from '@game-client/learning-content/library/library';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelHeader } from '@game-client/ui/components/panel/panel-header';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { ModuleCardsLayout } from '@game-client/ui/experiences/explore/components/module-cards-layout';
import Link from 'next/link';
import { PiStudent } from 'react-icons/pi';
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
          className="flex grow cursor-pointer active:scale-95"
        >
          <Panel className="hover:border-s-color-panel-border-hover">
            <PanelHeader context="Alphabet" title={lesson.name} variant="default" />
            <PanelSection className="flex gap-4">
              <LettersPreviewGrid items={lesson.items} size="grid-item" />
            </PanelSection>
          </Panel>
        </Link>
      ))}
      fullReviewCard={
        moduleId ? (
          <Link
            href={`/en/study/module/${moduleId}`}
            className="flex grow cursor-pointer active:scale-95"
          >
            <Panel className="hover:border-s-color-panel-border-hover">
              <PanelHeader
                context="Alphabet"
                title="Full Review"
                variant="inverted"
                leading={<PiStudent className="size-11" aria-hidden="true" />}
              />
              <PanelSection className="flex gap-4">
                <LettersPreviewGrid items={allItemsDeduplicated} size="full" />
              </PanelSection>
            </Panel>
          </Link>
        ) : undefined
      }
    />
  );
}
