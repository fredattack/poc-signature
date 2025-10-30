# Implementation Tasks: Digital Autograph Platform

**Feature Branch**: `001-signature-platform`
**Generated**: 2025-10-28
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Overview

This task list implements a React Native mobile application for capturing celebrity autographs digitally. Tasks are organized by user story priority (P1-P7) to enable independent, incremental delivery.

**Tech Stack**: React Native 0.74.0, Expo SDK 51.0.0, TypeScript 5.3.0, @shopify/react-native-skia, Zustand, TanStack Query, Firebase/Supabase Auth, Stripe

**Total Tasks**: 87
**Estimated Phases**: 10 (Setup + Foundational + 7 User Stories + Polish)

---

## Phase 1: Project Setup & Configuration

**Goal**: Initialize Expo project with TypeScript, configure dependencies, and establish project structure.

**Tasks**:

- [X] T001 Initialize Expo project with TypeScript template using `npx create-expo-app@latest . --template blank-typescript`
- [X] T002 [P] Install core dependencies: `npx expo install @shopify/react-native-skia react-native-reanimated react-native-gesture-handler @react-navigation/native expo-router`
- [X] T003 [P] Install state management: `npm install zustand @tanstack/react-query`
- [X] T004 [P] Install storage & file system: `npx expo install expo-file-system expo-secure-store @react-native-async-storage/async-storage`
- [X] T005 [P] Install UI optimization: `npm install @shopify/flash-list`
- [X] T006 Configure TypeScript with strict mode in tsconfig.json
- [X] T007 Create project directory structure per plan.md (src/app/, src/components/, src/hooks/, src/services/, src/store/, src/types/, src/constants/, src/utils/, src/assets/)
- [X] T008 [P] Create .gitignore with React Native patterns (node_modules/, .expo/, dist/, .env*, *.log, ios/Pods/, android/build/)
- [X] T009 [P] Create .env.example file with placeholder keys (API_URL, STRIPE_PUBLISHABLE_KEY, AMPLITUDE_API_KEY, SENTRY_DSN)
- [X] T010 Configure app.json with app metadata, splash screen, and icon placeholders
- [X] T011 Set up Expo Router by creating src/app/_layout.tsx root layout
- [X] T012 Create package.json scripts for dev, build, test, and type-check

---

## Phase 2: Foundational Infrastructure

**Goal**: Implement shared types, utilities, design system constants, and base UI components used across all user stories.

**Dependencies**: Requires Phase 1 completion

**Tasks**:

### Type Definitions

- [X] T013 [P] Create src/types/signature.types.ts with Signature, SignatureColor, SyncStatus interfaces
- [X] T014 [P] Create src/types/wallpaper.types.ts with Wallpaper, WallpaperOptions interfaces
- [X] T015 [P] Create src/types/template.types.ts with Template, TemplateLayout interfaces
- [X] T016 [P] Create src/types/auth.types.ts with User, AuthProvider enums, AuthState interface
- [X] T017 [P] Create src/types/subscription.types.ts with Subscription, SubscriptionPlan, SubscriptionStatus interfaces
- [X] T018 [P] Create src/types/sync.types.ts with SyncStatus enum and SyncQueueItem interface
- [X] T019 [P] Create src/types/analytics.types.ts with AnalyticsEvent, EventProperties interfaces
- [X] T020 [P] Create src/types/api.types.ts with ApiResponse, PaginationParams, ErrorResponse interfaces

### Design System Constants

- [X] T021 [P] Create src/constants/colors.ts with color palette from plan.md (primary, background, text, border, gradient definitions)
- [X] T022 [P] Create src/constants/typography.ts with font styles (h1, h2, h3, body, bodyLarge, bodySmall, caption, button)
- [X] T023 [P] Create src/constants/spacing.ts with spacing scale (xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48) and borderRadius
- [X] T024 [P] Create src/constants/templates.ts with 5 free wallpaper template configurations (minimal-white, elegant-black, modern-gradient, colorful-pop, dark-mode)
- [X] T025 [P] Create src/constants/analytics-events.ts with event name constants for analytics tracking

### Utilities

