import { Platform } from 'react-native';

/**
 * SignatureApp design tokens — source of truth derived from
 * docs/02-UX-UI/SIGNATURE-APP_MANIFESTE-CHARTE-GRAPHIQUE.md (version 2.0, 31 oct. 2025)
 */

type FontWeight = '400' | '500' | '600' | '700';

type TypographyToken = {
  fontSize: number;
  lineHeight: number;
  fontWeight: FontWeight;
  tracking: number;
  letterSpacing: number;
};

const createTypographyToken = (
  fontSize: number,
  lineHeight: number,
  fontWeight: FontWeight,
  trackingPercent: number
): TypographyToken => ({
  fontSize,
  lineHeight,
  fontWeight,
  tracking: trackingPercent,
  letterSpacing: parseFloat((fontSize * (trackingPercent / 100)).toFixed(2)),
});

export const typography = {
  displayL: createTypographyToken(32, 40, '700', -1),
  displayM: createTypographyToken(28, 36, '600', -0.5),
  headingL: createTypographyToken(24, 32, '600', 0),
  headingM: createTypographyToken(20, 28, '600', 0),
  headingS: createTypographyToken(18, 26, '600', 0),
  bodyL: createTypographyToken(17, 26, '400', 0.5),
  body: createTypographyToken(15, 24, '400', 1),
  caption: createTypographyToken(13, 20, '500', 2),
  legal: createTypographyToken(12, 18, '400', 3),
} as const;

export type TypographyScale = keyof typeof typography;

export const colors = {
  brand: {
    primary: '#8A9A5B',
    primaryTint: '#93A268',
    primaryShade: '#7F8E54',
    secondary: '#D4C5B1',
    secondaryTint: '#D7CAB7',
    secondaryShade: '#C3B5A3',
    accent: '#A8C3BC',
    accentTint: '#AFC8C1',
    accentShade: '#9BB3AD',
  },
  surface: {
    background: '#F2F4ED',
    backgroundTint: '#F4F6F0',
    backgroundShade: '#E8EAE3',
    backgroundDark: '#232323',
    backgroundDarkTint: '#353535',
    backgroundDarkShade: '#202020',
    card: '#FFFFFF',
    cardDark: '#2C2C2C',
  },
  text: {
    primary: '#232323',
    secondary: 'rgba(35, 35, 35, 0.64)',
    tertiary: 'rgba(35, 35, 35, 0.40)',
    inverse: '#F4F4F4',
    inverseSecondary: 'rgba(244, 244, 244, 0.72)',
    inverseTertiary: 'rgba(244, 244, 244, 0.40)',
  },
  feedback: {
    success: '#6F7F43',
    successTint: '#7B8952',
    successShade: '#66753E',
    warning: '#D9A441',
    warningTint: '#DCAB50',
    warningShade: '#C8973C',
    critical: '#B86445',
    criticalTint: '#BE7054',
    criticalShade: '#A95C3F',
    info: '#A8C3BC',
  },
  overlay: {
    light: 'rgba(212, 197, 177, 0.24)',
    medium: 'rgba(0, 0, 0, 0.16)',
    dark: 'rgba(0, 0, 0, 0.32)',
  },
} as const;

export type BrandColor = keyof typeof colors.brand;
export type SurfaceColor = keyof typeof colors.surface;
export type TextColor = keyof typeof colors.text;
export type FeedbackColor = keyof typeof colors.feedback;

export const spacing = {
  micro: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
} as const;

export type SpacingToken = keyof typeof spacing;

export const radii = {
  subtle: 4,
  mild: 8,
  regular: 12,
  generous: 16,
  full: 24,
} as const;

export type RadiusToken = keyof typeof radii;

const androidShadowOpacityFix = Platform.select({
  android: 0,
  default: undefined,
});

export const elevation = {
  level0: {
    shadowColor: 'rgba(44, 44, 44, 0)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: androidShadowOpacityFix ?? 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    shadowColor: 'rgba(44, 44, 44, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: androidShadowOpacityFix ?? 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  level2: {
    shadowColor: 'rgba(44, 44, 44, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: androidShadowOpacityFix ?? 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  level3: {
    shadowColor: 'rgba(44, 44, 44, 0.12)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: androidShadowOpacityFix ?? 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  level4: {
    shadowColor: 'rgba(44, 44, 44, 0.18)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: androidShadowOpacityFix ?? 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export type ElevationLevel = keyof typeof elevation;

export const motion = {
  duration: {
    instant: 100,
    quick: 140,
    standard: 180,
    expressive: 220,
    linger: 260,
  },
  easing: {
    enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.7, 0, 0.3, 1)',
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
  },
} as const;

export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;

export const layout = {
  containerMargin: spacing.sm,
  containerMarginTablet: spacing.md,
  containerMarginDesktop: spacing.lg,
  contentMaxWidth: 688,
  touchTarget: 44,
  touchGap: 8,
  buttonHeight: 56,
  buttonHeightSmall: 48,
  inputHeight: 56,
  headerHeight: 88,
  tabBarHeight: 60,
} as const;

export type LayoutToken = keyof typeof layout;

export const breakpoints = {
  mobileSmall: 360,
  mobile: 375,
  mobileComfort: 393,
  mobileLarge: 412,
  mobileMax: 428,
  mobileLandscape: 812,
  tablet: 768,
  desktop: 1024,
} as const;

export type BreakpointToken = keyof typeof breakpoints;

export const darkModeAdjustments = {
  brandPrimary: '#819055',
  brandSecondary: '#C3B5A3',
  accent: '#9BB3AD',
  overlay: colors.overlay.dark,
  shadow: 'rgba(0, 0, 0, 0.32)',
} as const;

export const tokens = {
  colors,
  typography,
  spacing,
  radii,
  elevation,
  motion,
  layout,
  breakpoints,
  darkModeAdjustments,
};

export type Tokens = typeof tokens;
