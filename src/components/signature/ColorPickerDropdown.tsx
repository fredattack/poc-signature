// Dropdown color picker with modern compact design

import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SignatureColor } from '@/types/signature.types';
import { useThemeTokens } from '@/theme';

export interface ColorOption {
  name: string;
  value: SignatureColor;
  hex: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { name: 'Black', value: SignatureColor.Black, hex: '#000000' },
  { name: 'Blue', value: SignatureColor.Blue, hex: '#2563EB' },
  { name: 'Red', value: SignatureColor.Red, hex: '#DC2626' },
  { name: 'Sage Green', value: SignatureColor.White, hex: '#8A9A5B' },
];

export interface ColorPickerDropdownProps {
  value: SignatureColor;
  onChange: (color: SignatureColor) => void;
  disabled?: boolean;
}

/**
 * Compact dropdown color picker
 *
 * Features:
 * - Compact trigger with color swatch + name + chevron
 * - Modal dropdown with color options
 * - Checkmark for selected color
 * - Smooth fade in/out animations
 * - Dark mode support
 * - Full accessibility
 *
 * @example
 * <ColorPickerDropdown
 *   value={SignatureColor.Black}
 *   onChange={setColor}
 * />
 */
export const ColorPickerDropdown: React.FC<ColorPickerDropdownProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const selectedOption =
    COLOR_OPTIONS.find((opt) => opt.value === value) ?? COLOR_OPTIONS[0];

  const handleSelect = (color: SignatureColor) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        style={[styles.trigger, disabled && styles.triggerDisabled]}
        onPress={() => setIsOpen(true)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`Select color. Current: ${selectedOption?.name ?? 'Unknown'}`}
        accessibilityHint="Opens color picker menu"
      >
        <View style={styles.triggerContent}>
          <View
            style={[
              styles.swatch,
              { backgroundColor: selectedOption?.hex ?? '#000000' },
              selectedOption?.value === SignatureColor.White &&
                styles.swatchBorder,
            ]}
          />
          <Text style={styles.triggerText}>
            {selectedOption?.name ?? 'Select'}
          </Text>
        </View>
        <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.dropdown}
          >
            {COLOR_OPTIONS.map((option) => {
              const isSelected = option.value === value;

              return (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => handleSelect(option.value)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  accessibilityLabel={option.name}
                >
                  <View style={styles.optionContent}>
                    <View
                      style={[
                        styles.optionSwatch,
                        { backgroundColor: option.hex },
                        option.value === SignatureColor.White &&
                          styles.swatchBorder,
                      ]}
                    />
                    <Text style={styles.optionText}>{option.name}</Text>
                  </View>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
  const borderColor =
    mode === 'dark' ? 'rgba(244, 244, 244, 0.16)' : 'rgba(35, 35, 35, 0.12)';

  return StyleSheet.create({
    checkmark: {
      color: colors.brand.primary,
      fontSize: 18,
      fontWeight: '600' as const,
    },
    chevron: {
      color: colors.text.secondary,
      fontSize: 12,
    },
    dropdown: {
      backgroundColor: colors.surface.card,
      borderColor,
      borderRadius: tokens.radii.regular,
      borderWidth: 1,
      marginTop: 4,
      overflow: 'hidden',
      width: 200,
      ...tokens.elevation.level3,
    },
    option: {
      alignItems: 'center',
      borderBottomColor: borderColor,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
    },
    optionContent: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: tokens.spacing.sm,
    },
    optionSelected: {
      backgroundColor:
        mode === 'dark'
          ? 'rgba(138, 154, 91, 0.1)'
          : 'rgba(138, 154, 91, 0.08)',
    },
    optionSwatch: {
      borderRadius: 12,
      height: 24,
      width: 24,
    },
    optionText: {
      color: colors.text.primary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: tokens.typography.body.fontWeight,
    },
    overlay: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      flex: 1,
      justifyContent: 'center',
    },
    swatch: {
      borderRadius: 10,
      height: 20,
      width: 20,
    },
    swatchBorder: {
      borderColor,
      borderWidth: 1,
    },
    trigger: {
      alignItems: 'center',
      backgroundColor: colors.surface.card,
      borderColor,
      borderRadius: tokens.radii.mild,
      borderWidth: 1,
      flexDirection: 'row',
      height: 40,
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.sm,
    },
    triggerContent: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: tokens.spacing.xs,
    },
    triggerDisabled: {
      opacity: 0.5,
    },
    triggerText: {
      color: colors.text.primary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: '500' as const,
    },
  });
};