- [X] T026 [P] Create src/utils/validators.ts with input validation functions (validateCelebrityName, validateEmail, validatePassword)
- [X] T027 [P] Create src/utils/formatters.ts with date and text formatting utilities (formatDate, formatTime, formatLocation)
- [X] T028 [P] Create src/utils/permissions.ts with permission request helpers (requestLocationPermission, requestPhotoLibraryPermission)
- [X] T029 [P] Create src/utils/constants.ts with app-wide constants (MAX_FREE_SIGNATURES: 10, WALLPAPER_GENERATION_TIMEOUT: 3000)
- [X] T030 [P] Create src/utils/soft-delete.ts with soft delete utility functions (markAsDeleted, isPermanentlyDeleted)

### Base UI Components

- [X] T031 [P] Create src/components/ui/Button.tsx with primary, secondary, ghost variants and loading states
- [X] T032 [P] Create src/components/ui/Input.tsx with label, error state, and validation
- [X] T033 [P] Create src/components/ui/Card.tsx with shadow and border radius styling
- [X] T034 [P] Create src/components/ui/Modal.tsx with backdrop and slide animation
- [X] T035 [P] Create src/components/ui/Toast.tsx with success, error, info variants
- [X] T036 [P] Create src/components/ui/SyncStatusBadge.tsx with pending, synced, failed states
- [X] T037 [P] Create src/components/shared/Header.tsx with left/right action slots
- [X] T038 [P] Create src/components/shared/LoadingSpinner.tsx with size variants
- [X] T039 [P] Create src/components/shared/EmptyState.tsx with icon, title, description, and CTA props
- [X] T040 [P] Create src/components/shared/PullToRefresh.tsx wrapper for manual sync trigger

### Storage Services

- [X] T041 [P] Create src/services/storage/async-storage.ts wrapper with get, set, remove, clear methods
- [X] T042 [P] Create src/services/storage/secure-storage.ts wrapper for auth tokens using expo-secure-store
- [X] T043 [P] Create src/services/storage/file-system.ts with image save/load utilities using expo-file-system

### Analytics Setup

- [X] T044 [P] Create src/services/analytics/tracker.ts with unified analytics interface (track, screen, identify, reset)
- [X] T045 [P] Create src/services/analytics/amplitude.ts Amplitude SDK wrapper (if using Amplitude)
- [X] T046 [P] Create src/services/analytics/sentry.ts Sentry error tracking initialization
- [X] T047 [P] Create src/hooks/useAnalytics.ts hook for event tracking throughout app
- [X] T048 [P] Create src/components/analytics/AnalyticsProvider.tsx context provider for analytics state
- [X] T049 [P] Create src/components/analytics/ScreenTracker.tsx auto screen view tracking component

---

## Phase 3: User Story 1 - Capture Digital Autograph (P1 - MVP)

**Goal**: Implement signature canvas with 60fps drawing, celebrity name input, optional location capture, and local save.

**Why P1**: Core value proposition. All other features depend on signature collection.

**Independent Test**: Launch app → Tap "New Signature" → Draw on canvas → Enter celebrity name → Save. Signature appears in local storage with timestamp.

**Dependencies**: Requires Phase 2 foundational components

**Tasks**:

### Types & Models

- [X] T050 [US1] Extend src/types/signature.types.ts with SignatureFormData, CanvasPath interfaces
- [X] T051 [US1] Create src/hooks/useSignature.ts hook with canvas state, path storage, save logic

### UI Components

- [X] T052 [US1] Create src/components/signature/SignatureCanvas.tsx using @shopify/react-native-skia Canvas with touch gesture handling
- [X] T053 [US1] Create src/components/signature/ColorPicker.tsx with 4 color options (black, blue, red, white)
- [X] T054 [US1] Implement 60fps path rendering in SignatureCanvas using Skia's Path API and gesture-handler
- [X] T055 [US1] Add Clear button functionality to SignatureCanvas to reset canvas state

### Services & State

- [X] T056 [US1] Create src/store/signatures-store.ts Zustand store with add, remove, getAll, getById methods
- [X] T057 [US1] Create src/hooks/useLocation.ts hook using expo-location for city-level geolocation
- [X] T058 [US1] Implement signature save logic in useSignature hook (generate UUID, timestamp, save to AsyncStorage and file system)

### Screens

