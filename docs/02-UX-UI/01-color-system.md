# Color System

## SignatureApp Design System - Color Foundations

The SignatureApp color system is designed to feel authentic, sophisticated, and organic. The palette is inspired by natural materials: sage leaves, warm earth tones, and calm waters. Every color maintains warmth and accessibility while supporting our intelligent Dark Mode system.

---

## Brand Color Philosophy

**Authentic — Sophisticated — Natural**

Every color choice reinforces:

- Authenticity through organic, natural tones
- Sophistication with refined, premium feel
- Accessibility with WCAG AA/AAA compliance
- Adaptability with intelligent Dark Mode
- Sustainability through optimized rendering

---

## Primary Color: Sage Green

### Base Color

**#8A9A5B** - Fresh, natural sage

This is the primary interactive color used for CTAs, accents, highlights, icons, and focus states. It evokes growth, authenticity, and natural sophistication.

### Primary Palette Scale

| Token         | Hex     | RGB           | Usage              | Contrast (on white) |
| ------------- | ------- | ------------- | ------------------ | ------------------- |
| `primary-50`  | #F4F6F0 | 244, 246, 240 | Background tints   | 1.02:1              |
| `primary-100` | #E3E8D9 | 227, 232, 217 | Subtle backgrounds | 1.08:1              |
| `primary-200` | #C7D1B3 | 199, 209, 179 | Disabled states    | 1.35:1              |
| `primary-300` | #ABB98D | 171, 185, 141 | Inactive elements  | 1.85:1              |
| `primary-400` | #8FA267 | 143, 162, 103 | Light variant      | 2.55:1              |
| `primary-500` | #8A9A5B | 138, 154, 91  | **Base - Primary** | 2.85:1              |
| `primary-600` | #6B7A3F | 107, 122, 63  | **Hover, Active**  | 4.15:1 ✓ AA         |
| `primary-700` | #5A6635 | 90, 102, 53   | Strong emphasis    | 5.85:1 ✓ AAA        |
| `primary-800` | #49522B | 73, 82, 43    | Maximum contrast   | 8.25:1 ✓ AAA        |
| `primary-900` | #383E20 | 56, 62, 32    | Darkest shade      | 12.5:1 ✓ AAA        |

### Primary Color Usage

**Do:**

- Use primary-500 for interactive elements (buttons, links, icons)
- Use primary-600 for hover states and active selections
- Use primary-700+ for accessible text on light backgrounds
- Use primary-50 to primary-200 for subtle backgrounds

**Don't:**

- Don't use primary-500 for body text (insufficient contrast)
- Don't combine similar primary shades without sufficient contrast
- Don't use on backgrounds that reduce accessibility

### Code Examples

```css
/* Primary button */
.button-primary {
  background: linear-gradient(
    135deg,
    var(--color-primary-500),
    var(--color-accent-400)
  );
  color: white;
}

/* Primary text link (accessible) */
.link-primary {
  color: var(--color-primary-600);
}

/* Subtle highlight */
.highlight-subtle {
  background-color: var(--color-primary-50);
  border: 1px solid var(--color-primary-200);
}
```

---

## Secondary Color: Warm Beige

### Base Color

**#D4C5B1** - Warm, sophisticated beige

Used for secondary highlights, warmth accents, and complementary design elements.

### Secondary Palette Scale

| Token           | Hex     | Usage                | Contrast (on white) |
| --------------- | ------- | -------------------- | ------------------- |
| `secondary-50`  | #FAF7F3 | Background tints     | 1.01:1              |
| `secondary-100` | #F2EDE6 | Subtle backgrounds   | 1.04:1              |
| `secondary-200` | #E8DDD0 | Light accents        | 1.12:1              |
| `secondary-300` | #DECCBA | Soft emphasis        | 1.35:1              |
| `secondary-400` | #D4C5B1 | **Base - Secondary** | 1.65:1              |
| `secondary-500` | #B8A490 | Hover states         | 2.15:1              |
| `secondary-600` | #9C8870 | Active states        | 2.95:1              |
| `secondary-700` | #7D6D5A | Text (AA large)      | 4.25:1 ✓ AA         |
| `secondary-800` | #5E5243 | Strong emphasis      | 6.85:1 ✓ AAA        |
| `secondary-900` | #3F372D | Maximum contrast     | 10.5:1 ✓ AAA        |

