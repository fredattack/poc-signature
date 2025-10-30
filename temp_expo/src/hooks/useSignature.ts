// Signature hook with canvas state, path storage, and save logic

import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { Signature, SignatureColor, CanvasPath, SignatureStatus, SyncStatus } from '@/types/signature.types';
import { useSignaturesStore } from '@/store/signatures-store';
import { fileSystem } from '@/services/storage/file-system';
import { useLocation } from './useLocation';
import { useAnalytics } from './useAnalytics';
import { validateCelebrityName, validateSignaturePaths } from '@/utils/validators';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';

interface UseSignatureOptions {
  initialColor?: SignatureColor;
  enableLocation?: boolean;
}

interface UseSignatureResult {
  // Canvas state
  paths: CanvasPath[];
  currentColor: SignatureColor;
  canvasRef: React.RefObject<any> | null;

  // Form state
  celebrityName: string;
  captureLocation: boolean;

  // Status
  isSaving: boolean;
  error: string | null;

  // Validation
  isValid: boolean;
  validationError: string | null;

  // Actions
  addPath: (path: CanvasPath) => void;
  clearCanvas: () => void;
  setColor: (color: SignatureColor) => void;
  setCelebrityName: (name: string) => void;
  setCanvasRef: (ref: React.RefObject<any>) => void;
  toggleLocationCapture: () => void;
  saveSignature: () => Promise<Signature | null>;
}

export const useSignature = (options: UseSignatureOptions = {}): UseSignatureResult => {
  const { initialColor = SignatureColor.Black, enableLocation = true } = options;

  // Canvas state
  const [paths, setPaths] = useState<CanvasPath[]>([]);
  const [currentColor, setCurrentColor] = useState<SignatureColor>(initialColor);
  const [canvasRef, setCanvasRef] = useState<React.RefObject<any> | null>(null);

  // Form state
  const [celebrityName, setCelebrityName] = useState('');
  const [captureLocation, setCaptureLocation] = useState(enableLocation);

  // Status
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const { addSignature } = useSignaturesStore();
  const { location, requestLocation } = useLocation();
  const { trackSignatureEvent } = useAnalytics();

  // Validation
  const validateForm = useCallback((): { isValid: boolean; error: string | null } => {
    const nameValidation = validateCelebrityName(celebrityName);
    if (!nameValidation.isValid) {
      return { isValid: false, error: nameValidation.error || 'Invalid celebrity name' };
    }

    const pathsValidation = validateSignaturePaths(paths);
    if (!pathsValidation.isValid) {
      return { isValid: false, error: pathsValidation.error || 'Please draw a signature' };
    }

    return { isValid: true, error: null };
  }, [celebrityName, paths]);

  const validation = validateForm();

  // Actions
  const addPath = useCallback((path: CanvasPath) => {
    setPaths((prevPaths) => [...prevPaths, path]);
  }, []);

  const clearCanvas = useCallback(() => {
    setPaths([]);
    setError(null);
    trackSignatureEvent('cleared');
  }, [trackSignatureEvent]);

  const setColor = useCallback((color: SignatureColor) => {
    setCurrentColor(color);
  }, []);

  const toggleLocationCapture = useCallback(() => {
    setCaptureLocation((prev) => !prev);
  }, []);

  const saveSignature = useCallback(async (): Promise<Signature | null> => {
    // Validate
    const { isValid, error: validationError } = validateForm();
    if (!isValid) {
      setError(validationError);
      return null;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Generate unique ID
      const signatureId = `sig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Get location if enabled
      let signatureLocation = undefined;
      if (captureLocation) {
        signatureLocation = await requestLocation();
      }

      // Capture canvas as image
      if (!canvasRef || !canvasRef.current) {
        throw new Error('Canvas reference not available');
      }

      const imageUri = await captureRef(canvasRef.current, {
        format: 'png',
        quality: 0.9,
        result: 'tmpfile',
      });

      // Save image to file system
      const imagePath = await fileSystem.saveSignatureImage(imageUri, signatureId);
      if (!imagePath) {
        throw new Error('Failed to save signature image');
      }

      // Create signature object
      const signature: Signature = {
        id: signatureId,
        celebrityName: celebrityName.trim(),
        signatureImagePath: imagePath,
        signatureColor: currentColor,
        capturedAt: new Date(),
        location: signatureLocation || undefined,
        syncStatus: SyncStatus.Pending,
        status: SignatureStatus.Active,
      };

      // Save to store
      await addSignature(signature);

      // Track analytics
      trackSignatureEvent('saved', {
        celebrity_name: signature.celebrityName,
        signature_color: signature.signatureColor,
        has_location: !!signature.location,
        signature_id: signature.id,
      });

      setIsSaving(false);
      return signature;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save signature';
      setError(errorMessage);
      setIsSaving(false);
      console.error('Save signature error:', err);
      trackSignatureEvent('save_failed', {
        error_message: errorMessage,
      });
      return null;
    }
  }, [
    validateForm,
    captureLocation,
    requestLocation,
    canvasRef,
    celebrityName,
    currentColor,
    addSignature,
    trackSignatureEvent,
  ]);

  return {
    // Canvas state
    paths,
    currentColor,
    canvasRef,

    // Form state
    celebrityName,
    captureLocation,

    // Status
    isSaving,
    error,

    // Validation
    isValid: validation.isValid,
    validationError: validation.error,

    // Actions
    addPath,
    clearCanvas,
    setColor,
    setCelebrityName,
    setCanvasRef,
    toggleLocationCapture,
    saveSignature,
  };
};
