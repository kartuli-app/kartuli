import { getMessagesForLocale, type SupportedLocale } from '@game-client/i18n';
import { getLibraryServer } from '@game-client/learning-content/library/get-library-server';
import type { Lesson, LetterItem, Library } from '@game-client/learning-content/library/library';
import { Panel } from '@game-client/ui/components/panel/panel';
import { PanelHeader } from '@game-client/ui/components/panel/panel-header';
import { PanelSection } from '@game-client/ui/components/panel/panel-section';
import { ModuleCardsLayout } from '@game-client/ui/experiences/explore/components/module-cards-layout';
import { cn } from '@kartuli/ui/utils/cn';
import Link from 'next/link';
import { PiStudent } from 'react-icons/pi';
import { LettersPreviewGrid } from './components/letters-preview-grid';

interface AlphabetLesson {
  id: string;
  name: string;
  items: LetterItem[];
}

function getDataFromLibrary(library: Library) {
  const lessons = library.lessons.filter((lesson: Lesson) =>
    lesson.id.startsWith('lesson-alphabet-'),
  );
  const alphabetLessons = lessons.map(
    (lesson: Lesson): AlphabetLesson => ({
      id: lesson.id,
      name: lesson.title,
      items: lesson.itemIds
        .map((itemId: string) => library.letterItemsById.get(itemId))
        .filter((item): item is LetterItem => item !== undefined),
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

const linkCardClassName = cn(
  'flex grow cursor-pointer active:scale-95',
  'focus-visible:ring-(length:--s-width-focus-ring)',
  'focus-visible:ring-s-color-panel-border-hover',
  'outline-none',
  'rounded-p-radius-1',
);

export async function AlphabetExploreContent({ locale }: Readonly<{ locale: SupportedLocale }>) {
  const alphabetMessages = getMessagesForLocale(locale, 'alphabet');
  const library = await getLibraryServer(locale);
  const { lessons, allItemsDeduplicated, moduleId } = getDataFromLibrary(library);
  return (
    <ModuleCardsLayout
      lessonCards={lessons.map((lesson) => (
        <Link
          href={`/${locale}/study/lesson/${lesson.id}`}
          key={lesson.id}
          className={cn(
            //
            linkCardClassName,
          )}
        >
          <Panel className="hover:border-s-color-panel-border-hover">
            <PanelHeader context={alphabetMessages.title} title={lesson.name} variant="default" />
            <PanelSection className="flex gap-4">
              <LettersPreviewGrid items={lesson.items} size="grid-item" />
            </PanelSection>
          </Panel>
        </Link>
      ))}
      fullReviewCard={
        moduleId ? (
          <Link
            href={`/${locale}/study/module/${moduleId}`}
            className={cn(
              //
              linkCardClassName,
            )}
          >
            <Panel className="hover:border-s-color-panel-border-hover">
              <PanelHeader
                context={alphabetMessages.title}
                title={alphabetMessages.full_review}
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
