export interface PronunciationHintNote {
  kind: 'pronunciation_hint';
  highlight: string;
  examples: string[];
}

export interface InfoNote {
  kind: 'info_text';
  text: string;
}

export type LocalizedLetterNote = InfoNote | PronunciationHintNote;
