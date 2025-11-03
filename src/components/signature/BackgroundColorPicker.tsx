// Background color picker dropdown

import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { useThemeTokens } from '@/theme';
import { useHaptics } from '@/hooks/useHaptics';

export interface BackgroundColorOption {
  name: string;
  value: string;
}

const BACKGROUND_COLOR_OPTIONS: BackgroundColorOption[] = [
  { name: 'Pearl (Default)', value: '#E6E6E6' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Sage', value: '#8A9A5B' },
  { name: 'Beige', value: '#D4C5B9' },
  { name: 'Light Blue', value: '#A8C5DA' },
  { name: 'Black', value: '#000000' },
];

export interface BackgroundColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

export const BackgroundColorPicker: React.FC<BackgroundColorPickerProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const haptics = useHaptics();

  const defaultBackgroundColor = theme.colors.surface.background;
  const currentValue = value ?? defaultBackgroundColor;

  const selectedOption = BACKGROUND_COLOR_OPTIONS.find(
    (opt) => opt.value === currentValue
  );

  const handleOpen = () => {
    haptics.triggerLight();
    setIsOpen(true);
  };

  const handleClose = () => {
    haptics.triggerLight();
    setIsOpen(false);
  };

  const handleSelect = (color: string) => {
    haptics.triggerSelection();
    onChange(color);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        style={[styles.trigger, disabled && styles.triggerDisabled]}
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`Select background. Current: ${selectedOption?.name ?? 'Custom'}`}
        accessibilityHint="Opens background color picker menu"
      >
        <View style={styles.triggerContent}>
          <View
            style={[
              styles.swatch,
              { backgroundColor: currentValue },
              styles.swatchBorder,
            ]}
          />
          <Text style={styles.triggerText}>
            {selectedOption?.name ?? 'Custom'}
          </Text>
        </View>
        <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.dropdown}
          >
            {BACKGROUND_COLOR_OPTIONS.map((option, index) => {
              const isSelected = option.value === currentValue;

              return (
                <Animated.View
                  key={option.value}
                  entering={SlideInDown.delay(index * 50)
                    .duration(200)
                    .springify()}
                >
                  <TouchableOpacity
                    style={[styles.option, isSelected && styles.optionSelected]}
                    onPress={() => handleSelect(option.value)}
                    activeOpacity={0.7}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected }}
                    accessibilityLabel={option.name}
                  >
                    <View style={styles.optionContent}>
                      <View style={styles.optionSwatchContainer}>
                        <View
                          style={[
                            styles.optionSwatch,
                            { backgroundColor: option.value },
                            styles.swatchBorder,
                          ]}
                        />
                        <Text style={styles.optionText}>{option.name}</Text>
                      </View>
                      {isSelected && (
                        <Animated.Text
                          entering={FadeIn.duration(150).springify()}
                          style={styles.checkmark}
                        >
                          ✓
                        </Animated.Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </Animated.View>
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
      width: 220,
      ...tokens.elevation.level3,
    },
    option: {
      borderBottomColor: borderColor,
      borderBottomWidth: 1,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
    },
    optionContent: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    optionSwatchContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: tokens.spacing.sm,
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
