# Technical Research: Digital Autograph Platform

**Phase**: 0 - Outline & Research
**Date**: 2025-10-27
**Purpose**: Resolve technical unknowns and establish architectural decisions

## Research Tasks Completed

### 1. High-Performance Signature Canvas

**Decision**: @shopify/react-native-skia for canvas rendering

**Rationale**:
- Hardware-accelerated rendering achieves 60fps requirement (FR-030, SC-002)
- Native performance through direct GPU access on iOS and Android
- Supports complex drawing operations (paths, colors, transformations)
- Actively maintained by Shopify with production usage in major apps
- Smaller bundle size than alternatives (react-native-svg canvas)

**Alternatives Considered**:
- **react-native-svg with drawing**: Lower performance (~30-40fps on older devices), CPU-bound
- **react-native-canvas**: Abandoned, not compatible with React Native 0.74
- **Custom native modules**: Violates Expo managed workflow, requires bare workflow and platform-specific code

**Best Practices**:
- Use Skia's Path API for smooth stroke rendering
- Implement touch responder with gesture-handler for low-latency input
- Debounce/throttle canvas redraws if needed (target 60fps, measure actual performance)
- Export canvas to PNG using makeImageSnapshot for saving signatures

**Implementation Notes**:
- SignatureCanvas component will use `<Canvas>` from @shopify/react-native-skia
- Touch events captured via react-native-gesture-handler Pan/Tap gestures
- Path data stored as array of points for undo/redo and serialization

---

### 2. State Management Strategy

**Decision**: Zustand for global state + TanStack Query for server state

**Rationale**:
- **Zustand**: Lightweight (1kb), TypeScript-first, minimal boilerplate, ideal for auth/app config/premium status
- **TanStack Query**: Industry standard for API state management, built-in caching, background sync, offline support, loading/error states
- **Local component state**: useState/useReducer for UI-only state (form inputs, modal visibility)
- Avoids Redux complexity for this scale (5 entities, 7 user stories)

**Alternatives Considered**:
- **Redux Toolkit**: Overkill for MVP, more boilerplate, larger bundle size (constitution prefers simplicity)
- **React Context only**: No built-in caching/sync for API calls, manual implementation required
- **MobX**: Less TypeScript-friendly, steeper learning curve, smaller community

**Best Practices**:
- Zustand stores: auth-store, signatures-store (local cache), app-config-store, premium-store
- TanStack Query for all API calls with query keys: ['signatures', 'user'], ['wallpapers', signatureId]
- Persist Zustand state to AsyncStorage for offline access
- Use optimistic updates for signature creation/deletion (immediate UI feedback)

**Implementation Notes**:
- Define stores in `src/store/` with TypeScript interfaces
- Configure TanStack Query client with staleTime: 5 minutes, cacheTime: 10 minutes
- Use queryClient.invalidateQueries for manual cache refresh after mutations

---

### 3. Offline-First Architecture

**Decision**: AsyncStorage + Background Sync Queue Pattern

**Rationale**:
- Signatures and wallpapers are inherently offline-capable (local file system)
- AsyncStorage for metadata (celebrity names, dates, locations, settings)
- expo-file-system for image storage (signatures, wallpapers)
- Background sync queue for uploading to cloud when connection available
- Aligns with FR-023 (offline usage + background sync)

**Alternatives Considered**:
- **SQLite (expo-sqlite)**: Overkill for simple key-value data, adds complexity
- **Realm**: Not needed for this data model, larger bundle size
- **WatermelonDB**: Over-engineered for MVP, steep learning curve

**Best Practices**:
- Store signatures as: `{ id, celebrityName, timestamp, location, imagePath, syncStatus: 'pending'|'synced'|'error', userId }`
- Sync queue checks network status on app foreground/background state changes
- Use expo-network to detect connectivity changes
- Implement retry logic with exponential backoff for failed syncs
- Show sync status indicator in UI (synced icon, pending icon, error icon)

**Implementation Notes**:
- Create `src/services/sync/signature-sync.ts` with SyncQueue class
- Use TanStack Query mutations with onSuccess callback to mark as synced
- Persist sync queue to AsyncStorage to survive app restarts

---

### 4. Wallpaper Template System

**Decision**: SVG-based templates with react-native-svg + Template Configuration Objects

**Rationale**:
- Templates are static layouts with dynamic content injection
- SVG provides resolution-independent rendering (supports all screen sizes)
- Template configs define: signature position, text positions, background style, premium flag
- Easy to add new templates without code changes (JSON config + SVG component)
- Supports customization (background color, show/hide date/location)