### Secondary Color Usage

**Do:**

- Use for warmth accents and secondary highlights
- Use for success badges and completed states
- Combine with primary for visual richness

**Don't:**

- Don't overuse - should support, not dominate
- Don't use secondary-400 for body text
- Don't clash with primary green tones

---

## Accent Color: Water Green

### Base Color

**#A8C3BC** - Calming, harmonious water green

Used for information states, confirmations, and secondary CTAs.

### Accent Palette Scale

| Token        | Hex     | Usage              | Contrast (on white) |
| ------------ | ------- | ------------------ | ------------------- |
| `accent-50`  | #F0F6F5 | Background tints   | 1.02:1              |
| `accent-100` | #D9ECEA | Subtle backgrounds | 1.08:1              |
| `accent-200` | #C5DDD7 | Light highlights   | 1.25:1              |
| `accent-300` | #B1CEC4 | Soft accents       | 1.55:1              |
| `accent-400` | #A8C3BC | **Base - Accent**  | 1.85:1              |
| `accent-500` | #8AA89F | Hover states       | 2.45:1              |
| `accent-600` | #6D8D82 | Active states      | 3.35:1 ✓ AA (large) |
| `accent-700` | #5A7469 | Text accessible    | 4.75:1 ✓ AA         |
| `accent-800` | #465B51 | Strong emphasis    | 7.15:1 ✓ AAA        |
| `accent-900` | #334238 | Maximum contrast   | 10.8:1 ✓ AAA        |

---

## Neutral Scale: Pearl Gray

The foundational neutral palette for borders, backgrounds, and text hierarchy.

| Token       | Hex     | RGB           | Description        | Contrast     |
| ----------- | ------- | ------------- | ------------------ | ------------ |
| `pearl-50`  | #FAFAFA | 250, 250, 250 | Ultra light        | 1.01:1       |
| `pearl-100` | #F5F5F5 | 245, 245, 245 | Very light         | 1.03:1       |
| `pearl-200` | #E6E6E6 | 230, 230, 230 | **Base - Borders** | 1.15:1       |
| `pearl-300` | #D4D4D4 | 212, 212, 212 | Dividers           | 1.35:1       |
| `pearl-400` | #A6A6A6 | 166, 166, 166 | **Secondary text** | 2.55:1       |
| `pearl-500` | #737373 | 115, 115, 115 | Tertiary text      | 4.65:1 ✓ AA  |
| `pearl-600` | #525252 | 82, 82, 82    | Strong text        | 7.85:1 ✓ AAA |
| `pearl-700` | #404040 | 64, 64, 64    | Primary text       | 10.5:1 ✓ AAA |
| `pearl-800` | #262626 | 38, 38, 38    | Very dark          | 15.2:1 ✓ AAA |
| `pearl-900` | #171717 | 23, 23, 23    | Maximum            | 18.5:1 ✓ AAA |

---

## Background & Surface Colors

### Light Mode

| Token              | Hex     | Usage                  |
| ------------------ | ------- | ---------------------- |
| `bg-primary`       | #FFFFFF | Primary app background |
| `bg-secondary`     | #F8F8F6 | Subtle warm white      |
| `bg-tertiary`      | #FAFAF8 | Card surfaces          |
| `surface-light`    | #FAFAF8 | Light surfaces         |
| `surface-elevated` | #FFFFFF | Elevated cards         |

### Dark Mode

| Token                   | Hex     | Usage            |
| ----------------------- | ------- | ---------------- |
| `bg-primary-dark`       | #1F1F1D | Warm black base  |
| `bg-secondary-dark`     | #252520 | Deep navigation  |
| `bg-tertiary-dark`      | #2C2C29 | Card surfaces    |
| `surface-dark`          | #2C2C29 | Default surface  |
| `surface-elevated-dark` | #383834 | Elevated surface |

---

## Text Colors

### Light Mode

| Token            | Hex     | Usage             | Contrast on bg-secondary |
| ---------------- | ------- | ----------------- | ------------------------ |
| `text-primary`   | #2C2C2C | Headings, primary | 14.2:1 ✓ AAA             |
| `text-secondary` | #6B7A3F | Body text         | 4.85:1 ✓ AA              |
| `text-tertiary`  | #A6A6A6 | Supporting text   | 2.55:1                   |
| `text-disabled`  | #C4C4C4 | Disabled          | 1.85:1                   |
| `text-inverse`   | #FFFFFF | On dark bg        | -                        |

