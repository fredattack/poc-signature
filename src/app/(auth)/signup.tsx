/**
 * Signup Screen
 *
 * Complete registration screen with real-time validation,
 * password strength indicator, and OAuth options.
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
  PasswordStrengthIndicator,
} from '@/components/auth';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  AUTH_COLORS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
  validateTermsAcceptance,
} from '@/utils/validation';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { collectDeviceInfo } from '@/utils/device';

export default function SignupScreen() {
  const router = useRouter();
  const { register, isLoading, error, clearError, requiresMFA } =
    useAuthStore();
  const { track } = useAnalytics();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignup = async () => {
    // Validate all fields
    const newErrors: Record<string, string> = {};

    const firstNameError = validateName(firstName, 'Prénom');
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateName(lastName, 'Nom');
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    const confirmError = validatePasswordConfirmation(
      password,
      passwordConfirmation
    );
    if (confirmError) newErrors.passwordConfirmation = confirmError;

    const termsError = validateTermsAcceptance(acceptTerms);
    if (termsError) newErrors.terms = termsError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const deviceInfo = await collectDeviceInfo();

      await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
        accept_terms: acceptTerms,
        device_info: deviceInfo,
      });

      if (requiresMFA) {
        // Redirect to MFA verification
        track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
          auth_method: 'email_mfa_signup',
        });
        router.push('/(auth)/mfa/verify');
      } else {
        // Registration complete
        track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
          auth_method: 'email_signup',
        });
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  const handleOAuthSignup = (provider: 'google' | 'apple') => {
    // TODO: Implement actual OAuth flow
    track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
      auth_method: `${provider}_signup`,
    });

    // Placeholder implementation
    console.warn(`${provider} signup not yet fully implemented`);
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
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>
            Rejoignez SignatureApp et collectionnez des signatures uniques
          </Text>
        </View>

        {/* First Name */}
        <AuthInput
          label="Prénom"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            setErrors({ ...errors, firstName: '' });
          }}
          placeholder="John"
          autoComplete="given-name"
          error={errors.firstName}
        />

        {/* Last Name */}
        <AuthInput
          label="Nom"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            setErrors({ ...errors, lastName: '' });
          }}
          placeholder="Doe"
          autoComplete="family-name"
          error={errors.lastName}
        />

        {/* Email */}
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

        {/* Password */}
        <AuthInput
          label="Mot de passe"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          placeholder="Minimum 8 caractères"
          secureTextEntry
          autoComplete="password-new"
          error={errors.password}
        />

        {/* Password Strength Indicator */}
        <PasswordStrengthIndicator password={password} showFeedback />

        {/* Password Confirmation */}
        <AuthInput
          label="Confirmer le mot de passe"
          value={passwordConfirmation}
          onChangeText={(text) => {
            setPasswordConfirmation(text);
            setErrors({ ...errors, passwordConfirmation: '' });
          }}
          placeholder="Retapez votre mot de passe"
          secureTextEntry
          autoComplete="password-new"
          error={errors.passwordConfirmation}
        />

        {/* Terms & Conditions */}
        <View style={styles.termsContainer}>
          <Checkbox
            value={acceptTerms}
            onValueChange={(checked) => {
              setAcceptTerms(checked);
              setErrors({ ...errors, terms: '' });
            }}
            label={
              <View style={styles.termsTextContainer}>
                <Text style={styles.termsText}>
                  J&apos;accepte les{' '}
                  <Text style={styles.termsLink}>
                    Conditions d&apos;Utilisation
                  </Text>{' '}
                  et la{' '}
                  <Text style={styles.termsLink}>
                    Politique de Confidentialité
                  </Text>
                </Text>
              </View>
            }
          />
          {errors.terms && (
            <Text style={styles.termsError}>{errors.terms}</Text>
          )}
        </View>

        {/* Signup Button */}
        <AuthButton
          title="Créer mon compte"
          onPress={() => void handleSignup()}
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          style={styles.signupButton}
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
          onPress={() => void handleOAuthSignup('google')}
          loading={isLoading}
          disabled={isLoading}
        />

        <OAuthButton
          provider="apple"
          onPress={() => void handleOAuthSignup('apple')}
          loading={isLoading}
          disabled={isLoading}
        />

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Déjà un compte ? </Text>
          <AuthButton
            title="Se connecter"
            onPress={() => router.back()}
            variant="ghost"
            haptic={false}
          />
        </View>
      </ScrollView>

      <LoadingOverlay visible={isLoading} message="Création du compte..." />
      <ErrorMessage
        message={error ?? ''}
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
  header: {
    marginBottom: AUTH_SPACING.lg,
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: AUTH_SPACING.xl,
  },
  loginText: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  signupButton: {
    marginTop: AUTH_SPACING.sm,
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
    marginTop: AUTH_SPACING.xs,
    textAlign: 'center',
  },
  termsContainer: {
    marginBottom: AUTH_SPACING.md,
    marginTop: AUTH_SPACING.xs,
  },
  termsError: {
    color: AUTH_COLORS.system.error,
    fontSize: AUTH_TYPOGRAPHY.caption.fontSize,
    marginLeft: AUTH_SPACING.lg,
    marginTop: AUTH_SPACING.xs / 2,
  },
  termsLink: {
    color: AUTH_COLORS.primary.base,
    fontWeight: '600',
  },
  termsText: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: AUTH_COLORS.text.secondary,
  },
  termsTextContainer: {
    flex: 1,
    marginLeft: AUTH_SPACING.xs,
  },
  title: {
    ...AUTH_TYPOGRAPHY.h1,
    color: AUTH_COLORS.text.primary,
    textAlign: 'center',
  },
});