- [X] T059 [US1] Create src/app/signature-canvas.tsx screen with SignatureCanvas, ColorPicker, celebrity name input, location toggle, and Save/Clear buttons
- [X] T060 [US1] Add validation to signature-canvas.tsx (disable Save until name entered and at least one stroke drawn)
- [X] T061 [US1] Implement expo-file-system integration to save signature PNG to local storage
- [X] T062 [US1] Add analytics tracking for signature capture events (signature_started, signature_saved, signature_cleared)

### Navigation

- [X] T063 [US1] Create src/app/(tabs)/index.tsx home screen with "New Signature" CTA button navigating to signature-canvas
- [X] T064 [US1] Create src/app/(tabs)/_layout.tsx tab navigator config with Home and Gallery tabs

**Validation**: User can capture signature with 60fps drawing, save with celebrity name and timestamp, view saved signature in AsyncStorage

---

## Phase 4: User Story 2 - Create Custom Wallpaper (P2)

**Goal**: Transform captured signature into custom wallpaper with template selection, color customization, date/location toggles, and gallery save.

**Why P2**: Converts signature into shareable artifact for retention and social value. Requires US1 signatures first.

**Independent Test**: Open existing signature → Tap "Create Wallpaper" → Select template → Customize colors → Toggle date/location → Save to gallery

**Dependencies**: Requires US1 (signatures must exist)

**Tasks**:

### UI Components

- [X] T065 [US2] Create src/components/wallpaper/TemplateRenderer.tsx using react-native-svg to render signature on template layout
- [X] T066 [US2] Create src/components/wallpaper/WallpaperPreview.tsx with real-time preview updates using react-native-reanimated
- [X] T067 [US2] Create src/components/wallpaper/TemplateCarousel.tsx horizontal scroll with template thumbnails
- [X] T068 [US2] Implement color palette selector in WallpaperPreview (8-12 preset colors)
- [X] T069 [US2] Add date/location toggle switches to WallpaperPreview

### Services & Hooks

- [X] T070 [US2] Create src/hooks/useWallpaper.ts hook with template selection, customization state, generation logic
- [X] T071 [US2] Install and configure react-native-view-shot for capturing wallpaper as PNG
- [X] T072 [US2] Implement wallpaper generation in useWallpaper using view-shot's captureRef (resolution based on user premium status)
- [X] T073 [US2] Install expo-media-library and implement save-to-gallery functionality
- [X] T074 [US2] Implement native wallpaper setter using expo-sharing (iOS and Android native dialogs)

### Screens

- [X] T075 [US2] Create src/app/wallpaper-editor.tsx screen integrating TemplateCarousel, WallpaperPreview, color picker, and toggles
- [X] T076 [US2] Add "Set as Wallpaper" and "Save to Gallery" buttons to wallpaper-editor.tsx
- [X] T077 [US2] Implement permission handling for photo library access with error states
- [X] T078 [US2] Add analytics tracking for wallpaper events (template_selected, color_changed, wallpaper_saved, wallpaper_set)

### Navigation

- [X] T079 [US2] Add "Create Wallpaper" button to signature detail screen (create src/app/signature-detail.tsx with navigation to wallpaper-editor)
- [X] T080 [US2] Pass signature ID to wallpaper-editor via route params

**Validation**: User can select signature, create wallpaper with template, customize colors, save to gallery, set as device wallpaper

---

## Phase 5: User Story 3 - Browse and Manage Collection (P3)

**Goal**: Display signatures in 2-column grid gallery, sort by date/name, view details, delete with confirmation.

**Why P3**: Collection management for retention. Valuable after multiple signatures captured. Not blocking for initial value.

**Independent Test**: Navigate to Gallery → View 12 signatures in grid → Tap signature → View details → Delete signature → Confirm deletion

**Dependencies**: Requires US1 (signatures exist)

**Tasks**:

### UI Components

- [ ] T081 [US3] Create src/components/signature/SignatureCard.tsx grid item with thumbnail, celebrity name, date, and sync status badge
- [ ] T082 [US3] Install @shopify/flash-list and create optimized gallery list in src/app/(tabs)/gallery.tsx
- [ ] T083 [US3] Implement 2-column grid layout with flash-list using numColumns={2} and estimatedItemSize
- [ ] T084 [US3] Add sort dropdown to gallery.tsx with options (recent, oldest, A-Z, Z-A)

