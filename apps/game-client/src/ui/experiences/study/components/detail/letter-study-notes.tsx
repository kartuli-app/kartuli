'use client';

import type { LocalizedLetterNote, PronunciationHintNote } from '@game-client/learning-content';
import { useTranslation } from 'react-i18next';
import { HighlightedText } from './highlighted-text';
import { StudyNoteBadge } from './study-note-badge';

function PronunciationHintNoteDetail({
  note,
}: Readonly<{
  note: PronunciationHintNote;
}>) {
  const { t } = useTranslation('study');

  return (
    <p className="max-w-[90%] text-center text-xl leading-relaxed text-s-color-panel-content-secondary">
      {t('notes.pronunciation_hint.like')}{' '}
      <strong className="font-bold text-s-color-panel-content-primary">{note.highlight}</strong>{' '}
      {t('notes.pronunciation_hint.in')}{' '}
      {note.examples.map((example, exampleIndex) => (
        <span key={`${note.kind}-${note.highlight}-${example}`}>
          {exampleIndex > 0 ? ', ' : null}
          <HighlightedText highlight={note.highlight} text={example} />
        </span>
      ))}
    </p>
  );
}

function renderLetterNote(note: LocalizedLetterNote, noteIndex: number) {
  switch (note.kind) {
    case 'pronunciation_hint':
      return <PronunciationHintNoteDetail key={`${note.kind}-${noteIndex}`} note={note} />;
  }
}

export function LetterStudyNotes({
  notes,
}: Readonly<{
  notes: ReadonlyArray<LocalizedLetterNote>;
}>) {
  const { t } = useTranslation('study');

  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="flex max-w-full flex-col items-center gap-4">
      {notes.map((note, noteIndex) => (
        <div key={`${note.kind}-${noteIndex}`} className="flex flex-col items-center gap-2">
          <StudyNoteBadge>{t(`notes.kinds.${note.kind}`)}</StudyNoteBadge>
          {renderLetterNote(note, noteIndex)}
        </div>
      ))}
    </div>
  );
}
