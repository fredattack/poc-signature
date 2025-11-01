// Location hook using expo-location for city-level geolocation

import { useCallback, useState } from 'react';
import * as Location from 'expo-location';
import { SignatureLocation } from '@/types/signature.types';
import { requestLocationPermission } from '@/utils/permissions';

interface UseLocationResult {
  location: SignatureLocation | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => Promise<SignatureLocation | null>;
  clearLocation: () => void;
}

export const useLocation = (): UseLocationResult => {
  const [location, setLocation] = useState<SignatureLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation =
    useCallback(async (): Promise<SignatureLocation | null> => {
      setIsLoading(true);
      setError(null);

      try {
        // Request permission
        const permissionResult = await requestLocationPermission();

        if (!permissionResult.granted) {
          setError('Location permission denied');
          setIsLoading(false);
          return null;
        }

        // Get current position
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        // Reverse geocode to get city and country
        const [geocode] = await Location.reverseGeocodeAsync({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        if (!geocode) {
          setError('Could not determine location');
          setIsLoading(false);
          return null;
        }

        const signatureLocation: SignatureLocation = {
          city: geocode.city ?? geocode.subregion ?? 'Unknown City',
          country: geocode.country ?? 'Unknown Country',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(signatureLocation);
        setIsLoading(false);
        return signatureLocation;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to get location';
        setError(errorMessage);
        setIsLoading(false);
        console.error('Location error:', err);
        return null;
      }
    }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  return {
    location,
    isLoading,
    error,
    requestLocation,
    clearLocation,
  };
};
