import React, { useMemo } from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeTokens } from '@/theme';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  dismissable?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  title?: string;
  accessibilityLabel?: string;
}

/**
 * Modal component with blur background and accessibility
 *
 * Features:
 * - Slide or fade animation
 * - Dismissable by tapping overlay (optional)
 * - Hardware back button support (Android)
 * - Full accessibility support (aria-modal)
 * - Optional title header
 *
 * @example
 * <Modal
 *   visible={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Confirm Action"
 * >
 *   <Text>Are you sure?</Text>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  containerStyle,
  dismissable = true,
  animationType = 'slide',
  title,
  accessibilityLabel,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={dismissable ? onClose : undefined}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[styles.container, containerStyle]}
              accessible
              accessibilityViewIsModal
              accessibilityLabel={accessibilityLabel ?? title ?? 'Modal'}
            >
              {title ? <Text style={styles.title}>{title}</Text> : null}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const titleTypography = {
    fontSize: tokens.typography.headingS.fontSize,
    lineHeight: tokens.typography.headingS.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.headingS.letterSpacing,
  };

  return StyleSheet.create({
    backdrop: {
      alignItems: 'center',
      backgroundColor: colors.overlay.medium,
      flex: 1,
      justifyContent: 'center',
      padding: tokens.spacing.lg,
    },
    container: {
      backgroundColor: colors.surface.card,
      borderRadius: tokens.radii.generous,
      maxWidth: 400,
      padding: tokens.spacing.lg,
      width: '100%',
      ...tokens.elevation.level3,
    },
    title: {
      ...titleTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.sm,
    },
  });
};
