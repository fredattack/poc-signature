// Permission request helpers

import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

export interface PermissionResult {
  granted: boolean;
  canAskAgain: boolean;
  error?: string;
}

export const requestLocationPermission =
  async (): Promise<PermissionResult> => {
    try {
      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();

      return {
        granted: status === 'granted',
        canAskAgain,
        error: status === 'denied' ? 'Location permission denied' : undefined,
      };
    } catch (error) {
      return {
        granted: false,
        canAskAgain: false,
        error: 'Failed to request location permission',
      };
    }
  };

export const requestPhotoLibraryPermission =
  async (): Promise<PermissionResult> => {
    try {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      return {
        granted: status === 'granted',
        canAskAgain,
        error:
          status === 'denied' ? 'Photo library permission denied' : undefined,
      };
    } catch (error) {
      return {
        granted: false,
        canAskAgain: false,
        error: 'Failed to request photo library permission',
      };
    }
  };

export const checkLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    return false;
  }
};

export const checkPhotoLibraryPermission = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.getPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    return false;
  }
};
