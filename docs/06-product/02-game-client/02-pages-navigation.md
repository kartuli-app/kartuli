### Pages & Navigation Map

#### Info Pages
- Landing (show game features)
- Terms (game terms)
- Privacy (privacy pol)
- FAQ (frequently asked questions)
- Volunteers (how to collaborate with the project)
- Support (how to support the project by donating to causes, not affiliated or related with the project)
- About (why does the project exist)

- **InfoLayout**:
  - Powers info pages
  - Navbar includes big logo and CTA button to launch the game hub
  - Footer includes info links, native language selector, social media links
  - Responsive design to be defined

#### App Pages
- Hub (main learning hub with progress summary, modules with lessons and recomended lesson)
- Profile (details of student progress, account preferences)
- Favorites (saved words, launch custom lesson games)
- Search (search words, modules, lessons)
- Offline (info about offline access)
- Resources (links to external learning resources)
- Lesson lobby (review lesson items and launch game)
- Lesson game (play the lesson game)

- **NonLesson Layout**
  - Powers non-lesson app pages: hub page, profile, favorites, search, offline, resources 
  - Navbar: Menu or back arrow, page name or logo, offline button, mute toggle button
  - Dock with links to main app pages: Hub, Profile, Favorites, Search

- **Lesson Lobby Layout**
  - Powers the lesson lobby pages
  - Navbar includes back arrow, lesson name, offline indicator, and mute toggle

- **Lesson Game Layout**
  - Powers the game pages
  - Navbar includes back arrow (modal to confirm exiting the game), time spent, current round and total rounds (3/10), and mute toggle

- Navbar:
  - Transparent for immersion on the game pages, background color for other pages
  - Consistent element placement, avoiding element position jumps
    - Left side:
      - Menu (hub) or back arrow (other pages), small logo (non hub)
    - Center:
      - Big logo (hub) or time spent and rounds count (game) or page name (other pages)
    - Right:
      - Offline button (non game pages), mute toggle button (all pages)

- Menu:
  - Two group of links
    - App pages not available from the dock (offline, resources)
    - Info pages (terms, landing, FAQ, etc.)
