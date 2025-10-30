import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, layout } from '@/constants/spacing';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  dismissable?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
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
            <View style={[styles.container, containerStyle]}>{children}</View>
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
});
