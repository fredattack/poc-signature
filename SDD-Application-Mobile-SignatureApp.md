# Spec-Driven Development (SDD)
# Application Mobile - Plateforme d'Autographes Numériques

**Version:** 1.0  
**Date:** 27 octobre 2025  
**Stack:** React Native (Expo) + TypeScript  
**Plateformes:** iOS 14+ & Android 10+  
**Statut:** 📋 Ready for Development

---

## 📋 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Architecture Technique](#architecture-technique)
3. [Configuration Expo](#configuration-expo)
4. [Structure du Projet](#structure-du-projet)
5. [Design System](#design-system)
6. [Spécifications des Écrans](#spécifications-des-écrans)
7. [Composants Réutilisables](#composants-réutilisables)
8. [Authentification & Sécurité](#authentification--sécurité)
9. [Gestion d'État](#gestion-détat)
10. [Navigation](#navigation)
11. [Intégrations Tierces](#intégrations-tierces)
12. [Storage & Cache](#storage--cache)
13. [Tests E2E](#tests-e2e)
14. [Déploiement Stores](#déploiement-stores)
15. [Performance & Optimisation](#performance--optimisation)
16. [Accessibilité](#accessibilité)

---

## 🎯 Vue d'Ensemble

### Objectif
Développer une application mobile React Native avec Expo permettant de capturer des signatures numériques, créer des fonds d'écran personnalisés et gérer une collection d'autographes.

### Fonctionnalités Principales
- ✅ Canvas de signature tactile haute performance (60fps)
- ✅ Génération de fonds d'écran personnalisés
- ✅ Galerie de signatures avec recherche/filtres
- ✅ Authentification multi-méthodes (Email, Social, MFA)
- ✅ Partage sur réseaux sociaux
- ✅ Système freemium avec paiements Stripe
- ✅ Onboarding interactif (3 slides)
- ✅ Mode hors-ligne avec synchronisation

### Contraintes Techniques
- **Performance:** 60fps minimum sur le canvas
- **Compatibilité:** iOS 14+ & Android 10+
- **Taille:** <50MB installé
- **Tests:** E2E avec Detox
- **CI/CD:** EAS Build & Submit

---

## 🏗️ Architecture Technique

### Stack Technologique

#### Core
```typescript
{
  "expo": "~51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.0",
  "typescript": "~5.3.0"
}
```

#### Navigation
```typescript
{
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11"
}
```

#### State Management
```typescript
{
  "@tanstack/react-query": "^5.17.0", // API calls & cache
  "zustand": "^4.4.7", // Global state
  "react-hook-form": "^7.49.0" // Forms
}
```

#### UI & Animation
```typescript
{
  "react-native-reanimated": "~3.6.1",
  "react-native-gesture-handler": "~2.14.0",
  "@shopify/flash-list": "^1.6.3",
  "react-native-linear-gradient": "^2.8.3",
  "react-native-svg": "14.1.0"
}
```

#### Canvas & Signature
```typescript
{
  "@shopify/react-native-skia": "^1.0.0", // High-performance canvas
  "react-native-view-shot": "^3.8.0" // Screenshot templates
}
```

#### Auth & Security
```typescript
{
  "expo-auth-session": "~5.4.0", // OAuth flows
  "expo-local-authentication": "~13.8.0", // Biometrics
  "@react-native-firebase/auth": "^19.0.0", // Firebase Auth
  "expo-secure-store": "~12.8.0" // Secure storage
}
```

#### Storage
```typescript
{
  "@react-native-async-storage/async-storage": "^1.21.0",
  "expo-file-system": "~16.0.0",
  "expo-image-picker": "~14.7.0"
}
```

#### Analytics & Monitoring
```typescript
{
  "expo-analytics-amplitude": "~3.8.0",
  "@sentry/react-native": "^5.15.0"
}
```

#### Payment
```typescript
{
  "@stripe/stripe-react-native": "^0.35.0"
}
```

#### Social Sharing
```typescript
{
  "expo-sharing": "~11.7.0",
  "expo-media-library": "~15.9.0",
  "react-native-share": "^10.0.2"
}
```

### Architecture Layers

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Screens, Components, Animations)      │
├─────────────────────────────────────────┤
│         Business Logic Layer            │
│  (Hooks, Services, Utils, Validators)   │
├─────────────────────────────────────────┤
│           Data Access Layer             │
│  (API Client, Cache, Local Storage)     │
├─────────────────────────────────────────┤
│           External Services             │
│  (Backend API, Firebase, Stripe, S3)    │
└─────────────────────────────────────────┘
```

---

## ⚙️ Configuration Expo

### app.json / app.config.js

```javascript
export default {
  expo: {
    name: "SignatureApp",
    slug: "signature-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#8A9A5B"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.signatureapp",
      buildNumber: "1",
      infoPlist: {
        NSPhotoLibraryUsageDescription: "L'app a besoin d'accéder à vos photos pour enregistrer les fonds d'écran.",
        NSPhotoLibraryAddUsageDescription: "L'app a besoin d'enregistrer les fonds d'écran dans votre galerie.",
        NSLocationWhenInUseUsageDescription: "L'app utilise votre localisation pour ajouter le lieu sur vos fonds d'écran.",
        NSFaceIDUsageDescription: "Utilisez Face ID pour sécuriser votre compte."
      },
      associatedDomains: ["applinks:signatureapp.com"]
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#8A9A5B"
      },
      package: "com.yourcompany.signatureapp",
      versionCode: 1,
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION",
        "USE_BIOMETRIC"
      ],
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "https",
              host: "signatureapp.com",
              pathPrefix: "/signature"
            }
          ],
          category: ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static"
          }
        }
      ],
      [
        "@stripe/stripe-react-native",
        {
          merchantIdentifier: "merchant.com.signatureapp",
          enableGooglePay: true
        }
      ],
      "expo-secure-store",
      "expo-local-authentication",
      [
        "expo-media-library",
        {
          photosPermission: "Autorisez SignatureApp à sauvegarder vos créations.",
          savePhotosPermission: "Autorisez SignatureApp à sauvegarder vos fonds d'écran."
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "your-project-id"
      },
      apiUrl: process.env.API_URL,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      amplitudeApiKey: process.env.AMPLITUDE_API_KEY,
      sentryDsn: process.env.SENTRY_DSN
    }
  }
};
```

### EAS Configuration (eas.json)

```json
{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "env": {
        "API_URL": "https://api.signatureapp.com"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-asc-app-id",
        "appleTeamId": "your-team-id"
      },
      "android": {
        "serviceAccountKeyPath": "./service-account-key.json",
        "track": "production"
      }
    }
  }
}
```

---

## 📁 Structure du Projet

```
src/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Auth group
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── mfa-setup.tsx
│   ├── (tabs)/                   # Bottom tabs
│   │   ├── index.tsx             # Home
│   │   ├── gallery.tsx
│   │   ├── signature.tsx
│   │   └── profile.tsx
│   ├── onboarding.tsx
│   ├── signature-detail.tsx
│   ├── wallpaper-editor.tsx
│   └── premium.tsx
├── components/                    # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── signature/                # Signature-specific
│   │   ├── SignatureCanvas.tsx
│   │   ├── ColorPicker.tsx
│   │   └── SignatureCard.tsx
│   ├── wallpaper/
│   │   ├── TemplateCarousel.tsx
│   │   ├── WallpaperPreview.tsx
│   │   └── TemplateCard.tsx
│   └── shared/
│       ├── Header.tsx
│       ├── BottomSheet.tsx
│       └── EmptyState.tsx
├── hooks/                        # Custom hooks
│   ├── useSignature.ts
│   ├── useWallpaper.ts
│   ├── useAuth.ts
│   ├── usePremium.ts
│   └── useAnalytics.ts
├── services/                     # Business logic
│   ├── api/                      # API client
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── signatures.ts
│   │   ├── wallpapers.ts
│   │   └── payments.ts
│   ├── storage/                  # Local storage
│   │   ├── async-storage.ts
│   │   ├── secure-storage.ts
│   │   └── file-system.ts
│   ├── analytics/
│   │   └── amplitude.ts
│   └── sharing/
│       └── social-share.ts
├── store/                        # Global state (Zustand)
│   ├── auth.ts
│   ├── signatures.ts
│   └── app-config.ts
├── utils/                        # Utilities
│   ├── validators.ts
│   ├── formatters.ts
│   ├── permissions.ts
│   └── device-info.ts
├── constants/                    # Constants
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── templates.ts
├── types/                        # TypeScript types
│   ├── signature.types.ts
│   ├── wallpaper.types.ts
│   ├── auth.types.ts
│   └── api.types.ts
└── assets/                       # Static assets
    ├── images/
    ├── icons/
    ├── fonts/
    └── templates/
```

---

## 🎨 Design System

### Couleurs (constants/colors.ts)

```typescript
export const colors = {
  // Primary
  primary: '#8A9A5B',
  primaryDark: '#6B7A3F',
  primaryLight: '#A8B67D',

  // Secondary
  secondary: '#D4C5B1',
  secondaryDark: '#B8A490',
  secondaryLight: '#E8DDD0',

  // Accent
  accent: '#A8C3BC',
  accentDark: '#8AA89F',
  accentLight: '#C5DDD7',

  // Neutral
  background: '#FFFFFF',
  backgroundDark: '#2C2C2C',
  surface: '#F8F8F6',
  surfaceDark: '#3A3A36',

  // Text
  textPrimary: '#2C2C2C',
  textSecondary: '#6B7A3F',
  textDisabled: '#C4C4C4',

  // Borders
  border: '#E6E6E6',
  borderDark: '#8A9A5B',

  // System
  success: '#8A9A5B',
  warning: '#D4C5B1',
  error: '#C77B6B',
  info: '#A8C3BC',

  // Gradients
  gradient: {
    primary: ['#8A9A5B', '#A8C3BC'],
    dark: ['#6B7A3F', '#8AA89F']
  }
} as const;

export type ColorKey = keyof typeof colors;
```

### Typographie (constants/typography.ts)

```typescript
import { Platform } from 'react-native';

export const fonts = {
  primary: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'Inter'
  })
} as const;

export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500' as const
  },
  bodyLarge: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400' as const
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const
  }
} as const;
```

### Espacement (constants/spacing.ts)

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999
} as const;
```

