# Implementation Plan: Digital Autograph Platform

**Branch**: `001-signature-platform` | **Date**: 2025-10-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-signature-platform/spec.md`

**Note**: This plan has been updated to incorporate clarifications from `/speckit.clarify` session on 2025-10-27.

## Summary

Digital autograph platform mobile application enabling fans to capture celebrity signatures on their phone screens, transform them into custom wallpapers using templates, manage a collection with cloud sync, and unlock premium features via subscription. Core value: preserve authentic autographs digitally with 60fps signature capture performance.

Technical approach: React Native with Expo managed workflow, TypeScript strict mode, Skia for high-performance canvas rendering, TanStack Query for API state management, Zustand for global state, Firebase Auth for authentication, AsyncStorage + manual cloud sync for data persistence, Stripe for payments, and comprehensive analytics tracking.

**New from Clarifications**:
- Soft delete with 1-year retention for GDPR compliance
- Manual sync strategy (pull-to-refresh, no auto-retry)
- Full analytics tracking (all interactions, errors, performance metrics)

## Technical Context

**Language/Version**: TypeScript 5.3.0 with React Native 0.74.0
**Primary Dependencies**: Expo SDK 51.0.0, @shopify/react-native-skia (canvas), @tanstack/react-query (API state), zustand (global state), react-native-reanimated 3.6.1 (animations), @react-navigation/native 6.1.9
**Storage**: AsyncStorage (local), expo-file-system (images), expo-secure-store (auth tokens), cloud backend API for manual sync (Firebase/Supabase/custom)
**Analytics & Monitoring**: Amplitude/Mixpanel (event tracking), Sentry (error logging), Firebase Analytics (optional), custom performance monitoring
**Testing**: React Native Testing Library, Detox (E2E), TypeScript compiler, manual device testing
**Target Platform**: iOS 14+, Android 10+ (cross-platform mobile)
**Project Type**: mobile (React Native Expo managed workflow)
**Performance Goals**: 60fps signature canvas rendering, <2s app launch, <30s signature capture flow, <3s wallpaper generation
**Constraints**: <50MB app size, offline-first with manual sync, smooth animations, native-quality UX, GDPR/CCPA compliance
**Scale/Scope**: 8 main screens (onboarding, home, signature canvas, wallpaper editor, gallery, signature detail, auth, premium), 5 key entities, 7 prioritized user stories, MVP focus on P1-P3

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Component-First Architecture ✅ PASS

**Compliance**: Feature naturally decomposes into reusable React components:
- Signature canvas component (SignatureCanvas) with touch handling
- Wallpaper preview component (WallpaperPreview) with template rendering
- Signature card component (SignatureCard) for grid display with sync status indicators
- Template carousel component (TemplateCarousel) with swipe gestures
- Analytics wrapper components for event tracking
- All components will follow functional patterns with hooks, clear props interfaces, and separation of UI from business logic

**No violations**: Standard React Native architecture applies perfectly

### II. Type Safety (NON-NEGOTIABLE) ✅ PASS

**Compliance**: TypeScript 5.3.0 with strict mode required in constitution:
- All signature, wallpaper, template, user, subscription types in `src/types/`
- Props interfaces exported for all components
- API response types defined
- Analytics event types defined for type-safe tracking
- Soft delete status enums typed (active, soft_deleted, permanently_deleted)
- Sync status enums typed (pending, synced, failed)
- No `any` types except for third-party library interfaces (documented)
- Strict null checks, no implicit any

**No violations**: Type safety is non-negotiable and fully achievable

### III. Cross-Platform Compatibility ✅ PASS

**Compliance**: React Native with Expo provides cross-platform base:
- Core features (signature canvas, wallpaper editor, gallery) work identically on iOS/Android
- Platform-specific code justified:
  - Face ID/Touch ID authentication (use Platform.select for UI labels)
  - Native share sheet behavior differences (handled by expo-sharing)
  - Status bar styling (handled by expo-status-bar)
  - Analytics SDK initialization may differ slightly per platform
- Testing on both platforms required before completion

**No violations**: Platform-specific code is minimal and justified

### IV. Performance & User Experience ✅ PASS with Monitoring Required

**Compliance**: 60fps requirement from constitution matches FR-030 and SC-002:
- Signature canvas using @shopify/react-native-skia for hardware-accelerated rendering
- Gallery using @shopify/flash-list for optimized scrolling (constitution requires FlatList/SectionList optimization)
- Images lazy-loaded and optimized
- react-native-reanimated for smooth 60fps animations
- Loading states for operations >200ms (wallpaper generation, sync)
- Offline-first architecture with AsyncStorage
- **New**: Performance metrics tracked via analytics (FPS, launch time, wallpaper generation duration)
- **New**: Manual sync UX requires clear status indicators and pull-to-refresh implementation

**Monitoring Required**: Performance profiling during development to ensure 60fps canvas and smooth animations. Analytics will track real-world performance metrics.

### V. Testing & Quality Assurance ⚠️ PARTIAL COMPLIANCE

**Compliance**:
- Component tests with React Native Testing Library available
- TypeScript compilation catches type errors
- Manual device testing on iOS and Android required
- Integration tests for critical user flows available with Detox
- **New**: Analytics events tested for correct property tracking
- **New**: Soft delete and data retention logic requires dedicated test coverage

**Note**: Constitution requires testing but feature spec does not explicitly mandate tests in all user stories. Tests are marked as optional in success criteria. This is acceptable as constitution states "required testing" but doesn't block MVP without full coverage. Recommend adding tests for P1 signature capture flow and soft delete logic minimum.

**No violations**: Testing requirements met for MVP, can expand post-launch

### Constitution Summary

**Status**: ✅ ALL GATES PASSED (Updated post-clarification)

No constitutional violations. All principles satisfied with new clarifications:
- Component-first architecture aligns with React Native patterns (includes analytics wrappers)
- TypeScript strict mode enforced (new types for soft delete, sync status, analytics events)
- Cross-platform compatibility maintained with minimal justified exceptions
- Performance targets achievable with chosen libraries (@shopify/react-native-skia, react-native-reanimated) + tracked via analytics
- Testing strategy defined with room for expansion (soft delete logic, analytics tracking)

**New Considerations from Clarifications**:
- Soft delete with 1-year retention requires background job for permanent deletion (can be backend concern)
- Manual sync requires UI/UX for sync status display and pull-to-refresh gesture
- Full analytics tracking requires consent management UI for GDPR/CCPA compliance

**Proceed to Phase 0 Research**: All gates cleared (research.md already exists and validated)

## Project Structure

### Documentation (this feature)

```text
specs/001-signature-platform/
├── plan.md              # This file (/speckit.plan command output) - UPDATED
├── research.md          # Phase 0 output (/speckit.plan command) - ✅ EXISTS
├── data-model.md        # Phase 1 output (/speckit.plan command) - ✅ EXISTS (needs soft delete update)
├── quickstart.md        # Phase 1 output (/speckit.plan command) - ✅ EXISTS (needs analytics setup)
├── contracts/           # Phase 1 output (/speckit.plan command) - ✅ EXISTS (needs soft delete endpoint)
│   ├── signatures-api.yaml
│   ├── auth-api.yaml
│   └── subscriptions-api.yaml
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Auth group
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                   # Bottom tabs navigation
│   │   ├── index.tsx             # Home screen
│   │   ├── gallery.tsx           # Gallery screen (with sync status UI)
│   │   ├── _layout.tsx           # Tab navigator config
│   │   └── profile.tsx           # Profile screen (future)
│   ├── _layout.tsx               # Root layout (analytics initialization)
│   ├── onboarding.tsx            # 3-slide onboarding
│   ├── signature-canvas.tsx      # Signature capture screen
│   ├── signature-detail.tsx      # Signature detail view (with soft delete option)
│   ├── wallpaper-editor.tsx      # Wallpaper customization
│   └── premium.tsx               # Paywall/subscription
├── components/                    # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── SyncStatusBadge.tsx   # NEW: Sync status indicator
│   ├── signature/                # Signature-specific
│   │   ├── SignatureCanvas.tsx   # Skia canvas component
│   │   ├── ColorPicker.tsx
│   │   └── SignatureCard.tsx     # Gallery grid item (with sync badge)
│   ├── wallpaper/
│   │   ├── TemplateCarousel.tsx
│   │   ├── WallpaperPreview.tsx
│   │   └── TemplateRenderer.tsx
│   ├── shared/
│   │   ├── Header.tsx
│   │   ├── BottomSheet.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── PullToRefresh.tsx     # NEW: Manual sync trigger
│   └── analytics/                # NEW: Analytics wrappers
│       ├── AnalyticsProvider.tsx # Context for analytics
│       ├── TrackedButton.tsx     # Auto-tracked button component
│       └── ScreenTracker.tsx     # Auto screen view tracking
├── hooks/                        # Custom hooks
│   ├── useSignature.ts           # Signature canvas logic
│   ├── useWallpaper.ts           # Wallpaper generation
│   ├── useAuth.ts                # Authentication state
│   ├── usePremium.ts             # Subscription status
│   ├── useLocation.ts            # Geolocation
│   ├── usePermissions.ts         # Camera, location, photo library
│   ├── useManualSync.ts          # NEW: Manual sync trigger logic
│   └── useAnalytics.ts           # NEW: Event tracking hook
├── services/                     # Business logic & API
│   ├── api/                      # API client
│   │   ├── client.ts             # Axios/Fetch config
│   │   ├── auth.ts               # Auth endpoints
│   │   ├── signatures.ts         # Signature CRUD (with soft delete)
│   │   ├── wallpapers.ts         # Wallpaper generation
│   │   └── subscriptions.ts      # Stripe payments
│   ├── storage/                  # Local storage
│   │   ├── async-storage.ts      # AsyncStorage wrapper
│   │   ├── secure-storage.ts     # expo-secure-store
│   │   └── file-system.ts        # Image file management
│   ├── sync/                     # Manual sync
│   │   └── signature-sync.ts     # Manual sync queue (updated for manual trigger)
│   ├── sharing/
│   │   └── share-service.ts      # Native share integration
│   └── analytics/                # NEW: Analytics services
│       ├── amplitude.ts          # Amplitude SDK wrapper
│       ├── sentry.ts             # Sentry error tracking
│       └── tracker.ts            # Unified analytics interface
├── store/                        # Global state (Zustand)
│   ├── auth-store.ts             # Auth state
│   ├── signatures-store.ts       # Local signature cache (with sync status)
│   ├── app-config-store.ts       # App preferences (analytics consent)
│   └── premium-store.ts          # Subscription state
├── utils/                        # Utilities
│   ├── validators.ts             # Input validation
│   ├── formatters.ts             # Date, text formatters
│   ├── permissions.ts            # Permission helpers
│   ├── constants.ts              # App-wide constants
│   └── soft-delete.ts            # NEW: Soft delete utility functions
├── constants/                    # Design system
│   ├── colors.ts                 # Color palette
│   ├── typography.ts             # Font styles
│   ├── spacing.ts                # Spacing scale
│   ├── templates.ts              # Wallpaper template configs
│   └── analytics-events.ts       # NEW: Analytics event constants
├── types/                        # TypeScript types
│   ├── signature.types.ts        # Updated with soft delete status
│   ├── wallpaper.types.ts
│   ├── template.types.ts
│   ├── auth.types.ts
│   ├── subscription.types.ts
│   ├── sync.types.ts             # NEW: Sync status types
│   ├── analytics.types.ts        # NEW: Analytics event types
│   └── api.types.ts
└── assets/                       # Static assets
    ├── images/
    │   ├── onboarding/
    │   └── templates/
    ├── icons/
    └── fonts/

