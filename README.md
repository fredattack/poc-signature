# Digital Autograph Platform - Mobile App

A React Native mobile application for capturing, managing, and creating custom wallpapers from celebrity signatures.

## 🎯 Features

### Core Features (MVP)
- **60fps Signature Capture**: Hardware-accelerated drawing canvas using Skia
- **Gallery Management**: 2-column grid with sorting (recent, oldest, A-Z, Z-A)
- **Custom Wallpapers**: 20 templates (5 free, 15 premium) with color customization
- **Cloud Sync**: Manual sync with pull-to-refresh (offline-first architecture)
- **Share**: Native share sheet for signatures and wallpapers

### Premium Features
- **Unlimited Storage**: No 10-signature limit
- **Premium Templates**: 15 exclusive designs
- **HD & UHD Export**: Wallpapers up to 4K (2160x3840)
- **Priority Support**: Faster response times
- **Ad-Free**: Uninterrupted experience

### Additional Features
- **Onboarding**: 3-slide carousel for first-time users
- **Authentication**: Email/password, Google, Apple Sign-In (with anonymous mode)
- **Geolocation**: Optional location tagging for signatures
- **Soft Delete**: 1-year retention period (GDPR compliant)
- **Analytics**: Amplitude/Sentry integration with GDPR consent
- **Multi-platform**: iOS and Android

## 🛠️ Tech Stack

### Core
- **React Native**: 0.74.0
- **Expo SDK**: 51.0.0
- **TypeScript**: 5.3.0 (strict mode)
- **Expo Router**: File-based navigation

### UI & Graphics
- **@shopify/react-native-skia**: 60fps canvas rendering
- **react-native-reanimated**: 60fps UI animations
- **react-native-svg**: Template rendering
- **@shopify/flash-list**: Optimized list performance

### State Management
- **Zustand**: Global state (auth, signatures, premium)
- **TanStack Query**: API state with caching
- **AsyncStorage**: Local data persistence
- **expo-secure-store**: Encrypted token storage

### Services
- **expo-file-system**: Image storage
- **expo-media-library**: Photo gallery integration
- **expo-sharing**: Native share sheets
- **expo-location**: Geolocation (optional)

### Backend Integration (Mock/Ready)
- **Stripe**: Payment processing (premium subscriptions)
- **Firebase/Supabase**: Authentication & database (mock implementation)
- **Amplitude**: Analytics tracking
- **Sentry**: Error tracking

## 📁 Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main tab navigation
│   ├── index.tsx          # Entry point with onboarding check
│   ├── onboarding.tsx     # 3-slide onboarding
│   ├── signature-canvas.tsx
│   ├── signature-detail.tsx
│   ├── wallpaper-editor.tsx
│   └── premium.tsx
├── components/
│   ├── analytics/         # Analytics provider & tracking
│   ├── error/             # Error boundary
│   ├── gdpr/              # GDPR consent modal
│   ├── onboarding/        # Onboarding slides & illustrations
│   ├── premium/           # Paywall, badges, subscription cards
│   ├── shared/            # Reusable components (Header, EmptyState, etc.)
│   ├── signature/         # SignatureCanvas, SignatureCard, ColorPicker
│   ├── ui/                # Base UI components (Button, Input, Modal, etc.)
│   └── wallpaper/         # TemplateRenderer, WallpaperPreview, TemplateCarousel
├── constants/             # Design system (colors, typography, spacing, templates)
├── hooks/                 # Custom hooks (useSignature, useWallpaper, useAuth, etc.)
├── services/
│   ├── analytics/         # Amplitude, Sentry integration
│   ├── api/               # HTTP client, auth, subscriptions, signatures APIs
│   ├── sharing/           # Share service
│   ├── storage/           # AsyncStorage, SecureStorage, FileSystem
│   └── sync/              # Manual signature sync
├── store/                 # Zustand stores (auth, signatures, premium)
├── types/                 # TypeScript type definitions
└── utils/                 # Validators, formatters, permissions, constants

specs/                     # Project specifications
├── 001-signature-platform/
│   ├── spec.md           # Feature specification
│   ├── plan.md           # Implementation plan
│   └── tasks.md          # Task breakdown (179 tasks)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone repository
git clone <repository-url>
cd poc-signature

# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Environment Variables

Create `.env` file in project root:

```env
# API Configuration
EXPO_PUBLIC_API_URL=https://api.signature-app.com

# Analytics (Optional)
EXPO_PUBLIC_AMPLITUDE_API_KEY=your_amplitude_key
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Stripe (Optional - using mock for POC)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Firebase/Supabase (Optional - using mock for POC)
EXPO_PUBLIC_FIREBASE_CONFIG=your_firebase_config
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Run tests (when implemented)
npm test

# Lint
npm run lint
```

## 📦 Building

```bash
# Build for iOS
npm run build:ios

# Build for Android
npm run build:android

# Check bundle size
npx expo export
```

## 🏗️ Architecture Patterns

### Offline-First Design
- Local-first with AsyncStorage
- Manual sync (pull-to-refresh)
- Sync status tracking (pending, synced, failed)
- Works fully offline without account

### Type Safety
- Strict TypeScript mode enabled
- All props and state typed
- No `any` types allowed
- Path aliases: `@/*` maps to `src/*`

### Performance
- 60fps signature canvas (Skia)
- FlashList for gallery (recycling)
- React.memo on expensive components
- Image compression before save
- Lazy loading for templates

### Error Handling
- Global ErrorBoundary
- Try-catch in all async operations
- User-friendly error messages
- Sentry integration ready

### Analytics
- GDPR-compliant consent modal
- Event tracking throughout app
- Screen view tracking
- Error tracking
- Performance monitoring

## 🔐 Security

- Tokens stored in expo-secure-store (encrypted)
- User data in AsyncStorage
- Bearer token authentication
- Refresh token support
- No sensitive data in analytics

## 📱 Features by Phase

### Phase 1-2: Setup & Foundation ✅
- Project initialization
- Design system
- Type definitions
- Base UI components
- Storage services

### Phase 3: Capture Signature (MVP) ✅
- 60fps Skia canvas
- Color picker (4 colors)
- Celebrity name input
- Location tagging
- Save to local storage

### Phase 4: Create Wallpaper ✅
- 20 templates
- Template customization
- SVG rendering
- Save to gallery
- Set as wallpaper

### Phase 5: Gallery Management ✅
- 2-column grid (FlashList)
- 4 sort options
- Pull-to-refresh
- Signature detail view
- Delete with confirmation

### Phase 6: Onboarding ✅
- 3-slide carousel
- Skip functionality
- Analytics tracking
- Never show again

### Phase 7: Share ✅
- Native share sheet
- Share signatures
- Share wallpapers
- Success toast

### Phase 8: Authentication & Sync ✅
- Email/password auth
- Social login (Google, Apple)
- Anonymous mode
- Manual cloud sync
- Sync status indicators

### Phase 9: Premium Subscription ✅
- Stripe integration (mock)
- Monthly/Annual plans
- 7-day free trial
- Premium templates unlocked
- HD/UHD export
- Unlimited storage

### Phase 10: Polish ✅
- Error boundary
- GDPR consent
- Analytics initialization
- Performance optimization
- Documentation

## 🎨 Design System

### Colors
- Primary: #6366F1 (Indigo)
- Accent: #EC4899 (Pink)
- Success: #10B981 (Green)
- Error: #EF4444 (Red)

### Typography
- H1: 32px, Bold
- H2: 24px, Bold
- H3: 20px, Semibold
- H4: 18px, Semibold
- Body: 16px, Regular
- Caption: 14px, Regular

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

## 🤝 Contributing

This is a proof-of-concept project. For production deployment:

1. Replace mock services with real implementations:
   - Firebase/Supabase for backend
   - Real Stripe integration
   - Actual Amplitude/Sentry keys

2. Add tests:
   - Unit tests for utils/hooks
   - Integration tests for flows
   - E2E tests with Detox

3. Add CI/CD:
   - GitHub Actions for tests
   - EAS Build for app stores
   - Fastlane for deployment

## 📄 License

Private project - All rights reserved

## 👥 Team

Built using Specify AI-powered development workflow

---

**Version**: 0.1.0
**Last Updated**: 2025-10-28