---

## 📱 Spécifications des Écrans

### 1. Onboarding (3 Slides)

#### Fichier: `app/onboarding.tsx`

```typescript
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue,
  useAnimatedStyle,
  interpolate
} from 'react-native-reanimated';
import { Button } from '@/components/ui/Button';
import { colors, typography, spacing } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Capture des signatures\nauthentiques en direct',
    description: 'Ta star signe directement sur\nton écran avec son doigt',
    illustration: <Slide1Illustration />
  },
  {
    id: 2,
    title: 'Transforme en fond d\'écran\nunique',
    description: 'Choisis parmi 20+ templates et\npersonnalise avec tes couleurs',
    illustration: <Slide2Illustration />
  },
  {
    id: 3,
    title: 'Partage ta rencontre magique',
    description: 'Montre ta collection à tes amis\nsur Instagram, TikTok, Twitter...',
    illustration: <Slide3Illustration />
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    }
  });

  const handleSkip = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(tabs)');
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true
      });
    } else {
      handleSkip();
    }
  };

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <Button
        variant="ghost"
        onPress={handleSkip}
        style={styles.skipButton}
      >
        Passer
      </Button>

      {/* Slides */}
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <View style={styles.illustrationContainer}>
              {slide.illustration}
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {SLIDES.map((_, index) => {
          const dotStyle = useAnimatedStyle(() => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width
            ];
            const scale = interpolate(
              scrollX.value,
              inputRange,
              [0.8, 1.2, 0.8],
              'clamp'
            );
            const opacity = interpolate(
              scrollX.value,
              inputRange,
              [0.3, 1, 0.3],
              'clamp'
            );
            return { transform: [{ scale }], opacity };
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === currentIndex ? colors.primary : colors.border },
                dotStyle
              ]}
            />
          );
        })}
      </View>

      {/* Next/Start Button */}
      <Button
        onPress={handleNext}
        style={styles.nextButton}
        gradient
      >
        {currentIndex === SLIDES.length - 1 ? 'Commencer' : 'Suivant'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  skipButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.md,
    zIndex: 10
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md
  },
  illustrationContainer: {
    height: 300,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md
  },
  description: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 361
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 142,
    width: '100%'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  nextButton: {
    position: 'absolute',
    bottom: 88,
    left: spacing.md,
    right: spacing.md
  }
});
```

**Spécifications:**
- **Animations:** Utiliser `react-native-reanimated` pour smooth scroll
- **Gestures:** Swipe horizontal natif avec `pagingEnabled`
- **Persistence:** Stocker `hasSeenOnboarding` dans AsyncStorage
- **Analytics:** Logger `onboarding_slide_viewed`, `onboarding_completed`, `onboarding_skipped`

---

### 2. Home Screen

#### Fichier: `app/(tabs)/index.tsx`

