### Content Pack Management & Versioning

- Manifest tracks pack version, assets version, and native content pack versions per `lang`; clients compare to local cache for updates
- Items are immutable; new letters/words append to dictionaries. Native content packs may add localized text independently
- Asset URLs embed version segments, enabling service worker to prefetch new media while expiring old cache entries safely
- Release flow:
  - Publish updated manifest + native content pack diffs to CDN
  - Notify students in-app; allow manual download or defer until on Wi-Fi
  - Trigger ISR revalidation via Next.js tags so marketing/app pages reflect new content version indicator
- MVP release ships alphabet + ~20 words; subsequent drops expand vocabulary modules and native content pack coverage without altering the base schema