**Alternatives Considered**:
- **Canvas-based templates**: Harder to maintain, requires manual layout calculations
- **Image templates**: Not dynamic, can't customize colors/text easily
- **CSS-based templates**: Not suitable for exporting to image file

**Best Practices**:
- Define template interface: `{ id, name, isPremium, layout: { signature: {x, y, width, height}, date: {x, y}, location: {x, y} } }`
- Store 5 free templates + 15+ premium templates in `src/constants/templates.ts`
- Render template using react-native-svg components (Rect, Text, Image for signature)
- Export to image using react-native-view-shot's captureRef for wallpaper download

**Implementation Notes**:
- TemplateRenderer component takes template config + signature data as props
- WallpaperPreview shows real-time preview during customization
- Use react-native-view-shot to capture final wallpaper as PNG/JPEG

---

### 5. Authentication & Cloud Sync Backend

**Decision**: Firebase Authentication + Custom Backend API (or Supabase)

**Rationale**:
- **Firebase Auth**: Supports email/password, Google Sign-In, Apple Sign-In out of the box (FR-020, FR-021)
- **Custom API**: Needed for signature storage, wallpaper generation, subscription management
- **Supabase alternative**: Open-source Firebase alternative with built-in PostgreSQL, Row Level Security, real-time subscriptions
- Both support secure token-based authentication

**Alternatives Considered**:
- **Auth0**: More expensive, overkill for simple auth flows
- **AWS Cognito**: More complex setup, less mobile-friendly
- **Custom JWT auth**: Reinventing the wheel, more security risks

**Best Practices**:
- Store Firebase ID tokens in expo-secure-store (encrypted storage)
- Send token in Authorization header for API requests
- Implement token refresh logic (Firebase handles this automatically)
- Use Firebase security rules or Supabase RLS for user data isolation
- Support anonymous users (local-only mode) until they create account

**Implementation Notes**:
- Install @react-native-firebase/auth or @supabase/supabase-js
- Create `src/hooks/useAuth.ts` with login/logout/register functions
- Auth state synced to zustand auth-store for app-wide access
- API client adds auth token automatically to all requests

---

### 6. Payment Integration

**Decision**: @stripe/stripe-react-native for in-app subscriptions

**Rationale**:
- Official Stripe SDK for React Native (FR-025)
- Supports both iOS and Android with native payment sheets
- Handles Apple Pay and Google Pay automatically
- Secure payment processing (PCI DSS compliant)
- Subscription management built-in (monthly/annual plans, free trials)

**Alternatives Considered**:
- **RevenueCat**: Abstraction layer over Stripe/Apple/Google, adds complexity for this use case
- **Native IAP (Apple/Google)**: Requires separate implementations for each platform, Stripe is cross-platform
- **Paddle**: Less mobile-focused, more web-oriented

**Best Practices**:
- Use Stripe Checkout for web-like payment experience on mobile
- Implement subscription webhook on backend to sync premium status
- Store subscription status in Zustand premium-store
- Check premium status before accessing locked features (templates, HD export)
- Offer 7-day free trial for both monthly and annual plans (FR-026)

**Implementation Notes**:
- Initialize Stripe with publishable key from env config
- Create PaymentSheet component for checkout flow
- Backend API creates Stripe checkout session and returns URL
- Poll backend for subscription status after payment completes

---

### 7. Image Export & Sharing

**Decision**: react-native-view-shot + expo-sharing + expo-media-library

**Rationale**:
- **react-native-view-shot**: Captures any React component as image (wallpaper preview → PNG)
- **expo-sharing**: Native share sheet integration (FR-018, FR-019)
- **expo-media-library**: Saves to device gallery with proper permissions
- All three are Expo-compatible, no bare workflow needed

**Alternatives Considered**:
- **react-native-share**: Third-party, expo-sharing is official Expo API
- **Custom native modules**: Violates Expo managed workflow
- **Canvas export only**: Doesn't work for SVG-based templates

**Best Practices**:
- Request photo library permissions before saving (expo-media-library)
- Show loading indicator during capture/export (can take 1-2 seconds)
- Export wallpapers at native device resolution for best quality
- Premium users get full HD export, free users get standard resolution (FR-029)
- Share sheet includes: Instagram, Twitter, TikTok, Messages, Email, Save to Files

**Implementation Notes**:
- Use captureRef with format: 'png', quality: 1.0 for premium, 0.8 for free
- Implement in `src/services/sharing/share-service.ts`
- Handle permission denials gracefully (show settings prompt)