```typescript
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/shared/Header';
import { SignatureCard } from '@/components/signature/SignatureCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/auth';
import { signatureService } from '@/services/api/signatures';
import { colors, typography, spacing } from '@/constants';
import { Signature } from '@/types/signature.types';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const { data: signatures, isLoading } = useQuery({
    queryKey: ['signatures', 'recent'],
    queryFn: () => signatureService.getRecent(4)
  });

  const handleNewSignature = () => {
    router.push('/signature-canvas');
  };

  const handleViewAll = () => {
    router.push('/(tabs)/gallery');
  };

  return (
    <View style={styles.container}>
      <Header
        title="SignatureApp"
        leftAction={
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Avatar source={{ uri: user?.avatar }} />
          </TouchableOpacity>
        }
        rightAction={
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <SettingsIcon />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Greeting */}
        <Animated.View entering={FadeInDown.delay(100)}>
          <Text style={styles.greeting}>
            Salut {user?.firstName || 'Fred'} ! 👋
          </Text>
        </Animated.View>

        {/* Hero CTA Card */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <TouchableOpacity
            style={styles.heroCard}
            onPress={handleNewSignature}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={colors.gradient.primary}
              style={styles.heroGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <CanvasIcon size={80} color="#FFFFFF" />
              <Text style={styles.heroTitle}>
                Nouvelle Signature ✨
              </Text>
              <Text style={styles.heroSubtitle}>
                Capture l'autographe de ta star
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Collection Section */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Ta Collection ({signatures?.length || 0})
            </Text>
            {signatures && signatures.length > 0 && (
              <TouchableOpacity onPress={handleViewAll}>
                <Text style={styles.viewAll}>Voir tout →</Text>
              </TouchableOpacity>
            )}
          </View>

          {isLoading ? (
            <LoadingGrid />
          ) : signatures && signatures.length > 0 ? (
            <View style={styles.grid}>
              {signatures.slice(0, 4).map((signature) => (
                <SignatureCard
                  key={signature.id}
                  signature={signature}
                  onPress={() => router.push(`/signature-detail?id=${signature.id}`)}
                />
              ))}
            </View>
          ) : (
            <EmptyState
              icon="📝"
              title="Aucune signature"
              description="Commence ta collection en capturant ta première signature !"
              action={
                <Button onPress={handleNewSignature}>
                  Créer ma première signature
                </Button>
              }
            />
          )}
        </Animated.View>

        {/* Premium Teaser (if not premium) */}
        {!user?.isPremium && (
          <Animated.View entering={FadeInDown.delay(400)}>
            <PremiumTeaser />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1
  },
  contentContainer: {
    padding: spacing.md
  },
  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xl
  },
  heroCard: {
    width: '100%',
    height: 240,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 24
      },
      android: {
        elevation: 12
      }
    })
  },
  heroGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg
  },
  heroTitle: {
    ...typography.h2,
    color: '#FFFFFF',
    marginTop: spacing.md,
    marginBottom: spacing.sm
  },
  heroSubtitle: {
    ...typography.body,
    color: '#FFFFFF',
    opacity: 0.9
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary
  },
  viewAll: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md
  }
});
```

**Spécifications:**
- **Lazy Loading:** Utiliser `@shopify/flash-list` pour la performance
- **Cache:** React Query avec stale time de 5 minutes
- **Animations:** Entrées progressives avec `react-native-reanimated`
- **Haptics:** Feedback tactile sur le bouton hero
- **Analytics:** Logger `home_viewed`, `new_signature_tapped`, `view_all_tapped`

---

### 3. Canvas de Signature (ÉCRAN CORE)

#### Fichier: `components/signature/SignatureCanvas.tsx`

```typescript
import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Canvas, Path, Skia, SkiaView } from '@shopify/react-native-skia';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants';

interface SignatureCanvasProps {
  width: number;
  height: number;
  strokeColor?: string;
  strokeWidth?: number;
  onSignatureChange?: (hasSignature: boolean) => void;
}

interface PathData {
  path: any; // Skia Path
  color: string;
  width: number;
}

export function SignatureCanvas({
  width,
  height,
  strokeColor = colors.textPrimary,
  strokeWidth = 3,
  onSignatureChange
}: SignatureCanvasProps) {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [currentPath, setCurrentPath] = useState<any>(null);

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      // Create new path
      const path = Skia.Path.Make();
      path.moveTo(event.x, event.y);
      setCurrentPath(path);

      // Haptic feedback on touch start
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    })
    .onUpdate((event) => {
      if (currentPath) {
        currentPath.lineTo(event.x, event.y);
        setCurrentPath(currentPath.copy());
      }
    })
    .onEnd(() => {
      if (currentPath) {
        // Save completed path
        setPaths((prev) => [
          ...prev,
          {
            path: currentPath,
            color: strokeColor,
            width: strokeWidth
          }
        ]);
        setCurrentPath(null);
        onSignatureChange?.(true);

        // Haptic feedback on touch end
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    });

  const handleClear = useCallback(() => {
    Alert.alert(
      'Effacer la signature',
      'Voulez-vous vraiment effacer cette signature ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Effacer',
          style: 'destructive',
          onPress: () => {
            setPaths([]);
            setCurrentPath(null);
            onSignatureChange?.(false);
            if (Platform.OS === 'ios') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
          }
        }
      ]
    );
  }, [onSignatureChange]);

  const handleUndo = useCallback(() => {
    setPaths((prev) => {
      const newPaths = prev.slice(0, -1);
      onSignatureChange?.(newPaths.length > 0);
      return newPaths;
    });
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [onSignatureChange]);

  const exportSignature = useCallback(async (): Promise<string> => {
    // Export as base64 PNG
    const canvas = document.createElement('canvas');
    canvas.width = width * 2; // 2x for retina
    canvas.height = height * 2;
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Canvas context not available');

    ctx.scale(2, 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Draw all paths
    paths.forEach((pathData) => {
      ctx.strokeStyle = pathData.color;
      ctx.lineWidth = pathData.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Convert Skia path to canvas path
      // This is a simplified version - actual implementation needs path conversion
      ctx.stroke();
    });

    return canvas.toDataURL('image/png');
  }, [paths, width, height]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.canvasContainer, { width, height }]}>
        <GestureDetector gesture={panGesture}>
          <SkiaView
            style={[styles.canvas, { width, height }]}
            onDraw={(canvas) => {
              canvas.drawRect({ x: 0, y: 0, width, height }, {
                color: colors.background
              });

              // Draw completed paths
              paths.forEach((pathData) => {
                canvas.drawPath(pathData.path, {
                  color: Skia.Color(pathData.color),
                  strokeWidth: pathData.width,
                  style: 'stroke',
                  strokeCap: 'round',
                  strokeJoin: 'round'
                });
              });

              // Draw current path
              if (currentPath) {
                canvas.drawPath(currentPath, {
                  color: Skia.Color(strokeColor),
                  strokeWidth: strokeWidth,
                  style: 'stroke',
                  strokeCap: 'round',
                  strokeJoin: 'round'
                });
              }
            }}
          />
        </GestureDetector>

        {/* Placeholder when empty */}
        {paths.length === 0 && !currentPath && (
          <View style={styles.placeholder} pointerEvents="none">
            <Text style={styles.placeholderText}>
              Signature ici ✍️
            </Text>
          </View>
        )}
      </View>

      {/* Canvas Controls */}
      <View style={styles.controls}>
        <Button
          variant="secondary"
          onPress={handleUndo}
          disabled={paths.length === 0}
        >
          ↶ Annuler
        </Button>
        <Button
          variant="secondary"
          onPress={handleClear}
          disabled={paths.length === 0}
        >
          🗑️ Effacer
        </Button>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  canvasContainer: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.background,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8
      },
      android: {
        elevation: 2
      }
    })
  },
  canvas: {
    flex: 1
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    ...typography.bodyLarge,
    color: colors.textSecondary
  },
  controls: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md
  }
});
```

