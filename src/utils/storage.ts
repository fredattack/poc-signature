/**
 * Storage Utilities
 *
 * Secure storage utilities for managing authentication tokens, device IDs,
 * and other sensitive data using Expo SecureStore.
 */

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tokens } from '../types/auth.types';

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  // Auth tokens (SecureStore)
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_EXPIRES_AT: 'token_expires_at',

  // Device info (SecureStore)
  DEVICE_ID: 'device_id',

  // MFA (SecureStore)
  MFA_SESSION_TOKEN: 'mfa_session_token',
  MFA_BACKUP_CODES: 'mfa_backup_codes',

  // Biometric (SecureStore)
  BIOMETRIC_ENABLED: 'biometric_enabled',
  BIOMETRIC_TYPE: 'biometric_type',

  // User preferences (AsyncStorage - non-sensitive)
  THEME_MODE: 'theme_mode',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  ANALYTICS_CONSENT: 'analytics_consent',
} as const;

// ============================================================================
// SECURE STORE (for sensitive data)
// ============================================================================

/**
 * Saves an item to SecureStore
 * @param key - Storage key
 * @param value - Value to store
 */
export const setSecureItem = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error saving to SecureStore (${key}):`, error);
    throw error;
  }
};

/**
 * Gets an item from SecureStore
 * @param key - Storage key
 * @returns Stored value or null
 */
export const getSecureItem = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error reading from SecureStore (${key}):`, error);
    return null;
  }
};

/**
 * Removes an item from SecureStore
 * @param key - Storage key
 */
export const removeSecureItem = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error removing from SecureStore (${key}):`, error);
    throw error;
  }
};

// ============================================================================
// ASYNC STORAGE (for non-sensitive data)
// ============================================================================

/**
 * Saves an item to AsyncStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving to AsyncStorage (${key}):`, error);
    throw error;
  }
};

/**
 * Gets an item from AsyncStorage
 * @param key - Storage key
 * @returns Stored value or null
 */
export const getItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error reading from AsyncStorage (${key}):`, error);
    return null;
  }
};

/**
 * Removes an item from AsyncStorage
 * @param key - Storage key
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from AsyncStorage (${key}):`, error);
    throw error;
  }
};

/**
 * Clears all items from AsyncStorage
 */
export const clearAsyncStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    throw error;
  }
};

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

/**
 * Saves authentication tokens securely
 * @param tokens - Tokens object
 */
export const saveTokens = async (tokens: Tokens): Promise<void> => {
  try {
    await Promise.all([
      setSecureItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token),
      setSecureItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token),
      setSecureItem(
        STORAGE_KEYS.TOKEN_EXPIRES_AT,
        (Date.now() + tokens.expires_in * 1000).toString()
      ),
    ]);
  } catch (error) {
    console.error('Error saving tokens:', error);
    throw error;
  }
};

/**
 * Gets authentication tokens from secure storage
 * @returns Tokens object or null
 */
