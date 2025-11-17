/**
 * MFA Verification Screen
 *
 * Screen for verifying MFA code during login.
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import {
  AuthButton,
  ErrorMessage,
  LoadingOverlay,
  MFACodeInput,
} from '@/components/auth';
import {
  AUTH_COLORS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';

export default function MFAVerifyScreen() {
  const router = useRouter();
  const { verifyMFA, isLoading, error, clearError } = useAuthStore();

  const [code, setCode] = useState('');

  const handleVerify = async () => {
    if (code.length !== 6) return;

    try {
      await verifyMFA(code);
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (err) {
      console.error('MFA verify error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Vérification MFA</Text>
        <Text style={styles.subtitle}>
          Entrez le code de vérification depuis votre app
          d&apos;authentification
        </Text>

        <MFACodeInput value={code} onChangeText={setCode} autoFocus />

        <AuthButton
          title="Vérifier"
          onPress={() => void handleVerify()}
          variant="primary"
          loading={isLoading}
          disabled={isLoading || code.length !== 6}
          style={styles.verifyButton}
        />

        <AuthButton
          title="Utiliser un code de secours"
          onPress={() => {
            // TODO: Implement backup code flow
          }}
          variant="ghost"
        />
      </View>

      <LoadingOverlay visible={isLoading} message="Vérification..." />
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
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
    marginBottom: AUTH_SPACING.xl,
    textAlign: 'center',
  },
  title: {
    ...AUTH_TYPOGRAPHY.h1,
    color: AUTH_COLORS.text.primary,
    marginBottom: AUTH_SPACING.xs,
    textAlign: 'center',
  },
  verifyButton: {
    marginBottom: AUTH_SPACING.md,
  },
});
