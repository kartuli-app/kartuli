export interface PronunciationHintNote {
  kind: 'pronunciation_hint';
  highlight: string;
  examples: string[];
}

export interface InfoNote {
  kind: 'info';
  text: string;
}

export type LocalizedLetterNote = InfoNote | PronunciationHintNote;
