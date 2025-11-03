// Wallpaper editor screen

import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WallpaperPreview } from '@/components/wallpaper/WallpaperPreview';
import { TemplateCarousel } from '@/components/wallpaper/TemplateCarousel';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/shared/Header';
import { LoadingSpinner as _LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Toast } from '@/components/ui/Toast';
import { useSignaturesStore } from '@/store/signatures-store';
import { useWallpaper } from '@/hooks/useWallpaper';
import { useAnalytics } from '@/hooks/useAnalytics';
import { usePremium } from '@/hooks/usePremium';
import { shareImage } from '@/services/sharing/share-service';
import { PaywallModal } from '@/components/premium/PaywallModal';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import {
  colors,
  freeColorPresets,
  premiumColorPresets,
} from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import * as ImagePicker from 'expo-image-picker';

export default function WallpaperEditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const signatureId = params.signatureId as string;
  const { track } = useAnalytics();

  const { getById } = useSignaturesStore();
  const signature = getById(signatureId);

  const { isPremium } = usePremium();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const {
    selectedTemplateId,
    wallpaperOptions,
    isGenerating,
    isSaving,
    error,
    selectTemplate,
    updateOptions,
    setWallpaperRef,
    generateWallpaper,
    saveToGallery,
    setAsWallpaper,
  } = useWallpaper({
    signature: signature!,
    isPremium,
  });

  useEffect(() => {
    track('screen_viewed', { screen_name: 'Wallpaper Editor' });
  }, [track]);

  if (!signature) {
    return (
      <View style={styles.container}>
        <Header
          title="Wallpaper Editor"
          leftAction={<Text style={styles.backText}>Back</Text>}
          onLeftPress={() => router.back()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Signature not found</Text>
        </View>
      </View>
    );
  }

  const handleSaveToGallery = async () => {
    const success = await saveToGallery();
    if (success) {
      Alert.alert('Success', 'Wallpaper saved to gallery!');
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  const handleSetAsWallpaper = async () => {
    const success = await setAsWallpaper();
    if (!success && error) {
      Alert.alert('Error', error);
    }
  };

  const handlePremiumRequired = () => {
    setShowPaywall(true);
  };

  const handleColorSelect = (
    colorPreset:
      | (typeof freeColorPresets)[number]
      | (typeof premiumColorPresets)[number]
  ) => {
    // Check if color is premium and user is not premium
    if (colorPreset.isPremium && !isPremium) {
      handlePremiumRequired();
      return;
    }

    // Clear background image when selecting a color
    updateOptions({
      backgroundColor: colorPreset.value,
      backgroundImage: undefined,
    });
    setShowColorPicker(false);
  };

  const handleImagePick = async () => {
    // Check if user is premium
    if (!isPremium) {
      handlePremiumRequired();
      return;
    }

    // Request permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Required',
        'Please grant permission to access your photo library.'
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16], // Portrait aspect ratio for wallpaper
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      // Clear background color when selecting an image
      updateOptions({
        backgroundImage: result.assets[0].uri,
        backgroundColor: undefined,
      });
      setShowColorPicker(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);

    track(ANALYTICS_EVENTS.SHARE_OPENED, {
      content_type: 'wallpaper',
      template_id: selectedTemplateId,
      celebrity_name: signature.celebrityName,
    });

    try {
      // Generate wallpaper first
      const wallpaperUri = await generateWallpaper();

      if (!wallpaperUri) {
        setToastType('error');
        setToastMessage('Failed to generate wallpaper');
        setToastVisible(true);
        return;
      }

      // Share the generated wallpaper
      const result = await shareImage(wallpaperUri, {
        dialogTitle: `Share ${signature.celebrityName} Wallpaper`,
      });

      if (result.success) {
        track(ANALYTICS_EVENTS.SHARE_COMPLETED, {
          content_type: 'wallpaper',
          template_id: selectedTemplateId,
        });

        setToastType('success');
        setToastMessage('Wallpaper shared successfully!');
        setToastVisible(true);
      } else {
        setToastType('error');
        setToastMessage(result.error ?? 'Failed to share wallpaper');
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

  return (
    <View style={styles.container}>
      <Header
        title="Create Wallpaper"
        leftAction={<Text style={styles.backText}>Back</Text>}
        onLeftPress={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallpaper Preview */}
        <WallpaperPreview
          signature={signature}
          options={wallpaperOptions}
          onRefReady={setWallpaperRef}
        />

        {/* Template Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Choose Template Background</Text>
          <TemplateCarousel
            selectedTemplateId={selectedTemplateId}
            onTemplateSelect={selectTemplate}
            isPremium={isPremium}
            onPremiumRequired={handlePremiumRequired}
          />
        </View>

        {/* Background Customization */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.colorButton}
            onPress={() => setShowColorPicker(!showColorPicker)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionLabel}>Background</Text>
            {wallpaperOptions.backgroundImage ? (
              <View style={styles.imagePreview}>
                <Text style={styles.imagePreviewText}>Image</Text>
              </View>
            ) : (
              <View
                style={[
                  styles.colorPreview,
                  {
                    backgroundColor:
                      wallpaperOptions.backgroundColor ??
                      colors.backgroundSecondary,
                  },
                ]}
              />
            )}
          </TouchableOpacity>

          {showColorPicker && (
            <View style={styles.backgroundPicker}>
              {/* Free Colors */}
              <Text style={styles.colorGroupLabel}>Free Colors</Text>
              <View style={styles.colorGrid}>
                {freeColorPresets.map((preset) => (
                  <TouchableOpacity
                    key={preset.id}
                    style={[
                      styles.colorOption,
                      { backgroundColor: preset.value },
                      preset.value === wallpaperOptions.backgroundColor &&
                        styles.colorOptionSelected,
                    ]}
                    onPress={() => handleColorSelect(preset)}
                    activeOpacity={0.7}
                  />
                ))}
              </View>

              {/* Premium Colors */}
              <Text style={styles.colorGroupLabel}>Premium Colors</Text>
              <View style={styles.colorGrid}>
                {premiumColorPresets.map((preset) => (
                  <TouchableOpacity
                    key={preset.id}
                    style={[
                      styles.colorOption,
                      { backgroundColor: preset.value },
                      preset.value === wallpaperOptions.backgroundColor &&
                        styles.colorOptionSelected,
                    ]}
                    onPress={() => handleColorSelect(preset)}
                    activeOpacity={0.7}
                  >
                    {!isPremium && (
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumBadgeText}>PRO</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Image from Gallery */}
              <Text style={styles.colorGroupLabel}>Custom Image</Text>
              <TouchableOpacity
                style={[
                  styles.imagePickerButton,
                  wallpaperOptions.backgroundImage &&
                    styles.imagePickerButtonSelected,
                ]}
                onPress={() => void handleImagePick()}
                activeOpacity={0.7}
              >
                <Text style={styles.imagePickerButtonText}>
                  {wallpaperOptions.backgroundImage
                    ? 'Change Image'
                    : 'Choose from Gallery'}
                </Text>
                {!isPremium && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>PRO</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Toggle Options */}
        <View style={styles.section}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Show Date</Text>
            <Switch
              value={wallpaperOptions.showDate}
              onValueChange={(value) => updateOptions({ showDate: value })}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Show Location</Text>
            <Switch
              value={wallpaperOptions.showLocation}
              onValueChange={(value) => updateOptions({ showLocation: value })}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
              disabled={!signature.location}
            />
          </View>
        </View>

        {/* Error Message */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            title="📤 Share Wallpaper"
            onPress={() => void handleShare()}
            variant="secondary"
            disabled={isGenerating || isSaving || isSharing}
            loading={isSharing}
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title="Save to Gallery"
            onPress={() => void handleSaveToGallery()}
            variant="secondary"
            disabled={isGenerating || isSaving || isSharing}
            loading={isSaving}
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title="Set as Wallpaper"
            onPress={() => void handleSetAsWallpaper()}
            variant="primary"
            disabled={isGenerating || isSaving || isSharing}
            fullWidth
            style={styles.actionButton}
          />
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>
          💡 Tip: Premium users get HD quality wallpapers and access to 15+
          exclusive templates
        </Text>
      </ScrollView>

      {/* Toast notification */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        variant={toastType}
        onHide={() => setToastVisible(false)}
      />

      {/* Paywall Modal */}
      <PaywallModal
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature="Premium Templates"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    marginBottom: 0,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  backText: {
    ...typography.body,
    color: colors.primary,
  },
  backgroundPicker: {
    marginTop: spacing.md,
  },
  colorButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  colorGroupLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
    textTransform: 'uppercase',
  },
  colorOption: {
    borderColor: colors.border,
    borderRadius: 25,
    borderWidth: 2,
    height: 50,
    width: 50,
  },
  colorOptionSelected: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  colorPreview: {
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 2,
    height: 40,
    width: 40,
  },
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
  },
  imagePickerButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    position: 'relative',
  },
  imagePickerButtonSelected: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  imagePickerButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  imagePreview: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 80,
  },
  imagePreviewText: {
    ...typography.caption,
    color: colors.textInverse,
    fontWeight: '600',
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    textAlign: 'center',
  },
  premiumBadge: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    position: 'absolute',
    right: 2,
    top: 2,
  },
  premiumBadgeText: {
    ...typography.caption,
    color: colors.textInverse,
    fontSize: 8,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  toggleLabel: {
    ...typography.body,
    color: colors.text,
  },
  toggleRow: {
    alignItems: 'center',
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
});
