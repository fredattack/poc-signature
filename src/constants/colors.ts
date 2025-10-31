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
  backgroundSecondary: tokenColors.surface.card,
  backgroundTertiary: tokenColors.surface.backgroundShade,
  backgroundDark: tokenColors.surface.backgroundDark,
  backgroundDarkCard: tokenColors.surface.cardDark,

  // Text colors
  text: tokenColors.text.primary,
  textSecondary: tokenColors.text.secondary,
  textTertiary: tokenColors.text.tertiary,
  textInverse: tokenColors.text.inverse,
  textInverseSecondary: tokenColors.text.inverseSecondary,
  textInverseTertiary: tokenColors.text.inverseTertiary,

  // Borders & overlays
  border: 'rgba(35, 35, 35, 0.12)',
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
export const templateColorPresets = [
  { id: 'sage', name: 'Sauge', value: tokenColors.brand.primary },
  { id: 'beige', name: 'Beige', value: tokenColors.brand.secondary },
  { id: 'water', name: 'Eau', value: tokenColors.brand.accent },
  { id: 'graphite', name: 'Graphite', value: tokenColors.surface.backgroundDark },
  { id: 'pearl', name: 'Perle', value: tokenColors.surface.background },
  { id: 'success', name: 'Succès', value: tokenColors.feedback.success },
  { id: 'warning', name: 'Alerte', value: tokenColors.feedback.warning },
  { id: 'critical', name: 'Critique', value: tokenColors.feedback.critical },
] as const;
