import React, { createContext, useContext, useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { tokens, Tokens } from './tokens';

type ThemeMode = 'light' | 'dark';

type ThemeProviderMode = ThemeMode | 'system';

type ThemeColors = typeof tokens.colors;

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  tokens: Tokens;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const resolveMode = (
  requestedMode: ThemeProviderMode,
  systemMode: ColorSchemeName
): ThemeMode =>
  requestedMode === 'system'
    ? systemMode === 'dark'
      ? 'dark'
      : 'light'
    : requestedMode;

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
    const themedColors = resolvedMode === 'dark' ? createDarkColors() : tokens.colors;

    return {
      mode: resolvedMode,
      colors: themedColors,
      tokens,
    };
  }, [resolvedMode]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
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
  (props: P) =>
    (
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    );
