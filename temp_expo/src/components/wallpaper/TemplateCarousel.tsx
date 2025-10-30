// Template carousel with horizontal scroll

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TemplateConfig } from '@/types/template.types';
import { templates, getFreeTemplates, getPremiumTemplates } from '@/constants/templates';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing, borderRadius } from '@/constants/spacing';

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
        style={[
          styles.templateCard,
          isSelected && styles.templateCardSelected,
        ]}
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
            style={[
              styles.sampleText,
              { color: template.style.textColor },
            ]}
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

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  section: {
    marginRight: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  templatesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  templateCard: {
    width: 100,
    alignItems: 'center',
  },
  templateCardSelected: {
    transform: [{ scale: 1.05 }],
  },
  templatePreview: {
    width: 90,
    height: 120,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientPreview: {
    ...StyleSheet.absoluteFillObject,
  },
  sampleText: {
    ...typography.h2,
    fontWeight: 'bold',
  },
  lockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.overlay,
    borderRadius: borderRadius.full,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 14,
  },
  templateName: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  templateNameSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  premiumBadge: {
    marginTop: spacing.xs,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  premiumText: {
    ...typography.caption,
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: '700',
  },
});