**Spécifications Critiques:**
- **Performance:** 60fps minimum avec `@shopify/react-native-skia`
- **Latence:** <16ms entre touch et rendering
- **Pressure Sensitivity:** Détecter pression si device supporte (iOS 3D Touch)
- **Multi-touch:** Rejeter palm rejection
- **Export:** PNG haute résolution (2000x2000px minimum)
- **Memory:** Optimiser pour éviter les memory leaks

---

### 4. Wallpaper Editor

#### Fichier: `app/wallpaper-editor.tsx`

```typescript
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  Alert,
  Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { TemplateCarousel } from '@/components/wallpaper/TemplateCarousel';
import { WallpaperPreview } from '@/components/wallpaper/WallpaperPreview';
import { ColorPicker } from '@/components/wallpaper/ColorPicker';
import { Button } from '@/components/ui/Button';
import { wallpaperService } from '@/services/api/wallpapers';
import { signatureService } from '@/services/api/signatures';
import { useAnalytics } from '@/hooks/useAnalytics';
import { TEMPLATES } from '@/constants/templates';
import { colors, spacing } from '@/constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WallpaperEditorScreen() {
  const router = useRouter();
  const { signatureId } = useLocalSearchParams<{ signatureId: string }>();
  const { track } = useAnalytics();
  const viewShotRef = useRef<ViewShot>(null);

  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [backgroundColor, setBackgroundColor] = useState(colors.primary);
  const [showMetadata, setShowMetadata] = useState(true);

  // Fetch signature data
  const { data: signature, isLoading } = useQuery({
    queryKey: ['signature', signatureId],
    queryFn: () => signatureService.getById(signatureId!),
    enabled: !!signatureId
  });

  // Create wallpaper mutation
  const createWallpaperMutation = useMutation({
    mutationFn: async (imageUri: string) => {
      return wallpaperService.create({
        signatureId: signatureId!,
        templateId: selectedTemplate.id,
        backgroundColor,
        imageUri,
        deviceInfo: {
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          platform: Platform.OS
        }
      });
    },
    onSuccess: () => {
      track('wallpaper_created', {
        templateId: selectedTemplate.id,
        hasMetadata: showMetadata
      });
    }
  });

  const handleExport = async () => {
    try {
      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission requise',
          'L\'accès à la galerie photo est nécessaire pour enregistrer le fond d\'écran.'
        );
        return;
      }

      // Capture view as image
      const uri = await viewShotRef.current?.capture?.();
      if (!uri) throw new Error('Capture failed');

      // Save to gallery
      await MediaLibrary.createAssetAsync(uri);

      // Create record in backend
      await createWallpaperMutation.mutateAsync(uri);

      Alert.alert(
        'Enregistré !',
        'Ton fond d\'écran a été sauvegardé dans ta galerie.',
        [
          {
            text: 'Partager',
            onPress: () => handleShare(uri)
          },
          {
            text: 'Définir comme fond d\'écran',
            onPress: () => handleSetWallpaper(uri)
          },
          {
            text: 'OK',
            style: 'cancel'
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'enregistrer le fond d\'écran.');
      console.error(error);
    }
  };

  const handleShare = async (uri: string) => {
    try {
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert('Erreur', 'Le partage n\'est pas disponible sur cet appareil.');
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Partage ton fond d\'écran'
      });

      track('wallpaper_shared', {
        templateId: selectedTemplate.id
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetWallpaper = async (uri: string) => {
    if (Platform.OS === 'ios') {
      // iOS requires manual wallpaper setting
      Alert.alert(
        'Définir comme fond d\'écran',
        'Ouvre l\'app Photos, sélectionne l\'image, puis utilise l\'option "Utiliser comme fond d\'écran".'
      );
    } else {
      // Android can set wallpaper programmatically
      try {
        // This would require a native module or library
        // For now, guide user manually
        Alert.alert(
          'Définir comme fond d\'écran',
          'Va dans ta Galerie, sélectionne l\'image, puis utilise l\'option "Définir comme fond d\'écran".'
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!signature) {
    return <ErrorScreen message="Signature introuvable" />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          onPress={() => router.back()}
        >
          ← Retour
        </Button>
        <Text style={styles.headerTitle}>Créer Fond d'Écran</Text>
        <View style={{ width: 80 }} />
      </View>

      {/* Preview */}
      <View style={styles.previewContainer}>
        <ViewShot
          ref={viewShotRef}
          options={{
            format: 'png',
            quality: 1,
            width: SCREEN_WIDTH * 2, // 2x for retina
            height: SCREEN_HEIGHT * 2
          }}
          style={styles.viewShot}
        >
          <WallpaperPreview
            signature={signature}
            template={selectedTemplate}
            backgroundColor={backgroundColor}
            showMetadata={showMetadata}
            width={SCREEN_WIDTH * 0.6}
            height={SCREEN_HEIGHT * 0.5}
          />
        </ViewShot>
      </View>

      {/* Template Carousel */}
      <TemplateCarousel
        templates={TEMPLATES}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={(template) => {
          setSelectedTemplate(template);
          track('template_selected', { templateId: template.id });
        }}
      />

      {/* Customization Options */}
      <View style={styles.options}>
        <Text style={styles.optionLabel}>Couleur de fond</Text>
        <ColorPicker
          selectedColor={backgroundColor}
          onColorSelect={setBackgroundColor}
        />

        <Button
          variant="ghost"
          onPress={() => setShowMetadata(!showMetadata)}
          style={styles.toggleButton}
        >
          {showMetadata ? '☑️' : '☐'} Afficher date et lieu
        </Button>
      </View>

      {/* Export Button */}
      <Button
        onPress={handleExport}
        style={styles.exportButton}
        gradient
        loading={createWallpaperMutation.isPending}
      >
        💾 Enregistrer dans la galerie
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitle: {
    ...typography.h4,
    color: colors.textPrimary
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg
  },
  viewShot: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  options: {
    padding: spacing.md,
    gap: spacing.md
  },
  optionLabel: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600'
  },
  toggleButton: {
    alignSelf: 'flex-start'
  },
  exportButton: {
    margin: spacing.md
  }
});
```

**Spécifications:**
- **Export Quality:** PNG 1x, 2x, 3x selon device
- **Templates:** Charger dynamiquement depuis API + cache local
- **Color Picker:** 12 couleurs pré-définies + color wheel premium
- **Preview:** Real-time avec debounce pour performance
- **Permissions:** Gérer demandes permissions élégamment

---

## 🔐 Authentification & Sécurité

