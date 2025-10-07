### Learning System Architecture Overview

The learning system is designed around offline-first functionality with optional synchronization, supporting both anonymous and registered users while maintaining cost efficiency.

#### Key Design Principles
- **Offline-first**: Local storage is canonical until sync completes
- **Anonymous by default**: No account required to start learning
- **Optional sync**: Registered users can sync progress across devices
- **Cost-optimized**: Designed to minimize infrastructure costs
- **Content-pack based**: Modular content delivery system

#### System Components
- **Content Packs**: Versioned content delivery system
- **Progress Tracking**: Local-first progress tracking with optional sync
- **Gamification**: Mastery-based progression system
- **Analytics**: Optional user behavior tracking with consent
- **Content Management**: Versioning and update system
