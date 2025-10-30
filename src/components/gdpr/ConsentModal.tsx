// GDPR consent modal for analytics opt-in/opt-out

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { asyncStorage } from '@/services/storage/async-storage';
import { STORAGE_KEYS } from '@/utils/constants';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

export interface ConsentModalProps {
  onConsent: (accepted: boolean) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onConsent }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    checkConsentStatus();
  }, []);

  const checkConsentStatus = async () => {
    try {
      const consent = await asyncStorage.get<boolean>(STORAGE_KEYS.ANALYTICS_CONSENT);
      // If consent is null (never asked), show modal
      if (consent === null) {
        setVisible(true);
      } else {
        // If consent was previously given/denied, respect it
        onConsent(consent);
      }
    } catch (error) {
      console.error('Failed to check consent status:', error);
      // Default to showing modal on error
      setVisible(true);
    }
  };

  const handleAccept = async () => {
    await asyncStorage.set(STORAGE_KEYS.ANALYTICS_CONSENT, true);
    setVisible(false);
    onConsent(true);
  };

  const handleDecline = async () => {
    await asyncStorage.set(STORAGE_KEYS.ANALYTICS_CONSENT, false);
    setVisible(false);
    onConsent(false);
  };

  return (
    <Modal
      visible={visible}
      onClose={() => {}}
      title="Privacy & Analytics"
      dismissable={false}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          We use analytics to improve your experience and understand how you use the app.
        </Text>

        <View style={styles.dataList}>
          <Text style={styles.dataTitle}>We collect:</Text>
          <Text style={styles.dataItem}>• Screen views and navigation</Text>
          <Text style={styles.dataItem}>• Feature usage patterns</Text>
          <Text style={styles.dataItem}>• Error and crash reports</Text>
          <Text style={styles.dataItem}>• Device and app version info</Text>
        </View>

        <View style={styles.dataList}>
          <Text style={styles.dataTitle}>We do NOT collect:</Text>
          <Text style={styles.dataItem}>• Your signature images</Text>
          <Text style={styles.dataItem}>• Celebrity names you enter</Text>
          <Text style={styles.dataItem}>• Personal photos or contacts</Text>
          <Text style={styles.dataItem}>• Location without permission</Text>
        </View>

        <Text style={styles.note}>
          You can change your analytics preferences anytime in Settings.
        </Text>

        <View style={styles.buttons}>
          <Button
            title="Accept"
            onPress={handleAccept}
            variant="primary"
            fullWidth
          />
          <Button
            title="Decline"
            onPress={handleDecline}
            variant="secondary"
            fullWidth
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  description: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  dataList: {
    marginBottom: spacing.lg,
  },
  dataTitle: {
    ...typography.label,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  dataItem: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  note: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },
  buttons: {
    gap: spacing.sm,
  },
});