### Auth Store (store/auth.ts)

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { User, AuthTokens } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setTokens: async (tokens) => {
        // Store tokens securely
        await SecureStore.setItemAsync('accessToken', tokens.accessToken);
        await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
        set({ tokens });
      },

      logout: async () => {
        // Clear secure tokens
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        
        // Clear state
        set({
          user: null,
          tokens: null,
          isAuthenticated: false
        });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
```

### Auth Service (services/api/auth.ts)

```typescript
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as LocalAuthentication from 'expo-local-authentication';
import { apiClient } from './client';
import { LoginCredentials, RegisterData, MFASetup } from '@/types/auth.types';

export const authService = {
  // Email/Password Login
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Email/Password Register
  async register(data: RegisterData) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // Apple Sign In
  async signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      // Send to backend
      const response = await apiClient.post('/auth/apple', {
        identityToken: credential.identityToken,
        user: credential.user
      });

      return response.data;
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        throw new Error('Apple Sign In cancelled');
      }
      throw error;
    }
  },

  // Google Sign In
  async signInWithGoogle(accessToken: string) {
    const response = await apiClient.post('/auth/google', {
      accessToken
    });
    return response.data;
  },

  // MFA Setup
  async setupMFA(): Promise<MFASetup> {
    const response = await apiClient.post('/auth/mfa/setup');
    return response.data;
  },

  // MFA Verify
  async verifyMFA(code: string) {
    const response = await apiClient.post('/auth/mfa/verify', { code });
    return response.data;
  },

  // Biometric Auth
  async authenticateWithBiometrics() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      throw new Error('Biometric hardware not available');
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      throw new Error('No biometric credentials enrolled');
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Se connecter à SignatureApp',
      fallbackLabel: 'Utiliser le code PIN',
      cancelLabel: 'Annuler'
    });

    return result.success;
  },

  // Refresh Token
  async refreshToken(refreshToken: string) {
    const response = await apiClient.post('/auth/refresh', {
      refreshToken
    });
    return response.data;
  },

  // Logout
  async logout() {
    await apiClient.post('/auth/logout');
  }
};
```

### Auth Screens

#### Login Screen (app/(auth)/login.tsx)

```typescript
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authService } from '@/services/api/auth';
import { useAuthStore } from '@/store/auth';
import { colors, typography, spacing } from '@/constants';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères')
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { setUser, setTokens } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      await setTokens(data.tokens);
      setUser(data.user);

      if (data.requiresMFA) {
        router.push('/mfa-verify');
      } else {
        router.replace('/(tabs)');
      }
    },
    onError: (error: any) => {
      Alert.alert(
        'Erreur de connexion',
        error.message || 'Email ou mot de passe incorrect'
      );
    }
  });

  const appleMutation = useMutation({
    mutationFn: authService.signInWithApple,
    onSuccess: async (data) => {
      await setTokens(data.tokens);
      setUser(data.user);
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      if (error.message !== 'Apple Sign In cancelled') {
        Alert.alert('Erreur', error.message);
      }
    }
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>✍️</Text>
          <Text style={styles.appName}>SignatureApp</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Mot de passe"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                }
              />
            )}
          />

          <TouchableOpacity
            onPress={() => router.push('/forgot-password')}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loginMutation.isPending}
            gradient
          >
            Se connecter
          </Button>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login */}
        <View style={styles.socialButtons}>
          {Platform.OS === 'ios' && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={12}
              style={styles.appleButton}
              onPress={() => appleMutation.mutate()}
            />
          )}

          <Button
            variant="secondary"
            onPress={() => {/* Google OAuth */}}
          >
            🔍 Continuer avec Google
          </Button>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupLink}>
          <Text style={styles.signupText}>
            Pas encore de compte ?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.signupLinkText}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl
  },
  logo: {
    fontSize: 80,
    marginBottom: spacing.sm
  },
  appName: {
    ...typography.h1,
    color: colors.textPrimary
  },
  form: {
    gap: spacing.md
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm
  },
  forgotPasswordText: {
    ...typography.body,
    color: colors.primary
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
    gap: spacing.md
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border
  },
  dividerText: {
    ...typography.body,
    color: colors.textSecondary
  },
  socialButtons: {
    gap: spacing.md
  },
  appleButton: {
    width: '100%',
    height: 56
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl
  },
  signupText: {
    ...typography.body,
    color: colors.textSecondary
  },
  signupLinkText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600'
  }
});
```

**Spécifications Auth:**
- **OAuth:** Apple Sign In (iOS) + Google Sign In (Android & iOS)
- **MFA:** TOTP avec QR code (Google Authenticator compatible)
- **Biometrics:** Face ID / Touch ID sur iOS, Fingerprint sur Android
- **Session:** JWT access token (15min) + refresh token (30 jours)
- **Security:** Tokens stockés dans SecureStore (encrypted)

---

## 💳 Intégration Stripe

### Stripe Provider (components/providers/StripeProvider.tsx)

```typescript
import React from 'react';
import { StripeProvider as BaseStripeProvider } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';

export function StripeProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = Constants.expoConfig?.extra?.stripePublishableKey;

  return (
    <BaseStripeProvider publishableKey={publishableKey}>
      {children}
    </BaseStripeProvider>
  );
}
```

### Premium Screen (app/premium.tsx)

```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStripe } from '@stripe/stripe-react-native';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { paymentService } from '@/services/api/payments';
import { useAuthStore } from '@/store/auth';
import { colors, typography, spacing } from '@/constants';

const PLANS = [
  {
    id: 'monthly',
    name: 'Mensuel',
    price: '2,99€',
    priceId: 'price_monthly_xxx',
    interval: 'mois',
    features: [
      'Signatures illimitées',
      '20+ templates premium',
      'Export HD sans watermark',
      'Partage prioritaire',
      'Support prioritaire'
    ]
  },
  {
    id: 'yearly',
    name: 'Annuel',
    price: '29,99€',
    priceId: 'price_yearly_xxx',
    interval: 'an',
    discount: '-17%',
    features: [
      'Tout du plan mensuel',
      '2 mois gratuits',
      'Templates exclusifs',
      'Early access aux nouvelles features'
    ]
  }
];

