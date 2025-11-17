/**
 * SignatureApp Color System
 * Based on design tokens from docs/02-UX-UI/00-design-tokens.md
 *
 * Features:
 * - Complete color palette with semantic names
 * - Dark mode support
 * - WCAG AA/AAA compliant combinations
 * - Platform-agnostic (works with React Native)
 */

export const lightColors = {
  // Primary Palette (Sage Green - Authenticity)
  primary: {
    50: '#F4F6F0',
    100: '#E3E8D9',
    200: '#C7D1B3',
    300: '#ABB98D',
    400: '#8FA267',
    500: '#8A9A5B', // Base
    600: '#6B7A3F', // Hover, Active
    700: '#5A6635',
    800: '#49522B',
    900: '#383E20',
  },

  // Secondary Palette (Warm Beige - Warmth)
  secondary: {
    50: '#FAF7F3',
    100: '#F2EDE6',
    200: '#E8DDD0',
    300: '#DECCBA',
    400: '#D4C5B1', // Base
    500: '#B8A490',
    600: '#9C8870',
    700: '#7D6D5A',
    800: '#5E5243',
    900: '#3F372D',
  },

  // Accent Palette (Water Green - Harmony)
  accent: {
    50: '#F0F6F5',
    100: '#D9ECEA',
    200: '#C5DDD7',
    300: '#B1CEC4',
    400: '#A8C3BC', // Base
    500: '#8AA89F',
    600: '#6D8D82',
    700: '#5A7469',
    800: '#465B51',
    900: '#334238',
  },

  // Neutral Scale (Pearl Gray - Balance)
  pearl: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E6E6E6', // Base - Borders, dividers
    300: '#D4D4D4',
    400: '#A6A6A6', // Secondary text
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Background & Surface
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F8F6', // Subtle warm white
    tertiary: '#FAFAF8', // Cards
  },

  surface: {
    light: '#FAFAF8',
    elevated: '#FFFFFF',
  },

  // Text Colors
  text: {
    primary: '#2C2C2C', // 90% opacity, high contrast
    secondary: '#6B7A3F', // Primary 70%
    tertiary: '#A6A6A6', // Pearl Dark
    disabled: '#C4C4C4', // 60% opacity
    inverse: '#FFFFFF',
  },

  // Semantic Colors
  success: {
    light: '#E3E8D9',
    base: '#8A9A5B', // Primary
    dark: '#6B7A3F',
  },

  warning: {
    light: '#F2EDE6',
    base: '#D4C5B1', // Secondary
    dark: '#B8A490',
  },

  error: {
    light: '#F9E5E3',
    base: '#C77B6B', // Red-Brown
    dark: '#A85C52',
  },

  info: {
    light: '#D9ECEA',
    base: '#A8C3BC', // Accent
    dark: '#8AA89F',
  },
};

export const darkColors = {
  // Primary Palette (Lightened for dark mode)
  primary: {
    50: '#383E20',
    100: '#49522B',
    200: '#5A6635',
    300: '#6B7A3F',
    400: '#8A9A5B',
    500: '#A8B67D', // Base (lightened +15%)
    600: '#C7D1B3',
    700: '#E3E8D9',
    800: '#F4F6F0',
    900: '#FAFCF8',
  },

  // Secondary Palette (Lightened for dark mode)
  secondary: {
    50: '#3F372D',
    100: '#5E5243',
    200: '#7D6D5A',
    300: '#9C8870',
    400: '#B8A490',
    500: '#E8DDD0', // Base (lightened +10%)
    600: '#F2EDE6',
    700: '#FAF7F3',
    800: '#FDFCFA',
    900: '#FFFFFF',
  },

  // Accent Palette (Lightened for dark mode)
  accent: {
    50: '#334238',
    100: '#465B51',
    200: '#5A7469',
    300: '#6D8D82',
    400: '#8AA89F',
    500: '#B0D4CA', // Base (lightened +5%)
    600: '#C5DDD7',
    700: '#D9ECEA',
    800: '#F0F6F5',
    900: '#F8FAF9',
  },

  // Neutral Scale (Inverted)
  pearl: {
    50: '#171717',
    100: '#262626',
    200: '#404040',
    300: '#525252',
    400: '#737373',
    500: '#A6A6A6',
    600: '#D4D4D4',
    700: '#E6E6E6',
    800: '#F5F5F5',
    900: '#FAFAFA',
  },

  // Background & Surface (Dark Mode)
  background: {
    primary: '#1F1F1D', // Warm black
    secondary: '#252520', // Deep navigation
    tertiary: '#2C2C29', // Cards
  },

  surface: {
    light: '#383834', // In dark mode, "light" surface is the elevated one
    dark: '#2C2C29',
    elevated: '#383834',
  },

  // Text Colors (Dark Mode)
  text: {
    primary: '#F5F5F5', // High contrast
    secondary: '#B8B8B8', // Reduced opacity
    tertiary: '#8A8A8A', // Further reduced
    disabled: '#525252',
    inverse: '#1F1F1D',
  },

  // Semantic Colors (Dark Mode - adjusted)
  success: {
    light: '#5A6635',
    base: '#A8B67D',
    dark: '#C7D1B3',
  },

  warning: {
    light: '#7D6D5A',
    base: '#E8DDD0',
    dark: '#F2EDE6',
  },

  error: {
    light: '#A85C52',
    base: '#E0A39A', // Lightened +20%
    dark: '#F9E5E3',
  },

  info: {
    light: '#5A7469',
    base: '#B0D4CA',
    dark: '#D9ECEA',
  },
};

// Export type for TypeScript support
export type Colors = typeof lightColors;

// Default export for easy import
export const colors = lightColors;

// Helper function to get colors based on color scheme
export const getColors = (isDark: boolean): Colors => {
  return isDark ? (darkColors as Colors) : lightColors;
};