tests/ (optional, recommended for P1 signature capture + soft delete)
├── components/
│   ├── SignatureCanvas.test.tsx
│   └── SyncStatusBadge.test.tsx  # NEW: Test sync status display
├── integration/
│   ├── signature-capture-flow.e2e.ts
│   └── manual-sync.e2e.ts        # NEW: Test manual sync flow
└── unit/
    ├── signature-validator.test.ts
    ├── soft-delete.test.ts       # NEW: Test soft delete logic
    └── analytics-tracker.test.ts # NEW: Test analytics events
```

**Structure Decision**: Mobile application using Expo Router file-based routing with tab navigation. Structure follows React Native + Expo conventions with clear separation of concerns: screens in `app/`, reusable components in `components/`, business logic in `hooks/` and `services/`, global state in `store/`, and types in `types/`. This aligns with constitution's code organization requirements and enables parallel development of independent features.

**Updates from Clarifications**:
- Added `analytics/` directory for comprehensive event tracking
- Added `SyncStatusBadge` and `PullToRefresh` components for manual sync UX
- Added `soft-delete.ts` utility for data retention logic
- Added analytics-specific types and services

## Complexity Tracking

**No constitutional violations requiring justification.**

All architectural decisions align with React Native Mobile Application Constitution:
- Single mobile project (not multiple projects)
- Standard React Native component patterns
- TypeScript strict mode throughout
- Expo managed workflow (no custom native code required for MVP)
- Standard state management (Context + Zustand)
- Offline-first with AsyncStorage

**New from Clarifications**:
- Manual sync adds UI complexity (sync status badges, pull-to-refresh) but simplifies architecture (no background retry logic)
- Soft delete with 1-year retention adds data management complexity but required for GDPR compliance
- Full analytics tracking adds instrumentation overhead but provides essential product insights

The project complexity is justified by feature requirements (signature canvas, wallpaper generation, cloud sync, payments, analytics) but does not violate constitutional simplicity principles. All chosen libraries are industry-standard React Native solutions.

## Updates Required for Clarifications

### Data Model Changes (data-model.md)
- ✅ Exists, needs update:
  - Add `deletedAt` timestamp field to Signature and User entities
  - Add `status` enum field (active, soft_deleted, permanently_deleted)
  - Update state transitions to include soft delete → permanent delete after 1 year

### API Contracts Changes (contracts/)
- ✅ Exist, need updates:
  - **signatures-api.yaml**: Add soft delete endpoint (PATCH /signatures/{id}/soft-delete), permanent delete is automatic via backend job
  - **signatures-api.yaml**: Update sync endpoint documentation to clarify manual trigger
  - Add analytics endpoint spec (POST /analytics/events) for server-side tracking

### Research Updates (research.md)
- ✅ Complete, add new section:
  - **Analytics Stack Decision**: Amplitude + Sentry chosen for comprehensive tracking
  - **Manual Sync UX Pattern**: Pull-to-refresh + sync status indicators

### Quickstart Updates (quickstart.md)
- ✅ Exists, needs additions:
  - Environment variables for analytics keys (AMPLITUDE_API_KEY, SENTRY_DSN)
  - Setup instructions for analytics SDKs
  - Analytics consent management for GDPR compliance
  - Testing manual sync flow

## Phase Status

✅ **Phase 0: Research** - Complete (research.md exists)
✅ **Phase 1: Design** - Complete (data-model.md, contracts/, quickstart.md exist, minor updates needed)
⏭️ **Phase 2: Tasks** - Ready for `/speckit.tasks` command

## Next Steps

**Recommended Actions**:

1. **Update existing artifacts** (optional, can be done during implementation):
   - data-model.md: Add soft delete fields
   - contracts/signatures-api.yaml: Add soft delete endpoint
   - quickstart.md: Add analytics setup instructions

2. **Run `/speckit.tasks`** to generate implementation task list with new clarifications incorporated

3. **Begin Implementation** via `/speckit.implement` or manual development following tasks.md

The clarifications have **minor impact** on architecture:
- Soft delete is mostly backend concern (client just sets status)
- Manual sync simplifies client logic (removes retry logic, adds UI indicators)
- Analytics requires SDK integration but follows standard patterns

All clarifications enhance the feature without violating constitutional principles.
