import { colors as tokenColors } from '../theme/tokens';

// Backwards-compatible palette mapping to 2025 design tokens
export const colors = {
  // Brand colors
  primary: tokenColors.brand.primary,
  primaryLight: tokenColors.brand.primaryTint,
  primaryDark: tokenColors.brand.primaryShade,
  secondary: tokenColors.brand.secondary,
  secondaryLight: tokenColors.brand.secondaryTint,
  secondaryDark: tokenColors.brand.secondaryShade,
  accent: tokenColors.brand.accent,
  accentLight: tokenColors.brand.accentTint,
  accentDark: tokenColors.brand.accentShade,

  // Background colors
  background: tokenColors.surface.background,
  backgroundSecondary: tokenColors.surface.background, // Pearl gray #E6E6E6 (not white!)
  backgroundTertiary: tokenColors.surface.backgroundShade,
  backgroundDark: tokenColors.surface.backgroundDark,
  backgroundDarkCard: tokenColors.surface.cardDark,
  card: tokenColors.surface.card, // White #FFFFFF for cards only

  // Text colors
  text: tokenColors.text.primary,
  textSecondary: tokenColors.text.secondary,
  textTertiary: tokenColors.text.tertiary,
  textInverse: tokenColors.text.inverse,
  textInverseSecondary: tokenColors.text.inverseSecondary,
  textInverseTertiary: tokenColors.text.inverseTertiary,

  // Borders & overlays
  border: 'rgba(35, 35, 35, 0.12)',
  borderLight: 'rgba(35, 35, 35, 0.08)',
  borderMuted: 'rgba(35, 35, 35, 0.08)',
  borderDark: 'rgba(244, 244, 244, 0.16)',
  overlay: tokenColors.overlay.medium,
  overlayLight: tokenColors.overlay.light,

  // Status colors
  success: tokenColors.feedback.success,
  successLight: tokenColors.feedback.successTint,
  successDark: tokenColors.feedback.successShade,
  warning: tokenColors.feedback.warning,
  warningLight: tokenColors.feedback.warningTint,
  warningDark: tokenColors.feedback.warningShade,
  error: tokenColors.feedback.critical,
  errorLight: tokenColors.feedback.criticalTint,
  errorDark: tokenColors.feedback.criticalShade,
  info: tokenColors.feedback.info,
} as const;

export type ColorKey = keyof typeof colors;

// Wallpaper template color presets aligned with brand palette
// Free colors available to all users
export const freeColorPresets = [
  {
    id: 'sage',
    name: 'Sauge',
    value: tokenColors.brand.primary,
    isPremium: false,
  },
  {
    id: 'beige',
    name: 'Beige',
    value: tokenColors.brand.secondary,
    isPremium: false,
  },
  {
    id: 'water',
    name: 'Eau',
    value: tokenColors.brand.accent,
    isPremium: false,
  },
  {
    id: 'pearl',
    name: 'Perle',
    value: tokenColors.surface.background,
    isPremium: false,
  },
] as const;

// Premium colors available only to premium users
export const premiumColorPresets = [
  {
    id: 'graphite',
    name: 'Graphite',
    value: tokenColors.surface.backgroundDark,
    isPremium: true,
  },
  {
    id: 'success',
    name: 'Succès',
    value: tokenColors.feedback.success,
    isPremium: true,
  },
  {
    id: 'warning',
    name: 'Alerte',
    value: tokenColors.feedback.warning,
    isPremium: true,
  },
  {
    id: 'critical',
    name: 'Critique',
    value: tokenColors.feedback.critical,
    isPremium: true,
  },
  { id: 'midnight', name: 'Minuit', value: '#1a1a2e', isPremium: true },
  { id: 'rose-gold', name: 'Or Rose', value: '#b76e79', isPremium: true },
  { id: 'emerald', name: 'Émeraude', value: '#2d6a4f', isPremium: true },
  { id: 'lavender', name: 'Lavande', value: '#9d84b7', isPremium: true },
] as const;

// Combined list for backwards compatibility
export const templateColorPresets = [
  ...freeColorPresets,
  ...premiumColorPresets,
] as const;
