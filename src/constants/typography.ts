import { typography as tokenTypography } from '../theme/tokens';

export const typography = {
  h1: {
    fontSize: tokenTypography.displayL.fontSize,
    lineHeight: tokenTypography.displayL.lineHeight,
    fontWeight: tokenTypography.displayL.fontWeight,
    letterSpacing: tokenTypography.displayL.letterSpacing,
  },
  h2: {
    fontSize: tokenTypography.headingL.fontSize,
    lineHeight: tokenTypography.headingL.lineHeight,
    fontWeight: tokenTypography.headingL.fontWeight,
    letterSpacing: tokenTypography.headingL.letterSpacing,
  },
  h3: {
    fontSize: tokenTypography.headingM.fontSize,
    lineHeight: tokenTypography.headingM.lineHeight,
    fontWeight: tokenTypography.headingM.fontWeight,
    letterSpacing: tokenTypography.headingM.letterSpacing,
  },
  h4: {
    fontSize: tokenTypography.headingS.fontSize,
    lineHeight: tokenTypography.headingS.lineHeight,
    fontWeight: tokenTypography.headingS.fontWeight,
    letterSpacing: tokenTypography.headingS.letterSpacing,
  },
  body: {
    fontSize: tokenTypography.body.fontSize,
    lineHeight: tokenTypography.body.lineHeight,
    fontWeight: tokenTypography.body.fontWeight,
    letterSpacing: tokenTypography.body.letterSpacing,
  },
  bodyLarge: {
    fontSize: tokenTypography.bodyL.fontSize,
    lineHeight: tokenTypography.bodyL.lineHeight,
    fontWeight: tokenTypography.bodyL.fontWeight,
    letterSpacing: tokenTypography.bodyL.letterSpacing,
  },
  bodySmall: {
    fontSize: tokenTypography.caption.fontSize,
    lineHeight: tokenTypography.caption.lineHeight,
    fontWeight: tokenTypography.caption.fontWeight,
    letterSpacing: tokenTypography.caption.letterSpacing,
  },
  caption: {
    fontSize: tokenTypography.caption.fontSize,
    lineHeight: tokenTypography.caption.lineHeight,
    fontWeight: tokenTypography.caption.fontWeight,
    letterSpacing: tokenTypography.caption.letterSpacing,
  },
  legal: {
    fontSize: tokenTypography.legal.fontSize,
    lineHeight: tokenTypography.legal.lineHeight,
    fontWeight: tokenTypography.legal.fontWeight,
    letterSpacing: tokenTypography.legal.letterSpacing,
  },
  button: {
    fontSize: tokenTypography.body.fontSize,
    lineHeight: tokenTypography.body.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokenTypography.body.letterSpacing,
  },
  buttonLarge: {
    fontSize: tokenTypography.bodyL.fontSize,
    lineHeight: tokenTypography.bodyL.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokenTypography.bodyL.letterSpacing,
  },
  label: {
    fontSize: tokenTypography.caption.fontSize,
    lineHeight: tokenTypography.caption.lineHeight,
    fontWeight: '500' as const,
    letterSpacing: tokenTypography.caption.letterSpacing,
  },
} as const;

export type TypographyKey = keyof typeof typography;
