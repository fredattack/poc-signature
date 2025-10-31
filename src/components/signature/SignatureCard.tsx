// Signature card for grid display

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Signature } from '@/types/signature.types';
import { SyncStatusBadge } from '@/components/ui/SyncStatusBadge';
import { useThemeTokens } from '@/theme';
import { formatRelativeTime } from '@/utils/formatters';

export interface SignatureCardProps {
  signature: Signature;
  onPress: () => void;
}

export const SignatureCard: React.FC<SignatureCardProps> = ({ signature, onPress }) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
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
    </TouchableOpacity>
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
    mode === 'dark'
      ? 'rgba(244, 244, 244, 0.12)'
      : 'rgba(35, 35, 35, 0.08)';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface.card,
      borderRadius: tokens.radii.regular,
      overflow: 'hidden',
      marginBottom: tokens.spacing.sm,
      borderWidth: 1,
      borderColor,
      ...tokens.elevation.level2,
    },
    thumbnailContainer: {
      width: '100%',
      aspectRatio: 1,
      backgroundColor: colors.surface.backgroundTint,
      position: 'relative',
    },
    thumbnail: {
      width: '100%',
      height: '100%',
    },
    statusBadge: {
      position: 'absolute',
      top: tokens.spacing.xs,
      right: tokens.spacing.xs,
    },
    infoContainer: {
      padding: tokens.spacing.sm,
    },
    celebrityName: {
      ...titleTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.xs,
    },
    date: {
      ...captionTypography,
      color: colors.text.secondary,
    },
    location: {
      ...captionTypography,
      color: colors.text.secondary,
      marginTop: tokens.spacing.xs,
    },
  });
};
