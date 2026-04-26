export default {
  //
  app_bar: {
    back: 'Назад',
    mascot: 'Мышка',
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
  accessibility: {
    skip_to_main: 'Перейти к основному содержимому',
    landmarks: {
      sections: 'Разделы',
    },
  },
  //
} as const;
