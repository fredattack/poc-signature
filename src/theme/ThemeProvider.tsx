import React, { createContext, useContext, useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { tokens, Tokens } from './tokens';

type ThemeMode = 'light' | 'dark';

type ThemeProviderMode = ThemeMode | 'system';

// Make ThemeColors flexible to support both light and dark theme values
type ThemeColors = {
  brand: {
    primary: string;
    primaryTint: string;
    primaryShade: string;
    secondary: string;
    secondaryTint: string;
    secondaryShade: string;
    accent: string;
    accentTint: string;
    accentShade: string;
  };
  surface: {
    background: string;
    backgroundTint: string;
    backgroundShade: string;
    backgroundDark: string;
    backgroundDarkTint: string;
    backgroundDarkShade: string;
    card: string;
    cardDark: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    inverseSecondary: string;
    inverseTertiary: string;
  };
  feedback: {
    success: string;
    successTint: string;
    successShade: string;
    warning: string;
    warningTint: string;
    warningShade: string;
    critical: string;
    criticalTint: string;
    criticalShade: string;
    info: string;
  };
  overlay: {
    light: string;
    medium: string;
    dark: string;
  };
};

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  tokens: Tokens;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const resolveMode = (
  requestedMode: ThemeProviderMode,
  systemMode: ColorSchemeName
): ThemeMode => {
  if (requestedMode === 'system') {
    return systemMode === 'dark' ? 'dark' : 'light';
  }
  return requestedMode;
};

const createDarkColors = (): ThemeColors => ({
  ...tokens.colors,
  brand: {
    ...tokens.colors.brand,
    primary: tokens.darkModeAdjustments.brandPrimary,
    secondary: tokens.darkModeAdjustments.brandSecondary,
    accent: tokens.darkModeAdjustments.accent,
  },
  surface: {
    ...tokens.colors.surface,
    background: tokens.colors.surface.backgroundDark,
    backgroundTint: tokens.colors.surface.backgroundDarkTint,
    backgroundShade: tokens.colors.surface.backgroundDarkShade,
    card: tokens.colors.surface.cardDark,
  },
  text: {
    primary: tokens.colors.text.inverse,
    secondary: tokens.colors.text.inverseSecondary,
    tertiary: tokens.colors.text.inverseTertiary,
    inverse: tokens.colors.text.primary,
    inverseSecondary: tokens.colors.text.secondary,
    inverseTertiary: tokens.colors.text.tertiary,
  },
  overlay: {
    ...tokens.colors.overlay,
    medium: tokens.darkModeAdjustments.overlay,
    dark: tokens.darkModeAdjustments.overlay,
  },
});

export type ThemeProviderProps = {
  children: React.ReactNode;
  mode?: ThemeProviderMode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  mode = 'system',
}) => {
  const systemMode = useColorScheme();

  const resolvedMode = resolveMode(mode, systemMode);

  const contextValue = useMemo<ThemeContextValue>(() => {
    const themedColors =
      resolvedMode === 'dark' ? createDarkColors() : tokens.colors;

    return {
      mode: resolvedMode,
      colors: themedColors,
      tokens,
    };
  }, [resolvedMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeTokens = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeTokens must be used within a ThemeProvider');
  }

  return context;
};

export const useThemeMode = (): ThemeMode => useThemeTokens().mode;

export const withThemeProvider =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => (
    <ThemeProvider>
      <Component {...props} />
    </ThemeProvider>
  );