### Services & State

- [ ] T085 [US3] Extend src/store/signatures-store.ts with sort and filter methods
- [ ] T086 [US3] Implement sort logic in gallery.tsx using Zustand store methods

### Screens

- [ ] T087 [US3] Complete src/app/signature-detail.tsx with full-size signature, metadata display (celebrity, date, time, location), and action menu
- [ ] T088 [US3] Add delete functionality to signature-detail.tsx with confirmation dialog using Modal component
- [ ] T089 [US3] Implement soft delete in signatures-store (mark with deletedAt timestamp, hide from queries)
- [ ] T090 [US3] Add empty state to gallery.tsx using EmptyState component with "Create First Signature" CTA
- [ ] T091 [US3] Add analytics tracking for gallery events (signature_viewed, signature_deleted, gallery_sorted)

**Validation**: User can view all signatures in grid, sort by different criteria, view details, delete with confirmation, see empty state when no signatures

---

## Phase 6: User Story 4 - User Onboarding (P4)

**Goal**: 3-slide onboarding carousel explaining app features, shown once on first launch.

**Why P4**: Improves first-time UX. Not blocking for core value delivery.

**Independent Test**: Fresh install → See slide 1 → Swipe to slide 2 & 3 → Tap "Get Started" → Never see onboarding again

**Dependencies**: None (independent feature)

**Tasks**:

### UI Components

- [ ] T092 [US4] Create src/components/onboarding/OnboardingSlide.tsx reusable slide component with illustration, title, description
- [ ] T093 [US4] Create onboarding illustrations (placeholder SVGs or images) for 3 slides in src/assets/images/onboarding/
- [ ] T094 [US4] Implement pagination dots indicator component for onboarding carousel

### Screens

- [ ] T095 [US4] Create src/app/onboarding.tsx with Animated.ScrollView horizontal paging
- [ ] T096 [US4] Add 3 slides to onboarding.tsx: Slide 1 (Capture), Slide 2 (Wallpapers), Slide 3 (Sharing)
- [ ] T097 [US4] Add "Skip" button (top-right) and "Next"/"Get Started" button (bottom) to onboarding.tsx
- [ ] T098 [US4] Implement scroll handler with useSharedValue and useAnimatedScrollHandler from react-native-reanimated
- [ ] T099 [US4] Add dot pagination with active/inactive states using interpolate for smooth animations

### State & Persistence

- [ ] T100 [US4] Implement onboarding completion check in src/app/_layout.tsx root layout
- [ ] T101 [US4] Save onboarding completion flag to AsyncStorage using async-storage wrapper
- [ ] T102 [US4] Add conditional navigation: show onboarding on first launch, home screen on subsequent launches
- [ ] T103 [US4] Add analytics tracking for onboarding events (onboarding_slide_viewed, onboarding_completed, onboarding_skipped)

**Validation**: First launch shows onboarding, user can skip or complete, subsequent launches go directly to home, analytics tracks progress

---

## Phase 7: User Story 5 - Share Signature/Wallpaper (P5)

**Goal**: Native share sheet integration for sharing signatures and wallpapers to social platforms (Instagram, Twitter, TikTok, Messages).

**Why P5**: Drives viral growth. Secondary action after creation. Can be added later.

**Independent Test**: Open signature detail → Tap "Share" → Select platform → Content shared successfully

**Dependencies**: Requires US1 (signatures), optionally US2 (wallpapers)

**Tasks**:

### Services

- [ ] T104 [US5] Install expo-sharing: `npx expo install expo-sharing`
- [ ] T105 [US5] Create src/services/sharing/share-service.ts with shareImage function wrapping expo-sharing API
- [ ] T106 [US5] Add platform-specific share logic in share-service.ts (handle iOS vs Android share sheet differences)

### UI Integration

- [ ] T107 [US5] Add "Share" button to signature-detail.tsx screen
- [ ] T108 [US5] Add "Share" button to wallpaper-editor.tsx screen
- [ ] T109 [US5] Implement share handler in signature-detail.tsx calling share-service with signature image path
- [ ] T110 [US5] Implement share handler in wallpaper-editor.tsx calling share-service with generated wallpaper
- [ ] T111 [US5] Add success toast notification after successful share
- [ ] T112 [US5] Add analytics tracking for share events (share_opened, share_completed, share_platform_selected)

