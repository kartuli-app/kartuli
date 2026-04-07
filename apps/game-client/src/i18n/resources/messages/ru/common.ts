export default {
  //

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
      '/saved': 'Сохранено',
      '/profile': 'Профиль',
      '/learn': 'Учить',
      '/search': 'Поиск',
      '/debug': 'Отладка',
      '/not-found': 'Не найдено',
    },
  },
  dock: {
    buttons: {
      profile: 'Профиль',
      saved: 'Сохранено',
      learn: 'Учить',
      search: 'Поиск',
      more: 'Ещё',
    },
  },
  //
  language_selector: {
    lang_en: 'English',
    lang_ru: 'Русский',
  },
  //
} as const;
