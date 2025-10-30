// Color picker for signature colors

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SignatureColor } from '@/types/signature.types';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface ColorPickerProps {
  selectedColor: SignatureColor;
  onColorSelect: (color: SignatureColor) => void;
}

const colorOptions = [
  { value: SignatureColor.Black, displayColor: colors.signatureBlack },
  { value: SignatureColor.Blue, displayColor: colors.signatureBlue },
  { value: SignatureColor.Red, displayColor: colors.signatureRed },
  { value: SignatureColor.White, displayColor: colors.signatureWhite },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <View style={styles.container}>
      {colorOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.colorButton,
            {
              backgroundColor: option.displayColor,
              borderColor: selectedColor === option.value ? colors.primary : colors.border,
              borderWidth: selectedColor === option.value ? 3 : 1,
            },
            // Add black border for white color for visibility
            option.value === SignatureColor.White && styles.whiteColor,
          ]}
          onPress={() => onColorSelect(option.value)}
          activeOpacity={0.7}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  colorButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  whiteColor: {
    borderColor: colors.borderDark,
    borderWidth: 2,
  },
});
