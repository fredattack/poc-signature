// Signature capture screen

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignatureCanvas } from '@/components/signature/SignatureCanvas';
import { ColorPicker } from '@/components/signature/ColorPicker';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/shared/Header';
import { useSignature } from '@/hooks/useSignature';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { useThemeTokens } from '@/theme';

export default function SignatureCanvasScreen() {
  const router = useRouter();
  const canvasRef = useRef<View | null>(null);
  const [clearSignal, setClearSignal] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { track } = useAnalytics();
  const theme = useThemeTokens();
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

  const disableScroll = useCallback(() => setScrollEnabled(false), []);
  const enableScroll = useCallback(() => setScrollEnabled(true), []);

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
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Header
          title="Capture Signature"
          leftAction={<Text style={styles.backText}>Back</Text>}
          onLeftPress={handleBack}
        />

        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={24}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={scrollEnabled}
          >
            <Text style={styles.instructions}>
              Draw the celebrity's signature on the canvas below
            </Text>

            <View style={styles.canvasContainer}>
              <View style={styles.canvasFrame}>
                <SignatureCanvas
                  color={currentColor}
                  onStrokeComplete={addPath}
                  captureRef={canvasRef}
                  clearSignal={clearSignal}
                  onBeginStroke={disableScroll}
                  onEndStroke={enableScroll}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Signature Color</Text>
              <ColorPicker
                selectedColor={currentColor}
                onColorSelect={setColor}
              />
            </View>

            <View style={styles.section}>
              <Input
                label="Celebrity Name *"
                placeholder="Enter celebrity name"
                value={celebrityName}
                onChangeText={setCelebrityName}
                error={
                  validationError && !celebrityName
                    ? validationError
                    : undefined
                }
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

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
                  trackColor={{
                    false: theme.colors.overlay.light,
                    true: theme.colors.brand.primary,
                  }}
                  thumbColor={theme.colors.surface.card}
                />
              </View>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

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

            {!isValid && (
              <Text style={styles.hintText}>
                {validationError ||
                  'Please draw a signature and enter celebrity name'}
              </Text>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const createStyles = ({ colors, tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    actionButton: {
      flex: 1,
    },
    actions: {
      flexDirection: 'row',
      gap: tokens.spacing.md,
      marginTop: tokens.spacing.lg,
    },
    backText: {
      color: colors.brand.primary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: tokens.typography.body.fontWeight,
      letterSpacing: tokens.typography.body.letterSpacing,
      lineHeight: tokens.typography.body.lineHeight,
    },
    canvasContainer: {
      alignItems: 'center',
      marginBottom: tokens.spacing.lg,
      width: '100%',
    },
    canvasFrame: {
      backgroundColor: colors.surface.card,
      borderColor: colors.brand.primary,
      borderRadius: tokens.radii.generous,
      borderWidth: 2,
      overflow: 'hidden',
      width: '100%',
    },
    container: {
      backgroundColor: colors.surface.background,
      flex: 1,
    },
    content: {
      flex: 1,
    },
    errorText: {
      color: colors.feedback.critical,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: tokens.typography.body.fontWeight,
      letterSpacing: tokens.typography.body.letterSpacing,
      lineHeight: tokens.typography.body.lineHeight,
      marginTop: tokens.spacing.md,
      textAlign: 'center',
    },
    hintText: {
      color: colors.text.secondary,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.caption.fontWeight,
      letterSpacing: tokens.typography.caption.letterSpacing,
      lineHeight: tokens.typography.caption.lineHeight,
      marginTop: tokens.spacing.sm,
      textAlign: 'center',
    },
    instructions: {
      color: colors.text.secondary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: tokens.typography.body.fontWeight,
      letterSpacing: tokens.typography.body.letterSpacing,
      lineHeight: tokens.typography.body.lineHeight,
      marginBottom: tokens.spacing.lg,
      textAlign: 'center',
    },
    safeArea: {
      backgroundColor: colors.surface.background,
      flex: 1,
    },
    scrollContent: {
      paddingBottom: tokens.spacing.xl,
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.md,
    },
    scrollView: {
      flex: 1,
    },
    section: {
      marginBottom: tokens.spacing.lg,
    },
    sectionLabel: {
      color: colors.text.primary,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: '600' as const,
      letterSpacing: tokens.typography.caption.letterSpacing,
      lineHeight: tokens.typography.caption.lineHeight,
      marginBottom: tokens.spacing.sm,
    },
    switchHelper: {
      color: colors.text.secondary,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.caption.fontWeight,
      letterSpacing: tokens.typography.caption.letterSpacing,
      lineHeight: tokens.typography.caption.lineHeight,
      marginTop: tokens.spacing.xs,
    },
    switchLabel: {
      flex: 1,
      marginRight: tokens.spacing.md,
    },
    switchRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