**Validation**: User can share signatures and wallpapers via native share sheet to Instagram, Twitter, Messages, sees success confirmation

---

## Phase 8: User Story 6 - Authentication & Account Sync (P6)

**Goal**: Email/password and social auth (Apple, Google), manual cloud sync with pull-to-refresh, sync status indicators.

**Why P6**: Enables cross-device sync and data portability. Optional initially (offline-first architecture).

**Independent Test**: Tap "Sign Up" → Enter email/password → Create account → Signature syncs to cloud → Log in on new device → Signatures appear

**Dependencies**: None (independent feature, enhances US1)

**Tasks**:

### Services Setup

- [ ] T113 [US6] Install Firebase Auth SDK: `npm install @react-native-firebase/app @react-native-firebase/auth` OR Supabase: `npm install @supabase/supabase-js`
- [ ] T114 [US6] Install auth dependencies: `npx expo install expo-auth-session expo-web-browser expo-apple-authentication @react-native-google-signin/google-signin`
- [ ] T115 [US6] Create src/services/api/client.ts HTTP client with axios or fetch, token injection middleware
- [ ] T116 [US6] Create src/services/api/auth.ts with register, login, loginWithGoogle, loginWithApple, logout, refreshToken methods
- [ ] T117 [US6] Create src/services/api/signatures.ts with getAll, create, update, delete, batchSync API endpoints

### State Management

- [ ] T118 [US6] Create src/store/auth-store.ts Zustand store with user, isAuthenticated, login, logout, setUser methods
- [ ] T119 [US6] Create src/hooks/useAuth.ts hook wrapping auth-store and auth service methods
- [ ] T120 [US6] Implement token storage in secure-storage.ts (save/load/remove auth tokens)
- [ ] T121 [US6] Add token refresh logic to API client interceptor

### Sync Logic

- [ ] T122 [US6] Create src/services/sync/signature-sync.ts with manual sync queue (getSyncQueue, syncPending, markAsSynced)
- [ ] T123 [US6] Create src/hooks/useManualSync.ts hook with triggerSync function and sync status state
- [ ] T124 [US6] Update signatures-store.ts to include syncStatus field (pending, synced, failed)
- [ ] T125 [US6] Implement sync status persistence to AsyncStorage

### UI Components & Screens

- [ ] T126 [US6] Create src/app/(auth)/login.tsx screen with email/password form and social login buttons
- [ ] T127 [US6] Create src/app/(auth)/register.tsx screen with email/password/name form
- [ ] T128 [US6] Create src/app/(auth)/forgot-password.tsx screen with email reset form
- [ ] T129 [US6] Add "Continue without account" button to login.tsx for anonymous usage
- [ ] T130 [US6] Update SyncStatusBadge component to display pending/synced/failed states on SignatureCard
- [ ] T131 [US6] Integrate PullToRefresh component into gallery.tsx to trigger manual sync
- [ ] T132 [US6] Add sync button to gallery.tsx header as alternative to pull-to-refresh
- [ ] T133 [US6] Update signature save logic in useSignature to mark as "pending sync" when authenticated
- [ ] T134 [US6] Add analytics tracking for auth events (signup_completed, login_completed, sync_triggered, sync_completed, sync_failed)

### Navigation Guards

- [ ] T135 [US6] Add auth state check to root layout src/app/_layout.tsx
- [ ] T136 [US6] Implement conditional navigation: show auth screens if unauthenticated, tabs if authenticated or anonymous

**Validation**: User can create account, log in with email or social, signatures sync manually via pull-to-refresh, sync status visible on cards, offline mode works without account

---

## Phase 9: User Story 7 - Premium Subscription (P7)

**Goal**: Stripe payment integration for monthly/annual subscriptions with 7-day trial, unlock premium templates and HD export.

**Why P7**: Monetization. Not required for MVP. Free users can use basic templates.

**Independent Test**: Tap locked premium template → See paywall → Select annual plan → Start trial → Premium features unlocked

**Dependencies**: Requires US2 (wallpaper templates), US6 (authentication for subscription account)

**Tasks**:

### Services Setup