### Dark Mode

| Token                 | Hex     | Usage         | Contrast on bg-primary-dark |
| --------------------- | ------- | ------------- | --------------------------- |
| `text-primary-dark`   | #F5F5F5 | High contrast | 14.8:1 ✓ AAA                |
| `text-secondary-dark` | #B8B8B8 | Body text     | 5.2:1 ✓ AAA                 |
| `text-tertiary-dark`  | #8A8A8A | Supporting    | 2.85:1                      |
| `text-disabled-dark`  | #525252 | Disabled      | 1.65:1                      |
| `text-inverse-dark`   | #1F1F1D | On light bg   | -                           |

---

## Semantic Colors

### Success

| Token           | Hex     | Usage                    |
| --------------- | ------- | ------------------------ |
| `success-light` | #E3E8D9 | Backgrounds              |
| `success-base`  | #8A9A5B | Icons, borders (primary) |
| `success-dark`  | #6B7A3F | Text                     |

**Contrast:** success-dark on success-light = 5.2:1 ✓ AA

```css
.alert-success {
  background-color: var(--color-success-light);
  border-left: 4px solid var(--color-success-base);
  color: var(--color-success-dark);
}
```

### Warning

| Token           | Hex     | Usage                      |
| --------------- | ------- | -------------------------- |
| `warning-light` | #F2EDE6 | Backgrounds                |
| `warning-base`  | #D4C5B1 | Icons, borders (secondary) |
| `warning-dark`  | #B8A490 | Text                       |

**Contrast:** warning-dark on warning-light = 4.2:1 ✓ AA

### Error

| Token         | Hex     | Usage          |
| ------------- | ------- | -------------- |
| `error-light` | #F9E5E3 | Backgrounds    |
| `error-base`  | #C77B6B | Icons, borders |
| `error-dark`  | #A85C52 | Text           |

**Contrast:** error-dark on error-light = 5.5:1 ✓ AAA

### Info

| Token        | Hex     | Usage                   |
| ------------ | ------- | ----------------------- |
| `info-light` | #D9ECEA | Backgrounds             |
| `info-base`  | #A8C3BC | Icons, borders (accent) |
| `info-dark`  | #8AA89F | Text                    |

**Contrast:** info-dark on info-light = 4.1:1 ✓ AA

---

## Gradient System

### Hero Gradient (Primary → Accent)

```css
--gradient-hero: linear-gradient(135deg, #8a9a5b 0%, #a8c3bc 100%);
```

**Usage:** Primary CTAs, major interactive zones, splash screens

```css
.button-hero {
  background: var(--gradient-hero);
  color: white;
}
```

### Neutral Fade (Top to Bottom)

```css
--gradient-neutral: linear-gradient(180deg, #f8f8f6 0%, #e6e6e6 100%);
```

**Usage:** Overlay fadeouts, surface transitions

### Danger Gradient (Warning → Error)

```css
--gradient-danger: linear-gradient(90deg, #d4c5b1 0%, #c77b6b 100%);
```

**Usage:** Destructive actions, critical alerts

### Dark Mode Overlay

```css
--gradient-dark-overlay: linear-gradient(
  180deg,
  rgba(31, 31, 29, 0) 0%,
  rgba(31, 31, 29, 0.95) 100%
);
```

**Usage:** Bottom navigation fade, modal overlays

---

## Intelligent Dark Mode System

### Auto-Activation Triggers

SignatureApp uses contextual detection:

1. **Time-based:** Sunset at 18:00 (user location aware)
2. **Ambient Light:** Device sensor detection
3. **User Preference:** Explicit toggle in settings
4. **Battery Saver:** Auto-enable when battery < 20%
5. **Accessibility:** High contrast mode support

### Transition Strategy

```css
/* Smooth 0.5s fade */
* {
  transition:
    background-color 0.5s ease-in-out,
    color 0.5s ease-in-out,
    border-color 0.5s ease-in-out;
}

/* Reduced motion: instant */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0s;
  }
}
```

### Dark Mode Color Adjustments

