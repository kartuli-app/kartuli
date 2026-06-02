export interface PronunciationHintNote {
  kind: 'pronunciation_hint';
  highlight: string;
  examples: string[];
}

export type LocalizedLetterNote = PronunciationHintNote;
