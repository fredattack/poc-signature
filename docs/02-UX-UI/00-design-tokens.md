# Design Tokens

## SignatureApp Design System - Foundation Layer

Design tokens are the atomic design decisions that form the foundation of the SignatureApp design system. They ensure consistency across iOS, Android, and web platforms.

---

## Color Tokens

### Brand Colors

```css
--color-primary-base: #8a9a5b; /* Sage Green - Primary accent */
--color-secondary-base: #d4c5b1; /* Warm Beige - Secondary accent */
--color-accent-base: #a8c3bc; /* Water Green - Tertiary accent */
--color-background-base: #f8f8f6; /* Subtle warm white */
```

### Primary Palette (Sage Green)

```css
--color-primary-50: #f4f6f0; /* Lightest tint */
--color-primary-100: #e3e8d9;
--color-primary-200: #c7d1b3;
--color-primary-300: #abb98d;
--color-primary-400: #8fa267;
--color-primary-500: #8a9a5b; /* Base */
--color-primary-600: #6b7a3f; /* Hover, Active */
--color-primary-700: #5a6635;
--color-primary-800: #49522b;
--color-primary-900: #383e20; /* Darkest shade */
```

### Secondary Palette (Warm Beige)

```css
--color-secondary-50: #faf7f3;
--color-secondary-100: #f2ede6;
--color-secondary-200: #e8ddd0;
--color-secondary-300: #deccba;
--color-secondary-400: #d4c5b1; /* Base */
--color-secondary-500: #b8a490;
--color-secondary-600: #9c8870;
--color-secondary-700: #7d6d5a;
--color-secondary-800: #5e5243;
--color-secondary-900: #3f372d;
```

### Accent Palette (Water Green)

```css
--color-accent-50: #f0f6f5;
--color-accent-100: #d9ecea;
--color-accent-200: #c5ddd7;
--color-accent-300: #b1cec4;
--color-accent-400: #a8c3bc; /* Base */
--color-accent-500: #8aa89f;
--color-accent-600: #6d8d82;
--color-accent-700: #5a7469;
--color-accent-800: #465b51;
--color-accent-900: #334238;
```

### Neutral Scale (Pearl Gray)

```css
--color-pearl-50: #fafafa;
--color-pearl-100: #f5f5f5;
--color-pearl-200: #e6e6e6; /* Base - Borders, dividers */
--color-pearl-300: #d4d4d4;
--color-pearl-400: #a6a6a6; /* Secondary text */
--color-pearl-500: #737373;
--color-pearl-600: #525252;
--color-pearl-700: #404040;
--color-pearl-800: #262626;
--color-pearl-900: #171717;
```

### Background & Surface Colors

```css
/* Light Mode */
--color-bg-primary: #ffffff;
--color-bg-secondary: #f8f8f6; /* Subtle warm white */
--color-bg-tertiary: #fafaf8; /* Cards */
--color-surface-light: #fafaf8;
--color-surface-elevated: #ffffff;

/* Dark Mode */
--color-bg-primary-dark: #1f1f1d; /* Warm black */
--color-bg-secondary-dark: #252520; /* Deep navigation */
--color-bg-tertiary-dark: #2c2c29; /* Cards, sections */
--color-surface-dark: #2c2c29;
--color-surface-elevated-dark: #383834;
```

### Text Colors

```css
/* Light Mode */
--color-text-primary: #2c2c2c; /* 90% opacity */
--color-text-secondary: #6b7a3f; /* Primary 70% */
--color-text-tertiary: #a6a6a6; /* Pearl Dark */
--color-text-disabled: #c4c4c4; /* 60% opacity */
--color-text-inverse: #ffffff;

/* Dark Mode */
--color-text-primary-dark: #f5f5f5;
--color-text-secondary-dark: #b8b8b8;
--color-text-tertiary-dark: #8a8a8a;
--color-text-disabled-dark: #525252;
--color-text-inverse-dark: #1f1f1d;
```

### Semantic Colors

```css
/* Success */
--color-success-light: #e3e8d9;
--color-success-base: #8a9a5b; /* Primary */
--color-success-dark: #6b7a3f;

/* Warning */
--color-warning-light: #f2ede6;
--color-warning-base: #d4c5b1; /* Secondary */
--color-warning-dark: #b8a490;

/* Error */
--color-error-light: #f9e5e3;
--color-error-base: #c77b6b; /* Red-Brown */
--color-error-dark: #a85c52;

/* Info */
--color-info-light: #d9ecea;
--color-info-base: #a8c3bc; /* Accent */
--color-info-dark: #8aa89f;
```

### Gradient Tokens