export const getTokens = async (): Promise<Tokens | null> => {
  try {
    const [accessToken, refreshToken, expiresAt] = await Promise.all([
      getSecureItem(STORAGE_KEYS.ACCESS_TOKEN),
      getSecureItem(STORAGE_KEYS.REFRESH_TOKEN),
      getSecureItem(STORAGE_KEYS.TOKEN_EXPIRES_AT),
    ]);

    if (!accessToken || !refreshToken || !expiresAt) {
      return null;
    }

    const expiresAtTimestamp = parseInt(expiresAt, 10);
    const expiresIn = Math.floor((expiresAtTimestamp - Date.now()) / 1000);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      token_type: 'Bearer',
    };
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

/**
 * Removes authentication tokens from secure storage
 */
export const removeTokens = async (): Promise<void> => {
  try {
    await Promise.all([
      removeSecureItem(STORAGE_KEYS.ACCESS_TOKEN),
      removeSecureItem(STORAGE_KEYS.REFRESH_TOKEN),
      removeSecureItem(STORAGE_KEYS.TOKEN_EXPIRES_AT),
    ]);
  } catch (error) {
    console.error('Error removing tokens:', error);
    throw error;
  }
};

/**
 * Checks if access token is expired
 * @returns true if token is expired, false otherwise
 */
export const isTokenExpired = async (): Promise<boolean> => {
  try {
    const expiresAt = await getSecureItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);

    if (!expiresAt) {
      return true;
    }

    const expiresAtTimestamp = parseInt(expiresAt, 10);
    const now = Date.now();

    // Consider token expired if it expires in less than 5 minutes
    const bufferTime = 5 * 60 * 1000; // 5 minutes
    return now + bufferTime >= expiresAtTimestamp;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

// ============================================================================
// MFA MANAGEMENT
// ============================================================================

/**
 * Saves MFA session token
 * @param token - MFA session token
 */
export const saveMFASessionToken = async (token: string): Promise<void> => {
  try {
    await setSecureItem(STORAGE_KEYS.MFA_SESSION_TOKEN, token);
  } catch (error) {
    console.error('Error saving MFA session token:', error);
    throw error;
  }
};

/**
 * Gets MFA session token
 * @returns MFA session token or null
 */
export const getMFASessionToken = async (): Promise<string | null> => {
  try {
    return await getSecureItem(STORAGE_KEYS.MFA_SESSION_TOKEN);
  } catch (error) {
    console.error('Error getting MFA session token:', error);
    return null;
  }
};

/**
 * Removes MFA session token
 */
export const removeMFASessionToken = async (): Promise<void> => {
  try {
    await removeSecureItem(STORAGE_KEYS.MFA_SESSION_TOKEN);
  } catch (error) {
    console.error('Error removing MFA session token:', error);
    throw error;
  }
};

/**
 * Saves MFA backup codes
 * @param codes - Array of backup codes
 */
export const saveMFABackupCodes = async (codes: string[]): Promise<void> => {
  try {
    await setSecureItem(STORAGE_KEYS.MFA_BACKUP_CODES, JSON.stringify(codes));
  } catch (error) {
    console.error('Error saving MFA backup codes:', error);
    throw error;
  }
};

/**
 * Gets MFA backup codes
 * @returns Array of backup codes or null
 */
export const getMFABackupCodes = async (): Promise<string[] | null> => {
  try {
    const codes = await getSecureItem(STORAGE_KEYS.MFA_BACKUP_CODES);
    return codes ? (JSON.parse(codes) as string[]) : null;
  } catch (error) {
    console.error('Error getting MFA backup codes:', error);
    return null;
  }
};

// ============================================================================
// BIOMETRIC MANAGEMENT
// ============================================================================

/**
 * Saves biometric authentication setting
 * @param enabled - Whether biometric auth is enabled
 */
export const setBiometricEnabled = async (enabled: boolean): Promise<void> => {
  try {
    await setSecureItem(STORAGE_KEYS.BIOMETRIC_ENABLED, enabled.toString());
  } catch (error) {
    console.error('Error saving biometric setting:', error);
    throw error;
  }
};

/**
 * Checks if biometric authentication is enabled
 * @returns true if enabled, false otherwise
 */
export const isBiometricEnabled = async (): Promise<boolean> => {
  try {
    const enabled = await getSecureItem(STORAGE_KEYS.BIOMETRIC_ENABLED);
    return enabled === 'true';
  } catch (error) {
    console.error('Error checking biometric setting:', error);
    return false;
  }
};

// ============================================================================
// CLEAR ALL DATA
// ============================================================================

/**
 * Clears all authentication data (tokens, MFA, biometric)
 */
export const clearAuthData = async (): Promise<void> => {
  try {
    await Promise.all([
      removeTokens(),
      removeMFASessionToken(),
      removeSecureItem(STORAGE_KEYS.MFA_BACKUP_CODES),
      removeSecureItem(STORAGE_KEYS.BIOMETRIC_ENABLED),
      removeSecureItem(STORAGE_KEYS.BIOMETRIC_TYPE),
    ]);
  } catch (error) {
    console.error('Error clearing auth data:', error);
    throw error;
  }
};
