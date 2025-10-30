// Signature card for grid display

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Signature } from '@/types/signature.types';
import { SyncStatusBadge } from '@/components/ui/SyncStatusBadge';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing, borderRadius } from '@/constants/spacing';
import { formatRelativeTime } from '@/utils/formatters';

export interface SignatureCardProps {
  signature: Signature;
  onPress: () => void;
}

export const SignatureCard: React.FC<SignatureCardProps> = ({ signature, onPress }) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.backgroundSecondary,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
  infoContainer: {
    padding: spacing.sm,
  },
  celebrityName: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  location: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
