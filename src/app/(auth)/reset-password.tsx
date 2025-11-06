/**
 * Reset Password Screen
 *
 * Screen for resetting password with token from email.
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import {
  AuthButton,
  AuthInput,
  ErrorMessage,
  LoadingOverlay,
  PasswordStrengthIndicator,
} from '@/components/auth';
import { AUTH_COLORS, AUTH_SPACING, AUTH_TYPOGRAPHY } from '@/constants/auth-design';
import {
  validatePassword,
  validatePasswordConfirmation,
} from '@/utils/validation';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ token?: string }>();
  const { resetPassword, isLoading, error, clearError } = useAuthStore();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleResetPassword = async () => {
    // Validate
    const newErrors: Record<string, string> = {};

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    const confirmError = validatePasswordConfirmation(
      password,
      passwordConfirmation
    );
    if (confirmError) newErrors.passwordConfirmation = confirmError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!params.token) {
      setErrors({ general: 'Token invalide' });
      return;
    }

    try {
      await resetPassword(params.token, password);
      // Navigate to login
      router.replace('/(auth)/login');
    } catch (err) {
      console.error('Reset password error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Nouveau mot de passe</Text>
        <Text style={styles.subtitle}>
          Choisissez un mot de passe fort pour sécuriser votre compte
        </Text>

        <AuthInput
          label="Nouveau mot de passe"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          placeholder="Minimum 8 caractères"
          secureTextEntry
          error={errors.password}
        />

        <PasswordStrengthIndicator password={password} showFeedback />

        <AuthInput
          label="Confirmer le mot de passe"
          value={passwordConfirmation}
          onChangeText={(text) => {
            setPasswordConfirmation(text);
            setErrors({ ...errors, passwordConfirmation: '' });
          }}
          placeholder="Retapez votre mot de passe"
          secureTextEntry
          error={errors.passwordConfirmation}
        />

        <AuthButton
          title="Réinitialiser le mot de passe"
          onPress={() => void handleResetPassword()}
          variant="primary"
          loading={isLoading}
          disabled={isLoading || !password || !passwordConfirmation}
          style={styles.resetButton}
        />
      </View>

      <LoadingOverlay
        visible={isLoading}
        message="Réinitialisation..."
      />
      <ErrorMessage
        message={error || ''}
        visible={!!error}
        onDismiss={clearError}
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
    flex: 1,
    justifyContent: 'center',
    padding: AUTH_SPACING.lg,
  },
  resetButton: {
    marginTop: AUTH_SPACING.md,
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
    marginBottom: AUTH_SPACING.lg,
    textAlign: 'center',
  },
  title: {
    ...AUTH_TYPOGRAPHY.h1,
    color: AUTH_COLORS.text.primary,
    marginBottom: AUTH_SPACING.xs,
    textAlign: 'center',
  },
});
