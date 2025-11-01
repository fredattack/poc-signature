import { memo, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '@/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Toast, ToastVariant } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';

const ColorSwatch = memo(
  ({
    label,
    value,
    textColor,
    secondaryColor,
    borderColor,
  }: {
    label: string;
    value: string;
    textColor: string;
    secondaryColor: string;
    borderColor: string;
  }) => (
    <View style={styles.swatchContainer}>
      <View style={[styles.swatch, { backgroundColor: value, borderColor }]} />
      <View style={styles.swatchMeta}>
        <Text style={[styles.metaLabel, { color: textColor }]}>{label}</Text>
        <Text style={[styles.metaValue, { color: secondaryColor }]}>
          {value}
        </Text>
      </View>
    </View>
  )
);

const TypographyPreview = memo(
  ({
    label,
    styleKey,
  }: {
    label: string;
    styleKey: keyof ReturnType<typeof useThemeTokens>['tokens']['typography'];
  }) => {
    const {
      tokens: { typography },
      colors,
    } = useThemeTokens();

    const token = typography[styleKey];

    const metaColor = colors.text.secondary;

    return (
      <View style={styles.typographyRow}>
        <Text
          style={{
            color: colors.text.primary,
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
            fontWeight: token.fontWeight,
            letterSpacing: token.letterSpacing,
          }}
        >
          {label}
        </Text>
        <Text style={[styles.metaValue, { marginTop: 4, color: metaColor }]}>
          {`${token.fontSize}/${token.lineHeight} — ${token.fontWeight} — tracking ${token.tracking}%`}
        </Text>
      </View>
    );
  }
);

export default function ThemeSandboxScreen() {
  const { colors, tokens, mode } = useThemeTokens();
  const swatchBorder =
    mode === 'dark' ? 'rgba(244, 244, 244, 0.16)' : 'rgba(0,0,0,0.08)';
  const [inputValue, setInputValue] = useState('John Doe');
  const [toastState, setToastState] = useState<{
    visible: boolean;
    variant: ToastVariant;
    message: string;
  }>({ visible: false, variant: 'info', message: 'Bienvenue dans la sandbox' });
  const [modalVisible, setModalVisible] = useState(false);

  const componentBackground = useMemo(
    () => ({ backgroundColor: colors.surface.background }),
    [colors.surface.background]
  );

  const showToast = (variant: ToastVariant) => {
    const messages: Record<ToastVariant, string> = {
      success: 'Action réussie',
      error: 'Une erreur est survenue',
      warning: 'Attention',
      info: 'Information importante',
    };

    setToastState({
      visible: true,
      variant,
      message: messages[variant],
    });
  };

  return (
    <>
      <ScrollView
        style={[styles.container, componentBackground]}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={[styles.heading, { color: colors.text.primary }]}>
          Palette principale
        </Text>

        <View style={styles.section}>
          {Object.entries(tokens.colors.brand).map(([key, value]) => (
            <ColorSwatch
              key={key}
              label={key}
              value={value}
              textColor={colors.text.primary}
              secondaryColor={colors.text.secondary}
              borderColor={swatchBorder}
            />
          ))}
        </View>

        <Text style={[styles.heading, { color: colors.text.primary }]}>
          Surface & textes
        </Text>
        <View style={styles.section}>
          {Object.entries(tokens.colors.surface).map(([key, value]) => (
            <ColorSwatch
              key={key}
              label={key}
              value={value}
              textColor={colors.text.primary}
              secondaryColor={colors.text.secondary}
              borderColor={swatchBorder}
            />
          ))}
          {Object.entries(tokens.colors.text).map(([key, value]) => (
            <ColorSwatch
              key={key}
              label={key}
              value={value}
              textColor={colors.text.primary}
              secondaryColor={colors.text.secondary}
              borderColor={swatchBorder}
            />
          ))}
        </View>

        <Text style={[styles.heading, { color: colors.text.primary }]}>
          Échelles typographiques
        </Text>
        <View style={styles.section}>
          <TypographyPreview label="Display Large" styleKey="displayL" />
          <TypographyPreview label="Heading Large" styleKey="headingL" />
          <TypographyPreview label="Heading Small" styleKey="headingS" />
          <TypographyPreview label="Body" styleKey="body" />
          <TypographyPreview label="Caption" styleKey="caption" />
        </View>

        <Text style={[styles.heading, { color: colors.text.primary }]}>
          Composants UI
        </Text>
        <View style={styles.section}>
          <View style={styles.componentGroup}>
            <Text
              style={[styles.componentLabel, { color: colors.text.secondary }]}
            >
              Boutons
            </Text>
            <View style={styles.buttonRow}>
              <Button title="Primary" onPress={() => {}} />
              <Button
                title="Secondary"
                variant="secondary"
                onPress={() => {}}
              />
              <Button title="Ghost" variant="ghost" onPress={() => {}} />
            </View>
          </View>

          <View style={styles.componentGroup}>
            <Text
              style={[styles.componentLabel, { color: colors.text.secondary }]}
            >
              Input
            </Text>
            <Input
              label="Nom complet"
              placeholder="Votre nom"
              value={inputValue}
              onChangeText={setInputValue}
              helperText="Utilise la typographie Body"
            />
          </View>

          <View style={styles.componentGroup}>
            <Text
              style={[styles.componentLabel, { color: colors.text.secondary }]}
            >
              Carte
            </Text>
            <Card>
              <Text
                style={{
                  color: colors.text.primary,
                  marginBottom: tokens.spacing.xs,
                }}
              >
                Carte avec élévation niveau 2 et tokens de padding.
              </Text>
              <Button title="Action" size="small" onPress={() => {}} />
            </Card>
          </View>

          <View style={styles.componentGroup}>
            <Text
              style={[styles.componentLabel, { color: colors.text.secondary }]}
            >
              Toast
            </Text>
            <View style={styles.buttonRow}>
              <Button
                title="Succès"
                size="small"
                onPress={() => showToast('success')}
              />
              <Button
                title="Info"
                size="small"
                variant="secondary"
                onPress={() => showToast('info')}
              />
              <Button
                title="Erreur"
                size="small"
                variant="ghost"
                onPress={() => showToast('error')}
              />
            </View>
          </View>

          <View style={styles.componentGroup}>
            <Text
              style={[styles.componentLabel, { color: colors.text.secondary }]}
            >
              Modal
            </Text>
            <Button
              title="Ouvrir la modale"
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      </ScrollView>

      <Toast
        visible={toastState.visible}
        variant={toastState.variant}
        message={toastState.message}
        duration={2500}
        onHide={() => setToastState((prev) => ({ ...prev, visible: false }))}
      />

      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Text
          style={{
            color: colors.text.primary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          Cette modale utilise les tokens `overlay.medium`, `radii.generous` et
          `elevation.level3`.
        </Text>
        <Button title="Fermer" onPress={() => setModalVisible(false)} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  componentGroup: {
    marginBottom: 24,
  },
  componentLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  metaValue: {
    fontSize: 13,
  },
  section: {
    marginBottom: 32,
  },
  swatch: {
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    width: 48,
  },
  swatchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  swatchMeta: {
    marginLeft: 12,
  },
  typographyRow: {
    marginBottom: 16,
  },
});
