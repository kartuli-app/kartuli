export default {
  nav: {
    previous: 'Назад',
    prev_short: 'Назад',
    next: 'Вперёд',
    summary: 'Главная',
  },
  play_now: 'Играть',
  status: {
    letters: 'букв',
  },
  summary: {
    tap_hint: 'НАЖМИТЕ НА ЛЮБОЙ ЭЛЕМЕНТ',
    open_item: 'Открыть {{letter}}',
  },
  detail: {
    badges: {
      item_type_letter: 'Буква',
      status_new: 'Новая',
    },
  },
  notes: {
    badges: {
      like_in: 'как в',
      examples: 'примеры',
      audio: 'аудио',
      notes: 'заметки',
    },
    default_text: 'Скоро здесь появятся заметки.',
    audio: {
      play_label: 'Воспроизвести аудио',
      stop_label: 'Остановить аудио',
    },
    favorite: {
      add_label: 'Добавить в избранное',
      remove_label: 'Убрать из избранного',
      toast_added: 'Буква {{letter}} добавлена в избранное',
      toast_removed: 'Буква {{letter}} убрана из избранного',
    },
  },
} as const;
