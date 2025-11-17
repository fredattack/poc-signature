# SignatureApp Design System

## Complete Design Language for Signature Platform

Welcome to the **SignatureApp Design System** - a comprehensive, production-ready design language for building consistent, accessible, and beautiful signature management experiences across iOS, Android, and web platforms.

---

## 🎯 Quick Start

### For Designers

1. Read [MegaPrompt](./SignatureApp-DesignSystem-MegaPrompt.md) for complete overview
2. Review [Color System](./01-color-system.md) for palette and Dark Mode
3. Check [Original Charter](./SIGNATURE-APP_MANIFESTE-CHARTE-GRAPHIQUE.md) for brand philosophy

### For Developers

1. Start with [Design Tokens](./00-design-tokens.md) for implementation values
2. Implement theme using tokens (see examples below)
3. Reference components as needed

---

## 📁 Documentation Structure

| Document                                                                                     | Purpose                                         | Audience              |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------- |
| [00-design-tokens.md](./00-design-tokens.md)                                                 | Foundation tokens (colors, spacing, typography) | Developers            |
| [01-color-system.md](./01-color-system.md)                                                   | Complete color palette + Dark Mode              | Designers, Developers |
| [SignatureApp-DesignSystem-MegaPrompt.md](./SignatureApp-DesignSystem-MegaPrompt.md)         | Master reference document                       | Everyone              |
| [SIGNATURE-APP_MANIFESTE-CHARTE-GRAPHIQUE.md](./SIGNATURE-APP_MANIFESTE-CHARTE-GRAPHIQUE.md) | Original design charter (French)                | Designers             |

---

## 🎨 Brand Identity

### Colors

**Primary - Sage Green:** `#8A9A5B` - Authenticity, growth, trust
**Secondary - Warm Beige:** `#D4C5B1` - Warmth, sophistication, comfort
**Accent - Water Green:** `#A8C3BC` - Harmony, calm, balance

### Typography

**iOS:** SF Pro Display
**Android:** Roboto
**Web:** Inter

### Philosophy

**Authentic — Sophisticated — Natural**

SignatureApp embodies **elegant simplicity** - a palette inspired by organic materials (sage, earth, water) that creates an atmosphere of trust and discrete luxury. Design prioritizes **intentional clarity** and **meaningful interactions** over gratuitous ornamentation.

---

## 🌙 Intelligent Dark Mode

SignatureApp features an adaptive Dark Mode system that automatically activates based on:

- ⏰ Sunset detection (18:00 default, location-aware)
- 💡 Ambient light sensor
- 👤 User preference toggle
- 🔋 Battery saver mode
- ♿ Accessibility high contrast mode

**Transition:** Smooth 0.5s fade with warm color adjustments
**Energy Savings:** 20-60% on OLED screens

---

## 🧩 Key Components

### Signature Canvas

The heart of the app - a touch-responsive canvas for creating and editing signatures with:

- Drawing with finger or stylus
- Color customization
- Background editing
- Undo/Redo functionality

### Gallery Grid

2-column masonry layout for signature collection:

- 3:4 aspect ratio cards
- Smooth transitions
- Long-press actions
- Optimized images (WebP)

### Primary Button

Gradient sage-to-water green with generous 16pt radius:

```css
background: linear-gradient(135deg, #8a9a5b, #a8c3bc);
border-radius: 16pt;
min-height: 56pt;
```

---

## ♿ Accessibility First

All design decisions prioritize accessibility:

✅ **WCAG AA Minimum** - All text meets 4.5:1 contrast
✅ **Touch Targets** - 44pt minimum (iOS), 48pt recommended
✅ **Dynamic Type** - iOS 5 sizes, Android sp units
✅ **Screen Reader** - Proper labels for all interactive elements
✅ **Keyboard Navigation** - Full support with visible focus rings
✅ **Reduced Motion** - Respects user preferences

---

## 📱 Platform Support

| Platform | Version         | Status             |
| -------- | --------------- | ------------------ |
| iOS      | 16+             | ✅ Fully Supported |
| Android  | 14+             | ✅ Fully Supported |
| Web      | Modern browsers | ✅ Responsive      |

**Optimization Priority:**

- iPhone 14 Pro (393pt width)
- Pixel 7 (412pt width)
- iPad (768pt+ width)

---

## 🎯 Implementation Quick Reference

### React Native Theme Setup

```typescript
// theme/colors.ts
export const colors = {
  primary: {
    500: '#8A9A5B',
    600: '#6B7A3F',
  },
  secondary: {
    400: '#D4C5B1',
  },
  accent: {
    400: '#A8C3BC',
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

// theme/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// theme/typography.ts
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 23,
  },
};
```

