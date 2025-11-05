// Signature detail screen

import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { captureRef } from 'react-native-view-shot';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/shared/Header';
import { Icon } from '@/components/ui/Icon';
import { SyncStatusBadge } from '@/components/ui/SyncStatusBadge';
import { Toast } from '@/components/ui/Toast';
import { ColorPickerDropdown } from '@/components/signature/ColorPickerDropdown';
import { BackgroundColorPicker } from '@/components/signature/BackgroundColorPicker';
import { SignatureCanvas } from '@/components/signature/SignatureCanvas';
import { useSignaturesStore } from '@/store/signatures-store';
import { useAnalytics } from '@/hooks/useAnalytics';
import { shareImage } from '@/services/sharing/share-service';
import { fileSystem } from '@/services/storage/file-system';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { formatDateTime, formatLocation } from '@/utils/formatters';
import { SignatureColor } from '@/types/signature.types';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/utils/constants';

export default function SignatureDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const signatureId = params.signatureId as string;

  const { getById, removeSignature, updateSignature } = useSignaturesStore();
  const { track } = useAnalytics();

  const signature = getById(signatureId);

  const [isSharing, setIsSharing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const [currentColor, setCurrentColor] = useState<SignatureColor>(
    signature?.signatureColor ?? SignatureColor.Black
  );
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState<
    string | undefined
  >(signature?.backgroundColor);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Store original values for undo
  const originalColor = useRef<SignatureColor>(
    signature?.signatureColor ?? SignatureColor.Black
  );
  const originalBackgroundColor = useRef<string | undefined>(
    signature?.backgroundColor
  );

  const canvasRef = useRef<View | null>(null);

  useEffect(() => {
    if (signature) {
      track(ANALYTICS_EVENTS.SIGNATURE_VIEWED, {
        signature_id: signature.id,
        celebrity_name: signature.celebrityName,
      });
    }
  }, [signature, track]);

  // Sync colors with signature when it changes
  useEffect(() => {
    console.log('[useEffect - sync colors] Triggered');
    console.log('[useEffect - sync colors] signature:', signature?.id);
    console.log(
      '[useEffect - sync colors] signature.signatureColor:',
      signature?.signatureColor
    );
    console.log(
      '[useEffect - sync colors] signature.backgroundColor:',
      signature?.backgroundColor
    );

    if (signature) {
      const newColor = signature.signatureColor ?? SignatureColor.Black;
      const newBgColor = signature.backgroundColor;

      console.log(
        '[useEffect - sync colors] Setting currentColor to:',
        newColor
      );
      console.log(
        '[useEffect - sync colors] Setting currentBackgroundColor to:',
        newBgColor
      );

      setCurrentColor(newColor);
      setCurrentBackgroundColor(newBgColor);

      // Update original refs so undo works correctly
      originalColor.current = newColor;
      originalBackgroundColor.current = newBgColor;

      // Reset unsaved changes flag (colors are now in sync with saved signature)
      setHasUnsavedChanges(false);

      console.log('[useEffect - sync colors] Sync complete');
    }
  }, [signature?.id, signature?.signatureColor, signature?.backgroundColor]);

  // Debug log for currentColor and currentBackgroundColor changes
  useEffect(() => {
    console.log(
      '[useEffect - color state] currentColor changed to:',
      currentColor
    );
    console.log(
      '[useEffect - color state] currentBackgroundColor changed to:',
      currentBackgroundColor
    );
  }, [currentColor, currentBackgroundColor]);

  if (!signature) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}
      >
        <Header
          title="Signature"
          leftAction={
            <View style={styles.backButton}>
              <Icon name="chevron-left" size="sm" color={colors.primary} />
              <Text style={styles.backText}>Back</Text>
            </View>
          }
          onLeftPress={() => router.back()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Signature not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleCreateWallpaper = () => {
    router.push({
      pathname: '/wallpaper-editor',
      params: { signatureId: signature.id },
    });
  };

  const handleShare = async () => {
    setIsSharing(true);

    track(ANALYTICS_EVENTS.SHARE_OPENED, {
      content_type: 'signature',
      signature_id: signature.id,
      celebrity_name: signature.celebrityName,
    });

    try {
      const result = await shareImage(signature.signatureImagePath, {
        dialogTitle: `Share ${signature.celebrityName}'s Signature`,
      });

      if (result.success) {
        track(ANALYTICS_EVENTS.SHARE_COMPLETED, {
          content_type: 'signature',
          signature_id: signature.id,
        });

        setToastType('success');
        setToastMessage('Signature shared successfully!');
        setToastVisible(true);
      } else {
        setToastType('error');
        setToastMessage(result.error ?? 'Failed to share signature');
        setToastVisible(true);
      }
    } catch (error) {
      setToastType('error');
      setToastMessage('An error occurred while sharing');
      setToastVisible(true);
    } finally {
      setIsSharing(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Signature',
      `Are you sure you want to delete ${signature.celebrityName}'s signature?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            void (async () => {
              await removeSignature(signature.id);
              track(ANALYTICS_EVENTS.SIGNATURE_DELETED, {
                signature_id: signature.id,
                celebrity_name: signature.celebrityName,
              });
              router.back();
            })(),
        },
      ]
    );
  };

  const handleColorChange = (newColor: SignatureColor) => {
    console.log('[handleColorChange] Called with newColor:', newColor);
    console.log('[handleColorChange] Current signature:', signature?.id);
    console.log('[handleColorChange] Has paths:', signature?.paths?.length);

    if (!signature?.paths || signature.paths.length === 0) {
      console.log('[handleColorChange] No paths available - aborting');
      setToastType('error');
      setToastMessage('Cannot change color: signature paths not available');
      setToastVisible(true);
      return;
    }

    console.log(
      '[handleColorChange] Setting currentColor from',
      currentColor,
      'to',
      newColor
    );
    setCurrentColor(newColor);
    setHasUnsavedChanges(true);
    console.log('[handleColorChange] hasUnsavedChanges set to true');
  };

  const handleBackgroundColorChange = (newBgColor: string) => {
    console.log(
      '[handleBackgroundColorChange] Called with newBgColor:',
      newBgColor
    );
    console.log(
      '[handleBackgroundColorChange] Current signature:',
      signature?.id
    );
    console.log(
      '[handleBackgroundColorChange] Has paths:',
      signature?.paths?.length
    );

    if (!signature?.paths || signature.paths.length === 0) {
      console.log(
        '[handleBackgroundColorChange] No paths available - aborting'
      );
      setToastType('error');
      setToastMessage('Cannot change color: signature paths not available');
      setToastVisible(true);
      return;
    }

    console.log(
      '[handleBackgroundColorChange] Setting currentBackgroundColor from',
      currentBackgroundColor,
      'to',
      newBgColor
    );
    setCurrentBackgroundColor(newBgColor);
    setHasUnsavedChanges(true);
    console.log('[handleBackgroundColorChange] hasUnsavedChanges set to true');
  };

  const handleSaveChanges = async () => {
    console.log('[handleSaveChanges] Called');
    console.log(
      '[handleSaveChanges] signature?.paths:',
      signature?.paths?.length
    );
    console.log('[handleSaveChanges] hasUnsavedChanges:', hasUnsavedChanges);
    console.log('[handleSaveChanges] currentColor:', currentColor);
    console.log(
      '[handleSaveChanges] currentBackgroundColor:',
      currentBackgroundColor
    );

    if (
      !signature?.paths ||
      signature.paths.length === 0 ||
      !hasUnsavedChanges
    ) {
      console.log(
        '[handleSaveChanges] Aborting - missing paths or no unsaved changes'
      );
      return;
    }

    console.log('[handleSaveChanges] Calling regenerateSignatureImage...');
    await regenerateSignatureImage(currentColor, currentBackgroundColor);

    // Update original values after successful save
    originalColor.current = currentColor;
    originalBackgroundColor.current = currentBackgroundColor;
    setHasUnsavedChanges(false);
    console.log(
      '[handleSaveChanges] Save complete, hasUnsavedChanges set to false'
    );
  };

  const handleUndo = () => {
    if (!hasUnsavedChanges) {
      return;
    }

    console.log('[handleUndo] Reverting to original colors');
    console.log('[handleUndo] Original color:', originalColor.current);
    console.log(
      '[handleUndo] Original background:',
      originalBackgroundColor.current
    );

    // Restore original values (canvas will update automatically)
    setCurrentColor(originalColor.current);
    setCurrentBackgroundColor(originalBackgroundColor.current);
    setHasUnsavedChanges(false);

    setToastType('success');
    setToastMessage('Changes reverted to original');
    setToastVisible(true);
  };

  const regenerateSignatureImage = async (
    color: SignatureColor,
    bgColor: string | undefined
  ) => {
    if (!signature || !canvasRef.current) {
      console.log('[regenerateSignatureImage] Missing signature or canvasRef');
      return;
    }

    console.log(
      '[regenerateSignatureImage] Starting with color:',
      color,
      'bgColor:',
      bgColor
    );
    setIsRegenerating(true);

    try {
      // Small delay to ensure Skia has rendered the current frame
      console.log('[regenerateSignatureImage] Waiting for canvas to render...');
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log('[regenerateSignatureImage] Capturing canvas...');
      // Capture the visible canvas as image
      const imageUri = await captureRef(canvasRef, {
        format: 'png',
        quality: 0.9,
        result: 'tmpfile',
      });

      console.log('[regenerateSignatureImage] Captured image URI:', imageUri);

      // Save new image
      const imagePath = await fileSystem.saveSignatureImage(
        imageUri,
        signature.id
      );

      console.log('[regenerateSignatureImage] Saved image path:', imagePath);

      if (!imagePath) {
        throw new Error('Failed to save regenerated image');
      }

      // Update signature in store with new colors and image path
      await updateSignature(signature.id, {
        signatureImagePath: imagePath,
        signatureColor: color,
        backgroundColor: bgColor,
      });

      console.log(
        '[regenerateSignatureImage] Updated signature in store - colors saved permanently'
      );

      setToastType('success');
      setToastMessage('Signature colors saved!');
      setToastVisible(true);
    } catch (error) {
      setToastType('error');
      setToastMessage('Failed to save colors');
      setToastVisible(true);
      console.error('Regenerate signature error:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Header
        title="Signature Details"
        leftAction={
          <View style={styles.backButton}>
            <Icon name="chevron-left" size="sm" color={colors.primary} />
            <Text style={styles.backText}>Back</Text>
          </View>
        }
        onLeftPress={() => router.back()}
        rightAction={<Icon name="trash" size="sm" color={colors.error} />}
        onRightPress={handleDelete}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Signature Canvas - Live Preview */}
        <Card style={styles.imageCard} padding="none">
          {signature.paths && signature.paths.length > 0 ? (
            <View ref={canvasRef} collapsable={false}>
              <SignatureCanvas
                key={`preview-canvas-${currentColor}-${currentBackgroundColor ?? 'none'}`}
                color={currentColor}
                backgroundColor={currentBackgroundColor}
                paths={signature.paths.map((path) => ({
                  ...path,
                  color: currentColor,
                }))}
                onStrokeComplete={() => {}}
                width={Math.min(
                  Dimensions.get('window').width - 32,
                  CANVAS_WIDTH
                )}
                height={CANVAS_HEIGHT}
              />
            </View>
          ) : (
            <Image
              source={{ uri: signature.signatureImagePath }}
              style={styles.signatureImage}
              resizeMode="contain"
            />
          )}
        </Card>

        {/* Metadata Card */}
        <Card style={styles.metadataCard}>
          <View style={styles.metadataRow}>
            <Text style={styles.label}>Celebrity</Text>
            <Text style={styles.value}>{signature.celebrityName}</Text>
          </View>

          <View style={styles.metadataRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>
              {formatDateTime(signature.capturedAt)}
            </Text>
          </View>

          {signature.location && (
            <View style={styles.metadataRow}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>
                {formatLocation(
                  signature.location.city,
                  signature.location.country
                )}
              </Text>
            </View>
          )}

          <View style={styles.metadataRow}>
            <Text style={styles.label}>Sync Status</Text>
            <SyncStatusBadge status={signature.syncStatus} size="medium" />
          </View>
        </Card>

        {/* Color Pickers Card */}
        <Card style={styles.colorPickersCard}>
          <Text style={styles.colorPickersTitle}>Signature Colors</Text>
          <View style={styles.pickerRow}>
            <ColorPickerDropdown
              value={currentColor}
              onChange={handleColorChange}
              disabled={
                isRegenerating ||
                !signature.paths ||
                signature.paths.length === 0
              }
            />
            <BackgroundColorPicker
              value={currentBackgroundColor}
              onChange={handleBackgroundColorChange}
              disabled={
                isRegenerating ||
                !signature.paths ||
                signature.paths.length === 0
              }
            />
          </View>

          {/* Action buttons for color changes */}
          {signature.paths &&
            signature.paths.length > 0 &&
            hasUnsavedChanges && (
              <View style={styles.colorActionButtons}>
                <Button
                  title="Undo"
                  onPress={handleUndo}
                  variant="ghost"
                  size="small"
                  disabled={isRegenerating}
                  icon={
                    <Icon name="chevron-left" size="xs" color={colors.text} />
                  }
                />
                <Button
                  title="Save Changes"
                  onPress={() => void handleSaveChanges()}
                  variant="primary"
                  size="small"
                  disabled={isRegenerating}
                  loading={isRegenerating}
                />
              </View>
            )}

          {!signature.paths || signature.paths.length === 0 ? (
            <Text style={styles.infoText}>
              Color editing not available for this signature
            </Text>
          ) : isRegenerating ? (
            <Text style={styles.regeneratingText}>Saving changes...</Text>
          ) : null}
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="🎨 Create Wallpaper"
            onPress={handleCreateWallpaper}
            variant="primary"
            fullWidth
          />
          <Button
            title="📤 Share Signature"
            onPress={() => void handleShare()}
            variant="secondary"
            fullWidth
            loading={isSharing}
            disabled={isSharing}
          />
        </View>

        {/* Info */}
        <Text style={styles.infoText}>
          Transform this signature into a beautiful custom wallpaper or share it
          with your friends
        </Text>
      </ScrollView>

      {/* Toast notification */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        variant={toastType}
        onHide={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  backText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '500',
  },
  colorActionButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'flex-end',
    marginTop: spacing.md,
  },
  colorPickersCard: {
    marginBottom: spacing.lg,
  },
  colorPickersTitle: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
  },
  deleteText: {
    ...typography.body,
    color: colors.error,
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.error,
  },
  imageCard: {
    backgroundColor: colors.card,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
  },
  metadataCard: {
    marginBottom: spacing.lg,
  },
  metadataRow: {
    alignItems: 'center',
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  pickerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
    width: '100%',
  },
  regeneratingText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  signatureImage: {
    aspectRatio: CANVAS_WIDTH / CANVAS_HEIGHT,
    width: '100%',
  },
  value: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    fontWeight: '500',
    marginLeft: spacing.md,
    textAlign: 'right',
  },
});
