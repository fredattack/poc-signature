/**
 * Design System - Consolidated reference for all design tokens
 *
 * This file provides a consolidated view of the design system.
 * The actual implementation is in /src/theme/tokens.ts
 *
 * Usage:
 * - For components: import { useThemeTokens } from '@/theme'
 * - For direct access: import { tokens } from './design-system'
 */

export { tokens, type Tokens } from './theme/tokens';
export { useThemeTokens, useThemeMode, ThemeProvider } from './theme';

/**
 * Design System Quick Reference
 *
 * COLORS (Sage Green Palette)
 * - Primary: #8A9A5B (Sage green)
 * - Secondary: #D4C5B1 (Warm beige)
 * - Accent: #A8C3BC (Water green)
 *
 * SPACING (8pt grid)
 * - micro: 4px
 * - xs: 8px
 * - sm: 16px
 * - md: 24px
 * - lg: 32px
 * - xl: 48px
 * - xxl: 64px
 *
 * TYPOGRAPHY
 * - Display L: 32px / 700 weight
 * - Display M: 28px / 600 weight
 * - Heading L: 24px / 600 weight
 * - Heading M: 20px / 600 weight
 * - Heading S: 18px / 600 weight
 * - Body L: 17px / 400 weight
 * - Body: 15px / 400 weight
 * - Caption: 13px / 500 weight
 * - Legal: 12px / 400 weight
 *
 * BORDER RADIUS
 * - subtle: 4px
 * - mild: 8px
 * - regular: 12px
 * - generous: 16px
 * - full: 24px (rounded)
 *
 * ELEVATION (Shadows)
 * - level0: No shadow
 * - level1: Subtle (2px offset, 4px blur)
 * - level2: Medium (2px offset, 8px blur)
 * - level3: Strong (6px offset, 12px blur)
 * - level4: Extra (12px offset, 24px blur)
 *
 * MOTION
 * - Duration: instant (100ms), quick (140ms), standard (180ms), expressive (220ms), linger (260ms)
 * - Easing: enter, exit, standard (cubic-bezier)
 *
 * ACCESSIBILITY
 * - Touch target: 44px minimum
 * - Contrast ratios: WCAG 3.0 AA compliant
 * - Focus states: visible with sage green border
 * - Screen reader: aria-label and aria-describedby
 */
