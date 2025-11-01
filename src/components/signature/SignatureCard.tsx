// Signature card for grid display

import React, { useEffect, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Signature } from '@/types/signature.types';
import { SyncStatusBadge } from '@/components/ui/SyncStatusBadge';
import { useThemeTokens } from '@/theme';
import { formatRelativeTime } from '@/utils/formatters';

export interface SignatureCardProps {
  signature: Signature;
  onPress: () => void;
}

export const SignatureCard: React.FC<SignatureCardProps> = ({
  signature,
  onPress,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Press animation
  const scale = useSharedValue(1);

  // Entrance animation on mount
  const opacity = useSharedValue(0);
  const entranceScale = useSharedValue(0.9);

  useEffect(() => {
    // Entrance animation
    opacity.value = withSpring(1, {
      damping: 18,
      stiffness: 200,
    });
    entranceScale.value = withSpring(1, {
      damping: 18,
      stiffness: 200,
    });
  }, [opacity, entranceScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * entranceScale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: 15,
      stiffness: 250,
    });
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
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* Signature Thumbnail */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: signature.signatureImagePath }}
            style={styles.thumbnail}
            resizeMode="contain"
          />

          {/* Sync Status Badge */}
          <View style={styles.statusBadge}>
            <SyncStatusBadge status={signature.syncStatus} size="small" />
          </View>
        </View>

        {/* Signature Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.celebrityName} numberOfLines={1}>
            {signature.celebrityName}
          </Text>
          <Text style={styles.date} numberOfLines={1}>
            {formatRelativeTime(signature.capturedAt)}
          </Text>
          {signature.location && (
            <Text style={styles.location} numberOfLines={1}>
              📍 {signature.location.city}
            </Text>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
  const titleTypography = {
    fontSize: tokens.typography.headingS.fontSize,
    lineHeight: tokens.typography.headingS.lineHeight,
    fontWeight: tokens.typography.headingS.fontWeight,
    letterSpacing: tokens.typography.headingS.letterSpacing,
  };

  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: tokens.typography.caption.fontWeight,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  const borderColor =
    mode === 'dark' ? 'rgba(244, 244, 244, 0.12)' : 'rgba(35, 35, 35, 0.08)';

  return StyleSheet.create({
    celebrityName: {
      ...titleTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.xs,
    },
    container: {
      backgroundColor: colors.surface.card,
      borderColor,
      borderRadius: tokens.radii.regular,
      borderWidth: 1,
      flex: 1,
      marginBottom: tokens.spacing.sm,
      overflow: 'hidden',
      ...tokens.elevation.level2,
    },
    date: {
      ...captionTypography,
      color: colors.text.secondary,
    },
    infoContainer: {
      padding: tokens.spacing.sm,
    },
    location: {
      ...captionTypography,
      color: colors.text.secondary,
      marginTop: tokens.spacing.xs,
    },
    statusBadge: {
      position: 'absolute',
      right: tokens.spacing.xs,
      top: tokens.spacing.xs,
    },
    thumbnail: {
      height: '100%',
      width: '100%',
    },
    thumbnailContainer: {
      aspectRatio: 1,
      backgroundColor: colors.surface.backgroundTint,
      position: 'relative',
      width: '100%',
    },
  });
};
