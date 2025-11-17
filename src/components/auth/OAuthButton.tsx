/**
 * OAuthButton Component
 *
 * OAuth provider button with official branding and icons.
 */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { OAuthProvider } from '@/types/auth.types';
import {
  AUTH_COLORS,
  AUTH_DIMENSIONS,
  AUTH_RADIUS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';
import { Icon, IconName } from '@/components/ui/Icon';

export interface OAuthButtonProps {
  provider: OAuthProvider;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const PROVIDER_CONFIG: Record<
  OAuthProvider,
  { name: string; icon: IconName; color: string }
> = {
  google: {
    name: 'Google',
    icon: 'google-logo',
    color: '#4285F4',
  },
  apple: {
    name: 'Apple',
    icon: 'apple-logo',
    color: '#000000',
  },
  facebook: {
    name: 'Facebook',
    icon: 'facebook-logo',
    color: '#1877F2',
  },
  twitter: {
    name: 'Twitter',
    icon: 'twitter-logo',
    color: '#1DA1F2',
  },
  instagram: {
    name: 'Instagram',
    icon: 'instagram-logo',
    color: '#E4405F',
  },
  tiktok: {
    name: 'TikTok',
    icon: 'tiktok-logo',
    color: '#000000',
  },
};

/**
 * OAuthButton - OAuth provider authentication button
 *
 * Features:
 * - Provider-specific icons and branding
 * - Scale animation on press
 * - Haptic feedback
 * - Loading state
 * - Full accessibility support
 *
 * @example
 * <OAuthButton
 *   provider="google"
 *   onPress={handleGoogleLogin}
 *   loading={isLoading}
 * />
 */
export const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  onPress,
  loading = false,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const config = PROVIDER_CONFIG[provider];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 250,
    });
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 250,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${config.name}`}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
    >
      <Animated.View
        style={[
          styles.button,
          animatedStyle,
          (disabled || loading) && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={AUTH_COLORS.primary.base} />
        ) : (
          <>
            <View style={styles.iconContainer}>
              <Icon
                name={config.icon}
                size={AUTH_DIMENSIONS.oauthIconSize}
                color={config.color}
              />
            </View>
            <Text style={styles.text}>Continue with {config.name}</Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.background.surface,
    borderColor: AUTH_COLORS.border.light,
    borderRadius: AUTH_RADIUS.regular,
    borderWidth: 1,
    flexDirection: 'row',
    height: AUTH_DIMENSIONS.oauthButtonHeight,
    justifyContent: 'center',
    paddingHorizontal: AUTH_SPACING.md,
  },
  disabled: {
    opacity: 0.6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AUTH_SPACING.sm,
    width: AUTH_DIMENSIONS.oauthIconSize,
  },
  text: {
    color: AUTH_COLORS.text.primary,
    fontSize: AUTH_TYPOGRAPHY.button.fontSize,
    fontWeight: '600',
    lineHeight: AUTH_TYPOGRAPHY.button.lineHeight,
  },
});