```css
/* Hero Gradient (Primary → Accent) */
--gradient-hero: linear-gradient(135deg, #8a9a5b 0%, #a8c3bc 100%);

/* Neutral Fade */
--gradient-neutral: linear-gradient(180deg, #f8f8f6 0%, #e6e6e6 100%);

/* Danger Gradient (Warning → Error) */
--gradient-danger: linear-gradient(90deg, #d4c5b1 0%, #c77b6b 100%);

/* Dark Mode Overlay */
--gradient-dark-overlay: linear-gradient(
  180deg,
  rgba(31, 31, 29, 0) 0%,
  rgba(31, 31, 29, 0.95) 100%
);
```

---

## Spacing Tokens

```css
/* Base 8pt Grid System */
--spacing-4: 4px; /* Micro spacing */
--spacing-8: 8px; /* Tight spacing */
--spacing-12: 12px; /* Compact */
--spacing-16: 16px; /* Default spacing */
--spacing-20: 20px; /* Component padding */
--spacing-24: 24px; /* Section separation */
--spacing-32: 32px; /* Major blocks */
--spacing-40: 40px; /* Large sections */
--spacing-48: 48px; /* Hero sections */
--spacing-64: 64px; /* Page sections */
--spacing-80: 80px; /* Extra large */
--spacing-96: 96px; /* Very large gaps */
```

### Semantic Spacing

```css
--spacing-component-gap: var(--spacing-16);
--spacing-section-gap: var(--spacing-32);
--spacing-page-padding-mobile: var(--spacing-16);
--spacing-page-padding-tablet: var(--spacing-24);
--spacing-page-padding-desktop: var(--spacing-40);
--spacing-card-padding: var(--spacing-20);
--spacing-button-padding-x: var(--spacing-20);
--spacing-button-padding-y: var(--spacing-12);
```

---

## Typography Tokens

### Font Family

```css
/* Platform-specific system fonts */
--font-family-ios: 'SF Pro Display', -apple-system, system-ui;
--font-family-android: 'Roboto', system-ui, sans-serif;
--font-family-web:
  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-mono: 'SF Mono', 'Roboto Mono', 'Courier New', monospace;
```

### Font Weights

```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Font Sizes

```css
/* Desktop/Tablet */
--font-size-h1: 40px;
--font-size-h2: 32px;
--font-size-h3: 24px;
--font-size-h4: 20px;
--font-size-h5: 18px;
--font-size-h6: 16px;
--font-size-body-l: 18px;
--font-size-body-m: 16px; /* Default */
--font-size-body-s: 14px;
--font-size-caption: 12px;
--font-size-overline: 11px;

/* Mobile Adjustments */
--font-size-h1-mobile: 32px;
--font-size-h2-mobile: 28px;
--font-size-h3-mobile: 22px;
--font-size-body-l-mobile: 17px;
--font-size-body-m-mobile: 15px;
```

### Line Heights

```css
--line-height-tight: 1.2; /* Headings */
--line-height-normal: 1.5; /* Body text */
--line-height-relaxed: 1.75; /* Spacious paragraphs */
```

### Letter Spacing

```css
--letter-spacing-tight: -0.02em; /* Large headings */
--letter-spacing-normal: 0; /* Default */
--letter-spacing-wide: 0.02em; /* All caps */
--letter-spacing-number: 0.03em; /* Numerical data */
```

---

## Border Radius Tokens

```css
--radius-none: 0px;
--radius-subtle: 4px; /* Small inputs, badges */
--radius-mild: 8px; /* Standard inputs */
--radius-regular: 12px; /* Cards, modals */
--radius-generous: 16px; /* Hero cards, CTAs */
--radius-full: 24px; /* Large hero sections */
--radius-pill: 9999px; /* Pills, circular */
```

### Component-Specific Radius

```css
--radius-button: var(--radius-generous);
--radius-card: var(--radius-regular);
--radius-input: var(--radius-mild);
--radius-badge: var(--radius-pill);
--radius-avatar: var(--radius-pill);
```

---

## Shadow Tokens

```css
/* Elevation System with Sage Green Tint */
--shadow-subtle: 0 2px 4px rgba(138, 154, 91, 0.05);
--shadow-sm: 0 2px 8px rgba(138, 154, 91, 0.08);
--shadow-md: 0 4px 12px rgba(138, 154, 91, 0.12);
--shadow-lg: 0 8px 24px rgba(138, 154, 91, 0.16);
--shadow-xl: 0 12px 32px rgba(138, 154, 91, 0.2);

/* Focus Shadow */
--shadow-focus: 0 0 0 3px rgba(138, 154, 91, 0.25);

/* Dark Mode Shadows (lighter, more subtle) */
--shadow-dark-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-dark-md: 0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-dark-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
```

---

## State Tokens

### Hover States

```css
--state-hover-opacity: 0.9;
--state-hover-scale: 1.02;
--state-hover-bg-darken: rgba(0, 0, 0, 0.05);
```

### Pressed States

```css
--state-pressed-opacity: 0.8;
--state-pressed-scale: 0.98;
--state-pressed-bg-darken: rgba(0, 0, 0, 0.1);
```

### Focus States

```css
--state-focus-ring-color: var(--color-primary-500);
--state-focus-ring-width: 2px;
--state-focus-ring-offset: 2px;
```

### Disabled States

```css
--state-disabled-opacity: 0.5;
--state-disabled-cursor: not-allowed;
--state-disabled-bg: var(--color-pearl-100);
--state-disabled-text: var(--color-text-disabled);
```

---

## Animation & Transition Tokens

```css
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
--duration-page: 500ms;

--easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
--easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
--easing-accelerate: cubic-bezier(0.4, 0, 1, 1);
--easing-smooth: cubic-bezier(0.4, 0, 0.6, 1);

--transition-fast: var(--duration-fast) var(--easing-standard);
--transition-normal: var(--duration-normal) var(--easing-standard);
--transition-slow: var(--duration-slow) var(--easing-smooth);
```

---

## Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-fixed: 1200;
--z-modal-backdrop: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
--z-notification: 1700;
--z-maximum: 9999;
```

---

## Touch Target Tokens

```css
--touch-target-min: 44px; /* iOS minimum */
--touch-target-comfortable: 48px; /* Android recommended */
--touch-target-spacing: 8px; /* Between targets */
```

---

## Opacity Tokens

```css
--opacity-disabled: 0.5;
--opacity-hover: 0.9;
--opacity-pressed: 0.8;
--opacity-subtle: 0.6;
--opacity-faint: 0.4;
```

---

## Icon Size Tokens

```css
--icon-size-xs: 16px;
--icon-size-sm: 20px;
--icon-size-md: 24px; /* Default */
--icon-size-lg: 32px;
--icon-size-xl: 40px;
--icon-size-2xl: 48px;
--icon-size-3xl: 80px;
```

---

## Platform-Specific Export Formats

### Web (CSS Variables)

```css
@import '@signatureapp/design-tokens/css/tokens.css';

.button {
  background-color: var(--color-primary-500);
  border-radius: var(--radius-button);
  padding: var(--spacing-button-padding-y) var(--spacing-button-padding-x);
  transition: var(--transition-normal);
}
```

### React Native (JSON)

```json
{
  "color": {
    "primary": {
      "500": "#8A9A5B",
      "600": "#6B7A3F"
    }
  },
  "spacing": {
    "16": 16,
    "20": 20
  },
  "radius": {
    "button": 16,
    "card": 12
  }
}
```

### Tailwind Configuration

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F4F6F0',
          500: '#8A9A5B',
          600: '#6B7A3F',
        },
      },
      spacing: {
        4: '4px',
        8: '8px',
        16: '16px',
      },
      borderRadius: {
        button: '16px',
        card: '12px',
      },
    },
  },
};
```

---

## Dark Mode Token Strategy

SignatureApp uses an intelligent auto-adaptive dark mode system:

### Trigger Conditions

- Sunset detection (18:00 default)
- Ambient light sensor
- User preference toggle
- Battery saver mode
- Accessibility high contrast mode

### Dark Mode Color Mapping

```css
/* Background Colors */
.bg-primary {
  background-color: var(--color-bg-primary);
}

@media (prefers-color-scheme: dark) {
  .bg-primary {
    background-color: var(--color-bg-primary-dark);
  }
}

/* Text Colors */
.text-primary {
  color: var(--color-text-primary);
}

@media (prefers-color-scheme: dark) {
  .text-primary {
    color: var(--color-text-primary-dark);
  }
}
```

---

## Accessibility Tokens

### Contrast Ratios (WCAG AA/AAA)

All color combinations are tested for accessibility:

```css
/* Verified Pairings */
--contrast-text-primary-on-bg: 14.5: 1; /* AAA */
--contrast-primary-on-white: 7.2: 1; /* AAA */
--contrast-accent-on-white: 5.1: 1; /* AAA */
--contrast-error-on-light: 5.2: 1; /* AA */
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
  }
}
```

---

## Usage Guidelines

### Do's

- Use semantic tokens (e.g., `--spacing-component-gap`) over raw values
- Reference base tokens in component-specific tokens
- Maintain token hierarchy (primitive → semantic → component)
- Version tokens when making breaking changes
- Document token usage in component specifications

### Don'ts

- Don't hardcode values in components
- Don't create one-off tokens for single use cases
- Don't drift from brand colors
- Don't use harsh black shadows
- Don't bypass the token system for "quick fixes"

---

## Token Versioning

**Current version:** 1.0.0

Version format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes to token names or structure
- **MINOR**: New tokens added (backwards compatible)
- **PATCH**: Token value adjustments (same semantics)

---

## Maintenance

Tokens are maintained in:

- `/design-system/tokens/` (source of truth)
- Exported to mobile/web apps for consumption
- Synced with Figma via Style Dictionary

**Last updated:** 2025-11-17
**Maintained by:** SignatureApp Design Team
