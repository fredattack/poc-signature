/**
 * MFA Setup Screen
 *
 * Screen for setting up Multi-Factor Authentication with QR code,
 * secret key, and backup codes.
 */

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import {
  AuthButton,
  AuthInput,
  ErrorMessage,
  LoadingOverlay,
} from '@/components/auth';
import { AUTH_COLORS, AUTH_SPACING, AUTH_TYPOGRAPHY } from '@/constants/auth-design';
import { MFASetupData } from '@/types/auth.types';
import { validateMFACode } from '@/utils/validation';

export default function MFASetupScreen() {
  const router = useRouter();
  const { setupMFA, enableMFA, isLoading, error, clearError } = useAuthStore();

  const [mfaData, setMfaData] = useState<MFASetupData | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    loadMFASetup();
  }, []);

  const loadMFASetup = async () => {
    try {
      const data = await setupMFA();
      setMfaData(data);
    } catch (err) {
      console.error('MFA setup error:', err);
    }
  };

  const handleCopySecret = async () => {
    if (mfaData?.secret) {
      await Clipboard.setStringAsync(mfaData.secret);
      void Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    }
  };

  const handleCopyBackupCode = async (code: string) => {
    await Clipboard.setStringAsync(code);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleEnable = async () => {
    // Validate code
    const error = validateMFACode(verificationCode);
    if (error) {
      setCodeError(error);
      return;
    }

    try {
      await enableMFA(verificationCode);
      router.back();
    } catch (err) {
      console.error('Enable MFA error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Configurer MFA</Text>
        <Text style={styles.subtitle}>
          Sécurisez votre compte avec l&apos;authentification à deux facteurs
        </Text>

        {mfaData && (
          <>
            {/* QR Code */}
            <View style={styles.qrContainer}>
              <Text style={styles.sectionTitle}>
                1. Scannez ce QR code
              </Text>
              <Text style={styles.instruction}>
                Utilisez une app d&apos;authentification (Google Authenticator,
                Authy, etc.)
              </Text>

              <View style={styles.qrCode}>
                <Image
                  source={{ uri: mfaData.qr_code_url }}
                  style={styles.qrImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Secret Key */}
            <View style={styles.secretContainer}>
              <Text style={styles.sectionTitle}>
                2. Ou entrez cette clé manuellement
              </Text>
              <Pressable
                style={styles.secretBox}
                onPress={handleCopySecret}
                accessibilityLabel="Copy secret key"
                accessibilityHint="Double tap to copy"
              >
                <Text style={styles.secretText}>{mfaData.secret}</Text>
                <Text style={styles.copyHint}>Appuyez pour copier</Text>
              </Pressable>
            </View>

            {/* Verification Code */}
            <View style={styles.verificationContainer}>
              <Text style={styles.sectionTitle}>
                3. Entrez le code de vérification
              </Text>
              <AuthInput
                label="Code de vérification"
                value={verificationCode}
                onChangeText={(text) => {
                  setVerificationCode(text);
                  setCodeError(null);
                }}
                placeholder="000000"
                keyboardType="number-pad"
                maxLength={6}
                error={codeError || undefined}
              />
            </View>

            {/* Backup Codes */}
            <View style={styles.backupCodesContainer}>
              <Text style={styles.sectionTitle}>Codes de secours</Text>
              <Text style={styles.instruction}>
                Conservez ces codes en lieu sûr. Vous pouvez les utiliser si
                vous perdez l&apos;accès à votre app d&apos;authentification.
              </Text>

              <View style={styles.backupCodesList}>
                {mfaData.backup_codes.map((code, index) => (
                  <Pressable
                    key={index}
                    style={styles.backupCodeItem}
                    onPress={() => void handleCopyBackupCode(code)}
                  >
                    <Text style={styles.backupCodeText}>{code}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Enable Button */}
            <AuthButton
              title="Activer MFA"
              onPress={() => void handleEnable()}
              variant="primary"
              loading={isLoading}
              disabled={isLoading || !verificationCode}
            />
          </>
        )}
      </ScrollView>

      <LoadingOverlay visible={isLoading && !mfaData} message="Configuration MFA..." />
      <ErrorMessage
        message={error || ''}
        visible={!!error}
        onDismiss={clearError}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backupCodeItem: {
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.background.surface,
    borderColor: AUTH_COLORS.border.light,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    marginBottom: AUTH_SPACING.xs,
    minWidth: '48%',
    padding: AUTH_SPACING.sm,
  },
  backupCodeText: {
    color: AUTH_COLORS.text.primary,
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '600',
  },
  backupCodesContainer: {
    marginBottom: AUTH_SPACING.lg,
  },
  backupCodesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: AUTH_SPACING.xs,
    marginTop: AUTH_SPACING.sm,
  },
  container: {
    backgroundColor: AUTH_COLORS.background.light,
    flex: 1,
  },
  content: {
    padding: AUTH_SPACING.lg,
  },
  copyHint: {
    color: AUTH_COLORS.text.tertiary,
    fontSize: 12,
    marginTop: 4,
  },
  instruction: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: AUTH_COLORS.text.secondary,
    marginTop: AUTH_SPACING.xs,
  },
  qrCode: {
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.background.surface,
    borderRadius: 16,
    marginTop: AUTH_SPACING.md,
    padding: AUTH_SPACING.md,
  },
  qrContainer: {
    marginBottom: AUTH_SPACING.lg,
  },
  qrImage: {
    height: 200,
    width: 200,
  },
  scrollView: {
    flex: 1,
  },
  secretBox: {
    backgroundColor: AUTH_COLORS.background.surface,
    borderColor: AUTH_COLORS.border.light,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: AUTH_SPACING.sm,
    padding: AUTH_SPACING.md,
  },
  secretContainer: {
    marginBottom: AUTH_SPACING.lg,
  },
  secretText: {
    color: AUTH_COLORS.text.primary,
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionTitle: {
    ...AUTH_TYPOGRAPHY.h4,
    color: AUTH_COLORS.text.primary,
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    color: AUTH_COLORS.text.secondary,
    marginBottom: AUTH_SPACING.lg,
  },
  title: {
    ...AUTH_TYPOGRAPHY.h2,
    color: AUTH_COLORS.text.primary,
    marginBottom: AUTH_SPACING.xs,
  },
  verificationContainer: {
    marginBottom: AUTH_SPACING.lg,
  },
});
