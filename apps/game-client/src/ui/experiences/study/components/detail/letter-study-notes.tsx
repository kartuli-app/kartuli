'use client';

import type { InfoNote, LetterItem, PronunciationHintNote } from '@game-client/learning-content';
import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
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

function StudyNoteBadge({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-p-radius-full px-p-spacing-4 py-p-spacing-1',
        'bg-s-color-panel-status-badge-bg text-s-color-panel-status-badge-content-primary',
        'font-bold uppercase',
        'text-sm md:text-xl',
      )}
    >
      {children}
    </span>
  );
}

function LetterStudyNoteCell({
  badge,
  className,
  children,
}: Readonly<{
  badge?: string;
  className?: string;
  children: ReactNode;
}>) {
  return (
    <div
      className={cn(
        //
        // 'border',
        'flex flex-col items-center gap-p-spacing-2',
        className,
      )}
    >
      {badge && <StudyNoteBadge>{badge}</StudyNoteBadge>}
      {children}
    </div>
  );
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
        'flex flex-wrap',
        'justify-center',
        'w-full',
        'gap-p-spacing-2',
        'gap-y-p-spacing-1',
        'text-md md:text-xl',
        'text-s-color-panel-content-secondary',
      )}
    >
      {examples.map((example) => (
        <div key={`${note.kind}-${example}`} className="flex">
          <span key={`${note.kind}-${note.highlight}-${example}`}>
            <HighlightedText highlight={note.highlight} text={example} />
          </span>
        </div>
      ))}
    </div>
  );
}

function ExampleNoteDetail({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'id' | 'targetScript'>;
}>) {
  const georgianLetter = item.targetScript;
  const examples = getExampleWordsForGeorgianLetter(georgianLetter);

  return (
    <div
      className={cn(
        'flex flex-wrap',
        'justify-center',
        'w-full',
        'px-p-spacing-1',
        'gap-p-spacing-2',
        'gap-y-p-spacing-1',
        'text-md md:text-xl',
        'text-s-color-panel-content-secondary',
        'uppercase',
        'mt-p-spacing-1',
        'font-georgian',
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

function InfoNoteDetail({
  note,
}: Readonly<{
  note: InfoNote;
}>) {
  return (
    <div
      className={cn(
        'flex flex-wrap',
        'justify-center',
        'w-full',
        'gap-p-spacing-2',
        'text-md md:text-xl',
        'text-s-color-panel-content-secondary',
        // 'border',
      )}
    >
      {note.text}
    </div>
  );
}

function getPronunciationHintNote(notes: ReadonlyArray<LetterItem['notes'][number]>) {
  return notes.find((note) => note.kind === 'pronunciation_hint');
}

function getInfoTextNotes(notes: ReadonlyArray<LetterItem['notes'][number]>) {
  return notes.filter((note): note is InfoNote => note.kind === 'info_text').slice(0, 2);
}

function renderPronunciationHintNote(note?: PronunciationHintNote) {
  return <PronunciationHintNoteDetail note={note} />;
}

function renderRuntimeExamples(item: Pick<LetterItem, 'id' | 'targetScript'>) {
  return <ExampleNoteDetail item={item} />;
}

function renderInfoTextNotes(notes: ReadonlyArray<InfoNote>) {
  return (
    <LetterStudyNoteCell
      className={cn(
        //
        // 'border',
        'min-h-0',
        'h-16',
        'md:h-22',
        'w-full mx-auto ',
        'max-w-[500px]',
        'items-start',
        'justify-start',
      )}
    >
      <div className="flex w-full flex-col gap-p-spacing-2">
        {notes.map((note) => (
          <InfoNoteDetail key={`${note.kind}-${note.text}`} note={note} />
        ))}
      </div>
    </LetterStudyNoteCell>
  );
}

export function LetterStudyNotes({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'id' | 'targetScript' | 'notes'>;
}>) {
  return renderInfoTextNotes(getInfoTextNotes(item.notes));
}

export function LetterStudyExamples({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'id' | 'targetScript' | 'notes'>;
}>) {
  const { t } = useTranslation('study');
  const pronunciationHintNote = getPronunciationHintNote(item.notes);

  return (
    <div
      className={cn(
        //
        'grid min-h-0 w-full grid-cols-2 gap-p-spacing-2',
        // 'border',
      )}
    >
      <LetterStudyNoteCell badge={t('notes.badges.like_in')} className="min-w-0">
        {renderPronunciationHintNote(pronunciationHintNote)}
      </LetterStudyNoteCell>
      <LetterStudyNoteCell badge={t('notes.badges.examples')} className="min-w-0">
        {renderRuntimeExamples(item)}
      </LetterStudyNoteCell>
    </div>
  );
}
