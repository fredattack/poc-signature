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
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  containerStyle,
  dismissable = true,
  animationType = 'slide',
  title,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={dismissable ? onClose : undefined}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={[styles.container, containerStyle]}>
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
