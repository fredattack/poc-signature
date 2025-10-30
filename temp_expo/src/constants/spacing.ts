// Spacing scale and layout constants

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export type SpacingKey = keyof typeof spacing;

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export type BorderRadiusKey = keyof typeof borderRadius;

// Layout constants
export const layout = {
  // Container padding
  containerPadding: spacing.md,
  containerPaddingLarge: spacing.lg,

  // Screen edges
  screenPadding: spacing.md,

  // Component spacing
  componentGap: spacing.md,
  sectionGap: spacing.xl,

  // Grid
  gridGap: spacing.sm,
  gridColumns: 2,

  // Button heights
  buttonHeight: 48,
  buttonHeightSmall: 40,
  buttonHeightLarge: 56,

  // Input heights
  inputHeight: 48,

  // Icon sizes
  iconSizeSmall: 16,
  iconSize: 24,
  iconSizeLarge: 32,
  iconSizeXLarge: 48,

  // Avatar sizes
  avatarSizeSmall: 32,
  avatarSize: 48,
  avatarSizeLarge: 64,

  // Card
  cardPadding: spacing.md,

  // Modal
  modalPadding: spacing.lg,
  modalBorderRadius: borderRadius.xl,

  // Header
  headerHeight: 56,

  // Bottom tab bar
  tabBarHeight: 60,
} as const;

export type LayoutKey = keyof typeof layout;