### Using Design Tokens

```typescript
import { colors, spacing, typography } from '@/theme';

<View style={{
  backgroundColor: colors.background.primary,
  padding: spacing.md,
}}>
  <Text style={{
    ...typography.h1,
    color: colors.text.primary,
  }}>
    My Signatures
  </Text>
</View>
```

---

## 🚀 Design Principles

### 1. Clarity Over Complexity

Every element serves a purpose. Remove anything that doesn't add value.

### 2. Consistency Breeds Trust

Use the design system rigorously. Deviations confuse users and break trust.

### 3. Performance Matters

Fast apps feel more premium. Optimize images, minimize animations, respect battery life.

### 4. Accessibility is Non-Negotiable

Everyone should be able to use our app. Test with screen readers, keyboard navigation, and color blindness simulators.

### 5. Mobile First, Always

Design for mobile, enhance for larger screens. Never the reverse.

---

## 🔧 Design Tokens Export Formats

### CSS Variables (Web)

```css
:root {
  --color-primary-500: #8a9a5b;
  --spacing-md: 16px;
  --radius-button: 16px;
}
```

### JSON (React Native)

```json
{
  "color": {
    "primary": {
      "500": "#8A9A5B"
    }
  },
  "spacing": {
    "md": 16
  }
}
```

### Tailwind Config (Web)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#8A9A5B',
        },
      },
      spacing: {
        md: '16px',
      },
    },
  },
};
```

---

## 📊 Performance Budgets

| Metric              | Target  | Maximum |
| ------------------- | ------- | ------- |
| App Size            | < 40MB  | 50MB    |
| Session Data        | < 1.5MB | 2MB     |
| Image (Thumbnail)   | < 12KB  | 15KB    |
| Image (Gallery)     | < 40KB  | 50KB    |
| Image (Detail)      | < 120KB | 150KB   |
| First Paint         | < 1s    | 1.5s    |
| Time to Interactive | < 2.5s  | 3.5s    |

---

## ✅ Quality Checklist

Before shipping any feature:

- [ ] Colors meet WCAG AA contrast (4.5:1 minimum)
- [ ] Touch targets are 44pt minimum
- [ ] Text scales with Dynamic Type (iOS) and sp units (Android)
- [ ] Works in both light and dark modes
- [ ] Images optimized (WebP format, compressed)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] All interactive elements have accessible labels
- [ ] Focus indicators visible for keyboard navigation
- [ ] Tested on actual devices (not just simulator)
- [ ] Design tokens used (no hardcoded values)

---

## 🆘 Need Help?

### Common Questions

**Q: What color should I use for...?**
A: Check [01-color-system.md](./01-color-system.md) for semantic color guidance.

**Q: What's the minimum touch target size?**
A: 44pt × 44pt minimum (iOS standard), 48pt recommended.

**Q: How do I implement Dark Mode?**
A: See [01-color-system.md](./01-color-system.md) Dark Mode section.

**Q: What font should I use?**
A: Use system fonts: SF Pro (iOS), Roboto (Android), Inter (Web).

**Q: Where are the Figma files?**
A: Contact the design team for access to the Figma design library.

### Support Contacts

- **Design Questions:** Design Team
- **Implementation Help:** Engineering Team
- **Documentation Updates:** Submit PR or file issue

---

## 📝 Contributing

### Updating the Design System

1. **Propose Change:** Open discussion with design team
2. **Document Update:** Update relevant markdown files
3. **Version Bump:** Update version number in MegaPrompt
4. **Announce:** Communicate changes to team
5. **Deprecation:** Provide migration path for breaking changes

### Versioning

Current Version: **1.0.0**

Format: `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes (e.g., color token rename)
- **MINOR:** New additions (backwards compatible)
- **PATCH:** Value adjustments (same semantics)

---

## 🎓 Learning Resources

### External References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://m3.material.io/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Internal Documentation

- [Original Design Charter](./SIGNATURE-APP_MANIFESTE-CHARTE-GRAPHIQUE.md) - Complete brand philosophy
- [Design Tokens Reference](./00-design-tokens.md) - Implementation values
- [Color System Deep Dive](./01-color-system.md) - Palette and Dark Mode

---

## 🔄 Changelog

### Version 1.0.0 (2025-11-17)

- ✨ Initial design system release
- 📚 Complete documentation suite
- 🎨 Sage Green brand identity
- 🌙 Intelligent Dark Mode system
- ♿ WCAG AA accessibility compliance
- 📱 iOS 16+, Android 14+, Web support

---

**Last Updated:** 2025-11-17
**Maintained By:** SignatureApp Design Team
**License:** Proprietary - Internal Use Only
