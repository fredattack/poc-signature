// Template carousel with horizontal scroll

import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TemplateConfig } from '@/types/template.types';
import { getFreeTemplates, getPremiumTemplates } from '@/constants/templates';
import { useThemeTokens } from '@/theme';

export interface TemplateCarouselProps {
  selectedTemplateId: string;
  onTemplateSelect: (templateId: string) => void;
  isPremium?: boolean;
  onPremiumRequired?: () => void;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  selectedTemplateId,
  onTemplateSelect,
  isPremium = false,
  onPremiumRequired,
}) => {
  const freeTemplates = getFreeTemplates();
  const premiumTemplates = getPremiumTemplates();
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleTemplatePress = (template: TemplateConfig) => {
    if (template.isPremium && !isPremium) {
      onPremiumRequired?.();
    } else {
      onTemplateSelect(template.id);
    }
  };

  const renderTemplate = (template: TemplateConfig) => {
    const isSelected = selectedTemplateId === template.id;
    const isLocked = template.isPremium && !isPremium;

    return (
      <TouchableOpacity
        key={template.id}
        style={[styles.templateCard, isSelected && styles.templateCardSelected]}
        onPress={() => handleTemplatePress(template)}
        activeOpacity={0.7}
      >
        {/* Template Preview */}
        <View
          style={[
            styles.templatePreview,
            { backgroundColor: template.style.backgroundColor },
          ]}
        >
          {/* Gradient preview */}
          {template.style.gradient && (
            <View
              style={[
                styles.gradientPreview,
                {
                  backgroundColor: template.style.gradient.colors[0],
                  opacity: 0.7,
                },
              ]}
            />
          )}

          {/* Lock icon for premium templates */}
          {isLocked && (
            <View style={styles.lockBadge}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}

          {/* Sample text */}
          <Text
            style={[styles.sampleText, { color: template.style.textColor }]}
          >
            Aa
          </Text>
        </View>

        {/* Template Name */}
        <Text
          style={[
            styles.templateName,
            isSelected && styles.templateNameSelected,
          ]}
          numberOfLines={1}
        >
          {template.name}
        </Text>

        {/* Premium Badge */}
        {template.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PRO</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Free Templates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Free</Text>
          <View style={styles.templatesRow}>
            {freeTemplates.map(renderTemplate)}
          </View>
        </View>

        {/* Premium Templates Section */}
        {premiumTemplates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Premium</Text>
            <View style={styles.templatesRow}>
              {premiumTemplates.map(renderTemplate)}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
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

  const headingTypography = {
    fontSize: tokens.typography.headingM.fontSize,
    lineHeight: tokens.typography.headingM.lineHeight,
    fontWeight: tokens.typography.headingM.fontWeight,
    letterSpacing: tokens.typography.headingM.letterSpacing,
  };

  const borderColor =
    mode === 'dark' ? 'rgba(244, 244, 244, 0.16)' : 'rgba(35, 35, 35, 0.12)';

  return StyleSheet.create({
    container: {
      marginVertical: tokens.spacing.md,
    },
    gradientPreview: {
      ...StyleSheet.absoluteFillObject,
    },
    lockBadge: {
      alignItems: 'center',
      backgroundColor: colors.overlay.medium,
      borderRadius: tokens.radii.full,
      height: 28,
      justifyContent: 'center',
      position: 'absolute',
      right: 8,
      top: 8,
      width: 28,
    },
    lockIcon: {
      fontSize: 14,
    },
    premiumBadge: {
      backgroundColor: colors.brand.primary,
      borderRadius: tokens.radii.mild,
      marginTop: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.xs,
      paddingVertical: 2,
    },
    premiumText: {
      ...captionTypography,
      color: colors.text.inverse,
      fontSize: 10,
      fontWeight: '700',
    },
    sampleText: {
      ...headingTypography,
      fontWeight: 'bold',
    },
    scrollContent: {
      paddingHorizontal: tokens.spacing.md,
    },
    section: {
      marginRight: tokens.spacing.lg,
    },
    sectionTitle: {
      ...labelTypography,
      color: colors.text.secondary,
      marginBottom: tokens.spacing.sm,
    },
    templateCard: {
      alignItems: 'center',
      width: 100,
    },
    templateCardSelected: {
      transform: [{ scale: 1.05 }],
    },
    templateName: {
      ...captionTypography,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    templateNameSelected: {
      color: colors.brand.primary,
      fontWeight: '600',
    },
    templatePreview: {
      alignItems: 'center',
      backgroundColor: colors.surface.background,
      borderColor,
      borderRadius: tokens.radii.regular,
      borderWidth: 2,
      height: 120,
      justifyContent: 'center',
      marginBottom: tokens.spacing.xs,
      overflow: 'hidden',
      position: 'relative',
      width: 90,
      ...tokens.elevation.level1,
    },
    templatesRow: {
      flexDirection: 'row',
      gap: tokens.spacing.sm,
    },
  });
};
