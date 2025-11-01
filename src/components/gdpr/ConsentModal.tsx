// GDPR consent modal for analytics opt-in/opt-out

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { asyncStorage } from '@/services/storage/async-storage';
import { STORAGE_KEYS } from '@/utils/constants';
import { useThemeTokens } from '@/theme';

export interface ConsentModalProps {
  onConsent: (accepted: boolean) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onConsent }) => {
  const [visible, setVisible] = useState(false);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    void checkConsentStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkConsentStatus = async () => {
    try {
      const consent = await asyncStorage.get<boolean>(
        STORAGE_KEYS.ANALYTICS_CONSENT
      );
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
          We use analytics to improve your experience and understand how you use
          the app.
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
            onPress={() => void handleAccept()}
            variant="primary"
            fullWidth
          />
          <Button
            title="Decline"
            onPress={() => void handleDecline()}
            variant="secondary"
            fullWidth
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const bodyTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  const labelTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: tokens.typography.caption.fontWeight,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  return StyleSheet.create({
    buttons: {
      gap: tokens.spacing.sm,
    },
    dataItem: {
      ...bodyTypography,
      color: colors.text.secondary,
      marginBottom: tokens.spacing.micro,
    },
    dataList: {
      marginBottom: tokens.spacing.md,
    },
    dataTitle: {
      ...labelTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.xs,
    },
    description: {
      ...bodyTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.md,
    },
    note: {
      ...captionTypography,
      color: colors.text.secondary,
      fontStyle: 'italic',
      marginBottom: tokens.spacing.md,
    },
  });
};
