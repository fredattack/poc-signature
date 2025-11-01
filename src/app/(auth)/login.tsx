// Login screen with email/password and social login

import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/shared/Header';
import { useAuth } from '@/hooks/useAuth';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

export default function LoginScreen() {
  const router = useRouter();
  const {
    login,
    loginWithGoogle,
    loginWithApple,
    setAnonymous,
    isLoading,
    error,
  } = useAuth();
  const { track } = useAnalytics();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    const success = await login({ email, password });

    if (success) {
      track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
        auth_method: 'email',
      });
      router.replace('/(tabs)');
    } else if (error) {
      Alert.alert('Login Failed', error);
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();

    if (success) {
      track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
        auth_method: 'google',
      });
      router.replace('/(tabs)');
    } else if (error) {
      Alert.alert('Google Login', error);
    }
  };

  const handleAppleLogin = async () => {
    const success = await loginWithApple();

    if (success) {
      track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
        auth_method: 'apple',
      });
      router.replace('/(tabs)');
    } else if (error) {
      Alert.alert('Apple Login', error);
    }
  };

  const handleContinueWithoutAccount = () => {
    setAnonymous(true);
    track(ANALYTICS_EVENTS.LOGIN_COMPLETED, {
      auth_method: 'anonymous',
    });
    router.replace('/(tabs)');
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/(auth)/register');
  };

  return (
    <View style={styles.container}>
      <Header title="Welcome Back" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Sign in to sync your signatures across devices
        </Text>

        {/* Email Input */}
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Password Input */}
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        {/* Forgot Password */}
        <Button
          title="Forgot Password?"
          onPress={handleForgotPassword}
          variant="ghost"
          size="small"
        />

        {/* Login Button */}
        <Button
          title="Sign In"
          onPress={() => void handleLogin()}
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <Button
          title="Continue with Google"
          onPress={() => void handleGoogleLogin()}
          variant="secondary"
          fullWidth
          disabled={isLoading}
        />

        <Button
          title="Continue with Apple"
          onPress={() => void handleAppleLogin()}
          variant="secondary"
          fullWidth
          disabled={isLoading}
        />

        {/* Continue Without Account */}
        <Button
          title="Continue without account"
          onPress={handleContinueWithoutAccount}
          variant="ghost"
          fullWidth
        />

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            variant="ghost"
            size="small"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  divider: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    backgroundColor: colors.border,
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginHorizontal: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  signUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  signUpText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
});
