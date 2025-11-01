import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokens, Tokens } from './tokens';

type ThemeMode = 'light' | 'dark';

type ThemeProviderMode = ThemeMode | 'system';

const THEME_STORAGE_KEY = '@signatureapp/theme_mode';

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
  userMode: ThemeProviderMode;
  colors: ThemeColors;
  tokens: Tokens;
  setThemeMode: (mode: ThemeProviderMode) => Promise<void>;
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
  mode: initialMode = 'system',
}) => {
  const systemMode = useColorScheme();
  const [userMode, setUserModeState] = useState<ThemeProviderMode>(initialMode);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (
          savedMode === 'light' ||
          savedMode === 'dark' ||
          savedMode === 'system'
        ) {
          setUserModeState(savedMode);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    void loadThemePreference();
  }, []);

  const setThemeMode = async (mode: ThemeProviderMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setUserModeState(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const resolvedMode = resolveMode(userMode, systemMode);

  const contextValue = useMemo<ThemeContextValue>(() => {
    const themedColors =
      resolvedMode === 'dark' ? createDarkColors() : tokens.colors;

    return {
      mode: resolvedMode,
      userMode,
      colors: themedColors,
      tokens,
      setThemeMode,
    };
  }, [resolvedMode, userMode]);

  // Don't render until theme preference is loaded
  if (!isLoaded) {
    return null;
  }

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
