/**
 * Forgot Password Screen
 *
 * Screen for requesting a password reset email.
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import {
  AuthButton,
  AuthInput,
  ErrorMessage,
  LoadingOverlay,
} from '@/components/auth';
import {
  AUTH_COLORS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';
import { validateEmail } from '@/utils/validation';
import * as Haptics from 'expo-haptics';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleResetPassword = async () => {
    // Validate email
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    try {
      await forgotPassword(email);

      // Show success message
      setSuccessMessage(
        'Un email avec les instructions de réinitialisation a été envoyé à votre adresse.'
      );

      // Success haptic
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Navigate back after 3 seconds
      setTimeout(() => {
        router.back();
      }, 3000);
    } catch (err) {
      console.error('Forgot password error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mot de passe oublié ?</Text>
          <Text style={styles.subtitle}>
            Entrez votre adresse email et nous vous enverrons les instructions
            pour réinitialiser votre mot de passe.
          </Text>
        </View>

        {/* Success Message */}
        {successMessage && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        )}

        {/* Email Input */}
        {!successMessage && (
          <>
            <AuthInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(null);
              }}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoComplete="email"
              autoFocus
              error={emailError || undefined}
            />

            {/* Send Button */}
            <AuthButton
              title="Envoyer les instructions"
              onPress={() => void handleResetPassword()}
              variant="primary"
              loading={isLoading}
              disabled={isLoading || !email}
              style={styles.sendButton}
            />

            {/* Back to Login */}
            <AuthButton
              title="Retour à la connexion"
              onPress={() => router.back()}
              variant="ghost"
              disabled={isLoading}
            />
          </>
        )}
      </View>

      <LoadingOverlay visible={isLoading} message="Envoi..." />
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
  header: {
    marginBottom: AUTH_SPACING.xl,
  },
  sendButton: {
    marginBottom: AUTH_SPACING.md,
    marginTop: AUTH_SPACING.sm,
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
    marginTop: AUTH_SPACING.xs,
    textAlign: 'center',
  },
  successBanner: {
    backgroundColor: AUTH_COLORS.system.success,
    borderRadius: 12,
    marginBottom: AUTH_SPACING.lg,
    padding: AUTH_SPACING.md,
  },
  successText: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.inverse,
    textAlign: 'center',
  },
  title: {
    ...AUTH_TYPOGRAPHY.h1,
    color: AUTH_COLORS.text.primary,
    textAlign: 'center',
  },
});
