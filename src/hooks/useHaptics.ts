/**
 * Haptic Feedback Hook
 *
 * Provides typed haptic feedback functions for iOS and Android using expo-haptics.
 * NOTE: expo-haptics package needs to be installed separately.
 *
 * Usage:
 * ```tsx
 * const haptics = useHaptics();
 * haptics.triggerLight(); // Light impact
 * haptics.triggerSuccess(); // Success notification
 * ```
 *
 * @see https://docs.expo.dev/versions/latest/sdk/haptics/
 */

// NOTE: expo-haptics is not currently installed in package.json
// This implementation is ready to use once the package is added:
// npm install expo-haptics

// Uncomment when expo-haptics is installed:
// import * as Haptics from 'expo-haptics';

import { Platform } from 'react-native';

export interface HapticsAPI {
  triggerLight: () => void;
  triggerMedium: () => void;
  triggerHeavy: () => void;
  triggerSuccess: () => void;
  triggerWarning: () => void;
  triggerError: () => void;
  triggerSelection: () => void;
}

/**
 * Hook to access haptic feedback functions
 *
 * All haptic calls are wrapped in try-catch to handle devices without haptic support.
 * Functions are no-ops on web platform.
 */
export const useHaptics = (): HapticsAPI => {
  const isSupported = Platform.OS === 'ios' || Platform.OS === 'android';

  const triggerLight = (): void => {
    if (!isSupported) {
      return;
    }

    // TODO: Uncomment when expo-haptics is installed
    // try {
    //   void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // } catch (error) {
    //   console.warn('[Haptics] Failed to trigger light haptic:', error);
    // }
  };

  const triggerMedium = (): void => {
    if (!isSupported) {
      return;
    }

    // TODO: Uncomment when expo-haptics is installed
    // try {
    //   void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // } catch (error) {
    //   console.warn('[Haptics] Failed to trigger medium haptic:', error);
    // }
  };

  const triggerHeavy = (): void => {
    if (!isSupported) {
      return;
    }

    // TODO: Uncomment when expo-haptics is installed
    // try {
    //   void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // } catch (error) {
    //   console.warn('[Haptics] Failed to trigger heavy haptic:', error);
    // }
  };

  const triggerSuccess = (): void => {
    if (!isSupported) {
      return;
    }

    // TODO: Uncomment when expo-haptics is installed
    // try {
    //   void Haptics.notificationAsync(
    //     Haptics.NotificationFeedbackType.Success
    //   );
    // } catch (error) {
    //   console.warn('[Haptics] Failed to trigger success haptic:', error);
    // }
  };

  const triggerWarning = (): void => {
    if (!isSupported) {
      return;
    }

    // TODO: Uncomment when expo-haptics is installed
    // try {
    //   void Haptics.notificationAsync(
    //     Haptics.NotificationFeedbackType.Warning
    //   );
    // } catch (error) {
    //   console.warn('[Haptics] Failed to trigger warning haptic:', error);
    // }
  };

  const triggerError = (): void => {
    if (!isSupported) {
      return;
    }

    // TODO: Uncomment when expo-haptics is installed
    // try {
    //   void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    // } catch (error) {
    //   console.warn('[Haptics] Failed to trigger error haptic:', error);
    // }
  };

  const triggerSelection = (): void => {
    if (!isSupported) {
      return;
    }

    // TODO: Uncomment when expo-haptics is installed
    // try {
    //   void Haptics.selectionAsync();
    // } catch (error) {
    //   console.warn('[Haptics] Failed to trigger selection haptic:', error);
    // }
  };

  return {
    triggerLight,
    triggerMedium,
    triggerHeavy,
    triggerSuccess,
    triggerWarning,
    triggerError,
    triggerSelection,
  };
};
