# Developer Quick Reference - Signature App

This quick reference provides instant access to common development tasks, patterns, and code snippets.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Quality checks before commit
npm run quality:fix
```

## Project Structure Quick Reference

```
src/
├── app/              → Screens (Expo Router file-based routing)
├── components/       → Reusable UI components
├── hooks/            → Custom React hooks (business logic)
├── services/         → External service integrations (API, storage, analytics)
├── store/            → Zustand global state stores
├── theme/            → Design tokens and theme provider
├── types/            → TypeScript type definitions
├── constants/        → App-wide constants
└── utils/            → Utility functions
```

## Common Development Patterns

### 1. Creating a New Screen

**File**: `src/app/my-screen.tsx`

```typescript
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeTokens } from '@/theme';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function MyScreen() {
  const router = useRouter();
  const { screen } = useAnalytics();
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    screen('MyScreen');
  }, [screen]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Screen</Text>
    </View>
  );
}

const createStyles = ({ colors, tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface.background,
      padding: tokens.spacing.md,
    },
    title: {
      fontSize: tokens.typography.headingL.fontSize,
      fontWeight: tokens.typography.headingL.fontWeight,
      color: colors.text.primary,
    },
  });
```

**Register in navigation**: Add to `src/app/_layout.tsx`:

```typescript
<Stack.Screen
  name="my-screen"
  options={{
    headerShown: false,
  }}
/>
```

### 2. Creating a Reusable Component

**File**: `src/components/ui/MyComponent.tsx`

```typescript
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useThemeTokens } from '@/theme';

interface MyComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

export function MyComponent({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: MyComponentProps) {
  const { colors, tokens } = useThemeTokens();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && { backgroundColor: colors.brand.primary },
        variant === 'secondary' && { backgroundColor: colors.brand.secondary },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: colors.text.inverse }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
```

### 3. Creating a Custom Hook

**File**: `src/hooks/useMyHook.ts`

```typescript
import { useCallback, useState } from 'react';
import { useAnalytics } from './useAnalytics';

interface UseMyHookOptions {
  initialValue?: string;
}

interface UseMyHookResult {
  value: string;
  isLoading: boolean;
  error: string | null;
  setValue: (newValue: string) => void;
  performAction: () => Promise<void>;
}

export function useMyHook(options: UseMyHookOptions = {}): UseMyHookResult {
  const { initialValue = '' } = options;
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { track } = useAnalytics();

  const performAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Perform async action
      await new Promise(resolve => setTimeout(resolve, 1000));

      track('my_action_completed', { value });
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsLoading(false);
    }
  }, [value, track]);

  return {
    value,
    isLoading,
    error,
    setValue,
    performAction,
  };
}
```

### 4. Adding a Zustand Store

**File**: `src/store/my-store.ts`

```typescript
import { create } from 'zustand';
import { asyncStorage } from '@/services/storage/async-storage';

const STORAGE_KEY = '@signature_app/my_data';

interface MyData {
  id: string;
  name: string;
}

interface MyStoreState {
  items: MyData[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadItems: () => Promise<void>;
  addItem: (item: MyData) => Promise<void>;
  updateItem: (id: string, updates: Partial<MyData>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  getById: (id: string) => MyData | undefined;
}

export const useMyStore = create<MyStoreState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const stored = await asyncStorage.get<MyData[]>(STORAGE_KEY);
      set({ items: stored || [], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load items', isLoading: false });
    }
  },

  addItem: async (item: MyData) => {
    try {
      const currentItems = get().items;
      const updatedItems = [...currentItems, item];
      await asyncStorage.set(STORAGE_KEY, updatedItems);
      set({ items: updatedItems });
    } catch (error) {
      set({ error: 'Failed to add item' });
      throw error;
    }
  },

  updateItem: async (id: string, updates: Partial<MyData>) => {
    try {
      const currentItems = get().items;
      const updatedItems = currentItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      await asyncStorage.set(STORAGE_KEY, updatedItems);
      set({ items: updatedItems });
    } catch (error) {
      set({ error: 'Failed to update item' });
      throw error;
    }
  },

  removeItem: async (id: string) => {
    try {
      const currentItems = get().items;
      const updatedItems = currentItems.filter(item => item.id !== id);
      await asyncStorage.set(STORAGE_KEY, updatedItems);
      set({ items: updatedItems });
    } catch (error) {
      set({ error: 'Failed to remove item' });
      throw error;
    }
  },

  getById: (id: string) => {
    return get().items.find(item => item.id === id);
  },
}));
```

**Usage in component**:

```typescript
const { items, loadItems, addItem } = useMyStore();