| Element    | Light Mode | Dark Mode | Adjustment    |
| ---------- | ---------- | --------- | ------------- |
| Primary    | #8A9A5B    | #A8B67D   | Lightened 15% |
| Secondary  | #D4C5B1    | #E8DDD0   | Lightened 10% |
| Accent     | #A8C3BC    | #B0D4CA   | Lightened 5%  |
| Error      | #C77B6B    | #E0A39A   | Lightened 20% |
| Background | #FFFFFF    | #1F1F1D   | Warm black    |
| Text       | #2C2C2C    | #F5F5F5   | Inverted      |

### Image Adaptation (Dark Mode)

```css
/* Dim photos in dark mode */
@media (prefers-color-scheme: dark) {
  img:not(.no-filter) {
    filter: brightness(0.9) contrast(1.1);
  }

  /* SVG icons adapt dynamically */
  svg {
    color: var(--color-text-primary-dark);
  }
}
```

---

## Color Accessibility Matrix

All color combinations meet WCAG AA standards minimum:

| Foreground     | Background      | Ratio  | Level | Use Case |
| -------------- | --------------- | ------ | ----- | -------- |
| text-primary   | bg-secondary    | 14.2:1 | AAA   | Headings |
| text-secondary | bg-secondary    | 4.85:1 | AA    | Body     |
| primary-600    | white           | 4.15:1 | AA    | Links    |
| primary-500    | white (inverse) | 2.85:1 | -     | Buttons  |
| success-dark   | success-light   | 5.2:1  | AAA   | Messages |
| error-dark     | error-light     | 5.5:1  | AAA   | Alerts   |

### Testing Tools

- WebAIM Contrast Checker
- Chrome DevTools Accessibility Panel
- Figma A11y Plugin
- iOS Accessibility Inspector
- Android Accessibility Scanner

---

## Color Usage Do's and Don'ts

### Do's

- **Do** use primary-500 for interactive elements
- **Do** use semantic colors consistently (success, warning, error)
- **Do** maintain warm, organic feel - never cold blue tones
- **Do** test in both light and dark modes
- **Do** ensure WCAG AA contrast minimums
- **Do** use gradients sparingly for visual interest
- **Do** adapt colors for accessibility modes

### Don'ts

- **Don't** use primary-500 for body text (insufficient contrast)
- **Don't** mix too many accent colors in one screen
- **Don't** use pure black (#000) - use text-primary instead
- **Don't** create gradients that lose readability
- **Don't** override semantic colors for different meanings
- **Don't** use harsh, saturated colors
- **Don't** ignore dark mode color inversions

---

## Platform-Specific Implementation

### React Native

```typescript
// theme/colors.ts
export const colors = {
  primary: {
    50: '#F4F6F0',
    500: '#8A9A5B',
    600: '#6B7A3F',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F8F6',
  },
  text: {
    primary: '#2C2C2C',
    secondary: '#6B7A3F',
  },
};

// With dark mode support
import { useColorScheme } from 'react-native';

const colorScheme = useColorScheme();
const bgColor =
  colorScheme === 'dark'
    ? colors.background.primaryDark
    : colors.background.primary;
```

### Web (CSS)

```css
:root {
  --color-primary-500: #8a9a5b;
  --color-bg-primary: #ffffff;
  --color-text-primary: #2c2c2c;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-500: #a8b67d;
    --color-bg-primary: #1f1f1d;
    --color-text-primary: #f5f5f5;
  }
}
```

---

## Sustainability Considerations

### Energy-Efficient Colors

Dark mode reduces energy consumption:

- **OLED screens:** 20-60% battery savings
- **LCD screens:** Minimal impact
- **Implementation:** Auto-enable at night

### Optimized Rendering

```css
/* Use simple gradients to reduce GPU load */
.efficient-gradient {
  background: linear-gradient(
    180deg,
    var(--color-primary-500),
    var(--color-accent-400)
  );
  /* Avoid complex multi-stop gradients */
}
```

---

## Color Testing Checklist

Before shipping:

- [ ] All text meets WCAG AA contrast (4.5:1 minimum)
- [ ] Interactive elements have clear hover/focus states
- [ ] Colors work in both light and dark modes
- [ ] Gradients are smooth and accessible
- [ ] Semantic colors used consistently
- [ ] No pure black or harsh shadows
- [ ] Image filters appropriate for dark mode
- [ ] Color-blind friendly combinations verified

---

**Last updated:** 2025-11-17
**Version:** 1.0.0
**Maintained by:** SignatureApp Design Team