- [ ] T137 [US7] Install Stripe SDK: `npm install @stripe/stripe-react-native`
- [ ] T138 [US7] Create src/services/api/subscriptions.ts with createCheckoutSession, getSubscriptionStatus, cancelSubscription API methods
- [ ] T139 [US7] Initialize Stripe in src/app/_layout.tsx with publishable key from env

### State Management

- [ ] T140 [US7] Create src/store/premium-store.ts Zustand store with isPremium, subscriptionStatus, checkPremiumStatus methods
- [ ] T141 [US7] Create src/hooks/usePremium.ts hook wrapping premium-store and subscription service

### UI Components

- [ ] T142 [US7] Create src/components/premium/PaywallModal.tsx with benefits list, pricing options (monthly/annual), and trial CTA
- [ ] T143 [US7] Create src/components/premium/PremiumBadge.tsx lock icon component for premium templates
- [ ] T144 [US7] Create src/components/premium/SubscriptionCard.tsx showing plan details, renewal date, cancel option

### Screens

- [ ] T145 [US7] Create src/app/premium.tsx screen with subscription details, benefits, and upgrade button
- [ ] T146 [US7] Update templates.ts to mark 15+ templates as isPremium: true
- [ ] T147 [US7] Add premium gate to TemplateCarousel: show lock icon on premium templates for free users
- [ ] T148 [US7] Implement paywall trigger in wallpaper-editor.tsx when free user taps premium template
- [ ] T149 [US7] Implement subscription flow in PaywallModal: select plan → create checkout session → present payment sheet → handle success/failure
- [ ] T150 [US7] Add signature count gate: show paywall when free user reaches 10 signatures (check count in useSignature before save)
- [ ] T151 [US7] Update wallpaper generation to export HD resolution for premium users (modify useWallpaper resolution logic)
- [ ] T152 [US7] Add analytics tracking for premium events (paywall_viewed, subscription_started, subscription_completed, subscription_canceled)

### Integration

- [ ] T153 [US7] Update signatures-store to enforce 10 signature limit for free users
- [ ] T154 [US7] Add premium status check to root layout to sync isPremium state on app launch

**Validation**: Free user sees locked premium templates, hits 10 signature limit, can upgrade via Stripe, premium unlocks templates and HD export, analytics tracks conversion funnel

---

## Phase 10: Polish & Cross-Cutting Concerns

**Goal**: Error handling, loading states, analytics instrumentation, performance optimization, GDPR consent.

**Why**: Production readiness, observability, compliance.

**Dependencies**: All user stories complete

**Tasks**:

### Error Handling

- [ ] T155 Add global error boundary to src/app/_layout.tsx using react-error-boundary
- [ ] T156 [P] Implement error toast notifications for API failures across all screens
- [ ] T157 [P] Add retry logic to failed API calls in TanStack Query configuration
- [ ] T158 [P] Add offline detection banner component showing network status

### Loading States

- [ ] T159 [P] Add loading skeletons to gallery.tsx while signatures load
- [ ] T160 [P] Add loading indicator to wallpaper generation (3s timeout per requirement)
- [ ] T161 [P] Add button loading states to all forms (login, register, signature save)

### Analytics Instrumentation

- [ ] T162 Initialize analytics SDK (Amplitude/Mixpanel) in src/app/_layout.tsx
- [ ] T163 Initialize Sentry error tracking in src/app/_layout.tsx
- [ ] T164 [P] Add ScreenTracker to all major screens (home, gallery, signature-canvas, wallpaper-editor, auth screens)
- [ ] T165 [P] Verify all critical user actions have analytics events (refer to T062, T078, T091, T103, T112, T134, T152)
- [ ] T166 Add performance monitoring: track app launch time, signature capture FPS, wallpaper generation duration

### GDPR Compliance

- [ ] T167 Create consent modal component for analytics opt-in/opt-out
- [ ] T168 Add consent check to analytics initialization (respect user preference)
- [ ] T169 Create privacy policy screen accessible from settings
- [ ] T170 Implement data export functionality (allow users to download their signatures as ZIP)

### Performance Optimization

- [ ] T171 Add React.memo to expensive components (SignatureCanvas, WallpaperPreview, SignatureCard)
- [ ] T172 Implement image optimization: compress signature PNGs before save
- [ ] T173 Add lazy loading to template images in TemplateCarousel
- [ ] T174 Profile signature canvas rendering to verify 60fps on target devices (2019+)
- [ ] T175 Run TypeScript type checking: `npx tsc --noEmit` and fix any errors
- [ ] T176 Verify app size is under 50MB (run `npx expo export` and check bundle size)