export default function PremiumScreen() {
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { user, updateUser } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]); // Yearly by default

  const subscribeMutation = useMutation({
    mutationFn: async (priceId: string) => {
      // Step 1: Create subscription on backend
      const { paymentIntent, ephemeralKey, customer } = 
        await paymentService.createSubscription(priceId);

      // Step 2: Initialize payment sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'SignatureApp',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        applePay: {
          merchantCountryCode: 'FR'
        },
        googlePay: {
          merchantCountryCode: 'FR',
          testEnv: __DEV__,
          currencyCode: 'EUR'
        }
      });

      if (initError) {
        throw new Error(initError.message);
      }

      // Step 3: Present payment sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        throw new Error(presentError.message);
      }

      // Step 4: Confirm on backend
      await paymentService.confirmSubscription(paymentIntent);

      return true;
    },
    onSuccess: () => {
      updateUser({ isPremium: true });
      Alert.alert(
        '🎉 Bienvenue Premium !',
        'Ton abonnement est actif. Profite de toutes les fonctionnalités !',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    },
    onError: (error: Error) => {
      Alert.alert('Erreur', error.message);
    }
  });

  const handleSubscribe = () => {
    subscribeMutation.mutate(selectedPlan.priceId);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          onPress={() => router.back()}
        >
          ✕ Fermer
        </Button>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>👑</Text>
          <Text style={styles.title}>
            Passe Premium
          </Text>
          <Text style={styles.subtitle}>
            Libère tout le potentiel de SignatureApp
          </Text>
        </View>

        {/* Feature Comparison */}
        <View style={styles.comparison}>
          <ComparisonTable />
        </View>

        {/* Plan Cards */}
        <View style={styles.plans}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan.id === plan.id && styles.planCardSelected
              ]}
              onPress={() => setSelectedPlan(plan)}
              activeOpacity={0.7}
            >
              {plan.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{plan.discount}</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planInterval}>/{plan.interval}</Text>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.feature}>
                    <Text style={styles.checkmark}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscribe Button */}
        <Button
          onPress={handleSubscribe}
          loading={subscribeMutation.isPending}
          gradient
          style={styles.subscribeButton}
        >
          Essayer 7 jours gratuitement
        </Button>

        <Text style={styles.disclaimer}>
          Essai gratuit de 7 jours, puis {selectedPlan.price}/{selectedPlan.interval}.
          Annule à tout moment.
        </Text>

        {/* Legal */}
        <View style={styles.legal}>
          <TouchableOpacity onPress={() => router.push('/terms')}>
            <Text style={styles.legalLink}>Conditions d'utilisation</Text>
          </TouchableOpacity>
          <Text style={styles.legalSeparator}>•</Text>
          <TouchableOpacity onPress={() => router.push('/privacy')}>
            <Text style={styles.legalLink}>Politique de confidentialité</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    padding: spacing.md,
    alignItems: 'flex-end'
  },
  content: {
    flex: 1
  },
  contentContainer: {
    padding: spacing.lg,
    paddingTop: 0
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  comparison: {
    marginBottom: spacing.xl
  },
  plans: {
    gap: spacing.md,
    marginBottom: spacing.lg
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  planCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.background
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm
  },
  discountText: {
    ...typography.caption,
    color: '#FFFFFF',
    fontWeight: '700'
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg
  },
  planName: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs
  },
  planPrice: {
    ...typography.h1,
    color: colors.primary
  },
  planInterval: {
    ...typography.body,
    color: colors.textSecondary
  },
  planFeatures: {
    gap: spacing.sm
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  checkmark: {
    fontSize: 16,
    color: colors.primary
  },
  featureText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1
  },
  subscribeButton: {
    marginBottom: spacing.md
  },
  disclaimer: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl
  },
  legal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm
  },
  legalLink: {
    ...typography.caption,
    color: colors.textSecondary,
    textDecorationLine: 'underline'
  },
  legalSeparator: {
    ...typography.caption,
    color: colors.textSecondary
  }
});
```

**Spécifications Stripe:**
- **Payment Methods:** Card, Apple Pay, Google Pay
- **Free Trial:** 7 jours automatique
- **Webhooks:** Gérer subscription.created, subscription.deleted, payment_failed
- **Security:** PCI-compliant (Stripe gère)
- **Restore Purchase:** Détecter subscriptions actives au login

---

## 📤 Social Sharing

### Social Share Service (services/sharing/social-share.ts)

```typescript
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import Share from 'react-native-share';

interface ShareOptions {
  url: string;
  message?: string;
  title?: string;
}

export const socialShareService = {
  // Generic share (native share sheet)
  async share(options: ShareOptions) {
    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) {
      throw new Error('Sharing not available');
    }

    await Sharing.shareAsync(options.url, {
      mimeType: 'image/png',
      dialogTitle: options.title || 'Partager',
      UTI: 'public.png'
    });
  },

  // Instagram Story
  async shareToInstagramStory(imageUri: string, stickerImage?: string) {
    try {
      // Instagram Story specific share
      const shareOptions = {
        method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
        backgroundImage: imageUri,
        ...(stickerImage && {
          stickerImage,
          backgroundTopColor: '#8A9A5B',
          backgroundBottomColor: '#A8C3BC'
        })
      };

      await Share.shareSingle(shareOptions);
    } catch (error) {
      // Fallback to regular share
      await this.share({ url: imageUri });
    }
  },

  // TikTok
  async shareToTikTok(videoUri: string) {
    // TikTok doesn't have direct API, open with URL scheme
    const tiktokUrl = Platform.select({
      ios: 'tiktok://share',
      android: 'tiktok://share'
    });

    // This would require a custom implementation
    await this.share({ url: videoUri });
  },

  // Twitter
  async shareToTwitter(text: string, imageUri?: string) {
    const shareOptions = {
      title: text,
      message: text,
      url: imageUri,
      social: Share.Social.TWITTER
    };

    await Share.shareSingle(shareOptions);
  },

  // Facebook
  async shareToFacebook(imageUri: string) {
    const shareOptions = {
      url: imageUri,
      social: Share.Social.FACEBOOK
    };

    await Share.shareSingle(shareOptions);
  },

  // WhatsApp
  async shareToWhatsApp(message: string, imageUri?: string) {
    const shareOptions = {
      title: message,
      message,
      url: imageUri,
      social: Share.Social.WHATSAPP
    };

    await Share.shareSingle(shareOptions);
  },

  // Add watermark to image before sharing
  async addWatermark(imageUri: string): Promise<string> {
    // This would use react-native-svg or canvas to add watermark
    // For now, return original
    return imageUri;
  }
};
```

**Spécifications Sharing:**
- **Platforms:** Instagram, TikTok, Twitter, Facebook, WhatsApp, Native Share
- **Watermark:** Logo + app name discret en bas à droite
- **Format:** Optimisé par plateforme (Instagram Story: 1080x1920)
- **Tracking:** Logger share events par plateforme
- **Deep Links:** Paramètres UTM pour tracking installs

---

## 🧪 Tests E2E

### Detox Configuration (.detoxrc.js)

```javascript
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.release': {
      type: 'ios.app',
      build: 'xcodebuild -workspace ios/SignatureApp.xcworkspace -scheme SignatureApp -configuration Release -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/SignatureApp.app'
    },
    'android.release': {
      type: 'android.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14 Pro'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_7_API_33'
      }
    }
  },
  configurations: {
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
```

### Test Example (e2e/onboarding.e2e.ts)

```typescript
describe('Onboarding Flow', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: { notifications: 'YES' }
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display onboarding on first launch', async () => {
    await expect(element(by.text('Capture des signatures'))).toBeVisible();
  });

  it('should navigate through slides', async () => {
    // Slide 1
    await expect(element(by.text('Capture des signatures'))).toBeVisible();
    
    // Swipe to slide 2
    await element(by.id('onboarding-scroll')).swipe('left');
    await expect(element(by.text('Transforme en fond d\'écran'))).toBeVisible();
    
    // Swipe to slide 3
    await element(by.id('onboarding-scroll')).swipe('left');
    await expect(element(by.text('Partage ta rencontre'))).toBeVisible();
  });

  it('should skip onboarding', async () => {
    await element(by.text('Passer')).tap();
    await expect(element(by.id('home-screen'))).toBeVisible();
  });

  it('should complete onboarding', async () => {
    // Navigate to last slide
    await element(by.id('onboarding-scroll')).swipe('left');
    await element(by.id('onboarding-scroll')).swipe('left');
    
    // Tap "Commencer"
    await element(by.text('Commencer')).tap();
    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});

