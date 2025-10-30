# Quickstart Guide: Digital Autograph Platform

**Feature**: Digital Autograph Platform Mobile App
**Branch**: `001-signature-platform`
**Last Updated**: 2025-10-27

## Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS + Xcode) or Android Emulator (Android Studio)
- Git
- Code editor (VS Code recommended with React Native extensions)

## Initial Setup

### 1. Clone and Install

```bash
# Navigate to project directory
cd /path/to/poc-signature

# Checkout feature branch
git checkout 001-signature-platform

# Install dependencies
npm install

# or with yarn
yarn install
```

### 2. Environment Configuration

Create `.env` file in project root:

```env
# API Configuration
API_URL=http://localhost:3000/v1
# or for production:
# API_URL=https://api.signatureapp.com/v1

# Firebase/Supabase (choose one)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

# Analytics (optional)
AMPLITUDE_API_KEY=your_amplitude_key
SENTRY_DSN=your_sentry_dsn
```

### 3. Configure Expo

Update `app.json` or `app.config.js` with your project details:

```javascript
// app.config.js
export default {
  expo: {
    name: "SignatureApp",
    slug: "signature-app",
    // ... other config from plan.md
    extra: {
      apiUrl: process.env.API_URL,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      // ... other env vars
    }
  }
};
```

## Development

### Run Development Server

```bash
# Start Expo dev server
npx expo start

# Options:
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Scan QR code with Expo Go app on physical device
```

### Run on Specific Platform

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android

# Web (for quick testing, not production)
npx expo start --web
```

### TypeScript Type Checking

```bash
# Run TypeScript compiler check
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

## Project Structure Overview

```
src/
├── app/                 # Expo Router screens (file-based routing)
├── components/          # Reusable React components
├── hooks/               # Custom hooks (useSignature, useAuth, etc.)
├── services/            # API clients, storage, sync logic
├── store/               # Zustand global state stores
├── types/               # TypeScript type definitions
├── constants/           # Design system, templates, colors
└── assets/              # Images, icons, fonts
```

See `plan.md` for detailed structure.

## Key Technologies

### Core Stack
- **React Native 0.74.0** - Mobile framework
- **Expo SDK 51.0.0** - Development platform
- **TypeScript 5.3.0** - Type safety (strict mode)

### UI & Performance
- **@shopify/react-native-skia** - High-performance signature canvas (60fps)
- **@shopify/flash-list** - Optimized list rendering for gallery
- **react-native-reanimated 3.6.1** - Smooth animations on UI thread

### State Management
- **zustand** - Global state (auth, signatures, premium)
- **@tanstack/react-query** - API state management with caching

### Navigation
- **Expo Router** - File-based routing
- **@react-navigation/native** - Navigation primitives

### Authentication & Backend
- **Firebase Auth** or **Supabase** - User authentication
- **expo-secure-store** - Encrypted token storage
- **AsyncStorage** - Local data persistence

### Payments
- **@stripe/stripe-react-native** - In-app subscriptions

### Media & Sharing
- **react-native-view-shot** - Wallpaper image generation
- **expo-sharing** - Native share sheet
- **expo-media-library** - Save to device gallery
- **expo-location** - Geolocation for signatures

## Development Workflow

### 1. Feature Branch

```bash
# Create feature branch from 001-signature-platform
git checkout -b feature/signature-canvas

# Work on feature...

# Commit with meaningful messages
git add .
git commit -m "feat: implement signature canvas with Skia"
```

### 2. TypeScript Strict Mode

Ensure all code is properly typed:

```typescript
// Good - explicit types
interface SignatureCanvasProps {
  onSave: (signature: Signature) => Promise<void>;
  initialColor: SignatureColor;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ onSave, initialColor }) => {
  // implementation
};

// Bad - implicit any
const saveSignature = (signature) => { // ❌ 'signature' has implicit 'any'
  // ...
};
```

### 3. Component Development

Follow React Native Mobile Constitution principles:

```typescript
// src/components/signature/SignatureCanvas.tsx
import React, { useState } from 'react';
import { Canvas, Path } from '@shopify/react-native-skia';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import type { SignatureCanvasProps } from '@/types/signature.types';

// ✅ Component-first architecture (Principle I)
// ✅ TypeScript strict mode (Principle II)
// ✅ Functional component with hooks
export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSave,
  initialColor = 'black'
}) => {
  const [paths, setPaths] = useState<Path[]>([]);

  // Separate business logic into custom hook
  const { handleGesture, clearCanvas } = useSignatureGestures(paths, setPaths);

  return (
    <GestureDetector gesture={handleGesture}>
      <Canvas style={{ flex: 1 }}>
        {paths.map((path, index) => (
          <Path key={index} path={path} color={initialColor} />
        ))}
      </Canvas>
    </GestureDetector>
  );
};
```

