/**
 * OAuth Callback Handler
 *
 * Handles OAuth provider callbacks and completes authentication.
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { LoadingOverlay, ErrorMessage } from '@/components/auth';
import { AUTH_COLORS, AUTH_SPACING, AUTH_TYPOGRAPHY } from '@/constants/auth-design';
import { OAuthProvider } from '@/types/auth.types';

export default function OAuthCallbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    provider?: string;
    code?: string;
    token?: string;
    error?: string;
  }>();
  const { loginWithOAuth } = useAuthStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      // Check for errors
      if (params.error) {
        setErrorMessage(
          `Erreur d'authentification: ${params.error}`
        );
        setTimeout(() => router.replace('/(auth)/login'), 3000);
        return;
      }

      // Validate provider
      if (!params.provider) {
        setErrorMessage('Provider manquant');
        setTimeout(() => router.replace('/(auth)/login'), 3000);
        return;
      }

      const provider = params.provider as OAuthProvider;

      // Get token (code or token depending on provider)
      const token = params.token || params.code;

      if (!token) {
        setErrorMessage('Token manquant');
        setTimeout(() => router.replace('/(auth)/login'), 3000);
        return;
      }

      // Complete OAuth login
      await loginWithOAuth(provider, token);

      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('OAuth callback error:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Erreur d\'authentification'
      );
      setTimeout(() => router.replace('/(auth)/login'), 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        {errorMessage ? (
          <>
            <Text style={styles.errorTitle}>Erreur</Text>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Text style={styles.redirectText}>
              Redirection vers la page de connexion...
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Authentification...</Text>
            <Text style={styles.subtitle}>
              Finalisation de la connexion avec {params.provider}
            </Text>
          </>
        )}
      </View>

      <LoadingOverlay
        visible={!errorMessage}
        message="Authentification en cours..."
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AUTH_COLORS.background.light,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: AUTH_SPACING.lg,
  },
  errorText: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.system.error,
    marginBottom: AUTH_SPACING.md,
    textAlign: 'center',
  },
  errorTitle: {
    ...AUTH_TYPOGRAPHY.h2,
    color: AUTH_COLORS.system.error,
    marginBottom: AUTH_SPACING.xs,
    textAlign: 'center',
  },
  redirectText: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: AUTH_COLORS.text.tertiary,
    textAlign: 'center',
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
    textAlign: 'center',
  },
  title: {
    ...AUTH_TYPOGRAPHY.h1,
    color: AUTH_COLORS.text.primary,
    marginBottom: AUTH_SPACING.xs,
    textAlign: 'center',
  },
});
