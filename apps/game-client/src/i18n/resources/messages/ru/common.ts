export default {
  //
  app_bar: {
    back: 'Назад',
    sound_enabled: 'Звук включен',
    sound_disabled: 'Звук выключен',
    enable_sound: 'Включить звук',
    disable_sound: 'Выключить звук',
    mascot: 'Мышка',
    offline_indicator: 'Нет интернета',
    //
    page_titles_by_pathname: {
      '/learn': 'Учить',
      '/not-found': 'Не найдено',
      '/translit': 'Транслит',
    },
  },
  //
  dock: {
    main_links: {
      learn: 'Учить',
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