---

### 8. Performance Optimization

**Decision**: @shopify/flash-list + react-native-reanimated + Image optimization

**Rationale**:
- **@shopify/flash-list**: Faster than FlatList (constitution requires optimized lists), handles 1000+ items
- **react-native-reanimated**: 60fps animations on UI thread (constitution requirement IV)
- **expo-image**: Faster image loading with built-in caching
- Meets performance goals: 60fps canvas, <2s launch, <3s wallpaper generation

**Alternatives Considered**:
- **FlatList**: Default React Native, good but flash-list is faster
- **react-native-fast-image**: Not Expo-compatible, expo-image is official
- **Animated API**: JS thread-based, reanimated runs on UI thread (smoother)

**Best Practices**:
- Use flash-list for signature gallery (2-column grid)
- Optimize images: resize on upload, serve WebP format from API
- Lazy load images with placeholders
- Use react-native-reanimated for smooth gestures (signature canvas, template carousel)
- Enable Hermes JavaScript engine (default in Expo 51)
- Code-split with dynamic imports for non-critical screens

**Implementation Notes**:
- Replace FlatList with FlashList in gallery: `<FlashList estimatedItemSize={200} />`
- Use Animated.View from reanimated for smooth transitions
- Implement image CDN with automatic resizing (Cloudinary, Imgix, or custom)

---

### 9. Location Services

**Decision**: expo-location with city-level accuracy

**Rationale**:
- expo-location provides cross-platform geolocation API
- City-level accuracy sufficient per requirements (FR-004)
- Reverse geocoding converts coordinates to city name
- Lower battery usage than high-accuracy GPS

**Alternatives Considered**:
- **react-native-geolocation**: Not Expo-compatible
- **IP-based location**: Less accurate, privacy concerns
- **Manual city input**: Poor UX, users prefer automatic

**Best Practices**:
- Request location permission only when user enables "Capture location" toggle
- Use lastKnownPositionAsync first (faster, cached)
- Fall back to getCurrentPositionAsync if stale
- Reverse geocode to get city name: `Location.reverseGeocodeAsync(coords)`
- Cache location for 1 hour to avoid repeated API calls
- Handle permission denial gracefully (disable toggle, show explanation)

**Implementation Notes**:
- Create `src/hooks/useLocation.ts` with getCity() function
- Check permission status before requesting location
- Show loading indicator while fetching location

---

### 10. Onboarding & Persistence

**Decision**: AsyncStorage for onboarding completion flag + Animated ScrollView

**Rationale**:
- AsyncStorage persists flag across app restarts (FR-017)
- react-native-reanimated for smooth slide animations
- Standard pattern for mobile onboarding

**Best Practices**:
- Set flag: `AsyncStorage.setItem('hasSeenOnboarding', 'true')` on completion/skip
- Check flag on app launch in root _layout.tsx
- Use horizontal ScrollView with pagingEnabled for slides
- Add "Skip" button visible on all slides
- Use dots pagination indicator (active/inactive states)

**Implementation Notes**:
- 3 slides with illustrations, title, description (FR-015)
- Slide 1: Signature capture, Slide 2: Wallpapers, Slide 3: Sharing
- Final slide button: "Get Started" instead of "Next"

---

## Summary of Key Technologies

**Core Stack**:
- React Native 0.74.0 + Expo SDK 51.0.0
- TypeScript 5.3.0 (strict mode)
- @shopify/react-native-skia (signature canvas)
- @shopify/flash-list (optimized lists)
- react-native-reanimated 3.6.1 (animations)

**State Management**:
- Zustand (global state)
- TanStack Query (API state)
- AsyncStorage (persistence)

**Backend & Auth**:
- Firebase Auth or Supabase
- Custom REST API for signatures/wallpapers
- expo-secure-store (token storage)

**Payments & Sharing**:
- @stripe/stripe-react-native
- expo-sharing (native share sheet)
- expo-media-library (save to gallery)

**Utilities**:
- expo-location (geolocation)
- react-native-view-shot (image export)
- expo-file-system (file management)

All decisions align with React Native Mobile Application Constitution principles and support the feature requirements (60fps, offline-first, cross-platform, TypeScript strict mode).

## Next Phase

Phase 1: Design & Contracts
- Generate data-model.md (5 entities from spec)
- Create API contracts (signatures, wallpapers, auth, subscriptions)
- Write quickstart.md (setup instructions)
- Update agent context with technology stack
