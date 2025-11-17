# SignatureApp Design System - Implementation Guide

## From Design Tokens to Production Code

This guide shows you how to use the SignatureApp design system in your React Native application.

---

## 📦 What's Included

The design system provides:

✅ **Complete color palette** with light/dark mode support
✅ **Typography system** with platform-native fonts
✅ **Spacing tokens** based on 8pt grid
✅ **Shadow system** with sage green tint
✅ **Border radius** tokens
✅ **Animation durations**
✅ **Icon sizes**

All tokens are available in `/src/theme/`:

- `colors.ts` - Complete color palette
- `typography.ts` - Font styles and sizes
- `spacing.ts` - Spacing scale
- `index.ts` - Central theme export

---

## 🚀 Quick Start

### 1. Import the theme

```typescript
import { useTheme, theme, colors, spacing, typography } from '@/theme';
```

### 2. Use in your components

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

export const MyComponent = () => {
  const { colors, spacing, typography, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[typography.h1, { color: colors.text.primary }]}>
        Hello SignatureApp
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
});
```

---

## 🎨 Using Colors

### Basic Usage

```typescript
import { colors } from '@/theme';

<View style={{ backgroundColor: colors.primary[500] }}>
  <Text style={{ color: colors.text.primary }}>
    Primary Color
  </Text>
</View>
```

### With Dark Mode Support

```typescript
import { useTheme } from '@/theme';

const MyComponent = () => {
  const { colors, isDark } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background.primary }}>
      <Text style={{ color: colors.text.primary }}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
    </View>
  );
};
```

### Semantic Colors

```typescript
// Success state
<View style={{
  backgroundColor: colors.success.light,
  borderColor: colors.success.base,
}}>
  <Text style={{ color: colors.success.dark }}>
    Signature saved successfully!
  </Text>
</View>

// Error state
<View style={{
  backgroundColor: colors.error.light,
  borderColor: colors.error.base,
}}>
  <Text style={{ color: colors.error.dark }}>
    Failed to save signature
  </Text>
</View>
```

---

## ✍️ Using Typography

### Typography Presets

```typescript
import { typography } from '@/theme';

<Text style={typography.h1}>Page Title</Text>
<Text style={typography.h2}>Section Heading</Text>
<Text style={typography.bodyM}>Body text goes here</Text>
<Text style={typography.caption}>Small caption text</Text>
```

### Custom Text Styles

```typescript
import { typography, colors } from '@/theme';

<Text style={[
  typography.h1,
  {
    color: colors.primary[600],
    textAlign: 'center',
  }
]}>
  My Signatures
</Text>
```

### Button Text

```typescript
import { typography, colors } from '@/theme';

<Text style={[
  typography.button,
  { color: colors.text.inverse }
]}>
  Save Signature
</Text>
```

---

## 📏 Using Spacing

### Basic Spacing

```typescript
import { spacing } from '@/theme';

<View style={{
  padding: spacing.md,          // 16pt
  marginBottom: spacing.lg,     // 24pt
  gap: spacing.sm,              // 8pt
}}>
  {/* Content */}
</View>
```

### Semantic Spacing

```typescript
import { spacing } from '@/theme';

// Screen padding
<View style={{
  paddingHorizontal: spacing.screenPaddingHorizontal,  // 16pt
  paddingVertical: spacing.screenPaddingVertical,      // 20pt
}}>

// Card padding
<View style={{
  padding: spacing.cardPadding,  // 20pt
}}>

// Button padding
<TouchableOpacity style={{
  paddingHorizontal: spacing.buttonPaddingHorizontal,  // 24pt
  paddingVertical: spacing.buttonPaddingVertical,      // 14pt
}}>
```

---

## 🎨 Complete Component Example

### Primary Button

```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';

