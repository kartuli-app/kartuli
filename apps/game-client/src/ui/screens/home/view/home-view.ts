export type HomeModule = {
  id: string;
  title: string;
  lessons: HomeLesson[];
};

export type HomeLesson = {
  id: string;
  title: string;
  items: HomeItem[];
};

export type HomeLetterItem = {
  id: string;
  targetScript: string;
  transliteration: string;
  type: 'letter';
};

export type HomeWordItem = {
  id: string;
  targetScript: string;
  translation: string;
  transliteration: string;
  type: 'word';
};

export type HomeItem = HomeLetterItem | HomeWordItem;

export type HomeView = {
  modules: HomeModule[];
};
