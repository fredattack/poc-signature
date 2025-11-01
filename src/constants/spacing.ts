import {
  layout as tokenLayout,
  radii as tokenRadii,
  spacing as tokenSpacing,
} from '../theme/tokens';

export const spacing = {
  xs: tokenSpacing.micro,
  sm: tokenSpacing.xs,
  md: tokenSpacing.sm,
  lg: tokenSpacing.md,
  xl: tokenSpacing.lg,
  xxl: tokenSpacing.xl,
  xxxl: tokenSpacing.xxl,
} as const;

export type SpacingKey = keyof typeof spacing;

export const borderRadius = {
  none: 0,
  sm: tokenRadii.subtle,
  md: tokenRadii.mild,
  lg: tokenRadii.regular,
  xl: tokenRadii.generous,
  full: tokenRadii.full,
} as const;

export type BorderRadiusKey = keyof typeof borderRadius;

export const layout = {
  containerPadding: tokenLayout.containerMargin,
  containerPaddingLarge: tokenLayout.containerMarginTablet,
  screenPadding: tokenLayout.containerMargin,
  componentGap: tokenSpacing.sm,
  sectionGap: tokenSpacing.lg,
  gridGap: tokenSpacing.xs,
  gridColumns: 2,
  buttonHeight: tokenLayout.buttonHeight,
  buttonHeightSmall: tokenLayout.buttonHeightSmall,
  buttonHeightLarge: tokenLayout.buttonHeight,
  inputHeight: tokenLayout.inputHeight,
  iconSizeSmall: 16,
  iconSize: 24,
  iconSizeLarge: 32,
  iconSizeXLarge: 48,
  avatarSizeSmall: 32,
  avatarSize: 48,
  avatarSizeLarge: 64,
  cardPadding: tokenSpacing.sm,
  modalPadding: tokenSpacing.md,
  modalBorderRadius: tokenRadii.generous,
  headerHeight: tokenLayout.headerHeight,
  tabBarHeight: tokenLayout.tabBarHeight,
} as const;

export type LayoutKey = keyof typeof layout;
