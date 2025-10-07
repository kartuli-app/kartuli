### Analytics (PostHog)

#### Purpose

Track **student acquisition, engagement, and funnels** for app usage analysis. Analytics is separate from student progress tracking and requires student consent

**Key principle**: **Student activity and gamification is separate from analytics.** Analytics is optional and respects student consent; activity tracking is necessary for offline-first functionality

#### Event Categories

1. **Acquisition**  
   - `landing_page_view`
   - `privacy_page_view`
   - `faq_page_view`

2. **Activation / Engagement**  
   - `app_hub_opened`
   - `lesson_selected`
   - `lesson_game_started`
   - `lesson_game_finished`
   - `ui_language_changed`
   - `native_language_fallback_shown`

3. **Retention / Business Metrics**  
   - `item_mastered` (behavioral analytics only; progress system remains canonical and drives recommended mode)
   - `level_mastered` (optional; mostly for dashboards)
   - `favorite_toggled`
   - Funnels (landing → app hub → lesson → game)

#### Offline Handling

- Events queue locally if offline
- Sent to analytics provider when connection is available

#### Anonymous Users

- Device has a **client-generated ID** (`device_id`) reused across analytics and activity reconciliation for optional linking
- No personal data is tracked until consent
- If student consents to linking analytics after login/signup: merge previous anonymous events with the account
- If student does not consent to linking: keep anonymous events separate

#### Consent & Privacy

- **Consent is required** before sending any analytics events
- Consent is **per user, per device**
- Students can refuse analytics and still use the app normally
- A simple **informative banner** explaining how to stop tracking is acceptable practice
- GDPR / privacy compliance:
  - Do not track personal data without consent
  - Provide options for deletion/export of data
  - Anonymous usage can be tracked only with device ID (non-personal)

#### Data Deletion & Export

- **activity:** delete or export raw progress data
- **analytics:** deletion/export per user or device may be required for GDPR
- Export format: e.g., JSON or CSV containing progress/events
- Deletion: ensure both activity and analytics data are removed if requested

#### Event Handling Flow

On game completion the client updates activity counters and (if allowed) queues analytics events before scheduling the next sync/flush

1. Student completes game → triggers `onGameCompleted`
2. Increment local delta counters in IndexedDB (wins/losses, time, days played) scoped to the device ID (see `6.3.2`)
3. If the student is logged in and the sync interval has elapsed, push to the server (see `6.3.3`)
4. If analytics consent is given, enqueue PostHog events locally; drain the queue when connectivity resumes (see `6.5.3`)
5. Compute mastery/levels at runtime from merged counters; **never store computed fields**
