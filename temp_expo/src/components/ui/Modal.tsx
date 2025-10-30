import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing, borderRadius, layout } from '@/constants/spacing';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  containerStyle?: ViewStyle;
  dismissable?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  title,
  containerStyle,
  dismissable = true,
  animationType = 'slide',
}) => {
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
              {title && <Text style={styles.title}>{title}</Text>}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  container: {
    backgroundColor: colors.background,
    borderRadius: layout.modalBorderRadius,
    padding: layout.modalPadding,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});
