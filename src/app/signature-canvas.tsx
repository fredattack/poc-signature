// Signature capture screen - Single-page layout (no scroll)

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignatureCanvas } from '@/components/signature/SignatureCanvas';
import { ColorPickerDropdown } from '@/components/signature/ColorPickerDropdown';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSignature } from '@/hooks/useSignature';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { useThemeTokens } from '@/theme';

// Custom canvas height for single-page layout (no scroll)
const COMPACT_CANVAS_HEIGHT = 280;

export default function SignatureCanvasScreen() {
  const router = useRouter();
  const canvasRef = useRef<View | null>(null);
  const [clearSignal, setClearSignal] = useState(0);
  const { track } = useAnalytics();
  const theme = useThemeTokens();
  const { colors, tokens } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

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

  useEffect(() => {
    setCanvasRef(canvasRef);
  }, [setCanvasRef]);

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
      Alert.alert('Success', 'Signature saved successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
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

  const handleInfo = () => {
    Alert.alert(
      'Signature Capture',
      'Draw the celebrity signature on the canvas using your finger. Choose a color, add the celebrity name, and optionally save location data.',
      [{ text: 'Got it' }]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.surface.background }]}
      edges={['top', 'left', 'right']}
    >
      {/* Header */}
      <View
        style={[styles.header, { borderBottomColor: colors.overlay.light }]}
      >
        <TouchableOpacity
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButton, { color: colors.brand.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          Capture Signature
        </Text>
        <TouchableOpacity
          onPress={handleInfo}
          accessibilityRole="button"
          accessibilityLabel="Information"
        >
          <Text style={[styles.infoIcon, { color: colors.text.secondary }]}>
            ⓘ
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content - NO SCROLL */}
      <View style={styles.content}>
        {/* Canvas Hint */}
        <Text style={[styles.canvasHint, { color: colors.text.secondary }]}>
          ✍️ Draw the signature
        </Text>

        {/* Signature Canvas with Inline Controls */}
        <View
          style={[
            styles.canvasWrapper,
            {
              borderColor: colors.brand.primary,
              backgroundColor: colors.surface.card,
              ...tokens.elevation.level2,
            },
          ]}
        >
          <SignatureCanvas
            color={currentColor}
            onStrokeComplete={addPath}
            captureRef={canvasRef}
            clearSignal={clearSignal}
            height={COMPACT_CANVAS_HEIGHT}
          />

          {/* Canvas Controls - Integrated */}
          <View
            style={[
              styles.canvasControls,
              { backgroundColor: colors.surface.backgroundTint },
            ]}
          >
            <ColorPickerDropdown value={currentColor} onChange={setColor} />

            <View style={styles.controlButtons}>
              <TouchableOpacity
                onPress={() => {
                  // TODO: Implement undo functionality
                  Alert.alert('Undo', 'Undo feature coming soon!');
                }}
                style={styles.controlButton}
                accessibilityRole="button"
                accessibilityLabel="Undo last stroke"
              >
                <Text
                  style={[styles.controlText, { color: colors.text.primary }]}
                >
                  ↶ Undo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleClear}
                disabled={paths.length === 0}
                style={[
                  styles.controlButton,
                  paths.length === 0 && styles.controlButtonDisabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Clear canvas"
              >
                <Text
                  style={[
                    styles.controlText,
                    {
                      color:
                        paths.length === 0
                          ? colors.text.tertiary
                          : colors.text.primary,
                    },
                  ]}
                >
                  ✕ Clear
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Form Fields - Compact */}
        <View style={styles.formSection}>
          <Input
            label="Celebrity Name *"
            placeholder="Type or select..."
            value={celebrityName}
            onChangeText={(text) => {
              setCelebrityName(text);
            }}
            error={
              validationError && !celebrityName ? validationError : undefined
            }
            autoCapitalize="words"
            autoCorrect={false}
          />

          {/* Location Toggle - Compact Row */}
          <View style={styles.locationRow}>
            <View style={styles.locationLabelContainer}>
              <Text
                style={[styles.locationLabel, { color: colors.text.primary }]}
              >
                📍 Location
              </Text>
              <Text
                style={[styles.locationHint, { color: colors.text.secondary }]}
              >
                {captureLocation ? 'Will save' : 'Optional'}
              </Text>
            </View>
            <Switch
              value={captureLocation}
              onValueChange={toggleLocationCapture}
              trackColor={{
                false: colors.overlay.light,
                true: colors.brand.primary,
              }}
              thumbColor={colors.surface.card}
              ios_backgroundColor={colors.overlay.light}
            />
          </View>
        </View>

        {/* Validation Error Message */}
        {error && (
          <Text
            style={[styles.errorMessage, { color: colors.feedback.critical }]}
          >
            {error}
          </Text>
        )}
      </View>

      {/* Action Buttons - Sticky Footer */}
      <View
        style={[
          styles.buttonContainer,
          { borderTopColor: colors.overlay.light },
        ]}
      >
        <Button
          title="Clear"
          onPress={handleClear}
          variant="secondary"
          disabled={paths.length === 0 || isSaving}
          style={styles.actionButton}
        />
        <Button
          title={isSaving ? 'Saving...' : '💾 Save Signature'}
          onPress={() => void handleSave()}
          variant="primary"
          disabled={!isValid || isSaving}
          loading={isSaving}
          style={styles.actionButton}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = ({ tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    actionButton: {
      flex: 1,
    },
    backButton: {
      fontSize: tokens.typography.body.fontSize,
      fontWeight: '500' as const,
    },
    buttonContainer: {
      borderTopWidth: 1,
      flexDirection: 'row',
      gap: tokens.spacing.sm,
      paddingBottom: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.md,
    },
    canvasControls: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: tokens.spacing.sm,
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
    },
    canvasHint: {
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.caption.fontWeight,
      marginBottom: tokens.spacing.xs,
    },
    canvasWrapper: {
      borderRadius: tokens.radii.generous,
      borderWidth: 1.5,
      marginBottom: tokens.spacing.md,
      overflow: 'hidden',
    },
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.sm,
    },
    controlButton: {
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
    },
    controlButtonDisabled: {
      opacity: 0.4,
    },
    controlButtons: {
      flexDirection: 'row',
      gap: tokens.spacing.sm,
    },
    controlText: {
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: '500' as const,
    },
    errorMessage: {
      fontSize: tokens.typography.caption.fontSize,
      marginTop: tokens.spacing.sm,
      textAlign: 'center',
    },
    formSection: {
      gap: tokens.spacing.md,
    },
    header: {
      alignItems: 'center',
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
    },
    headerTitle: {
      fontSize: tokens.typography.headingM.fontSize,
      fontWeight: tokens.typography.headingM.fontWeight,
    },
    infoIcon: {
      fontSize: 20,
    },
    locationHint: {
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.caption.fontWeight,
    },
    locationLabel: {
      fontSize: tokens.typography.body.fontSize,
      fontWeight: '500' as const,
    },
    locationLabelContainer: {
      flex: 1,
    },
    locationRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: tokens.spacing.sm,
      justifyContent: 'space-between',
    },
  });
