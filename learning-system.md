# Learning System – Product Specification + Example Content Pack + Tracking & Gamification

## 1. Purpose

The learning system delivers structured content for **native → target** language pairs, optimized for **offline first learning apps**.
It includes:

* **Metadata** — pack-level info & versioning
* **Letters** — dictionary of alphabet items
* **Words** — dictionary of vocabulary items
* **Modules** — ordered groups of items by theme
* **Lessons** — curated subsets of items (4–10 items per lesson)

**Assets** (images, audio) are shared across all packs.
**Runtime concepts** (groups, games) are generated dynamically; they are **not part of the pack**.

---

## 2. Field Definitions

### Letters

* **id** — stable slug, e.g., `letter_a`
* **glyph** — target script letter, e.g., `ა`
* **name_target** — letter name in target script, e.g., `ანი`
* **name_translit** — latin transliteration of the name, e.g., `ani`
* **label_native** — native language label, e.g., `a`
* **images** — array of SVG paths
* **audios** — array of audio paths
* **usage_native** — short usage hint in native language, e.g., “like ‘a’ in father”

### Words

* **id** — stable slug, e.g., `dog`
* **label_native** — native language label, e.g., `dog`
* **term_target** — target script word, e.g., `ძაღლი`
* **transliteration** — latin transliteration, e.g., `dzaghli`
* **images** — array of image paths
* **audios** — array of audio paths
* **examples** — array of objects with:

  * `sentence_target` — target script sentence
  * `sentence_translit` — optional transliteration
  * `sentence_native` — optional translation

### Modules

* **id** — slug, e.g., `animals`
* **area** — `"alphabet"` or `"vocabulary"`
* **title_native** — display title in native language
* **title_target** — display title in target language (optional)
* **item_type** — `"letter"` or `"word"`
* **item_ids** — ordered array of item ids

### Lessons

* **id** — slug, e.g., `pets`
* **module_id** — reference to parent module
* **title_native** — display title in native language
* **title_target** — display title in target language (optional)
* **item_type** — `"letter"` or `"word"`
* **item_ids** — ordered array of 4–10 item ids

### Metadata

* **pack_id** — language pair, e.g., `en-ka`
* **version** — semantic version, e.g., `0.1`
* **created_at** — ISO date
* **language_target** — target language code
* **language_native** — native language code
* **assets_version** — version of assets
* **description** — human-readable description

### Notes

* `letters` and `words` are stored as **dictionaries** for O(1) lookup.
* `modules` and `lessons` are stored as **ordered arrays** to preserve author-defined order.
* **Gloss/meaning fields are omitted** for simplicity; can be added later if needed.
* **Groups** and **Games** are generated dynamically at runtime and are **not part of the JSON**.

---

## 3. Example Content Pack – en-ka v0.1