### Documentation

- [ ] T177 Update README.md with setup instructions from quickstart.md
- [ ] T178 [P] Add inline JSDoc comments to all public APIs (hooks, services, components)
- [ ] T179 [P] Create CONTRIBUTING.md with code style guidelines

---

## Dependencies & Execution Order

### Story Dependencies Graph

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ↓
Phase 3 (US1: Capture Signature) ← MVP CORE
    ↓
    ├─→ Phase 4 (US2: Create Wallpaper)
    ├─→ Phase 5 (US3: Browse Collection)
    ├─→ Phase 6 (US4: Onboarding) [INDEPENDENT]
    ├─→ Phase 7 (US5: Share) [depends on US1, optionally US2]
    ├─→ Phase 8 (US6: Authentication) [INDEPENDENT, enhances US1]
    │       ↓
    └─→ Phase 9 (US7: Premium) [depends on US2, US6]
            ↓
        Phase 10 (Polish)
```

### Parallel Execution Opportunities

**Within Phase 2 (Foundational)**: Tasks T013-T020 (all type files) can run in parallel. Tasks T021-T025 (constants) can run in parallel. Tasks T026-T030 (utils) can run in parallel. Tasks T031-T040 (UI components) can run in parallel. Tasks T041-T043 (storage) can run in parallel. Tasks T044-T049 (analytics setup) can run in parallel.

**Within Phase 3 (US1)**: T052-T055 (UI components) can run in parallel after T050-T051 complete.

**Within Phase 4 (US2)**: T065-T069 (wallpaper components) can run in parallel.

**Within Phase 8 (US6)**: T126-T128 (auth screens) can run in parallel after auth services complete.

**Within Phase 10 (Polish)**: Most polish tasks (T156-T161, T164-T165, T178-T179) can run in parallel.

---

## MVP Scope Recommendation

**MVP = Phase 1 + Phase 2 + Phase 3 (User Story 1 only)**

This delivers core value: capture celebrity signatures digitally with 60fps performance, save with metadata, persist locally.

**Task Count**: ~63 tasks (Setup + Foundational + US1)
**Estimated Duration**: 2-3 days for experienced React Native developer

**MVP Validation**: User can launch app, capture signature on canvas, enter celebrity name, save signature locally, see it persisted across app restarts.

**Post-MVP Increments**:
- **v0.2**: Add US2 (Wallpaper creation) - 15 tasks
- **v0.3**: Add US3 (Gallery management) - 11 tasks
- **v0.4**: Add US4 (Onboarding) + US5 (Sharing) - 21 tasks
- **v0.5**: Add US6 (Auth & Sync) - 24 tasks
- **v1.0**: Add US7 (Premium) + Polish - 45 tasks

---

## Implementation Strategy

1. **Phase-by-Phase**: Complete each phase fully before moving to the next
2. **Test as You Go**: Manually test each user story increment on both iOS and Android simulators
3. **Type-Check Frequently**: Run `npx tsc --noEmit` after completing each phase
4. **Analytics-First**: Add tracking to each feature as it's built (don't defer to end)
5. **Performance Monitor**: Use React DevTools Profiler to verify 60fps on SignatureCanvas
6. **Incremental Commits**: Commit after each phase completion with descriptive messages

## Task Validation

**Format**: ✅ All tasks follow checklist format with checkbox, Task ID, optional [P] and [Story] labels, clear description, file path
**Completeness**: ✅ All 7 user stories covered with independently testable increments
**Dependencies**: ✅ Dependency graph shows clear completion order
**Parallelization**: ✅ 50+ tasks marked [P] for parallel execution
**MVP Clarity**: ✅ MVP scope explicitly defined (Phases 1-3)

**Total Tasks**: 179
**Parallelizable Tasks**: 52
**User Story Tasks**: 127 (US1: 14, US2: 16, US3: 11, US4: 12, US5: 9, US6: 24, US7: 18, Polish: 23)
**Infrastructure Tasks**: 52 (Setup: 12, Foundational: 40)