describe('Signature Creation Flow', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    // Skip onboarding
    await element(by.text('Passer')).tap();
  });

  it('should create a signature', async () => {
    // Tap hero card
    await element(by.id('new-signature-button')).tap();
    
    // Verify canvas screen
    await expect(element(by.id('signature-canvas'))).toBeVisible();
    
    // Draw signature (simulate touches)
    await element(by.id('signature-canvas')).swipe('right', 'fast', 0.5);
    
    // Enter celebrity name
    await element(by.id('celebrity-name-input')).typeText('Beyoncé');
    
    // Validate
    await element(by.id('validate-button')).tap();
    
    // Should navigate to wallpaper editor
    await expect(element(by.id('wallpaper-editor'))).toBeVisible();
  });

  it('should clear signature', async () => {
    await element(by.id('new-signature-button')).tap();
    
    // Draw
    await element(by.id('signature-canvas')).swipe('right', 'fast', 0.5);
    
    // Clear
    await element(by.id('clear-button')).tap();
    await element(by.text('Effacer')).tap(); // Confirm alert
    
    // Canvas should be empty
    await expect(element(by.id('canvas-placeholder'))).toBeVisible();
  });
});

describe('Auth Flow', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true, delete: true });
  });

  it('should login with email', async () => {
    // Navigate to login
    await element(by.id('login-button')).tap();
    
    // Fill form
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    
    // Submit
    await element(by.id('submit-button')).tap();
    
    // Should see home
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should show validation errors', async () => {
    await element(by.id('login-button')).tap();
    
    // Submit without filling
    await element(by.id('submit-button')).tap();
    
    await expect(element(by.text('Email invalide'))).toBeVisible();
  });
});

describe('Premium Flow', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    // Login as free user
    await loginAsTestUser();
  });

  it('should display premium paywall', async () => {
    // Tap on locked template
    await element(by.id('template-premium')).tap();
    
    // Should show paywall
    await expect(element(by.id('premium-modal'))).toBeVisible();
  });

  it('should select subscription plan', async () => {
    await element(by.id('premium-button')).tap();
    
    // Select yearly plan
    await element(by.id('plan-yearly')).tap();
    
    await expect(element(by.id('plan-yearly'))).toHaveToggleValue(true);
  });
});
```

**Spécifications Tests:**
- **Coverage:** >80% des user flows critiques
- **CI/CD:** Tests automatiques sur chaque PR
- **Devices:** iPhone 14 Pro + Pixel 7 minimum
- **Mocking:** Mock API, payments, location, camera
- **Screenshots:** Capturer sur échec pour debugging

---

## 📦 Déploiement Stores

### iOS App Store

#### Configuration

```typescript
// app.json - iOS specific
{
  "ios": {
    "bundleIdentifier": "com.yourcompany.signatureapp",
    "buildNumber": "1",
    "supportsTablet": true,
    "infoPlist": {
      // All required permissions
    },
    "config": {
      "usesNonExemptEncryption": false
    },
    "associatedDomains": ["applinks:signatureapp.com"],
    "appStoreUrl": "https://apps.apple.com/app/signatureapp/id123456789"
  }
}
```

#### Metadata (App Store Connect)

```
Name: SignatureApp - Autographes Numériques

Subtitle: Capture, Crée, Partage

Description:
📝 Transforme ton smartphone en carnet d'autographes numérique !

Rencontre ta star préférée ? Fais-la signer directement sur ton écran avec son doigt. Plus besoin de papier, plus besoin de stylo.

✨ FONCTIONNALITÉS

• Canvas de Signature Tactile
  Capture fluide et haute qualité de la signature

• Fonds d'Écran Personnalisés
  Transforme chaque signature en fond d'écran unique avec 20+ templates

• Collection Organisée
  Garde toutes tes signatures dans une galerie magnifique

• Partage Social
  Partage instantanément sur Instagram, TikTok, Twitter

• Métadonnées Automatiques
  Date, heure et lieu capturés automatiquement

🎨 TEMPLATES PREMIUM

20+ designs exclusifs : Minimaliste, Élégant, Moderne, Pop Art, Dark Mode...

💎 VERSION PREMIUM

• Signatures illimitées
• Templates premium
• Export HD sans watermark
• Support prioritaire

Essai gratuit 7 jours, puis 2,99€/mois

📱 PARFAIT POUR

• Fans de musique, cinéma, sport
• Collectionneurs d'autographes
• Événements, festivals, meet & greets
• Rencontres fortuites avec des célébrités

⭐️ POURQUOI SIGNATUREAPP ?

✓ Instantané (10 secondes)
✓ Durable (ne se perd jamais)
✓ Unique (signature originale)
✓ Partageable (1 clic)

Télécharge maintenant et capture ta première signature ! ✍️

Keywords:
signature, autographe, célébrité, fond d'écran, wallpaper, collection, fan, 
concert, festival, meet and greet, personnalisé, numérique, digital signature

Category: Photo & Video
Secondary: Lifestyle

Age Rating: 4+

Support URL: https://signatureapp.com/support
Privacy Policy: https://signatureapp.com/privacy
```

#### Screenshots Requirements

```
iPhone 6.7" (iPhone 14 Pro Max): 1290 x 2796
iPhone 6.5" (iPhone 11 Pro Max): 1242 x 2688
iPhone 5.5" (iPhone 8 Plus): 1242 x 2208

iPad Pro 12.9" (3rd gen): 2048 x 2732

Minimum: 3 screenshots per device
Maximum: 10 screenshots per device

Recommended: 5 screenshots showing:
1. Onboarding slide (value proposition)
2. Canvas signature in action
3. Wallpaper templates gallery
4. Final wallpaper result
5. Gallery/collection view
```

#### Build & Submit Commands

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --latest
```

---

### Android Play Store

#### Configuration

```typescript
// app.json - Android specific
{
  "android": {
    "package": "com.yourcompany.signatureapp",
    "versionCode": 1,
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#8A9A5B"
    },
    "permissions": [
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
      "ACCESS_FINE_LOCATION",
      "USE_BIOMETRIC"
    ],
    "playStoreUrl": "https://play.google.com/store/apps/details?id=com.yourcompany.signatureapp"
  }
}
```

#### Metadata (Google Play Console)

```
Name: SignatureApp - Autographes Numériques

Short Description (80 chars):
Capture des signatures numériques et crée des fonds d'écran personnalisés

Full Description (4000 chars):
[Same as iOS but adapt for Android audience]

Category: Photography
Tags: signature, autograph, wallpaper, celebrity, collection, personalization

Content Rating: Everyone

Screenshots Requirements:
Phone: 16:9 or 9:16 aspect ratio
Tablet 7": 16:9 or 9:16 aspect ratio
Tablet 10": 16:9 or 9:16 aspect ratio

Minimum: 2 screenshots
Maximum: 8 screenshots
Recommended size: 1080 x 1920 (portrait)

Feature Graphic: 1024 x 500 (required for Play Store listing)
```

#### Build & Submit Commands

```bash
# Build for Play Store
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android --latest
```

---

### Release Checklist

