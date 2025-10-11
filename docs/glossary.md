
# Glossary

Key terms and concepts used throughout the Kartuli project

Use these terms consistently to ensure clear communication

## Core language terms
- **Native language**: The student's first language or primary language (e.g., English, Ukrainian, Russian, Belarusian, Hindi, Spanish...)
- **Target language**: The language the student is learning (Georgian)
- **Interface language**: The language used for the app's UI, menus, and instructions (matches user's native language)

## User types
- **Students**: Learners who progress through the game client experiences
  - **Anonymous Students**: Learn without creating an account, progress saved only on the device
  - **Registered Students**: Create an account to enable progress synchronization across devices
- **Volunteers**: Contributors who keep the project running and growing
  - **Admins**: Manage overall project operations and governance
  - **Learning Content Managers**: Curate and maintain content packs
  - **Content Reviewers**: Provide feedback on translations and language accuracy
  - **Technicians**: Collaborate on design, development, marketing, and related operations

## Game content terms
- **Alphabet item**: Entry with data and assets to learn an alphabet letter
- **Vocabulary item**: Entry with data and assets to learn a word or phrase
- **Grammar item**: Entry with data and assets to learn a language rule
- **Lesson**: Subset of items of the same type (letters, words or grammar, never mixed) that are used to generate dynamic games
- **Module**: Themed collection of lessons defined within the content pack to structure learning
- **Master content pack**: Canonical dataset for a target language, containing metadata, items, lessons and modules that all native content packs reference
- **Native content pack**: Dataset for a target language, containing translations of the master data for a native language
- **Localized content pack**: Dataset combining all the info from a master content pack and a native data pack,
- **Content pack manifest**: Versioned document describing available master packs and native content packs, used by the client to determine downloads and fallbacks
- **Assets**: Media files (images, audios) shared per target language, referenced by items across the content system
- **Resources**: Links to learning content outside of the kartuli game app: books, wallpapers, posters, schools, forums, courses...

## Game terms
- **Lesson lobby**: Page with flashcards to learn or refresh lesson items; flashcards display mastery and favorite status for each item; games are launched from here
- **Lesson game**: Dynamic game generated for a lesson, uses the lesson items to create minigame rounds; finishing a game will update the student activity registry
- **Minigame**: Round for a game with a question and multiple answer options, can be won if the answer is right or failed if the answer is wrong
- **Student activity**: Record that accumulates wins, fails and a list of last played games per item and per lesson and time spent playing; used for gamification computation, and next lesson recommendation algorithm

## Gamification Terms
- **Progress**: Information computed (not stored) from student activity
- **Mastery threshold**: Number of wins to mark an item as mastered
- **Mastered item**: Binary status indicating whether an item has met the mastery threshold
- **Student level**: Progress tier determined by total mastered items, emphasizing early alphabet completion

## Analytics Terms
- **Analytics**: Optional student behavior tracking for app usage analysis, separate from activity and gamification
- **Analytics consent**: Student permission required before sending any analytics events to external services
- **Event categories**: Grouped analytics events (Acquisition, Activation/Engagement, Retention/Business Metrics)
- **Funnel analysis**: Tracking student progression through key app flows (landing → app → lesson → game)
- **Anonymous analytics**: Device-level tracking without personal data, using client-generated ID only
- **Data export**: Student's right to receive their tracked data in portable format (JSON/CSV)
- **Data deletion**: Student's right to have their tracked data permanently removed from all systems

## Features
- **Offline support**: Ability to learn without internet connection
- **Installation**: Download and persist the learning content (both data and assets) in the device, for offline usage
- **Update**: Update the installed learning content when new content is released
- **Sync**: Synchronization of student progress between devices for registered students
- **Recommendation algorithm**: Suggest next lessons based on student activity, progress, and other possible factors
- **Dictionary**: List all available content and allow to search
- **Favorites**: Save items for quick access and custom lessons