// Signature capture screen

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SignatureCanvas } from '@/components/signature/SignatureCanvas';
import { ColorPicker } from '@/components/signature/ColorPicker';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/shared/Header';
import { useSignature } from '@/hooks/useSignature';
import { useAnalytics } from '@/hooks/useAnalytics';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';

export default function SignatureCanvasScreen() {
  const router = useRouter();
  const canvasRef = useRef<View>(null);
  const [clearSignal, setClearSignal] = useState(0);
  const { track } = useAnalytics();

  const {
    paths,
    currentColor,
    celebrityName,
    captureLocation,
    isSaving,
    error,
    isValid,
    validationError,
    addPath,
    clearCanvas,
    setColor,
    setCelebrityName,
    setCanvasRef,
    toggleLocationCapture,
    saveSignature,
  } = useSignature({ enableLocation: true });

  // Set canvas ref
  useEffect(() => {
    setCanvasRef(canvasRef);
  }, [setCanvasRef]);

  // Track screen view
  useEffect(() => {
    track(ANALYTICS_EVENTS.SIGNATURE_STARTED);
  }, [track]);

  const handleClear = () => {
    clearCanvas();
    setClearSignal((value) => value + 1);
  };

  const handleSave = async () => {
    const signature = await saveSignature();

    if (signature) {
      Alert.alert(
        'Success',
        'Signature saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  const handleBack = () => {
    if (paths.length > 0) {
      Alert.alert(
        'Discard Signature?',
        'You have an unsaved signature. Are you sure you want to go back?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Capture Signature"
        leftAction={<Text style={styles.backText}>Back</Text>}
        onLeftPress={handleBack}
      />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Instructions */}
          <Text style={styles.instructions}>
            Draw the celebrity's signature on the canvas below
          </Text>

          {/* Canvas */}
          <View style={styles.canvasContainer}>
            <SignatureCanvas
              color={currentColor}
              onStrokeComplete={addPath}
              captureRef={canvasRef}
              clearSignal={clearSignal}
            />
          </View>

          {/* Color Picker */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Signature Color</Text>
            <ColorPicker selectedColor={currentColor} onColorSelect={setColor} />
          </View>

          {/* Celebrity Name Input */}
          <View style={styles.section}>
            <Input
              label="Celebrity Name *"
              placeholder="Enter celebrity name"
              value={celebrityName}
              onChangeText={setCelebrityName}
              error={validationError && !celebrityName ? validationError : undefined}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {/* Location Toggle */}
          <View style={styles.section}>
            <View style={styles.switchRow}>
              <View style={styles.switchLabel}>
                <Text style={styles.sectionLabel}>Capture Location</Text>
                <Text style={styles.switchHelper}>
                  Save where you got this signature
                </Text>
              </View>
              <Switch
                value={captureLocation}
                onValueChange={toggleLocationCapture}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Button
              title="Clear"
              onPress={handleClear}
              variant="secondary"
              disabled={paths.length === 0 || isSaving}
              style={styles.actionButton}
            />
            <Button
              title={isSaving ? 'Saving...' : 'Save Signature'}
              onPress={handleSave}
              variant="primary"
              disabled={!isValid || isSaving}
              loading={isSaving}
              style={styles.actionButton}
            />
          </View>

          {/* Validation Hint */}
          {!isValid && (
            <Text style={styles.hintText}>
              {validationError || 'Please draw a signature and enter celebrity name'}
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  instructions: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  canvasContainer: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    flex: 1,
    marginRight: spacing.md,
  },
  switchHelper: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  hintText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  backText: {
    ...typography.body,
    color: colors.primary,
  },
});