useEffect(() => {
  loadItems();
}, [loadItems]);
```

### 5. Creating an API Service

**File**: `src/services/api/my-api.ts`

```typescript
import { apiClient, ApiResponse } from './client';

export interface MyEntity {
  id: string;
  name: string;
  createdAt: Date;
}

export interface CreateMyEntityRequest {
  name: string;
}

export const myApi = {
  /**
   * Get all entities
   */
  getAll: async (): Promise<ApiResponse<MyEntity[]>> => {
    return apiClient.get<MyEntity[]>('/my-entities');
  },

  /**
   * Get entity by ID
   */
  getById: async (id: string): Promise<ApiResponse<MyEntity>> => {
    return apiClient.get<MyEntity>(`/my-entities/${id}`);
  },

  /**
   * Create new entity
   */
  create: async (
    request: CreateMyEntityRequest
  ): Promise<ApiResponse<MyEntity>> => {
    return apiClient.post<MyEntity>('/my-entities', request);
  },

  /**
   * Update entity
   */
  update: async (
    id: string,
    updates: Partial<MyEntity>
  ): Promise<ApiResponse<MyEntity>> => {
    return apiClient.put<MyEntity>(`/my-entities/${id}`, updates);
  },

  /**
   * Delete entity
   */
  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/my-entities/${id}`);
  },
};
```

### 6. Adding Analytics Events

**Define event in constants**:

```typescript
// src/constants/analytics-events.ts
export const ANALYTICS_EVENTS = {
  // ... existing events
  MY_FEATURE_STARTED: 'my_feature_started',
  MY_FEATURE_COMPLETED: 'my_feature_completed',
} as const;
```

**Track in component/hook**:

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';

const { track } = useAnalytics();

// Simple event
track(ANALYTICS_EVENTS.MY_FEATURE_STARTED);

// Event with properties
track(ANALYTICS_EVENTS.MY_FEATURE_COMPLETED, {
  duration_seconds: 42,
  success: true,
  feature_name: 'My Cool Feature',
});
```

### 7. Using Design Tokens

**Access theme tokens**:

```typescript
import { useThemeTokens } from '@/theme';

const { colors, tokens } = useThemeTokens();

// Colors
colors.brand.primary           // #8A9A5B
colors.surface.background      // #E6E6E6
colors.text.primary            // #232323
colors.feedback.success        // #6F7F43

// Typography
tokens.typography.displayL.fontSize    // 32
tokens.typography.body.lineHeight      // 24
tokens.typography.caption.fontWeight   // '500'

// Spacing
tokens.spacing.xs              // 8
tokens.spacing.md              // 24
tokens.spacing.xl              // 48

// Radii
tokens.radii.regular           // 12
tokens.radii.generous          // 16

// Elevation
tokens.elevation.level2        // Shadow properties
```

**Create dynamic styles**:

```typescript
const createStyles = ({ colors, tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface.card,
      padding: tokens.spacing.md,
      borderRadius: tokens.radii.regular,
      ...tokens.elevation.level2,
    },
    title: {
      fontSize: tokens.typography.headingL.fontSize,
      fontWeight: tokens.typography.headingL.fontWeight,
      lineHeight: tokens.typography.headingL.lineHeight,
      letterSpacing: tokens.typography.headingL.letterSpacing,
      color: colors.text.primary,
    },
  });