export const PrimaryButton = ({ title, onPress, disabled = false }) => {
  const { colors, spacing, typography, radius, shadows } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[colors.primary[500], colors.accent[400]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.button,
          {
            paddingHorizontal: spacing.buttonPaddingHorizontal,
            paddingVertical: spacing.buttonPaddingVertical,
            borderRadius: radius.generous,
            opacity: disabled ? 0.5 : 1,
          },
          shadows.md,
        ]}
      >
        <Text style={[
          typography.button,
          { color: colors.text.inverse }
        ]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### Signature Gallery Card

```typescript
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';

export const SignatureCard = ({ signature, onPress }) => {
  const { colors, spacing, typography, radius, shadows } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.card,
        {
          backgroundColor: colors.background.primary,
          borderRadius: radius.regular,
          padding: spacing.md,
        },
        shadows.md,
      ]}
    >
      <Image
        source={{ uri: signature.imageUrl }}
        style={[styles.image, { borderRadius: radius.mild }]}
        resizeMode="contain"
      />
      <Text
        style={[
          typography.caption,
          { color: colors.text.secondary, marginTop: spacing.sm }
        ]}
        numberOfLines={1}
      >
        {signature.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',  // 2-column grid with gap
    aspectRatio: 3 / 4,
  },
  image: {
    width: '100%',
    flex: 1,
  },
});
```

### Text Input with Label

```typescript
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

export const LabeledInput = ({ label, value, onChangeText, error }) => {
  const { colors, spacing, typography, radius } = useTheme();

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={[
        typography.bodyS,
        {
          color: colors.text.secondary,
          marginBottom: spacing.sm,
          fontWeight: '600',
        }
      ]}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          typography.bodyM,
          {
            backgroundColor: colors.background.secondary,
            borderColor: error ? colors.error.base : colors.pearl[200],
            borderWidth: error ? 2 : 1,
            borderRadius: radius.mild,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.md,
            minHeight: 56,
            color: colors.text.primary,
          },
        ]}
        placeholderTextColor={colors.text.tertiary}
      />

      {error && (
        <Text style={[
          typography.caption,
          {
            color: colors.error.base,
            marginTop: spacing.xs,
          }
        ]}>
          {error}
        </Text>
      )}
    </View>
  );
};
```

---

## 🌙 Dark Mode Implementation

The theme automatically adapts to the device's color scheme:

```typescript
import { useTheme } from '@/theme';
import { useColorScheme } from 'react-native';

const MyScreen = () => {
  const { colors, isDark } = useTheme();
  const systemColorScheme = useColorScheme();

  return (
    <View style={{ backgroundColor: colors.background.primary }}>
      <Text style={{ color: colors.text.primary }}>
        Current mode: {isDark ? 'Dark' : 'Light'}
      </Text>
      <Text style={{ color: colors.text.secondary }}>
        System preference: {systemColorScheme}
      </Text>
    </View>
  );
};
```

### Testing Dark Mode

```typescript
// In your component or screen
import { Appearance } from 'react-native';

// Force dark mode for testing
Appearance.setColorScheme('dark');

// Force light mode for testing
Appearance.setColorScheme('light');

// Reset to system default
Appearance.setColorScheme(null);
```

---

## 🎯 Common Patterns

### Screen Layout with Safe Area

```typescript
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

const MyScreen = () => {
  const { colors, spacing } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary
      }}
    >
      <View style={{
        paddingHorizontal: spacing.screenPaddingHorizontal,
        paddingVertical: spacing.screenPaddingVertical,
      }}>
        {/* Screen content */}
      </View>
    </SafeAreaView>
  );
};
```

### Card with Shadow

```typescript
import { useTheme } from '@/theme';

const MyCard = () => {
  const { colors, spacing, radius, shadows } = useTheme();

  return (
    <View style={[
      {
        backgroundColor: colors.background.primary,
        borderRadius: radius.regular,
        padding: spacing.cardPadding,
      },
      shadows.md,
    ]}>
      {/* Card content */}
    </View>
  );
};
```

### Icon Button (Circular)

```typescript
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Camera } from 'phosphor-react-native';

const IconButton = ({ onPress }) => {
  const { colors, iconSize, radius, shadows } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: 48,
          height: 48,
          borderRadius: radius.pill,
          backgroundColor: colors.background.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        shadows.sm,
      ]}
    >
      <Camera size={iconSize.md} color={colors.primary[600]} />
    </TouchableOpacity>
  );
};
```

---

## ♿ Accessibility Best Practices

### Minimum Touch Targets

```typescript
import { spacing } from '@/theme';

// Minimum 44pt touch target (iOS)
<TouchableOpacity style={{
  minWidth: spacing.touchTargetMin,
  minHeight: spacing.touchTargetMin,
}}>

// Comfortable 48pt (Android recommended)
<TouchableOpacity style={{
  minWidth: spacing.touchTargetComfortable,
  minHeight: spacing.touchTargetComfortable,
}}>
```

### Accessible Text Contrast

```typescript
import { colors } from '@/theme';

// ✅ Good - High contrast
<Text style={{ color: colors.text.primary }}>  // 14.2:1
<Text style={{ color: colors.primary[600] }}>  // 4.15:1

// ❌ Avoid - Low contrast
<Text style={{ color: colors.primary[500] }}>  // 2.85:1 (too low for body text)
```

### Screen Reader Labels

```typescript
<TouchableOpacity
  accessibilityLabel="Save signature"
  accessibilityHint="Saves your signature to the gallery"
  accessibilityRole="button"
>
  <Text>Save</Text>
</TouchableOpacity>
```

---

## 📊 Performance Tips

### Memoize Styles

```typescript
import { useMemo } from 'react';
import { useTheme } from '@/theme';

const MyComponent = () => {
  const { colors, spacing } = useTheme();

  const styles = useMemo(() => ({
    container: {
      backgroundColor: colors.background.primary,
      padding: spacing.md,
    },
    text: {
      color: colors.text.primary,
    },
  }), [colors, spacing]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Optimized</Text>
    </View>
  );
};
```

### Use StyleSheet.create

```typescript
import { StyleSheet } from 'react-native';

// Static styles outside component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Dynamic styles inside component with theme
const MyComponent = () => {
  const { colors } = useTheme();

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.background.primary }
    ]}>
  );
};
```

---

## 🚀 Next Steps

1. **Explore the components** - Look at existing components in `/src/components`
2. **Build new components** - Use the design tokens to build consistent UIs
3. **Test in both modes** - Always test light and dark modes
4. **Optimize images** - Use WebP format, compress to < 150KB
5. **Check accessibility** - Use minimum touch targets, high contrast colors

---

## 📚 Additional Resources

- [Design Tokens Reference](./00-design-tokens.md)
- [Color System Documentation](./01-color-system.md)
- [Design System MegaPrompt](./SignatureApp-DesignSystem-MegaPrompt.md)
- [Original Design Charter](./SIGNATURE-APP_MANIFESTE-CHARTE-GRAPHIQUE.md)

---

**Last Updated:** 2025-11-17
**Version:** 1.0.0
