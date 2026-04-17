export default {
  //
  app_bar: {
    back: 'Назад',
    search: 'Поиск',
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
      '/translit': 'Транслит',
      '/privacy': 'Конфиденциальность',
      '/terms-and-conditions': 'Т & У',
    },
  },
  //
  dock: {
    main_links: {
      profile: 'Профиль',
      saved: 'Сохранено',
      learn: 'Учить',
      translit: 'Транслит',
    },
    menu: {
      label: 'Ещё',
      close: 'Закрыть',
      links: {
        debug: 'Отладка',
        terms_and_conditions: 'Условия использования',
        privacy: 'Конфиденциальность',
      },
    },
    buttons: {
      profile: 'Профиль',
      saved: 'Сохранено',
      learn: 'Учить',
      more: 'Ещё',
      translit: 'Транслит',
    },
  },
  //
  language_selector: {
    lang_en: 'English',
    lang_ru: 'Русский',
  },
  //
} as const;
