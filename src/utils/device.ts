/**
 * Device Utilities
 *
 * Utilities for collecting and managing device information for authentication
 * and security tracking purposes.
 */

import * as Device from 'expo-device';
import { Platform } from 'react-native';
import * as Application from 'expo-application';
import { DeviceInfo } from '../types/auth.types';
import { getSecureItem, setSecureItem } from './storage';

const DEVICE_ID_KEY = 'device_id';

/**
 * Generates a UUID v4
 * @returns UUID string
 */
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Gets or creates a persistent device ID
 * @returns Device ID (UUID v4)
 */
export const getDeviceId = async (): Promise<string> => {
  try {
    // Try to get existing device ID
    let deviceId = await getSecureItem(DEVICE_ID_KEY);

    if (!deviceId) {
      // Generate new UUID if none exists
      deviceId = generateUUID();
      await setSecureItem(DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
  } catch (error) {
    console.error('Error getting device ID:', error);
    // Fallback to generating a new UUID without storage
    return generateUUID();
  }
};

/**
 * Gets the device name
 * @returns Device name (e.g., "iPhone 14 Pro", "Pixel 6")
 */
export const getDeviceName = async (): Promise<string> => {
  try {
    const deviceName = Device.deviceName;
    if (deviceName) {
      return deviceName;
    }

    // Fallback to model name
    const modelName = Device.modelName;
    if (modelName) {
      return modelName;
    }

    // Final fallback
    return Platform.OS === 'ios' ? 'iPhone' : 'Android Device';
  } catch (error) {
    console.error('Error getting device name:', error);
    return Platform.OS === 'ios' ? 'iPhone' : 'Android Device';
  }
};

/**
 * Gets the platform
 * @returns Platform ('ios', 'android', or 'web')
 */
export const getPlatform = (): 'ios' | 'android' | 'web' => {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  return 'web';
};

/**
 * Gets the OS version
 * @returns OS version string
 */
export const getOSVersion = (): string => {
  try {
    if (Device.osVersion) {
      return Device.osVersion;
    }

    // Fallback
    return Platform.Version?.toString() || 'unknown';
  } catch (error) {
    console.error('Error getting OS version:', error);
    return 'unknown';
  }
};

/**
 * Gets the app version
 * @returns App version string
 */
export const getAppVersion = async (): Promise<string> => {
  try {
    const version = Application.nativeApplicationVersion;
    if (version) {
      return version;
    }

    return '1.0.0'; // Default version
  } catch (error) {
    console.error('Error getting app version:', error);
    return '1.0.0';
  }
};

/**
 * Collects complete device information
 * @returns DeviceInfo object
 */
export const collectDeviceInfo = async (): Promise<DeviceInfo> => {
  try {
    const [deviceId, deviceName, appVersion] = await Promise.all([
      getDeviceId(),
      getDeviceName(),
      getAppVersion(),
    ]);

    const deviceInfo: DeviceInfo = {
      device_id: deviceId,
      device_name: deviceName,
      platform: getPlatform(),
      os_version: getOSVersion(),
      app_version: appVersion,
    };

    return deviceInfo;
  } catch (error) {
    console.error('Error collecting device info:', error);

    // Return minimal device info on error
    return {
      device_id: generateUUID(),
      device_name: Platform.OS === 'ios' ? 'iPhone' : 'Android Device',
      platform: getPlatform(),
      os_version: 'unknown',
      app_version: '1.0.0',
    };
  }
};

/**
 * Gets device type
 * @returns Device type ('phone', 'tablet', 'desktop', 'tv', or 'unknown')
 */
export const getDeviceType = (): string => {
  try {
    if (Device.deviceType === Device.DeviceType.PHONE) return 'phone';
    if (Device.deviceType === Device.DeviceType.TABLET) return 'tablet';
    if (Device.deviceType === Device.DeviceType.DESKTOP) return 'desktop';
    if (Device.deviceType === Device.DeviceType.TV) return 'tv';
    return 'unknown';
  } catch (error) {
    console.error('Error getting device type:', error);
    return 'unknown';
  }
};

/**
 * Checks if the device is a physical device (not a simulator/emulator)
 * @returns true if physical device, false otherwise
 */
export const isPhysicalDevice = (): boolean => {
  try {
    return Device.isDevice;
  } catch (error) {
    console.error('Error checking if physical device:', error);
    return true; // Assume physical device on error
  }
};

/**
 * Gets device manufacturer
 * @returns Manufacturer name or null
 */
export const getManufacturer = (): string | null => {
  try {
    return Device.manufacturer || null;
  } catch (error) {
    console.error('Error getting manufacturer:', error);
    return null;
  }
};

/**
 * Gets device model
 * @returns Model name or null
 */
export const getDeviceModel = (): string | null => {
  try {
    return Device.modelName || null;
  } catch (error) {
    console.error('Error getting device model:', error);
    return null;
  }
};

/**
 * Gets device brand
 * @returns Brand name or null
 */
export const getDeviceBrand = (): string | null => {
  try {
    return Device.brand || null;
  } catch (error) {
    console.error('Error getting device brand:', error);
    return null;
  }
};

/**
 * Formats device info for logging/debugging
 * @param deviceInfo - Device info object
 * @returns Formatted string
 */
export const formatDeviceInfo = (deviceInfo: DeviceInfo): string => {
  return `Device: ${deviceInfo.device_name} (${deviceInfo.platform} ${deviceInfo.os_version}) - App v${deviceInfo.app_version} - ID: ${deviceInfo.device_id}`;
};
