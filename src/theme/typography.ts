/**
 * SignatureApp Typography System
 * Uses platform-native fonts for optimal rendering
 *
 * iOS: SF Pro Display
 * Android: Roboto
 * Web: Inter (fallback)
 */

import { Platform, TextStyle } from 'react-native';

// Font families by platform
export const fontFamily = {
  ios: 'SF Pro Display',
  android: 'Roboto',
  web: 'Inter',
  default: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'Inter',
  }),
} as const;

// Font weights
export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
} as const;

// Font sizes (mobile-first)
export const fontSize = {
  h1: 32,
  h2: 28,
  h3: 22,
  h4: 20,
  h5: 18,
  h6: 16,
  bodyL: 17,
  bodyM: 15, // Default body text
  bodyS: 14,
  caption: 12,
  overline: 11,
} as const;

// Line heights
export const lineHeight = {
  h1: 40,
  h2: 36,
  h3: 30,
  h4: 28,
  h5: 26,
  h6: 24,
  bodyL: 26,
  bodyM: 23,
  bodyS: 21,
  caption: 18,
  overline: 16,
} as const;

// Letter spacing (in points)
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.2,
  number: 0.3,
} as const;

// Typography presets (complete TextStyle objects)
export const typography = {
  h1: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.h1,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.h1,
    letterSpacing: letterSpacing.tight,
  },

  h2: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.h2,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.h2,
    letterSpacing: letterSpacing.normal,
  },

  h3: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.h3,
    letterSpacing: letterSpacing.normal,
  },

  h4: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.h4,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.h4,
    letterSpacing: letterSpacing.normal,
  },

  h5: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.h5,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.h5,
    letterSpacing: letterSpacing.normal,
  },

  h6: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.h6,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.h6,
    letterSpacing: letterSpacing.normal,
  },

  bodyL: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.bodyL,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.bodyL,
    letterSpacing: letterSpacing.normal,
  },

  bodyM: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.bodyM,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.bodyM,
    letterSpacing: letterSpacing.normal,
  },

  bodyS: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.bodyS,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.bodyS,
    letterSpacing: letterSpacing.wide,
  },

  caption: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.wide,
  },

  overline: {
    fontFamily: fontFamily.default,
    fontSize: fontSize.overline,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.overline,
    letterSpacing: 0.8, // 0.08em
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },

  button: {
    fontFamily: fontFamily.default,
    fontSize: 16,
    fontWeight: fontWeight.semibold,
    lineHeight: 24,
    letterSpacing: letterSpacing.normal,
  },
} as const;

export type Typography = typeof typography;
