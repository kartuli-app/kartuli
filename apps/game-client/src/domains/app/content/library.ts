export type ItemType = 'letter' | 'word' | 'rule';

export interface BaseItem {
  id: string;
  type: ItemType;
}

export interface LetterItem extends BaseItem {
  type: 'letter';
  targetScript: string;
  transliteration: string;
  nativeName: string;
  ipa: string;
  pronunciationHint: string;
  soundCategory: string;
  drawingGuide?: {
    imageUrl?: string;
    animationUrl?: string;
    description?: string;
  };
}

export const letters: LetterItem[] = [
  {
    id: 'letter-ani',
    type: 'letter',
    targetScript: 'ა',
    transliteration: 'a',
    nativeName: 'Ani',
    ipa: 'a',
    pronunciationHint: "like 'a' in 'father'",
    soundCategory: 'vowel',
  },
  {
    id: 'letter-bani',
    type: 'letter',
    targetScript: 'ბ',
    transliteration: 'b',
    nativeName: 'bani',
    ipa: 'b',
    pronunciationHint: "like 'b' in 'bed'",
    soundCategory: 'stop',
  },
  {
    id: 'letter-gani',
    type: 'letter',
    targetScript: 'გ',
    transliteration: 'g',
    nativeName: 'gani',
    ipa: 'g',
    pronunciationHint: "like 'g' in 'go'",
    soundCategory: 'stop',
  },
  {
    id: 'letter-doni',
    type: 'letter',
    targetScript: 'დ',
    transliteration: 'd',
    nativeName: 'doni',
    ipa: 'd',
    pronunciationHint: "like 'd' in 'dog'",
    soundCategory: 'stop',
  },
  {
    id: 'letter-eni',
    type: 'letter',
    targetScript: 'ე',
    transliteration: 'e',
    nativeName: 'eni',
    ipa: 'ɛ',
    pronunciationHint: "like 'e' in 'bed'",
    soundCategory: 'vowel',
  },
  {
    id: 'letter-vini',
    type: 'letter',
    targetScript: 'ვ',
    transliteration: 'v',
    nativeName: 'vini',
    ipa: 'v',
    pronunciationHint: "like 'v' in 'voice'",
    soundCategory: 'fricative',
  },
  {
    id: 'letter-zeni',
    type: 'letter',
    targetScript: 'ზ',
    transliteration: 'z',
    nativeName: 'zeni',
    ipa: 'z',
    pronunciationHint: "like 'z' in 'zoo'",
    soundCategory: 'fricative',
  },
  {
    id: 'letter-tani',
    type: 'letter',
    targetScript: 'თ',
    transliteration: 't',
    nativeName: 'tani',
    ipa: 'tʰ',
    pronunciationHint: "like 't' in 'top' (with a puff of air)",
    soundCategory: 'aspirated',
  },
  {
    id: 'letter-ini',
    type: 'letter',
    targetScript: 'ი',
    transliteration: 'i',
    nativeName: 'ini',
    ipa: 'i',
    pronunciationHint: "like 'ee' in 'see'",
    soundCategory: 'vowel',
  },
  {
    id: 'letter-kani',
    type: 'letter',
    targetScript: 'კ',
    transliteration: "k'",
    nativeName: "k'ani",
    ipa: "k'",
    pronunciationHint: "like 'k' but with a sharp pop (ejective)",
    soundCategory: 'ejective',
  },
  {
    id: 'letter-lasi',
    type: 'letter',
    targetScript: 'ლ',
    transliteration: 'l',
    nativeName: 'lasi',
    ipa: 'l',
    pronunciationHint: "like 'l' in 'love'",
    soundCategory: 'sonorant',
  },
  {
    id: 'letter-mani',
    type: 'letter',
    targetScript: 'მ',
    transliteration: 'm',
    nativeName: 'mani',
    ipa: 'm',
    pronunciationHint: "like 'm' in 'mom'",
    soundCategory: 'sonorant',
  },
  {
    id: 'letter-nari',
    type: 'letter',
    targetScript: 'ნ',
    transliteration: 'n',
    nativeName: 'nari',
    ipa: 'n',
    pronunciationHint: "like 'n' in 'no'",
    soundCategory: 'sonorant',
  },
  {
    id: 'letter-oni',
    type: 'letter',
    targetScript: 'ო',
    transliteration: 'o',
    nativeName: 'oni',
    ipa: 'ɔ',
    pronunciationHint: "like 'o' in 'or'",
    soundCategory: 'vowel',
  },
  {
    id: 'letter-pari',
    type: 'letter',
    targetScript: 'პ',
    transliteration: "p'",
    nativeName: "p'ari",
    ipa: "p'",
    pronunciationHint: "like 'p' but with a sharp pop (ejective)",
    soundCategory: 'ejective',
  },
  {
    id: 'letter-zhani',
    type: 'letter',
    targetScript: 'ჟ',
    transliteration: 'zh',
    nativeName: 'zhani',
    ipa: 'ʒ',
    pronunciationHint: "like 's' in 'pleasure'",
    soundCategory: 'fricative',
  },
  {
    id: 'letter-rae',
    type: 'letter',
    targetScript: 'რ',
    transliteration: 'r',
    nativeName: 'rae',
    ipa: 'r',
    pronunciationHint: "rolled 'r' (like in Spanish)",
    soundCategory: 'sonorant',
  },
  {
    id: 'letter-sani',
    type: 'letter',
    targetScript: 'ს',
    transliteration: 's',
    nativeName: 'sani',
    ipa: 's',
    pronunciationHint: "like 's' in 'sun'",
    soundCategory: 'fricative',
  },
  {
    id: 'letter-tari',
    type: 'letter',
    targetScript: 'ტ',
    transliteration: "t'",
    nativeName: "t'ari",
    ipa: "t'",
    pronunciationHint: "like 't' but with a sharp pop (ejective)",
    soundCategory: 'ejective',
  },
  {
    id: 'letter-uni',
    type: 'letter',
    targetScript: 'უ',
    transliteration: 'u',
    nativeName: 'uni',
    ipa: 'u',
    pronunciationHint: "like 'u' in 'put'",
    soundCategory: 'vowel',
  },
  {
    id: 'letter-pari-aspirated',
    type: 'letter',
    targetScript: 'ფ',
    transliteration: 'p',
    nativeName: 'pari',
    ipa: 'pʰ',
    pronunciationHint: "like 'p' in 'pot' (with a puff of air)",
    soundCategory: 'aspirated',
  },
  {
    id: 'letter-kani-aspirated',
    type: 'letter',
    targetScript: 'ქ',
    transliteration: 'k',
    nativeName: 'kani',
    ipa: 'kʰ',
    pronunciationHint: "like 'k' in 'kit' (with a puff of air)",
    soundCategory: 'aspirated',
  },
  {
    id: 'letter-ghani',
    type: 'letter',
    targetScript: 'ღ',
    transliteration: 'gh',
    nativeName: 'ghani',
    ipa: 'ɣ',
    pronunciationHint: "gargly 'gh' sound (like French 'r')",
    soundCategory: 'throat',
  },
  {
    id: 'letter-qari',
    type: 'letter',
    targetScript: 'ყ',
    transliteration: "q'",
    nativeName: "q'ari",
    ipa: "q'",
    pronunciationHint: "deep 'k' sound with a sharp pop (ejective)",
    soundCategory: 'ejective',
  },
  {
    id: 'letter-shini',
    type: 'letter',
    targetScript: 'შ',
    transliteration: 'sh',
    nativeName: 'shini',
    ipa: 'ʃ',
    pronunciationHint: "like 'sh' in 'ship'",
    soundCategory: 'fricative',
  },
  {
    id: 'letter-chini',
    type: 'letter',
    targetScript: 'ჩ',
    transliteration: 'ch',
    nativeName: 'chini',
    ipa: 't͡ʃʰ',
    pronunciationHint: "like 'ch' in 'church' (with a puff of air)",
    soundCategory: 'aspirated',
  },
  {
    id: 'letter-tsani',
    type: 'letter',
    targetScript: 'ც',
    transliteration: 'ts',
    nativeName: 'tsani',
    ipa: 't͡sʰ',
    pronunciationHint: "like 'ts' in 'cats' (with a puff of air)",
    soundCategory: 'aspirated',
  },
  {
    id: 'letter-dzili',
    type: 'letter',
    targetScript: 'ძ',
    transliteration: 'dz',
    nativeName: 'dzili',
    ipa: 'd͡z',
    pronunciationHint: "like 'ds' in 'beds'",
    soundCategory: 'affricate',
  },
  {
    id: 'letter-tsili',
    type: 'letter',
    targetScript: 'წ',
    transliteration: "ts'",
    nativeName: "ts'ili",
    ipa: "t͡s'",
    pronunciationHint: "like 'ts' but with a sharp pop (ejective)",
    soundCategory: 'ejective',
  },
  {
    id: 'letter-chari',
    type: 'letter',
    targetScript: 'ჭ',
    transliteration: "ch'",
    nativeName: "ch'ari",
    ipa: "t͡ʃ'",
    pronunciationHint: "like 'ch' but with a sharp pop (ejective)",
    soundCategory: 'ejective',
  },
  {
    id: 'letter-khani',
    type: 'letter',
    targetScript: 'ხ',
    transliteration: 'kh',
    nativeName: 'khani',
    ipa: 'x',
    pronunciationHint: "like 'ch' in Scottish 'loch'",
    soundCategory: 'throat',
  },
  {
    id: 'letter-jani',
    type: 'letter',
    targetScript: 'ჯ',
    transliteration: 'j',
    nativeName: 'jani',
    ipa: 'd͡ʒ',
    pronunciationHint: "like 'j' in 'jump' or 'dg' in 'hedge'",
    soundCategory: 'affricate',
  },
  {
    id: 'letter-hae',
    type: 'letter',
    targetScript: 'ჰ',
    transliteration: 'h',
    nativeName: 'hae',
    ipa: 'h',
    pronunciationHint: "like 'h' in 'hello'",
    soundCategory: 'fricative',
  },
];

