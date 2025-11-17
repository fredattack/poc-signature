/**
 * Debug Authentication Screen
 *
 * Development-only screen for testing authentication flows.
 * Access via: /debug-auth
 */

import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { debugAuthState, resetAuth } from '@/utils/debug-auth';

export default function DebugAuthScreen() {
  const router = useRouter();
  const { isAuthenticated, user, requiresMFA } = useAuthStore();

  const handleResetAuth = async () => {
    try {
      await resetAuth();
      Alert.alert('Success', 'Authentication has been reset', [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
    } catch (error: unknown) {
      console.error('Reset error:', error);
      Alert.alert('Error', 'Failed to reset authentication');
    }
  };

  const handleDebugState = () => {
    debugAuthState();
    Alert.alert('Debug', 'Check console for auth state details');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🔧 Debug Authentication</Text>
        <Text style={styles.subtitle}>Development Tools</Text>

        {/* Current State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current State</Text>
          <View style={styles.stateContainer}>
            <StateItem label="Authenticated" value={isAuthenticated} />
            <StateItem label="Has User" value={!!user} />
            <StateItem label="Requires MFA" value={requiresMFA} />
            {user && (
              <>
                <View style={styles.divider} />
                <Text style={styles.userInfo}>Email: {user.email}</Text>
                <Text style={styles.userInfo}>
                  Name: {user.first_name} {user.last_name}
                </Text>
                <Text style={styles.userInfo}>
                  MFA: {user.mfa_enabled ? 'Enabled' : 'Disabled'}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>

          <DebugButton
            title="🔄 Reset Authentication"
            subtitle="Clear all auth data (tokens, user, MFA)"
            onPress={() => void handleResetAuth()}
            color="#FF3B30"
          />

          <DebugButton
            title="📋 Log Auth State"
            subtitle="Print current state to console"
            onPress={handleDebugState}
            color="#007AFF"
          />

          <DebugButton
            title="🔐 Test Login"
            subtitle="Go to login screen"
            onPress={() => router.push('/(auth)/login')}
            color="#34C759"
          />

          <DebugButton
            title="✏️ Test Registration"
            subtitle="Go to signup screen"
            onPress={() => router.push('/(auth)/signup')}
            color="#5AC8FA"
          />

          <DebugButton
            title="🔑 Test MFA Setup"
            subtitle="Go to MFA setup (requires auth)"
            onPress={() => router.push('/(auth)/mfa/setup')}
            color="#FF9500"
            disabled={!isAuthenticated}
          />
        </View>

        {/* Navigation */}
        <View style={styles.section}>
          <DebugButton
            title="← Back to App"
            subtitle="Return to main screen"
            onPress={() => router.back()}
            color="#8E8E93"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper Components
interface StateItemProps {
  label: string;
  value: boolean;
}

function StateItem({ label, value }: StateItemProps) {
  return (
    <View style={styles.stateItem}>
      <Text style={styles.stateLabel}>{label}</Text>
      <View style={[styles.stateBadge, value && styles.stateBadgeActive]}>
        <Text style={[styles.stateValue, value && styles.stateValueActive]}>
          {value ? '✓' : '✗'}
        </Text>
      </View>
    </View>
  );
}

interface DebugButtonProps {
  title: string;
  subtitle: string;
  onPress: () => void;
  color: string;
  disabled?: boolean;
}

function DebugButton({
  title,
  subtitle,
  onPress,
  color,
  disabled = false,
}: DebugButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.buttonIndicator, { backgroundColor: color }]} />
      <View style={styles.buttonContent}>
        <Text
          style={[styles.buttonTitle, disabled && styles.buttonTextDisabled]}
        >
          {title}
        </Text>
        <Text
          style={[styles.buttonSubtitle, disabled && styles.buttonTextDisabled]}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 16,
  },
  buttonContent: {
    flex: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonIndicator: {
    borderRadius: 2,
    height: 48,
    marginRight: 16,
    width: 4,
  },
  buttonSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
  },
  buttonTextDisabled: {
    color: '#636366',
  },
  buttonTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  content: {
    padding: 20,
  },
  divider: {
    backgroundColor: '#2C2C2E',
    height: 1,
    marginVertical: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  stateBadge: {
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  stateBadgeActive: {
    backgroundColor: '#34C759',
  },
  stateContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
  },
  stateItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  stateLabel: {
    color: '#FFF',
    fontSize: 16,
  },
  stateValue: {
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stateValueActive: {
    color: '#FFF',
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 16,
    marginBottom: 32,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userInfo: {
    color: '#8E8E93',
    fontSize: 14,
    marginVertical: 4,
  },
});
