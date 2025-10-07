### Student Progress Tracking

The tracking system stores student activity deltas locally to remain offline-first and decoupled from gamification rules, enabling flexible mastery and level calculations that work even when students do not connect for extended periods

Gamification is computed from student activity

#### Stored Metrics

**Per device delta counters:**
- Letter wins and fails (per item)
- Total time spent learning (per session aggregate)

**Global user stats (computed from counters):**
- Total time spent
- Item mastery (binary, derived)
- User global level (derived)

#### Delta Counters & Storage

- Activity is tracked as additive deltas rather than immutable raw logs
- IndexedDB persists local deltas and the `device_id`, a client-generated identifier created once and reused for both activity reconciliation and analytics until the user clears data or logs out
- Delta merges are idempotent; replays or retries do not inflate totals
- Counters are keyed by `targetLang` so switching native languages keeps mastered letters/words intact

#### Sync Loop
- The client maintains two IndexedDB registries:
  - `synced activity` mirrors the last server-acknowledged totals
  - `not synced activity` stores new deltas that have not been accepted yet
- Mastery and level calculations combine both registries so they always operate on the complete activity history
- Sync loop:
  1. New play sessions append deltas into `not synced activity`
  2. At each sync interval or when connectivity returns, the client sends the full contents of `not synced activity` to the server with a new `request_id` generated for that payload (server stores the ID to ignore duplicates; once confirmed, the previous ID is discarded)
  3. If the server confirms receipt, it responds with aggregated totals; the client overwrites `synced activity` with that response and clears `not synced activity`
  4. If the request fails or duplicates a known ID, both registries remain unchanged and the client retries on the next interval
- Sync attempts fire every five minutes by default and automatically retry after failures without losing unsynced deltas

#### Anonymous vs Registered Users

- Anonymous users operate entirely on-device using the generated device ID
- On login/signup, students can optionally merge their anonymous deltas into the account; the server consolidates them and replies with the unified counters
- Declining the merge starts the account with fresh counters, deleting the anonymous not synced activity stored locally

#### Analytics Queue

- Analytics events follow the same offline-first principles; see section `6.5` for queue behavior and consent requirements