```markdown
## Pre-Release

- [ ] All E2E tests passing
- [ ] Performance profiled (no memory leaks)
- [ ] Analytics configured & tested
- [ ] Sentry configured for crash reporting
- [ ] API endpoints working on production
- [ ] Stripe webhooks configured
- [ ] Push notifications tested
- [ ] Deep links tested
- [ ] Privacy policy & terms updated
- [ ] Support email configured

## Assets

- [ ] App icons (all sizes)
- [ ] Splash screens
- [ ] Screenshots (iOS & Android)
- [ ] Feature graphic (Android)
- [ ] Preview video (optional but recommended)
- [ ] App Store description translated (if multi-language)

## iOS Specific

- [ ] Provisioning profiles valid
- [ ] App Store Connect metadata complete
- [ ] In-App Purchase products configured
- [ ] TestFlight beta tested (50+ testers)
- [ ] Export compliance answered

## Android Specific

- [ ] Play Console metadata complete
- [ ] Keystore backed up securely
- [ ] Content rating questionnaire completed
- [ ] Google Play billing configured
- [ ] Closed/Open beta tested (100+ testers)

## Post-Release

- [ ] Monitor crash reports (first 48h critical)
- [ ] Check analytics dashboard
- [ ] Respond to first reviews
- [ ] Monitor performance metrics
- [ ] Check payment flow working
- [ ] Test on various devices
```

---

## 📊 Analytics Events

### Tracking Implementation (hooks/useAnalytics.ts)

```typescript
import { useCallback } from 'react';
import * as Amplitude from 'expo-analytics-amplitude';
import Constants from 'expo-constants';

const AMPLITUDE_API_KEY = Constants.expoConfig?.extra?.amplitudeApiKey;

export function useAnalytics() {
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (!AMPLITUDE_API_KEY) return;

    Amplitude.logEventWithProperties(eventName, {
      ...properties,
      platform: Platform.OS,
      app_version: Constants.expoConfig?.version,
      timestamp: new Date().toISOString()
    });
  }, []);

  const setUserId = useCallback((userId: string) => {
    if (!AMPLITUDE_API_KEY) return;
    Amplitude.setUserId(userId);
  }, []);

  const setUserProperties = useCallback((properties: Record<string, any>) => {
    if (!AMPLITUDE_API_KEY) return;
    Amplitude.setUserProperties(properties);
  }, []);

  return { track, setUserId, setUserProperties };
}
```

### Events to Track

```typescript
// Onboarding
- onboarding_started
- onboarding_slide_viewed { slide_index: number }
- onboarding_completed
- onboarding_skipped { at_slide: number }

// Auth
- auth_started { method: 'email' | 'apple' | 'google' }
- auth_completed { method: string }
- auth_failed { method: string, reason: string }
- mfa_setup_started
- mfa_setup_completed

// Signature
- signature_canvas_opened
- signature_started
- signature_cleared
- signature_validated
- signature_saved

// Wallpaper
- wallpaper_editor_opened
- template_selected { template_id: string }
- color_changed { color: string }
- wallpaper_created
- wallpaper_exported
- wallpaper_shared { platform: string }

// Gallery
- gallery_viewed
- signature_detail_opened
- signature_deleted

// Premium
- premium_page_viewed
- plan_selected { plan: 'monthly' | 'yearly' }
- trial_started
- subscription_completed
- subscription_cancelled

// App
- app_opened
- app_backgrounded
- app_crashed { error: string }
```

---

## 🚀 Performance & Optimisation

### Bundle Optimization

```javascript
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Tree shaking
  config.transformer.minifierConfig = {
    compress: {
      drop_console: true, // Remove console.logs in production
      reduce_vars: true,
      passes: 3
    },
    mangle: {
      toplevel: true
    },
    output: {
      comments: false,
      ascii_only: true
    }
  };

  // Asset scaling
  config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

  return config;
})();
```

### Image Optimization

```typescript
// components/OptimizedImage.tsx
import React from 'react';
import { Image, ImageProps } from 'expo-image';

export function OptimizedImage({ source, ...props }: ImageProps) {
  return (
    <Image
      source={source}
      {...props}
      contentFit="cover"
      transition={200}
      cachePolicy="memory-disk"
    />
  );
}
```

### List Performance

```typescript
// Use FlashList instead of FlatList
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={signatures}
  renderItem={({ item }) => <SignatureCard signature={item} />}
  estimatedItemSize={200}
  keyExtractor={(item) => item.id}
  removeClippedSubviews
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

---

## ♿ Accessibilité

### Guidelines

```typescript
// Accessibility implementation
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Créer une nouvelle signature"
  accessibilityHint="Ouvre le canvas de signature"
  accessibilityRole="button"
  onPress={handleNewSignature}
>
  <Text>Nouvelle Signature</Text>
</TouchableOpacity>

// Screen reader announcements
import { AccessibilityInfo } from 'react-native';

AccessibilityInfo.announceForAccessibility(
  'Signature sauvegardée avec succès'
);

// Reduce motion
import { AccessibilityInfo } from 'react-native';

const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotionEnabled);
}, []);

// Dynamic Type (iOS) / Font Scaling (Android)
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    // Allows text to scale with system font size
    includeFontPadding: false
  }
});
```

---

## 📚 Documentation

### Developer Handoff

```markdown
# Developer Handoff Document

## Setup
1. Clone repository: `git clone ...`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill variables
4. Run development: `npx expo start`

## Environment Variables
```env
API_URL=https://api.signatureapp.com
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
AMPLITUDE_API_KEY=xxx
SENTRY_DSN=https://xxx@sentry.io/xxx
```

## Key Architectural Decisions

### Why Expo?
- Cross-platform with single codebase
- EAS Build for native builds without Mac
- Over-the-air updates
- Extensive library ecosystem

### Why Zustand over Redux?
- Simpler API
- Better TypeScript support
- Less boilerplate
- Better performance

### Why React Query?
- Automatic caching
- Background refetching
- Optimistic updates
- Request deduplication

## Common Issues

### Issue: Canvas lag on Android
Solution: Use `@shopify/react-native-skia` instead of SVG

### Issue: Large bundle size
Solution: Enable Hermes, tree shaking, and lazy loading

### Issue: White screen on launch
Solution: Check Sentry for crash logs

## Deployment

### Development Build
```bash
eas build --profile development --platform ios
```

### Production Build
```bash
eas build --profile production --platform all
eas submit --platform all --latest
```

## Support
- Technical Lead: [Name] - [email]
- Figma: [link]
- API Docs: [link]
- Postman Collection: [link]
```

---

## 🎯 Conclusion

Ce document SDD fournit toutes les spécifications nécessaires pour développer l'application mobile SignatureApp avec React Native et Expo. Il couvre :

✅ Architecture complète  
✅ Configuration Expo détaillée  
✅ Tous les écrans avec code  
✅ Authentification & MFA  
✅ Intégration Stripe  
✅ Social Sharing  
✅ Tests E2E  
✅ Déploiement stores  
✅ Performance & Accessibilité

**Prochaine étape:** Développement de l'API backend (voir document séparé)

---

**Document SDD v1.0**  
**Créé le:** 27 octobre 2025  
**Statut:** ✅ Ready for Development