```

## Navigation Patterns

### Navigate to Screen

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate to route
router.push('/signature-canvas');

// Navigate with params
router.push({
  pathname: '/signature-detail',
  params: { signatureId: 'sig_123' },
});

// Replace current route
router.replace('/(tabs)');

// Go back
router.back();

// Check if can go back
if (router.canGoBack()) {
  router.back();
}
```

### Get Route Params

```typescript
import { useLocalSearchParams } from 'expo-router';

const params = useLocalSearchParams<{ signatureId: string }>();
const signatureId = params.signatureId;
```

### Deep Linking

```typescript
// Link from outside app
signatureapp://signature-detail?signatureId=sig_123

// Universal link (configured in app.json)
https://signatureapp.com/signature-detail?signatureId=sig_123
```

## Storage Patterns

### AsyncStorage (Non-sensitive Data)

```typescript
import { asyncStorage } from '@/services/storage/async-storage';

// Save
await asyncStorage.set('myKey', { foo: 'bar' });

// Retrieve
const data = await asyncStorage.get<{ foo: string }>('myKey');

// Remove
await asyncStorage.remove('myKey');

// Clear all
await asyncStorage.clear();
```

### SecureStore (Sensitive Data)

```typescript
import { secureStorage } from '@/services/storage/secure-storage';

// Save (encrypted)
await secureStorage.set('auth_token', 'eyJhbGciOiJIUzI1...');

// Retrieve
const token = await secureStorage.get('auth_token');

// Remove
await secureStorage.remove('auth_token');
```

### File System (Images)

```typescript
import { fileSystem } from '@/services/storage/file-system';

// Initialize (call in _layout.tsx)
await fileSystem.init();

// Save image
const imagePath = await fileSystem.saveSignatureImage(imageUri, signatureId);

// Get image
const imageUri = await fileSystem.getSignatureImage(signatureId);

// Delete image
await fileSystem.deleteSignatureImage(signatureId);

// Get directory path
const dir = fileSystem.getSignatureDirectory();
```

## Common Type Definitions

```typescript
// Signature
import { Signature, SignatureColor, SyncStatus } from '@/types/signature.types';

// User
import { User, AuthProvider } from '@/types/auth.types';

// Subscription
import { Subscription, SubscriptionPlan } from '@/types/subscription.types';

// Wallpaper
import { Wallpaper, WallpaperOptions, WallpaperResolution } from '@/types/wallpaper.types';

// API
import { ApiResponse, ApiError } from '@/types/api.types';
```

## Validation Patterns

```typescript
import {
  validateCelebrityName,
  validateSignaturePaths,
  validateEmail,
} from '@/utils/validators';

// Validate celebrity name
const nameValidation = validateCelebrityName(celebrityName);
if (!nameValidation.isValid) {
  console.error(nameValidation.error);
}

// Validate paths
const pathsValidation = validateSignaturePaths(paths);
if (!pathsValidation.isValid) {
  console.error(pathsValidation.error);
}

// Validate email
const emailValidation = validateEmail(email);
if (!emailValidation.isValid) {
  console.error(emailValidation.error);
}
```

## Permission Handling

```typescript
import {
  requestLocationPermission,
  requestPhotoLibraryPermission,
} from '@/utils/permissions';

// Request location
const locationResult = await requestLocationPermission();
if (locationResult.granted) {
  // Access location
} else {
  // Show permission denied message
}

// Request photo library
const photoResult = await requestPhotoLibraryPermission();
if (photoResult.granted) {
  // Save to gallery
} else {
  // Show permission denied message
}
```

## Error Handling

### Try-Catch Pattern

