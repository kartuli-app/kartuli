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

const maxNumberOfCharactersForExamples = 19;

// this function will try to get 2 or 3 example words for the given Georgian letter
// 1 split phrases into words (by space)
// 2 unify repeated words (set)
// 3 find the words that contain the letter
// 4 sort the words by ourrences count
// 5 get the 3 first words, if the sum of characters is bigger than maxNumberOfCharactersForExamples, return the 2 first words
const getExampleWordsForGeorgianLetter = (letter: string) => {
  const words = PHRASES_IN_GEORGIANFOR_EXAMPLES.flatMap((phrase) => phrase.split(' '));
  const uniqueWords = [...new Set(words)];
  const wordsThatContainTheLetter = uniqueWords.filter((word) => word.includes(letter));
  const sortedWords = wordsThatContainTheLetter.toSorted((a, b) => {
    const aCount = a.split(letter).length - 1;
    const bCount = b.split(letter).length - 1;
    return bCount - aCount;
  });
  const exampleWords = sortedWords.slice(0, 3);
  const totalNumberOfCharacters = exampleWords.reduce((acc, word) => acc + word.length, 0);
  if (totalNumberOfCharacters > maxNumberOfCharactersForExamples) {
    return exampleWords.slice(0, 2);
  }
  return exampleWords;
};

function StudyNoteBadge({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-p-spacing-2 py-p-spacing-1',
        'bg-s-color-shell-status-bg text-s-color-shell-status-content-primary',
        'font-bold uppercase',
        'text-xs md:text-xl',
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
        'flex flex-col items-center gap-p-spacing-1',
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

  return (
    <div
      className={cn(
        'flex flex-wrap',
        'justify-center',
        'w-full',
        'gap-p-spacing-3',
        'gap-y-p-spacing-1',
        'text-md md:text-3xl',
        'text-s-color-panel-content-secondary',
        // 'border',
      )}
    >
      {note.examples.map((example) => (
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
        'px-p-spacing-2',
        'gap-p-spacing-3',
        'gap-y-p-spacing-1',
        'text-md md:text-3xl',
        'text-s-color-panel-content-secondary',
        // 'border',
        'uppercase',
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
  note?: InfoNote;
}>) {
  const { t } = useTranslation('study');
  const isFallback = !note;
  const text = note?.text ?? t('notes.default_text');

  return (
    <div
      className={cn(
        'w-full',
        'overflow-hidden',
        'px-4',
        'text-center',
        'text-sm',
        'leading-5',
        'text-ellipsis',
        'text-s-color-panel-content-secondary',
        'whitespace-nowrap',
        // 'border',
        // isFallback && 'opacity-70',
      )}
    >
      {text}
    </div>
  );
}

function getPronunciationHintNote(notes: ReadonlyArray<LetterItem['notes'][number]>) {
  return notes.find((note) => note.kind === 'pronunciation_hint');
}

function getInfoNote(notes: ReadonlyArray<LetterItem['notes'][number]>) {
  return notes.find((note) => note.kind === 'info');
}

export function LetterStudyNotes({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'id' | 'targetScript' | 'notes'>;
}>) {
  const { t } = useTranslation('study');
  const infoNote = getInfoNote(item.notes);

  return (
    <LetterStudyNoteCell className="min-h-0 w-full">
      <div className="flex flex-col gap-p-spacing-2 w-full">
        <InfoNoteDetail note={infoNote} />
        <InfoNoteDetail note={infoNote} />
      </div>
    </LetterStudyNoteCell>
  );
}

export function LetterStudyExamples({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'id' | 'targetScript' | 'notes'>;
}>) {
  const { t } = useTranslation('study');
  const pronunciationHintNote = getPronunciationHintNote(item.notes);

  return (
    <div className="grid min-h-0 w-full grid-cols-2 gap-p-spacing-2">
      <LetterStudyNoteCell badge={t('notes.badges.like_in')}>
        <PronunciationHintNoteDetail note={pronunciationHintNote} />
      </LetterStudyNoteCell>
      <LetterStudyNoteCell badge={t('notes.badges.examples')}>
        <ExampleNoteDetail item={item} />
      </LetterStudyNoteCell>
    </div>
  );
}
