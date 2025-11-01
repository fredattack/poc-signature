import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { ScreenTracker } from '@/components/analytics/ScreenTracker';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { fileSystem } from '@/services/storage/file-system';
import { ThemeProvider, useThemeTokens } from '@/theme';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function RootLayoutContent() {
  const { mode } = useThemeTokens();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AnalyticsProvider>
          <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
          <ScreenTracker />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="onboarding"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="signature-canvas"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signature-detail"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="wallpaper-editor"
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="premium"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="theme-sandbox"
              options={{
                title: 'Design Tokens',
                presentation: 'card',
              }}
            />
          </Stack>
        </AnalyticsProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default function RootLayout() {
  // Initialize file system on app launch
  useEffect(() => {
    void fileSystem.init();
  }, []);

  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
