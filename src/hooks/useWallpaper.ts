// Wallpaper hook with template selection, customization, and generation

import { useCallback, useState } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import {
  Wallpaper as _Wallpaper,
  WallpaperOptions,
  WallpaperResolution,
} from '@/types/wallpaper.types';
import { Signature } from '@/types/signature.types';
import { fileSystem as _fileSystem } from '@/services/storage/file-system';
import { useAnalytics } from './useAnalytics';
import { requestPhotoLibraryPermission } from '@/utils/permissions';
import { WALLPAPER_GENERATION_TIMEOUT as _WALLPAPER_GENERATION_TIMEOUT } from '@/utils/constants';

interface UseWallpaperOptions {
  signature: Signature;
  isPremium?: boolean;
}

interface UseWallpaperResult {
  // State
  selectedTemplateId: string;
  wallpaperOptions: WallpaperOptions;
  isGenerating: boolean;
  isSaving: boolean;
  error: string | null;
  wallpaperRef: React.RefObject<unknown> | null;

  // Actions
  selectTemplate: (templateId: string) => void;
  updateOptions: (options: Partial<WallpaperOptions>) => void;
  setWallpaperRef: (ref: React.RefObject<unknown>) => void;
  generateWallpaper: () => Promise<string | null>;
  saveToGallery: () => Promise<boolean>;
  setAsWallpaper: () => Promise<boolean>;
}

export const useWallpaper = (
  options: UseWallpaperOptions
): UseWallpaperResult => {
  const { signature, isPremium = false } = options;

  // State
  const [selectedTemplateId, setSelectedTemplateId] = useState('minimal-white');
  const [wallpaperOptions, setWallpaperOptions] = useState<WallpaperOptions>({
    templateId: 'minimal-white',
    showDate: true,
    showLocation: !!signature.location,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wallpaperRef, setWallpaperRefState] =
    useState<React.RefObject<unknown> | null>(null);
  const [generatedImageUri, setGeneratedImageUri] = useState<string | null>(
    null
  );

  // Analytics
  const { trackWallpaperEvent } = useAnalytics();

  // Actions
  const selectTemplate = useCallback(
    (templateId: string) => {
      setSelectedTemplateId(templateId);
      setWallpaperOptions((prev) => ({
        ...prev,
        templateId,
      }));
      trackWallpaperEvent('template_selected', {
        template_id: templateId,
      });
    },
    [trackWallpaperEvent]
  );

  const updateOptions = useCallback(
    (updates: Partial<WallpaperOptions>) => {
      setWallpaperOptions((prev) => ({
        ...prev,
        ...updates,
      }));

      // Track color changes
      if (updates.backgroundColor ?? updates.textColor) {
        trackWallpaperEvent('color_changed', {
          background_color: updates.backgroundColor,
          text_color: updates.textColor,
        });
      }
    },
    [trackWallpaperEvent]
  );

  const setWallpaperRef = useCallback((ref: React.RefObject<unknown>) => {
    setWallpaperRefState(ref);
  }, []);

  const generateWallpaper = useCallback(async (): Promise<string | null> => {
    if (!wallpaperRef?.current) {
      setError('Wallpaper preview not ready');
      return null;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Determine resolution based on premium status
      const resolution = isPremium
        ? WallpaperResolution.HD
        : WallpaperResolution.Standard;

      // Capture wallpaper preview as image
      const imageUri = await captureRef(wallpaperRef, {
        format: 'png',
        quality: 1.0,
        result: 'tmpfile',
      });

      setGeneratedImageUri(imageUri);
      setIsGenerating(false);

      trackWallpaperEvent('saved', {
        template_id: selectedTemplateId,
        resolution,
        has_date: wallpaperOptions.showDate,
        has_location: wallpaperOptions.showLocation,
      });

      return imageUri;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to generate wallpaper';
      setError(errorMessage);
      setIsGenerating(false);
      console.error('Generate wallpaper error:', err);
      return null;
    }
  }, [
    wallpaperRef,
    isPremium,
    selectedTemplateId,
    wallpaperOptions,
    trackWallpaperEvent,
  ]);

  const saveToGallery = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    setError(null);

    try {
      // Request permission
      const permissionResult = await requestPhotoLibraryPermission();
      if (!permissionResult.granted) {
        setError('Photo library permission denied');
        setIsSaving(false);
        return false;
      }

      // Generate wallpaper if not already generated
      let imageUri = generatedImageUri;
      if (!imageUri) {
        imageUri = await generateWallpaper();
        if (!imageUri) {
          setIsSaving(false);
          return false;
        }
      }

      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(imageUri);

      // Optionally create an album
      const album = await MediaLibrary.getAlbumAsync('Signature Wallpapers');
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync(
          'Signature Wallpapers',
          asset,
          false
        );
      }

      setIsSaving(false);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save to gallery';
      setError(errorMessage);
      setIsSaving(false);
      console.error('Save to gallery error:', err);
      return false;
    }
  }, [generatedImageUri, generateWallpaper]);

  const setAsWallpaper = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    setError(null);

    try {
      // Generate wallpaper if not already generated
      let imageUri = generatedImageUri;
      if (!imageUri) {
        imageUri = await generateWallpaper();
        if (!imageUri) {
          setIsSaving(false);
          return false;
        }
      }

      // Use native share sheet to set as wallpaper
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        setError('Sharing is not available on this device');
        setIsSaving(false);
        return false;
      }

      await Sharing.shareAsync(imageUri, {
        dialogTitle: 'Set as Wallpaper',
      });

      trackWallpaperEvent('set', {
        template_id: selectedTemplateId,
      });

      setIsSaving(false);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to set as wallpaper';
      setError(errorMessage);
      setIsSaving(false);
      console.error('Set as wallpaper error:', err);
      return false;
    }
  }, [
    generatedImageUri,
    generateWallpaper,
    selectedTemplateId,
    trackWallpaperEvent,
  ]);

  return {
    // State
    selectedTemplateId,
    wallpaperOptions,
    isGenerating,
    isSaving,
    error,
    wallpaperRef,

    // Actions
    selectTemplate,
    updateOptions,
    setWallpaperRef,
    generateWallpaper,
    saveToGallery,
    setAsWallpaper,
  };
};
