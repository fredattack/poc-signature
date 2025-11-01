import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Input,
  Modal,
  Toast,
  Toggle,
} from '@/components/ui';
import { useThemeTokens } from '@/theme';

/**
 * Design System Demo Screen
 *
 * This screen showcases all UI components with their variants and states.
 * Useful for visual regression testing and design validation.
 *
 * Usage: Navigate to /design-system-demo to view this screen
 */
export const DesignSystemDemo: React.FC = () => {
  const theme = useThemeTokens();
  const [checked, setChecked] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success');

  const showToast = (variant: 'success' | 'error' | 'warning' | 'info') => {
    setToastVariant(variant);
    setToastVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface.background,
      flex: 1,
    },
    scrollContent: {
      padding: theme.tokens.spacing.md,
    },
    section: {
      marginBottom: theme.tokens.spacing.lg,
    },
    sectionContent: {
      gap: theme.tokens.spacing.sm,
    },
    sectionTitle: {
      color: theme.colors.text.primary,
      fontSize: theme.tokens.typography.headingM.fontSize,
      fontWeight: theme.tokens.typography.headingM.fontWeight,
      marginBottom: theme.tokens.spacing.sm,
    },
    title: {
      color: theme.colors.text.primary,
      fontSize: theme.tokens.typography.headingL.fontSize,
      fontWeight: theme.tokens.typography.headingL.fontWeight,
      marginBottom: theme.tokens.spacing.md,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Design System Demo</Text>
        <Text
          style={{
            color: theme.colors.text.secondary,
            marginBottom: theme.tokens.spacing.lg,
            textAlign: 'center',
          }}
        >
          Mode: {theme.mode} • All UI components showcase
        </Text>

        {/* Buttons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <View style={styles.sectionContent}>
            <Button
              title="Primary Button"
              onPress={() => showToast('success')}
              variant="primary"
            />
            <Button
              title="Secondary Button"
              onPress={() => showToast('info')}
              variant="secondary"
            />
            <Button
              title="Ghost Button"
              onPress={() => showToast('info')}
              variant="ghost"
            />
            <Button
              title="Loading Button"
              onPress={() => {}}
              loading
              variant="primary"
            />
            <Button
              title="Disabled Button"
              onPress={() => {}}
              disabled
              variant="primary"
            />
            <View
              style={{ flexDirection: 'row', gap: theme.tokens.spacing.sm }}
            >
              <Button
                title="Small"
                onPress={() => {}}
                size="small"
                variant="primary"
              />
              <Button
                title="Medium"
                onPress={() => {}}
                size="medium"
                variant="primary"
              />
              <Button
                title="Large"
                onPress={() => {}}
                size="large"
                variant="primary"
              />
            </View>
          </View>
        </View>

        <Divider />

        {/* Inputs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inputs</Text>
          <View style={styles.sectionContent}>
            <Input label="Default Input" placeholder="Enter text..." />
            <Input
              label="Input with Helper"
              placeholder="Enter email..."
              helperText="We'll never share your email"
            />
            <Input
              label="Input with Error"
              placeholder="Enter password..."
              error="Password is required"
            />
            <Input
              label="Disabled Input"
              placeholder="Disabled..."
              editable={false}
            />
          </View>
        </View>

        <Divider />

        {/* Badges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.sectionContent}>
            <Text style={{ color: theme.colors.text.secondary }}>Solid:</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.tokens.spacing.xs,
              }}
            >
              <Badge label="Primary" color="primary" variant="solid" />
              <Badge label="Success" color="success" variant="solid" />
              <Badge label="Error" color="error" variant="solid" />
              <Badge label="Warning" color="warning" variant="solid" />
              <Badge label="Info" color="info" variant="solid" />
              <Badge label="Neutral" color="neutral" variant="solid" />
            </View>

            <Text style={{ color: theme.colors.text.secondary }}>
              Outlined:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.tokens.spacing.xs,
              }}
            >
              <Badge label="Primary" color="primary" variant="outlined" />
              <Badge label="Success" color="success" variant="outlined" />
              <Badge label="Error" color="error" variant="outlined" />
            </View>

            <Text style={{ color: theme.colors.text.secondary }}>Subtle:</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.tokens.spacing.xs,
              }}
            >
              <Badge label="Primary" color="primary" variant="subtle" />
              <Badge label="Success" color="success" variant="subtle" />
              <Badge label="Error" color="error" variant="subtle" />
            </View>

            <Text style={{ color: theme.colors.text.secondary }}>Sizes:</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: theme.tokens.spacing.xs,
              }}
            >
              <Badge label="Small" size="sm" />
              <Badge label="Medium" size="md" />
            </View>
          </View>
        </View>

        <Divider />

        {/* Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cards</Text>
          <View style={styles.sectionContent}>
            <Card elevated padding="medium">
              <Text style={{ color: theme.colors.text.primary }}>
                Elevated Card
              </Text>
              <Text style={{ color: theme.colors.text.secondary }}>
                This card has elevation shadow
              </Text>
            </Card>

            <Card elevated={false} padding="large">
              <Text style={{ color: theme.colors.text.primary }}>
                Flat Card
              </Text>
              <Text style={{ color: theme.colors.text.secondary }}>
                This card has no shadow
              </Text>
            </Card>
          </View>
        </View>

        <Divider />

        {/* Checkbox & Toggle Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Checkbox & Toggle</Text>
          <View style={styles.sectionContent}>
            <Checkbox
              checked={checked}
              onToggle={setChecked}
              label="Accept terms and conditions"
            />
            <Checkbox
              checked
              onToggle={() => {}}
              disabled
              label="Disabled checked"
            />
            <Checkbox
              checked={false}
              onToggle={() => {}}
              disabled
              label="Disabled unchecked"
            />
            <Checkbox
              checked={false}
              onToggle={() => {}}
              indeterminate
              label="Indeterminate"
            />

            <Divider spacing="sm" />

            <Toggle
              value={toggleValue}
              onToggle={setToggleValue}
              label="Enable notifications"
            />
            <Toggle value onToggle={() => {}} disabled label="Disabled ON" />
            <Toggle
              value={false}
              onToggle={() => {}}
              disabled
              label="Disabled OFF"
            />
          </View>
        </View>

        <Divider />

        {/* Modal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal</Text>
          <Button
            title="Show Modal"
            onPress={() => setModalVisible(true)}
            variant="secondary"
          />
        </View>

        <Divider />

        {/* Toast Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Toast Notifications</Text>
          <View style={styles.sectionContent}>
            <Button
              title="Success Toast"
              onPress={() => showToast('success')}
              variant="secondary"
            />
            <Button
              title="Error Toast"
              onPress={() => showToast('error')}
              variant="secondary"
            />
            <Button
              title="Warning Toast"
              onPress={() => showToast('warning')}
              variant="secondary"
            />
            <Button
              title="Info Toast"
              onPress={() => showToast('info')}
              variant="secondary"
            />
          </View>
        </View>

        <Divider />

        {/* Dividers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dividers</Text>
          <View style={styles.sectionContent}>
            <Text style={{ color: theme.colors.text.secondary }}>Solid:</Text>
            <Divider variant="solid" spacing="sm" />
            <Text style={{ color: theme.colors.text.secondary }}>Dashed:</Text>
            <Divider variant="dashed" spacing="sm" />
            <Text style={{ color: theme.colors.text.secondary }}>Dotted:</Text>
            <Divider variant="dotted" spacing="sm" />
          </View>
        </View>

        {/* Color Palette Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Palette</Text>
          <View style={styles.sectionContent}>
            <View
              style={{
                backgroundColor: theme.colors.brand.primary,
                borderRadius: theme.tokens.radii.mild,
                padding: theme.tokens.spacing.sm,
              }}
            >
              <Text style={{ color: theme.colors.text.inverse }}>
                Primary (Sage Green)
              </Text>
              <Text style={{ color: theme.colors.text.inverse, fontSize: 12 }}>
                {theme.colors.brand.primary}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: theme.colors.brand.secondary,
                borderRadius: theme.tokens.radii.mild,
                padding: theme.tokens.spacing.sm,
              }}
            >
              <Text style={{ color: theme.colors.text.primary }}>
                Secondary (Warm Beige)
              </Text>
              <Text style={{ color: theme.colors.text.primary, fontSize: 12 }}>
                {theme.colors.brand.secondary}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: theme.colors.brand.accent,
                borderRadius: theme.tokens.radii.mild,
                padding: theme.tokens.spacing.sm,
              }}
            >
              <Text style={{ color: theme.colors.text.primary }}>
                Accent (Water Green)
              </Text>
              <Text style={{ color: theme.colors.text.primary, fontSize: 12 }}>
                {theme.colors.brand.accent}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal Demo */}
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Demo Modal"
      >
        <Text style={{ color: theme.colors.text.primary }}>
          This is a modal dialog. Tap outside to close.
        </Text>
        <Button
          title="Close"
          onPress={() => setModalVisible(false)}
          variant="primary"
          style={{ marginTop: theme.tokens.spacing.md }}
        />
      </Modal>

      {/* Toast Demo */}
      <Toast
        visible={toastVisible}
        variant={toastVariant}
        message={`This is a ${toastVariant} toast!`}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};
