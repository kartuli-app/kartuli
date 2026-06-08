'use client';

import type { InfoNote, LetterItem, PronunciationHintNote } from '@game-client/learning-content';
import { PanelBadge } from '@game-client/ui/components/badge/panel-badge';
import { StudyNoteSection } from '@game-client/ui/experiences/study/components/detail/study-note-section';
import { cn } from '@kartuli/ui/utils/cn';
import { HighlightedText } from './highlighted-text';

const PHRASES_IN_GEORGIANFOR_EXAMPLES = [
  'გამარჯობა',
  'ნახვამდის',
  'თუ შეიძლება',
  'მადლობა',
  'კი',
  'არა',
  'სასიამოვნოა',
  'მე მქვია Joe',
  'რა გქვია',
  'როგორ ხარ',
  'კარგად ვარ',
  'ბოდიში',
  'გემრიელია',
  'ვაიმე',
  'ისე რა',
  'კარგი',
  'ვერ გავიგე',
  'ინგლისური',
  'მანქანა',
  'მოტო',
  'ველოსიპედი',
  'ავტობუსი',
  'მეტრო',
  'მატარებელი',
  'ერთი',
  'ორი',
  'სამი',
  'ოთხი',
  'ხუთი',
  'წყალი',
  'ჩაი',
  'ყავა',
  'ლუდი',
  'ღვინო',
  'ჭაჭა',
  'ძაღლი',
  'კატა',
  'ღორი',
  'ძროხა',
  'ქათამი',
  'მე',
  'შენ',
  'ის',
  'ჩვენ',
  'თქვენ',
  'ისინი',
  'მე მინდა',
  'მე მომწონს',
  'მე მესმის',
  'მე მაქვს',
  'მე ვარ',
  'მე ვლაპარაკობ',
  'მე ვცხოვრობ',
  'მე ვმუშაობ',
  'რა',
  'ვინ',
  'როგორ',
  'სად',
];

const MAX_NUMBER_OF_CHARACTERS_FOR_EXAMPLES = 15;
const MINIMUM_NUMBER_OF_EXAMPLES = 1;
const EXAMPLE_SEPARATOR_CHARACTER_COST = 1;

function getExamplesThatFitCharacterLimit(
  examples: ReadonlyArray<string>,
  maxNumberOfCharacters = MAX_NUMBER_OF_CHARACTERS_FOR_EXAMPLES,
) {
  const fittingExamples: string[] = [];
  let currentCharacterCount = 0;

  for (const example of examples) {
    const separatorCharacterCount =
      fittingExamples.length > 0 ? EXAMPLE_SEPARATOR_CHARACTER_COST : 0;
    const nextCharacterCount = currentCharacterCount + separatorCharacterCount + example.length;

    if (
      fittingExamples.length >= MINIMUM_NUMBER_OF_EXAMPLES &&
      nextCharacterCount > maxNumberOfCharacters
    ) {
      break;
    }

    fittingExamples.push(example);
    currentCharacterCount = nextCharacterCount;
  }

  return fittingExamples.slice(0, 2);
}

function getExampleWordsForGeorgianLetter(letter: string) {
  const words = PHRASES_IN_GEORGIANFOR_EXAMPLES.flatMap((phrase) => phrase.split(' '));
  const uniqueWords = [...new Set(words)];
  const wordsThatContainTheLetter = uniqueWords.filter((word) => word.includes(letter));
  const sortedWords = wordsThatContainTheLetter.toSorted((a, b) => {
    const aCount = a.split(letter).length - 1;
    const bCount = b.split(letter).length - 1;
    return bCount - aCount;
  });

  return getExamplesThatFitCharacterLimit(sortedWords);
}

function getPronunciationHintNote(notes: ReadonlyArray<LetterItem['notes'][number]>) {
  return notes.find((note) => note.kind === 'pronunciation_hint');
}

function getInfoTextNotes(notes: ReadonlyArray<LetterItem['notes'][number]>) {
  return notes.filter((note): note is InfoNote => note.kind === 'info_text').slice(0, 2);
}

function PronunciationHintNoteDetail({
  note,
}: Readonly<{
  note?: PronunciationHintNote;
}>) {
  if (!note) {
    return <div className="h-full w-full" />;
  }

  const examples = getExamplesThatFitCharacterLimit(note.examples);

  return (
    <div
      className={cn(
        'flex w-full flex-wrap justify-center gap-p-spacing-2 gap-y-p-spacing-1',
        'text-md text-s-color-panel-content-secondary md:text-xl',
      )}
    >
      {examples.map((example) => (
        <div key={`${note.kind}-${example}`} className="flex">
          <span>
            <HighlightedText highlight={note.highlight} text={example} />
          </span>
        </div>
      ))}
    </div>
  );
}

function RuntimeExamplesDetail({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'id' | 'targetScript'>;
}>) {
  const examples = getExampleWordsForGeorgianLetter(item.targetScript);

  return (
    <div
      className={cn(
        'mt-p-spacing-1 flex w-full flex-wrap justify-center gap-p-spacing-2 gap-y-p-spacing-1 px-p-spacing-1',
        'font-georgian text-md text-s-color-panel-content-secondary uppercase md:text-xl',
      )}
    >
      {examples.map((example) => (
        <div key={`${item.id}-${example}`} className="flex">
          <span>
            <HighlightedText highlight={item.targetScript} text={example} />
          </span>
        </div>
      ))}
    </div>
  );
}

function InfoTextNoteDetail({
  note,
}: Readonly<{
  note: InfoNote;
}>) {
  return (
    <div
      className={cn(
        'flex w-full flex-wrap justify-center gap-p-spacing-2',
        'text-md text-s-color-panel-content-secondary md:text-xl',
      )}
    >
      {note.text}
    </div>
  );
}

export function PronunciationHintSection({
  badgeLabel,
  notes,
}: Readonly<{
  badgeLabel: string;
  notes: ReadonlyArray<LetterItem['notes'][number]>;
}>) {
  return (
    <StudyNoteSection
      badge={<PanelBadge variant="neutral">{badgeLabel}</PanelBadge>}
      className="min-w-0"
    >
      <PronunciationHintNoteDetail note={getPronunciationHintNote(notes)} />
    </StudyNoteSection>
  );
}

export function RuntimeExamplesSection({
  badgeLabel,
  item,
}: Readonly<{
  badgeLabel: string;
  item: Pick<LetterItem, 'id' | 'targetScript'>;
}>) {
  return (
    <StudyNoteSection
      badge={<PanelBadge variant="neutral">{badgeLabel}</PanelBadge>}
      className="min-w-0"
    >
      <RuntimeExamplesDetail item={item} />
    </StudyNoteSection>
  );
}

export function InfoTextNotesSection({
  notes,
}: Readonly<{
  notes: ReadonlyArray<LetterItem['notes'][number]>;
}>) {
  const infoTextNotes = getInfoTextNotes(notes);

  if (infoTextNotes.length === 0) {
    return null;
  }

  return (
    <StudyNoteSection
      align="start"
      className={cn('mx-auto h-16 w-full max-w-[500px] justify-start md:h-22')}
    >
      <div className="flex w-full flex-col gap-p-spacing-2">
        {infoTextNotes.map((note) => (
          <InfoTextNoteDetail key={`${note.kind}-${note.text}`} note={note} />
        ))}
      </div>
    </StudyNoteSection>
  );
}