```typescript
try {
  const result = await someAsyncOperation();
  // Handle success
} catch (err) {
  const errorMessage = err instanceof Error ? err.message : 'Unknown error';
  console.error('Operation failed:', errorMessage);

  // Track error
  track('operation_failed', { error_message: errorMessage });

  // Show user-friendly message
  setError('Something went wrong. Please try again.');
}
```

### API Error Handling

```typescript
const response = await myApi.getSomething();

if (response.error) {
  // Handle API error
  console.error('API error:', response.error);
  setError(response.error);
  return;
}

// Use data
const data = response.data!;
```

## Testing Patterns

### Component Test

```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MyComponent } from '@/components/ui/MyComponent';

describe('MyComponent', () => {
  it('should render title', () => {
    const { getByText } = render(<MyComponent title="Hello" onPress={() => {}} />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('should call onPress when tapped', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<MyComponent title="Tap Me" onPress={onPressMock} />);

    fireEvent.press(getByText('Tap Me'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByText } = render(
      <MyComponent title="Disabled" onPress={() => {}} disabled />
    );

    const button = getByText('Disabled').parent;
    expect(button?.props.accessibilityState.disabled).toBe(true);
  });
});
```

### Hook Test

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useMyHook } from '@/hooks/useMyHook';

describe('useMyHook', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe('');
  });

  it('should update value', () => {
    const { result } = renderHook(() => useMyHook());

    act(() => {
      result.current.setValue('new value');
    });

    expect(result.current.value).toBe('new value');
  });

  it('should perform async action', async () => {
    const { result } = renderHook(() => useMyHook());

    await act(async () => {
      await result.current.performAction();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
```

## Performance Optimization

### Memoization

```typescript
import { useMemo, useCallback } from 'react';

// Memoize expensive computations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);

// Memoize callback functions
const handlePress = useCallback(() => {
  console.log('Pressed');
}, []);

// Memoize styles
const styles = useMemo(() => createStyles(theme), [theme]);
```

### List Optimization

```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  estimatedItemSize={100}
  keyExtractor={(item) => item.id}
  onEndReachedThreshold={0.5}
  onEndReached={loadMore}
/>
```

## Debugging Tips

### Reactotron (Optional)

```typescript
// Install: npm install --save-dev reactotron-react-native

// src/services/reactotron.ts
import Reactotron from 'reactotron-react-native';

Reactotron.configure({ name: 'Signature App' })
  .useReactNative()
  .connect();

// Log
Reactotron.log('Hello from Reactotron');
```

### Console Logs

```typescript
// Production-safe logging
if (__DEV__) {
  console.log('Debug info:', data);
}

// Error logging
console.error('Error occurred:', error);

// Warn logging
console.warn('Deprecated feature used');
```

### React DevTools

```bash
# Install React DevTools
npm install -g react-devtools

# Run
react-devtools

# Then shake device and select "Toggle Element Inspector"
```

## Environment Variables

**File**: `.env` (not committed to git)

```bash
EXPO_PUBLIC_API_URL=https://api.signature-app.com
EXPO_PUBLIC_AMPLITUDE_KEY=your_amplitude_key
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

**Access in code**:

```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit (triggers Husky pre-commit hooks)
git add .
git commit -m "Add my feature"

# Push to remote
git push origin feature/my-feature

# Create PR on GitHub
# After approval, merge to main
```

## Build & Deploy

```bash
# Development build
eas build --profile development --platform ios

# Production build
eas build --profile production --platform ios
eas build --profile production --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## Useful Commands

```bash
# Clear cache
npx expo start -c

# Prebuild native code
npx expo prebuild

# Check for updates
npm outdated

# Update Expo SDK
npx expo install --fix

# Generate icons and splash
npx expo prebuild --clean

# Check bundle size
npx expo export --platform ios --output-dir dist
du -sh dist/

# Analyze bundle
npx expo export --dump-sourcemap
```

---

**Last Updated**: November 1, 2025