### 4. State Management Patterns

**Global State (Zustand)**:

```typescript
// src/store/auth-store.ts
import { create } from 'zustand';
import type { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })
}));
```

**API State (TanStack Query)**:

```typescript
// src/hooks/useSignatures.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { signatureService } from '@/services/api/signatures';

export function useSignatures() {
  const queryClient = useQueryClient();

  const { data: signatures, isLoading } = useQuery({
    queryKey: ['signatures'],
    queryFn: signatureService.getAll,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const createMutation = useMutation({
    mutationFn: signatureService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatures'] });
    }
  });

  return { signatures, isLoading, createSignature: createMutation.mutate };
}
```

### 5. Performance Best Practices

**60fps Canvas Rendering**:
- Use @shopify/react-native-skia for hardware acceleration
- Minimize re-renders with React.memo and useMemo
- Profile with React DevTools

**Optimized List Rendering**:
```typescript
// Use FlashList instead of FlatList (constitution requirement)
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={signatures}
  estimatedItemSize={200}
  renderItem={({ item }) => <SignatureCard signature={item} />}
/>
```

**Smooth Animations**:
```typescript
// Use react-native-reanimated for 60fps animations
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const animatedStyle = useAnimatedStyle(() => ({
  opacity: withTiming(isVisible ? 1 : 0)
}));
```

## Testing

### Unit Tests (optional, recommended for P1)

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

Example test:

```typescript
// src/components/signature/__tests__/SignatureCanvas.test.tsx
import { render, screen } from '@testing-library/react-native';
import { SignatureCanvas } from '../SignatureCanvas';

describe('SignatureCanvas', () => {
  it('renders canvas and color picker', () => {
    const onSave = jest.fn();
    render(<SignatureCanvas onSave={onSave} />);

    expect(screen.getByTestId('signature-canvas')).toBeTruthy();
    expect(screen.getByTestId('color-picker')).toBeTruthy();
  });
});
```

### Manual Device Testing

Test on physical devices before release (constitution requirement V):

```bash
# Build development client
eas build --profile development --platform ios
eas build --profile development --platform android

# Install on device and test:
# - iOS: eas build:run --profile development --platform ios
# - Android: adb install build.apk
```

**Critical Test Cases**:
- Signature canvas 60fps on older devices (2019+)
- Offline mode + background sync
- Cross-platform UI consistency
- Photo library permissions
- Location permissions
- Payment flow (test mode)

## Building for Production

### Configure EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project
eas build:configure
```

### Create Production Builds

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production

# Both
eas build --platform all --profile production
```

### Submit to App Stores

```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

## Troubleshooting

### Common Issues

**Metro bundler cache issues**:
```bash
npx expo start --clear
```

**iOS simulator not launching**:
```bash
# Reset simulator
xcrun simctl erase all
```

**Android build errors**:
```bash
cd android
./gradlew clean
cd ..
npx expo start --android
```

**TypeScript errors**:
```bash
# Regenerate types
npx expo customize tsconfig.json
```

### Performance Debugging

```bash
# Enable performance monitor
# Shake device → Show Perf Monitor

# React DevTools Profiler
# npm install -g react-devtools
# react-devtools
```

## Additional Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **Skia Canvas**: https://shopify.github.io/react-native-skia/
- **TanStack Query**: https://tanstack.com/query/latest
- **Constitution**: See `.specify/memory/constitution.md`
- **Plan Details**: See `specs/001-signature-platform/plan.md`
- **Data Model**: See `specs/001-signature-platform/data-model.md`
- **API Contracts**: See `specs/001-signature-platform/contracts/`

## Next Steps

1. **Phase 2**: Run `/speckit.tasks` to generate task breakdown
2. **Implementation**: Follow tasks.md for step-by-step development
3. **Testing**: Verify on both iOS and Android
4. **Review**: Code review focusing on constitution compliance
5. **Deploy**: EAS Build → App Store / Play Store

## Support

For questions or issues:
- Check `plan.md` for architectural decisions
- Review `research.md` for technology rationale
- Refer to constitution for coding standards
- Consult API contracts for backend integration details
