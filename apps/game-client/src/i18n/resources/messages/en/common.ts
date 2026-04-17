export default {
  //
  app_bar: {
    back: 'Back',
    search: 'Search',
    sound_enabled: 'Sound enabled',
    sound_disabled: 'Sound disabled',
    enable_sound: 'Enable sound',
    disable_sound: 'Disable sound',
    mascot: 'Mascot',
    offline_indicator: 'Offline indicator',
    //
    page_titles_by_pathname: {
      '/saved': 'Saved',
      '/profile': 'Profile',
      '/learn': 'Learn',
      '/search': 'Search',
      '/debug': 'Debug',
      '/not-found': 'Not Found',
      '/translit': 'Translit',
      '/privacy': 'Privacy',
      '/terms-and-conditions': 'Term',
    },
  },
  //
  dock: {
    main_links: {
      profile: 'Profile',
      saved: 'Saved',
      learn: 'Learn',
      translit: 'Translit',
    },
    menu: {
      label: 'More',
      close: 'Close',
      links: {
        debug: 'Debug',
        terms_and_conditions: 'Terms and Conditions',
        privacy: 'Privacy',
      },
    },
  },
  //
  language_selector: {
    lang_en: 'English',
    lang_ru: 'Русский',
  },
  //
} as const;