export const lettersById: Record<string, LetterItem> = Object.fromEntries(
  letters.map((letter) => [letter.id, letter]),
);

export type Lesson = {
  id: string;
  title: string;
  itemIds: string[];
};

export const lessons: Lesson[] = [
  {
    id: 'lesson-alphabet-vowels',
    title: 'The Five Vowels',
    itemIds: ['letter-ani', 'letter-eni', 'letter-ini', 'letter-oni', 'letter-uni'],
  },
  {
    id: 'lesson-alphabet-sounds-you-know',
    title: 'Sounds You Know',
    itemIds: ['letter-bani', 'letter-gani', 'letter-doni', 'letter-vini', 'letter-zeni'],
  },
  {
    id: 'lesson-alphabet-more-easy-sounds',
    title: 'More Easy Sounds',
    itemIds: [
      'letter-lasi',
      'letter-mani',
      'letter-nari',
      'letter-rae',
      'letter-sani',
      'letter-hae',
    ],
  },
  {
    id: 'lesson-alphabet-puff-and-pop',
    title: 'Puff and Pop',
    itemIds: ['letter-tani', 'letter-tari', 'letter-pari-aspirated', 'letter-pari'],
  },
  {
    id: 'lesson-alphabet-k-family',
    title: 'The K Family',
    itemIds: [
      'letter-kani-aspirated',
      'letter-kani',
      'letter-ghani',
      'letter-khani',
      'letter-qari',
    ],
  },
  {
    id: 'lesson-alphabet-hissing-sounds',
    title: 'Hissing Sounds',
    itemIds: ['letter-shini', 'letter-chini', 'letter-tsani', 'letter-tsili', 'letter-chari'],
  },
  {
    id: 'lesson-alphabet-buzzing-sounds',
    title: 'Buzzing Sounds',
    itemIds: ['letter-dzili', 'letter-zhani', 'letter-jani'],
  },
];

export const lessonsById: Record<string, Lesson> = Object.fromEntries(
  lessons.map((lesson) => [lesson.id, lesson]),
);

export type Module = {
  id: string;
  title: string;
  lessonIds: string[];
};

export const modules: Module[] = [
  {
    id: 'module-alphabet',
    title: 'Alphabet',
    lessonIds: [
      'lesson-alphabet-vowels',
      'lesson-alphabet-sounds-you-know',
      'lesson-alphabet-more-easy-sounds',
      'lesson-alphabet-puff-and-pop',
      'lesson-alphabet-k-family',
      'lesson-alphabet-hissing-sounds',
      'lesson-alphabet-buzzing-sounds',
    ],
  },
];

export const modulesById: Record<string, Module> = Object.fromEntries(
  modules.map((module) => [module.id, module]),
);
