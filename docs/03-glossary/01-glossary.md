This section defines the key terms and concepts used throughout the Kartuli project; All stakeholders should use these terms consistently to ensure clear communication

### Core Language Terms
- **Native Language**: The student's first language or primary language (e.g., English, Ukrainian, Russian, Belarusian, Hindi, Spanish...)
- **Target Language**: The language the student is learning (Georgian)
- **Interface Language**: The language used for the app's UI, menus, and instructions (matches user's native language)

### User Types
- **Students**: Learners who progress through the game client experiences
  - **Anonymous Students**: Play without creating an account; progress remains on the device
  - **Registered Students**: Create an account to enable progress synchronization across devices
- **Volunteers**: Contributors who keep the project running and growing
  - **Admins**: Manage overall project operations and governance
  - **Learning Content Managers**: Curate and maintain content packs
  - **Content Reviewers**: Provide feedback on translations and language accuracy
  - **Technicians**: Collaborate on design, development, marketing, and related operations

### Content Terms
- **Item**: Letter or word entry
- **Letter**: Alphabet entry with glyph, names, transliteration, media, and usage hints
- **Word**: Vocabulary entry with target term, transliteration, media, and example sentences
- **Lesson**: Subset of items of the same type (letters or words, never mixed) that are used to generate dynamic games
- **Module**: Themed collection of lessons defined within the master content pack to structure learning
- **Master Content Pack**: Canonical  dataset for a target language, containing metadata, letters, words, modules, and lessons that all native content packs reference
- **Native Content Pack**: Native language specific pack that augments the master content pack with native language labels, usage hints, and example sentences
- **Content Pack Manifest**: Versioned index describing available master packs and native content packs, used by the client to determine downloads and fallbacks
- **Assets**: Media files (images, audio) shared per target language, referenced by items across the content system
- **Resources**: Links to learning content outside of the kartuli project: books, schools, forums, courses...

### Game Terms
- **Lesson Lobby**: Room with flashcards to learn or review the lesson items; flashcards display mastery and favorite status for each item; games are launched from here
- **Lesson Game**: Dynamic game generated for a lesson, uses the lesson items to create 5 to 20 minigame rounds; finishing a game will update the student activity registry
- **Minigame**: Round for a game with a question and multiple answer options, can be won if the answer is right or failed if the answer is wrong
- **Student activity**: Single record that accumulates wins and fails per item and time spent playing

### Gamification Terms
- **Progress**: Information computed (not stored) from student activity
- **Mastery Threshold**: Number of wins to mark an item as mastered (letters ≈ 3–5, words ≈ 5–8)
- **Mastered item**: Binary status indicating whether an item has met the mastery threshold
- **Student Level**: Progress tier determined by total mastered items, emphasizing early alphabet completion

### Analytics Terms
- **Analytics**: Optional student behavior tracking for app usage analysis, separate from activity and gamification
- **Analytics Consent**: Student permission required before sending any analytics events to external services
- **Event Categories**: Grouped analytics events (Acquisition, Activation/Engagement, Retention/Business Metrics)
- **Funnel Analysis**: Tracking student progression through key app flows (landing → app → lesson → game)
- **Anonymous Analytics**: Device-level tracking without personal data, using client-generated ID only
- **Data Export**: Student's right to receive their tracked data in portable format (JSON/CSV)
- **Data Deletion**: Student's right to have their tracked data permanently removed from all systems

### Features
- **Offline Capability**: Ability to learn without internet connection
- **Installation**: Download and persist the learning content in the device, for offline usage
- **Update**: Update the installed learning content when new content is released
- **Sync**: Synchronization of student progress between devices for registered students
