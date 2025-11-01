// Color picker for signature colors

import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const getColorButtonStyle = (optionValue: SignatureColor) => {
    const isSelected = selectedColor === optionValue;
    const defaultBorderColor =
      theme.mode === 'dark'
        ? 'rgba(244, 244, 244, 0.16)'
        : 'rgba(35, 35, 35, 0.12)';

    return {
      borderColor: isSelected ? theme.colors.brand.primary : defaultBorderColor,
      borderWidth: isSelected ? 3 : 1,
    };
  };

  return (
    <View style={styles.container}>
      {colorOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.colorButton,
            {
              backgroundColor: option.displayColor,
              ...getColorButtonStyle(option.value),
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

const createStyles = ({ tokens, mode }: ReturnType<typeof useThemeTokens>) => {
  const defaultBorder =
    mode === 'dark' ? 'rgba(244, 244, 244, 0.16)' : 'rgba(35, 35, 35, 0.12)';

  return StyleSheet.create({
    colorButton: {
      borderColor: defaultBorder,
      borderRadius: 24,
      borderWidth: 1,
      height: 48,
      width: 48,
      ...tokens.elevation.level1,
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: tokens.spacing.md,
      justifyContent: 'center',
    },
    whiteColor: {
      borderColor: defaultBorder,
      borderWidth: 2,
    },
  });
};
