/**
 * Authentication Design System Constants
 *
 * Complete design system for authentication screens following the SignatureApp
 * visual identity (Sage Green palette with warm, natural tones).
 *
 * These constants ensure pixel-perfect consistency across all auth screens.
 */

// ============================================================================
// COLORS - Sage Green Brand Palette
// ============================================================================

export const AUTH_COLORS = {
  // Primary - Sage Green (Authenticité)
  primary: {
    base: '#8A9A5B',
    dark: '#6B7A3F',
    light: '#A8B67D',
    veryLight: '#C8D4A8',
  },

  // Secondary - Warm Beige (Chaleur)
  secondary: {
    base: '#D4C5B1',
    dark: '#B8A490',
    light: '#E8DDD0',
    veryLight: '#F4EFE8',
  },

  // Accent - Water Green (Harmonie)
  accent: {
    base: '#A8C3BC',
    dark: '#8AA89F',
    light: '#C5DDD7',
    veryLight: '#E0EEEB',
  },

  // Neutral - Pearl Gray
  pearl: {
    base: '#E6E6E6',
    dark: '#A6A6A6',
    light: '#F5F5F5',
  },

  // Backgrounds & Surfaces
  background: {
    light: '#FFFFFF',
    dark: '#2C2C2C',
    surface: '#F8F8F6',
    surfaceDark: '#3A3A36',
  },

  // Text Hierarchy
  text: {
    primary: '#2C2C2C', // 90% opacity
    secondary: '#6B7A3F', // Primary dark 70%
    tertiary: '#A6A6A6', // Pearl dark
    disabled: '#C4C4C4', // 60% opacity
    inverse: '#FFFFFF',
  },

  // System States
  system: {
    success: '#8A9A5B', // Primary
    warning: '#D4C5B1', // Secondary
    error: '#C77B6B', // Red-Brown
    info: '#A8C3BC', // Accent
  },

  // Borders
  border: {
    light: '#E6E6E6',
    dark: '#8A9A5B',
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const AUTH_TYPOGRAPHY = {
  // Font Families
  fonts: {
    primary: 'SF Pro Display', // iOS
    android: 'Roboto',
    fallback: 'Inter',
  },

  // Sizes & Styles
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 24,
  },

  bodyLarge: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },

  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
} as const;

// ============================================================================
// SPACING (8pt Grid System)
// ============================================================================

export const AUTH_SPACING = {
  micro: 4, // Rare, éléments très serrés
  xs: 8, // Tight spacing
  sm: 16, // Default spacing
  md: 24, // Section separation
  lg: 32, // Major blocks
  xl: 48, // Hero sections

  // Component specific
  screenMargin: 16,
  inputPadding: 16,
  cardPadding: 12,
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const AUTH_RADIUS = {
  subtle: 4, // Petits inputs, badges
  mild: 8, // Inputs standards
  regular: 12, // Cards, modales
  generous: 16, // Hero cards, CTA buttons
  full: 24, // Sections spéciales
} as const;

// ============================================================================
// SHADOWS (Elevation System)
// ============================================================================

export const AUTH_SHADOWS = {
  level0: {
    // Flat - no shadow
  },
  level1: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  level2: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  level3: {
    shadowColor: '#8A9A5B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  level4: {
    shadowColor: '#8A9A5B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

// ============================================================================
// DARK MODE COLORS
// ============================================================================

export const AUTH_DARK_COLORS = {
  background: AUTH_COLORS.background.dark,
  surface: AUTH_COLORS.background.surfaceDark,
  text: {
    primary: '#FFFFFF',
    secondary: AUTH_COLORS.accent.light,
    tertiary: AUTH_COLORS.pearl.base,
  },
  border: AUTH_COLORS.primary.dark,
} as const;

// ============================================================================
// ANIMATION TIMINGS
// ============================================================================

export const AUTH_ANIMATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
  verySlow: 500,

  // Spring configs
  spring: {
    damping: 18,
    stiffness: 200,
  },

  // Button press
  buttonPress: {
    scaleDown: 0.95,
    scaleUp: 1,
    duration: 100,
  },

  // Input focus
  inputFocus: {
    borderWidth: 2,
    duration: 200,
  },

  // Error shake
  errorShake: {
    distance: 10,
    duration: 300,
    iterations: 3,
  },
} as const;

// ============================================================================
// COMPONENT DIMENSIONS
// ============================================================================

export const AUTH_DIMENSIONS = {
  // Input
  inputHeight: 56,
  inputBorderWidth: 1,
  inputFocusBorderWidth: 2,

  // Button
  buttonHeight: {
    large: 56,
    medium: 48,
    small: 44,
  },

  // OAuth Button
  oauthButtonHeight: 48,
  oauthIconSize: 20,

  // Touch targets (min 44pt for accessibility)
  minTouchTarget: 44,

  // MFA Code Input
  mfaCodeDigitSize: 56,
  mfaCodeDigitSpacing: 12,
} as const;

// ============================================================================
// ERROR MESSAGES (French + English)
// ============================================================================

export const AUTH_ERROR_MESSAGES = {
  fr: {
    network: 'Erreur de connexion. Vérifiez votre internet.',
    unauthorized: 'Email ou mot de passe incorrect',
    email_taken: 'Cet email est déjà utilisé',
    invalid_token: 'Token invalide ou expiré',
    mfa_required: 'Code MFA requis',
    mfa_invalid: 'Code MFA invalide',
    server_error: 'Erreur serveur. Réessayez plus tard.',
    validation_failed: 'Vérifiez les champs du formulaire',
    password_mismatch: 'Les mots de passe ne correspondent pas',
    weak_password: 'Le mot de passe est trop faible',
    invalid_email: 'Email invalide',
  },
  en: {
    network: 'Connection error. Check your internet.',
    unauthorized: 'Invalid email or password',
    email_taken: 'This email is already in use',
    invalid_token: 'Invalid or expired token',
    mfa_required: 'MFA code required',
    mfa_invalid: 'Invalid MFA code',
    server_error: 'Server error. Try again later.',
    validation_failed: 'Check form fields',
    password_mismatch: 'Passwords do not match',
    weak_password: 'Password is too weak',
    invalid_email: 'Invalid email',
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type AuthColor = typeof AUTH_COLORS;
export type AuthTypography = typeof AUTH_TYPOGRAPHY;
export type AuthSpacing = typeof AUTH_SPACING;
export type AuthRadius = typeof AUTH_RADIUS;
export type AuthShadow = typeof AUTH_SHADOWS;
export type AuthAnimation = typeof AUTH_ANIMATIONS;
export type AuthDimension = typeof AUTH_DIMENSIONS;
