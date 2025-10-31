// Color picker for signature colors

import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SignatureColor } from '@/types/signature.types';
import { useThemeTokens } from '@/theme';

export interface ColorPickerProps {
  selectedColor: SignatureColor;
  onColorSelect: (color: SignatureColor) => void;
}

const colorOptions = [
  { value: SignatureColor.Black, displayColor: '#000000' },
  { value: SignatureColor.Blue, displayColor: '#2563EB' },
  { value: SignatureColor.Red, displayColor: '#DC2626' },
  { value: SignatureColor.White, displayColor: '#FFFFFF' },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {colorOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.colorButton,
            {
              backgroundColor: option.displayColor,
              borderColor:
                selectedColor === option.value
                  ? theme.colors.brand.primary
                  : theme.mode === 'dark'
                    ? 'rgba(244, 244, 244, 0.16)'
                    : 'rgba(35, 35, 35, 0.12)',
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

const createStyles = ({
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
  const defaultBorder =
    mode === 'dark'
      ? 'rgba(244, 244, 244, 0.16)'
      : 'rgba(35, 35, 35, 0.12)';

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.md,
    },
    colorButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderColor: defaultBorder,
      borderWidth: 1,
      ...tokens.elevation.level1,
    },
    whiteColor: {
      borderColor: defaultBorder,
      borderWidth: 2,
    },
  });
};
