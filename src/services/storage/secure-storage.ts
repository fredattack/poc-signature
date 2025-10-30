// Secure storage wrapper for sensitive data (auth tokens)

import * as SecureStore from 'expo-secure-store';

export const secureStorage = {
  async get(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`SecureStore get error for key "${key}":`, error);
      return null;
    }
  },

  async set(key: string, value: string): Promise<boolean> {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (error) {
      console.error(`SecureStore set error for key "${key}":`, error);
      return false;
    }
  },

  async remove(key: string): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      console.error(`SecureStore remove error for key "${key}":`, error);
      return false;
    }
  },

  // Helper methods for structured data
  async getJSON<T>(key: string): Promise<T | null> {
    try {
      const value = await SecureStore.getItemAsync(key);
      if (value === null) {
        return null;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`SecureStore getJSON error for key "${key}":`, error);
      return null;
    }
  },

  async setJSON<T>(key: string, value: T): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(value);
      await SecureStore.setItemAsync(key, jsonValue);
      return true;
    } catch (error) {
      console.error(`SecureStore setJSON error for key "${key}":`, error);
      return false;
    }
  },
};
