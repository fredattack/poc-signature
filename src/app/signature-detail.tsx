// Signature detail screen

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/shared/Header';
import { SyncStatusBadge } from '@/components/ui/SyncStatusBadge';
import { Toast } from '@/components/ui/Toast';
import { useSignaturesStore } from '@/store/signatures-store';
import { useAnalytics } from '@/hooks/useAnalytics';
import { shareImage } from '@/services/sharing/share-service';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { formatDateTime, formatLocation } from '@/utils/formatters';

export default function SignatureDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const signatureId = params.signatureId as string;

  const { getById, removeSignature } = useSignaturesStore();
  const { track } = useAnalytics();

  const signature = getById(signatureId);

  const [isSharing, setIsSharing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (signature) {
      track(ANALYTICS_EVENTS.SIGNATURE_VIEWED, {
        signature_id: signature.id,
        celebrity_name: signature.celebrityName,
      });
    }
  }, [signature, track]);

  if (!signature) {
    return (
      <View style={styles.container}>
        <Header
          title="Signature"
          leftAction={<Text style={styles.backText}>Back</Text>}
          onLeftPress={() => router.back()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Signature not found</Text>
        </View>
      </View>
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
        setToastMessage(result.error || 'Failed to share signature');
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
          onPress: async () => {
            await removeSignature(signature.id);
            track(ANALYTICS_EVENTS.SIGNATURE_DELETED, {
              signature_id: signature.id,
              celebrity_name: signature.celebrityName,
            });
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Signature Details"
        leftAction={<Text style={styles.backText}>Back</Text>}
        onLeftPress={() => router.back()}
        rightAction={<Text style={styles.deleteText}>Delete</Text>}
        onRightPress={handleDelete}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Signature Image */}
        <Card style={styles.imageCard} padding="none">
          <Image
            source={{ uri: signature.signatureImagePath }}
            style={styles.signatureImage}
            resizeMode="contain"
          />
        </Card>

        {/* Metadata Card */}
        <Card style={styles.metadataCard}>
          <View style={styles.metadataRow}>
            <Text style={styles.label}>Celebrity</Text>
            <Text style={styles.value}>{signature.celebrityName}</Text>
          </View>

          <View style={styles.metadataRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{formatDateTime(signature.capturedAt)}</Text>
          </View>

          <View style={styles.metadataRow}>
            <Text style={styles.label}>Color</Text>
            <View style={styles.colorIndicator}>
              <View
                style={[
                  styles.colorSwatch,
                  { backgroundColor: signature.signatureColor },
                ]}
              />
              <Text style={styles.value}>{signature.signatureColor}</Text>
            </View>
          </View>

          {signature.location && (
            <View style={styles.metadataRow}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>
                {formatLocation(signature.location.city, signature.location.country)}
              </Text>
            </View>
          )}

          <View style={styles.metadataRow}>
            <Text style={styles.label}>Sync Status</Text>
            <SyncStatusBadge status={signature.syncStatus} size="medium" />
          </View>
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
            onPress={handleShare}
            variant="secondary"
            fullWidth
            loading={isSharing}
            disabled={isSharing}
          />
        </View>

        {/* Info */}
        <Text style={styles.infoText}>
          Transform this signature into a beautiful custom wallpaper or share it with your friends
        </Text>
      </ScrollView>

      {/* Toast notification */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onDismiss={() => setToastVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  imageCard: {
    marginBottom: spacing.lg,
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  signatureImage: {
    width: '100%',
    height: 300,
  },
  metadataCard: {
    marginBottom: spacing.lg,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
  },
  value: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
  colorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actions: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.error,
  },
  backText: {
    ...typography.body,
    color: colors.primary,
  },
  deleteText: {
    ...typography.body,
    color: colors.error,
  },
});
