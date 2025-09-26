# Kartuli - Georgian Language Learning Platform

## Project Overview

### Mission
To make Georgian language learning accessible and free for everyone, breaking down language barriers for international residents, newcomers, and travelers in Georgia.

### Vision
To become the go-to platform for Georgian language learning, ensuring that language is never a barrier to connecting with Georgian culture and community.

### Core Principles
- **Free Forever**: All learning content remains free forever
- **No Barriers**: No premium accounts, ads, paywalls, or content restrictions
- **Cost Optimization**: Actively optimize infrastructure costs to delay monetization needs as long as possible
- **Operational Monetization Only**: Revenue only covers operational costs (servers, databases, authentication, email services)

---

## Project Roadmap

### Phase 1: MVP Launch
- Launch Georgian language learning PWA
- English as native language support
- Offline functionality
- Anonymous usage (default), optional social login (Google, Facebook)
- Basic learning features

### Future Phases (No Specific Order)
- **Multi-language Support**: Add Ukrainian, Russian, Belarusian, Hindi and Spanish language support
- **Additional Social Providers**: Add TikTok, Discord, Twitter, Apple social login options
- **Content Management System**: Build admin backoffice for content management
- **Newsletter Service**: Launch weekly/monthly email newsletters for subscribers
- **Streaming Bot**: Launch Twitch streaming bot that learns Georgian 24/7

### Long-term Vision
- Expand to other underserved languages beyond Georgian
- Maintain free-forever principle across all languages

---

## Business Strategy

### Target Market
- **Primary**: Non-Georgian speakers living in Georgia (international residents, students, workers)
- **Secondary**: People planning to move to Georgia
- **Tertiary**: Travelers wanting basic Georgian communication skills

### Value Proposition
**Free**, comprehensive Georgian language learning **without any content restrictions or premium barriers**, designed specifically for people living in or visiting Georgia. Users can learn Georgian in their **native language**. Includes **offline support** for learning anywhere, anytime.

### Revenue Model
- **Purpose**: Only to cover operational costs (servers, databases, authentication, email services)
- **Possible sources of income**: 
 Affiliate partnerships with learning resources (books, courses), learning platforms (online classes) or physical language schools
- **We will never go with**: Premium accounts, ads, paywalls, content restrictions, or marketing-focused monetization

### Competitive Advantage
- **Major language learning apps don't support Georgian well**
- **Existing Georgian language resources often operate on freemium models**
- Focus on **practical, real-world usage** for people in Georgia
- **Multi-language support** for native languages not typically supported

---

## Glossary

This section defines the key terms and concepts used throughout the Kartuli project. All stakeholders should use these terms consistently to ensure clear communication.

### Core Language Terms
- **Native Language**: The user's first language or primary language (e.g., English, Ukrainian, Russian, Belarusian, Hindi, Spanish)
- **Target Language**: The language the user is learning (Georgian for Kartuli)
- **Interface Language**: The language used for the app's UI, menus, and instructions (matches user's native language)
- **Learning Content**: The actual Georgian language lessons, exercises, and vocabulary

### User Types
- **Anonymous User**: A user who learns without creating an account, progress stored locally
- **Social User**: A user who logs in via social providers (Google, Facebook for MVP; TikTok, Discord, Twitter, Apple planned)
- **Registered User**: A user who creates an account for cloud sync and additional features
- **International Resident**: Non-Georgian speaker living in Georgia (primary target)
- **Future Resident**: Person planning to move to Georgia (secondary target)
- **Traveler**: Visitor wanting basic Georgian communication skills (tertiary target)

### Technical Terms
- **PWA**: Progressive Web App - mobile-first web application that works like a native app
- **Offline Capability**: Ability to learn without internet connection
- **Local Storage**: Progress and data stored on user's device
- **Cloud Sync**: Optional synchronization of progress to cloud when user registers
- **Serverless**: Architecture using managed cloud services without dedicated servers

### Content Terms
- **Lesson**: A structured learning unit covering specific Georgian language concepts
- **Exercise**: Interactive practice activities within lessons
- **Vocabulary**: Georgian words and phrases with translations
- **Cultural Context**: Georgian cultural information integrated into language learning

---

## Applications

### Kartuli PWA
- **Platform**: Mobile-first Progressive Web App
- **Offline Capability**: Essential for travelers and users with limited internet
- **Cross-platform**: Works on iOS, Android, desktop
- **Design**: Optimized for learning on the go
- **Authentication**: Anonymous by default, optional social login (Google, Facebook for MVP; TikTok, Discord, Twitter, Apple planned)

### Admin Backoffice (Future)
- **Purpose**: Content management system for managing lessons, exercises, and vocabulary
- **Timeline**: To be decided
- **Features**: Content creation, analytics, user insights, platform administration

### Newsletter Service (Future)
- **Purpose**: Weekly/monthly email newsletters for subscribers
- **Timeline**: To be decided
- **Content**: User progress updates, cultural content, seasonal topics

### Streaming Bot (Future)
- **Purpose**: Uses the app to learn Georgian 24/7 and streams the learning process on Twitch
- **Timeline**: To be decided
- **Value**: Demonstrates the app's effectiveness and creates engaging content

---

## Product

### Core Features (MVP)
- **Language Learning**: Georgian language lessons and exercises
- **Offline Support**: Learn without internet connection
- **Anonymous Usage**: Default mode, possible to login with social providers (Google, Facebook for MVP)
- **Multi-language Interface**: English interface for MVP
- **Mobile-first Design**: Optimized for learning on the go

### Key Product Decisions
- **Anonymous by Default**: Users can start learning immediately without registration, optional social login available
- **Local Progress Storage**: All progress stored on device, optional cloud sync
- **Offline-first Architecture**: Core functionality works without internet
- **Free Forever**: No premium tiers, ads, or content restrictions
- **Multi-language Support**: Interface in user's native language (English → Ukrainian, Russian, Belarusian, Hindi, Spanish)

### Content Strategy
- **Practical Focus**: Real-world usage for people living in Georgia
- **Progressive Learning**: Structured lessons from basic to advanced
- **Cultural Context**: Include Georgian culture and context in lessons
- **Community-driven**: Future plans for user-generated content

---

## Technical Approach

### Technology Philosophy
- **Managed Solutions**: Always prefer managed solutions and providers
- **Serverless Focus**: Prioritize serverless architecture for cost optimization
- **Cost Efficiency**: Optimize infrastructure costs to delay monetization needs

### Key Requirements
- Offline capability
- Anonymous usage by default, optional social login
- Local progress storage with optional account sync
- Multi-language support for native languages
- Cost-optimized infrastructure

### Development Conventions
We use [Conventional Commits](https://www.conventionalcommits.org/) format for all commits:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

#### Examples
- `docs: add project overview and mission statement`
- `feat(auth): add Google and Facebook social login`
- `fix(pwa): resolve offline sync issue`
- `chore: update dependencies`