export default {
  //
  app_bar: {
    back: 'Назад',
    mascot: 'Мышка',
    offline_indicator: 'Нет интернета',
    //
    page_titles_by_pathname: {
      '/learn': 'Учить',
      '/not-found': 'Не найдено',
      '/settings': 'Настройки',
      '/translit': 'Транслит',
    },
  },
  //
  dock: {
    main_links: {
      learn: 'Учить',
      settings: 'Настройки',
      translit: 'Транслит',
    },
  },
  //
  language_selector: {
    lang_en: 'English',
    lang_ru: 'Русский',
  },
  //
  accessibility: {
    skip_to_main: 'Перейти к основному содержимому',
    language: 'Язык',
    landmarks: {
      sections: 'Разделы',
    },
  },
  //
} as const;
