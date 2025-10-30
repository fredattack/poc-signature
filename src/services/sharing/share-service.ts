// Share service for sharing images via native share sheet

import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

export interface ShareOptions {
  title?: string;
  message?: string;
  dialogTitle?: string;
}

export interface ShareResult {
  success: boolean;
  error?: string;
}

/**
 * Share an image file using the native share sheet
 * @param imageUri - Local file URI of the image to share
 * @param options - Optional configuration for the share dialog
 * @returns Promise with share result
 */
export const shareImage = async (
  imageUri: string,
  options: ShareOptions = {}
): Promise<ShareResult> => {
  try {
    // Check if sharing is available on this device
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      return {
        success: false,
        error: 'Sharing is not available on this device',
      };
    }

    // Platform-specific share options
    const shareOptions = getPlatformShareOptions(options);

    // Share the image
    await Sharing.shareAsync(imageUri, shareOptions);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Share error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to share image',
    };
  }
};

/**
 * Get platform-specific share options
 * iOS and Android have different share sheet behaviors
 */
const getPlatformShareOptions = (options: ShareOptions): Sharing.SharingOptions => {
  const baseOptions: Sharing.SharingOptions = {
    mimeType: 'image/png',
    UTI: 'public.png',
  };

  if (Platform.OS === 'ios') {
    // iOS-specific options
    return {
      ...baseOptions,
      dialogTitle: options.dialogTitle || 'Share Signature',
    };
  } else {
    // Android-specific options
    return {
      ...baseOptions,
      dialogTitle: options.dialogTitle || 'Share via',
    };
  }
};

/**
 * Check if sharing is supported on the current device
 */
export const isSharingAvailable = async (): Promise<boolean> => {
  try {
    return await Sharing.isAvailableAsync();
  } catch (error) {
    console.error('Error checking sharing availability:', error);
    return false;
  }
};
