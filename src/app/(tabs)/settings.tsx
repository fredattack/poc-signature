import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeTokens } from '@/theme';
import { Toggle } from '@/components/ui';

export default function SettingsScreen() {
  const { colors, mode, userMode, setThemeMode } = useThemeTokens();

  const isDarkMode = mode === 'dark';
  const isSystemMode = userMode === 'system';

  const handleThemeToggle = (enabled: boolean) => {
    void setThemeMode(enabled ? 'dark' : 'light');
  };

  const handleSystemTheme = () => {
    void setThemeMode('system');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.surface.background }]}
    >
      {/* Header */}
      <View
        style={[styles.header, { borderBottomColor: colors.overlay.light }]}
      >
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          Settings
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            APPEARANCE
          </Text>

          {/* Dark Mode Toggle */}
          <View
            style={[
              styles.settingRow,
              {
                backgroundColor: colors.surface.card,
                borderColor: colors.overlay.light,
              },
            ]}
          >
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: colors.text.primary }]}
              >
                Dark Mode
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.text.secondary },
                ]}
              >
                {isSystemMode
                  ? 'Using system preference'
                  : isDarkMode
                    ? 'Dark theme enabled'
                    : 'Light theme enabled'}
              </Text>
            </View>
            <Toggle
              value={isDarkMode && !isSystemMode}
              onToggle={handleThemeToggle}
              disabled={isSystemMode}
            />
          </View>

          {/* Use System Theme */}
          <TouchableOpacity
            style={[
              styles.settingRow,
              {
                backgroundColor: colors.surface.card,
                borderColor: colors.overlay.light,
              },
            ]}
            onPress={handleSystemTheme}
          >
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: colors.text.primary }]}
              >
                Use System Theme
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.text.secondary },
                ]}
              >
                Follow device appearance settings
              </Text>
            </View>
            {isSystemMode && (
              <Text style={[styles.checkmark, { color: colors.brand.primary }]}>
                ✓
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            ABOUT
          </Text>

          <View
            style={[
              styles.settingRow,
              {
                backgroundColor: colors.surface.card,
                borderColor: colors.overlay.light,
              },
            ]}
          >
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: colors.text.primary }]}
              >
                Version
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.text.secondary },
                ]}
              >
                1.0.0
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.settingRow,
              {
                backgroundColor: colors.surface.card,
                borderColor: colors.overlay.light,
              },
            ]}
          >
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: colors.text.primary }]}
              >
                Current Theme
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.text.secondary },
                ]}
              >
                {mode === 'dark' ? 'Dark' : 'Light'} (
                {isSystemMode ? 'System' : 'Manual'})
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.settingRow,
              {
                backgroundColor: colors.surface.card,
                borderColor: colors.overlay.light,
              },
            ]}
          >
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: colors.text.primary }]}
              >
                Platform
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.text.secondary },
                ]}
              >
                {Platform.OS === 'ios' ? 'iOS' : 'Android'}
              </Text>
            </View>
          </View>
        </View>

        {/* Debug Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            DEBUG
          </Text>

          <View
            style={[
              styles.debugBox,
              {
                backgroundColor: colors.surface.card,
                borderColor: colors.overlay.light,
              },
            ]}
          >
            <Text style={[styles.debugText, { color: colors.text.tertiary }]}>
              Mode: {mode}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.tertiary }]}>
              User Preference: {userMode}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.tertiary }]}>
              Background: {colors.surface.background}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.tertiary }]}>
              Primary Color: {colors.brand.primary}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkmark: {
    fontSize: 20,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
  },
  debugBox: {
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    padding: 16,
  },
  debugText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 13,
    marginBottom: 4,
  },
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  settingDescription: {
    fontSize: 13,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingRow: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
