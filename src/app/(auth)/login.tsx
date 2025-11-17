/**
 * Login Screen
 *
 * Modern login screen with email/password and OAuth providers.
 * Includes validation, MFA support, and anonymous mode.
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import {
  AuthButton,
  AuthInput,
  ErrorMessage,
  LoadingOverlay,
  OAuthButton,
} from '@/components/auth';
import {
  AUTH_COLORS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';
import { validateEmail } from '@/utils/validation';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError, requiresMFA } = useAuthStore();
  const { track } = useAnalytics();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async () => {
    // Validate
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    if (!password) newErrors.password = 'Mot de passe requis';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(email, password);

      if (requiresMFA) {
        // Redirect to MFA verification
        track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
          auth_method: 'email_mfa',
        });
        router.push('/(auth)/mfa/verify');
      } else {
        // Login complete
        track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
          auth_method: 'email',
        });
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleOAuthLogin = (provider: 'google' | 'apple') => {
    // TODO: Implement actual OAuth flow with expo-auth-session
    // For now, this is a placeholder
    track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
      auth_method: provider,
    });

    // Placeholder implementation
    console.warn(`${provider} login not yet fully implemented`);
    // await loginWithOAuth(provider, 'token');
  };

  const handleContinueAnonymous = () => {
    track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
      auth_method: 'anonymous',
    });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenue</Text>
          <Text style={styles.subtitle}>
            Connectez-vous pour synchroniser vos signatures
          </Text>
        </View>

        {/* Email Input */}
        <AuthInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: '' });
          }}
          placeholder="votre@email.com"
          keyboardType="email-address"
          autoComplete="email"
          error={errors.email}
        />

        {/* Password Input */}
        <AuthInput
          label="Mot de passe"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          placeholder="Entrez votre mot de passe"
          secureTextEntry
          autoComplete="password"
          error={errors.password}
        />

        {/* Forgot Password */}
        <AuthButton
          title="Mot de passe oublié ?"
          onPress={() => router.push('/(auth)/forgot-password')}
          variant="ghost"
          haptic={false}
          style={styles.forgotButton}
        />

        {/* Login Button */}
        <AuthButton
          title="Se connecter"
          onPress={() => void handleLogin()}
          variant="primary"
          loading={isLoading}
          disabled={isLoading || !email || !password}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* OAuth Buttons */}
        <OAuthButton
          provider="google"
          onPress={() => void handleOAuthLogin('google')}
          loading={isLoading}
          disabled={isLoading}
        />

        <OAuthButton
          provider="apple"
          onPress={() => void handleOAuthLogin('apple')}
          loading={isLoading}
          disabled={isLoading}
        />

        {/* Continue Anonymous */}
        <AuthButton
          title="Continuer sans compte"
          onPress={handleContinueAnonymous}
          variant="ghost"
          disabled={isLoading}
          style={styles.anonymousButton}
        />

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Pas de compte ? </Text>
          <AuthButton
            title="S'inscrire"
            onPress={() => router.push('/(auth)/signup')}
            variant="ghost"
            haptic={false}
          />
        </View>
      </ScrollView>

      <LoadingOverlay visible={isLoading} message="Connexion..." />
      <ErrorMessage
        message={error ?? ''}
        visible={!!error}
        onDismiss={clearError}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  anonymousButton: {
    marginTop: AUTH_SPACING.md,
  },
  container: {
    backgroundColor: AUTH_COLORS.background.light,
    flex: 1,
  },
  content: {
    padding: AUTH_SPACING.lg,
  },
  divider: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: AUTH_SPACING.lg,
  },
  dividerLine: {
    backgroundColor: AUTH_COLORS.border.light,
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...AUTH_TYPOGRAPHY.caption,
    color: AUTH_COLORS.text.tertiary,
    marginHorizontal: AUTH_SPACING.md,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: AUTH_SPACING.sm,
  },
  header: {
    marginBottom: AUTH_SPACING.xl,
  },
  scrollView: {
    flex: 1,
  },
  signUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: AUTH_SPACING.xl,
  },
  signUpText: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
    marginTop: AUTH_SPACING.xs,
    textAlign: 'center',
  },
  title: {
    ...AUTH_TYPOGRAPHY.h1,
    color: AUTH_COLORS.text.primary,
    textAlign: 'center',
  },
});
