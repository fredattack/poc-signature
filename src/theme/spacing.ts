/**
 * SignatureApp Spacing System
 * Based on 8pt grid system
 *
 * All spacing values are multiples of 4 or 8 for consistency
 */

export const spacing = {
  // Base spacing scale (8pt grid)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
  '6xl': 96,

  // Semantic spacing (for specific use cases)
  componentGap: 16,
  sectionGap: 32,
  cardPadding: 20,
  screenPaddingHorizontal: 16,
  screenPaddingVertical: 20,
  buttonPaddingHorizontal: 24,
  buttonPaddingVertical: 14,
  inputPaddingHorizontal: 16,
  inputPaddingVertical: 12,

  // Touch targets
  touchTargetMin: 44, // iOS minimum
  touchTargetComfortable: 48, // Android recommended
  touchTargetSpacing: 8, // Between targets
} as const;

export type Spacing = typeof spacing;