```json
{
  "metadata": {
    "pack_id": "en-ka",
    "version": "0.1",
    "created_at": "2025-09-28T00:00:00Z",
    "language_target": "ka",
    "language_native": "en",
    "assets_version": "1.0",
    "description": "English to Georgian beginner pack"
  },

  "letters": {
    "letter_a": {
      "id": "letter_a",
      "glyph": "ა",
      "name_target": "ანი",
      "name_translit": "ani",
      "label_native": "a",
      "images": ["letters/a.svg"],
      "audios": ["letters/a.mp3"],
      "usage_native": "like 'a' in father"
    },
    "letter_b": {
      "id": "letter_b",
      "glyph": "ბ",
      "name_target": "ბანი",
      "name_translit": "bani",
      "label_native": "b",
      "images": ["letters/b.svg"],
      "audios": ["letters/b.mp3"],
      "usage_native": "like 'b' in boy"
    },
    "letter_g": {
      "id": "letter_g",
      "glyph": "გ",
      "name_target": "განი",
      "name_translit": "gani",
      "label_native": "g",
      "images": ["letters/g.svg"],
      "audios": ["letters/g.mp3"],
      "usage_native": "like 'g' in go"
    }
  },

  "words": {
    "dog": {
      "id": "dog",
      "label_native": "dog",
      "term_target": "ძაღლი",
      "transliteration": "dzaghli",
      "images": ["animals/dog.svg"],
      "audios": ["animals/dog.mp3"],
      "examples": [
        {
          "sentence_target": "ძაღლი კუდს ამოძრავებს",
          "sentence_translit": "dzaghli k’uds amodzravebs",
          "sentence_native": "The dog is wagging its tail."
        }
      ]
    },
    "cat": {
      "id": "cat",
      "label_native": "cat",
      "term_target": "კატა",
      "transliteration": "kata",
      "images": ["animals/cat.svg"],
      "audios": ["animals/cat.mp3"],
      "examples": [
        {
          "sentence_target": "კატა ძინავს",
          "sentence_translit": "kata dzinavs",
          "sentence_native": "The cat is sleeping."
        }
      ]
    },
    "cow": {
      "id": "cow",
      "label_native": "cow",
      "term_target": "ძროხა",
      "transliteration": "dzrokha",
      "images": ["animals/cow.svg"],
      "audios": ["animals/cow.mp3"],
      "examples": [
        {
          "sentence_target": "ძროხა ძოვს ბალახს",
          "sentence_translit": "dzrokha dzovs balakhs",
          "sentence_native": "The cow is eating grass."
        }
      ]
    },
    "january": {
      "id": "january",
      "label_native": "January",
      "term_target": "იანვარი",
      "transliteration": "ianvari",
      "images": ["calendar/january.svg"],
      "audios": ["calendar/january.mp3"],
      "examples": [
        {
          "sentence_target": "იანვარი ზამთარშია",
          "sentence_translit": "ianvari zamt’arshia",
          "sentence_native": "January is in winter."
        }
      ]
    },
    "monday": {
      "id": "monday",
      "label_native": "Monday",
      "term_target": "ორშაბათი",
      "transliteration": "orshabati",
      "images": ["calendar/monday.svg"],
      "audios": ["calendar/monday.mp3"],
      "examples": [
        {
          "sentence_target": "ორშაბათი კვირის პირველი დღეა",
          "sentence_translit": "orshabati kviris pirveli dghea",
          "sentence_native": "Monday is the first day of the week."
        }
      ]
    }
  },

  "modules": [
    {
      "id": "animals",
      "area": "vocabulary",
      "title_native": "Animals",
      "title_target": "ცხოველები",
      "item_type": "word",
      "item_ids": ["dog", "cat", "cow"]
    },
    {
      "id": "calendar",
      "area": "vocabulary",
      "title_native": "Calendar",
      "title_target": "კალენდარი",
      "item_type": "word",
      "item_ids": ["january", "monday"]
    }
  ],

  "lessons": [
    {
      "id": "pets",
      "module_id": "animals",
      "title_native": "Pets",
      "title_target": "შინაური ცხოველები",
      "item_type": "word",
      "item_ids": ["dog", "cat"]
    },
    {
      "id": "farm",
      "module_id": "animals",
      "title_native": "Farm Animals",
      "title_target": "ფერმის ცხოველები",
      "item_type": "word",
      "item_ids": ["cow"]
    },
    {
      "id": "months",
      "module_id": "calendar",
      "title_native": "Months",
      "title_target": "თვეები",
      "item_type": "word",
      "item_ids": ["january"]
    },
    {
      "id": "days_of_week",
      "module_id": "calendar",
      "title_native": "Days of the Week",
      "title_target": "კვირის დღეები",
      "item_type": "word",
      "item_ids": ["monday"]
    }
  ]
}
```

---

## 4. Tracking

The **tracking system** stores **raw user data locally**, offline-first. It is **decoupled from gamification rules**, allowing flexible computation of mastery and levels.

### Tracked Metrics

**Per item (letter/word):**

* Number of games played
* Number of correct rounds (wins)
* Number of incorrect rounds (losses)
* Total time spent across games
* **Days played** — array of ISO dates, for streak calculation

**Per game (incremental entry):**

* Items included (IDs)
* Number of rounds per item
* Wins/losses per item
* Total time spent (lobby + minigames + summary)
* Game timestamp

**Global user stats:**

* Total games played
* Total games won (>50% correct rounds)
* Total time spent across all games
* Days played

---

### Consolidation

* **Incremental entries** are stored after each game.
* When entries exceed a threshold (e.g., 20), consolidate:

  * Sum wins/losses **per item ID**
  * Sum total time per item
  * Merge `days_played` arrays (union, no duplicates)
* Consolidation reduces storage and speeds up lookups.
* Item-level data now includes:

```
{
  "wins": 2,
  "losses": 3,
  "time_seconds": 25,
```


"days_played": ["2025-09-28", "2025-09-30"]
}

```

* Global stats are computed from **per-item consolidated data**.

---

### Notes

* Only total time per game is tracked; time per item is derived from consolidation.
* Tracking is **decoupled from gamification**, allowing flexible rules.
* Data is **offline-first**, stored locally, and can be synced later.

---

## 5. Gamification

The **gamification system** computes **mastery and global levels** from consolidated tracking data.

### Item Mastery

* Binary: mastered or not
* Determined by **threshold of correct rounds per item**:

  * Letters: 3–5 wins
  * Words: 5–8 wins
* Extra wins beyond threshold do not affect mastery.

### Global Levels

* Early levels focus on **alphabet mastery**.
* Levels are based on **number of items mastered**, not total games played.
* Example progression:

| Level | Name         | Requirement         |
| ----- | ------------ | ------------------ |
| 0     | Novice       | 0 items mastered   |
| 1     | Beginner     | 5 letters mastered |
| 2     | Learner      | 10 letters mastered|
| 3     | Intermediate | 15 letters mastered|
| 4     | Explorer     | 5 words mastered   |
| 5     | Adept        | 10 words mastered  |
| 6     | Fluent       | 25 words mastered  |
| 7     | Expert       | 50 words mastered  |
| 8     | Master       | 100 words mastered |
| 9     | Polyglot     | 200+ words mastered|

### Modules & Lessons

* Progress is derived from items they contain; no separate thresholds.
* Mastery is binary: either all contained items meet the item threshold or not.

### Notes

* Users **cannot lose mastery** once achieved.
* Points or stars can be added for visual feedback, independent from mastery and levels.
```
