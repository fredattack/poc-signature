// File system utilities for image storage

import * as FileSystem from 'expo-file-system';

const SIGNATURES_DIR = `${FileSystem.documentDirectory}signatures/`;
const WALLPAPERS_DIR = `${FileSystem.documentDirectory}wallpapers/`;

export const fileSystem = {
  // Initialize directories
  async init(): Promise<void> {
    try {
      await this.ensureDirectoryExists(SIGNATURES_DIR);
      await this.ensureDirectoryExists(WALLPAPERS_DIR);
    } catch (error) {
      console.error('FileSystem init error:', error);
    }
  },

  async ensureDirectoryExists(directory: string): Promise<void> {
    const dirInfo = await FileSystem.getInfoAsync(directory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }
  },

  // Signature image operations
  async saveSignatureImage(imageUri: string, signatureId: string): Promise<string | null> {
    try {
      await this.ensureDirectoryExists(SIGNATURES_DIR);
      const fileName = `${signatureId}.png`;
      const filePath = `${SIGNATURES_DIR}${fileName}`;

      await FileSystem.copyAsync({
        from: imageUri,
        to: filePath,
      });

      return filePath;
    } catch (error) {
      console.error('Save signature image error:', error);
      return null;
    }
  },

  async getSignatureImage(signatureId: string): Promise<string | null> {
    try {
      const filePath = `${SIGNATURES_DIR}${signatureId}.png`;
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        return filePath;
      }
      return null;
    } catch (error) {
      console.error('Get signature image error:', error);
      return null;
    }
  },

  async deleteSignatureImage(signatureId: string): Promise<boolean> {
    try {
      const filePath = `${SIGNATURES_DIR}${signatureId}.png`;
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath);
      }
      return true;
    } catch (error) {
      console.error('Delete signature image error:', error);
      return false;
    }
  },

  // Wallpaper image operations
  async saveWallpaperImage(imageUri: string, wallpaperId: string): Promise<string | null> {
    try {
      await this.ensureDirectoryExists(WALLPAPERS_DIR);
      const fileName = `${wallpaperId}.png`;
      const filePath = `${WALLPAPERS_DIR}${fileName}`;

      await FileSystem.copyAsync({
        from: imageUri,
        to: filePath,
      });

      return filePath;
    } catch (error) {
      console.error('Save wallpaper image error:', error);
      return null;
    }
  },

  async getWallpaperImage(wallpaperId: string): Promise<string | null> {
    try {
      const filePath = `${WALLPAPERS_DIR}${wallpaperId}.png`;
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        return filePath;
      }
      return null;
    } catch (error) {
      console.error('Get wallpaper image error:', error);
      return null;
    }
  },

  async deleteWallpaperImage(wallpaperId: string): Promise<boolean> {
    try {
      const filePath = `${WALLPAPERS_DIR}${wallpaperId}.png`;
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath);
      }
      return true;
    } catch (error) {
      console.error('Delete wallpaper image error:', error);
      return false;
    }
  },

  // General file operations
  async readFile(filePath: string): Promise<string | null> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        return null;
      }
      return await FileSystem.readAsStringAsync(filePath);
    } catch (error) {
      console.error('Read file error:', error);
      return null;
    }
  },

  async writeFile(filePath: string, content: string): Promise<boolean> {
    try {
      await FileSystem.writeAsStringAsync(filePath, content);
      return true;
    } catch (error) {
      console.error('Write file error:', error);
      return false;
    }
  },

  async getFileInfo(filePath: string): Promise<FileSystem.FileInfo | null> {
    try {
      return await FileSystem.getInfoAsync(filePath);
    } catch (error) {
      console.error('Get file info error:', error);
      return null;
    }
  },

  async deleteFile(filePath: string): Promise<boolean> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath);
      }
      return true;
    } catch (error) {
      console.error('Delete file error:', error);
      return false;
    }
  },

  // Directory operations
  async listDirectory(directory: string): Promise<string[]> {
    try {
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        return [];
      }
      return await FileSystem.readDirectoryAsync(directory);
    } catch (error) {
      console.error('List directory error:', error);
      return [];
    }
  },

  async clearSignatures(): Promise<boolean> {
    try {
      const dirInfo = await FileSystem.getInfoAsync(SIGNATURES_DIR);
      if (dirInfo.exists) {
        await FileSystem.deleteAsync(SIGNATURES_DIR, { idempotent: true });
        await this.ensureDirectoryExists(SIGNATURES_DIR);
      }
      return true;
    } catch (error) {
      console.error('Clear signatures error:', error);
      return false;
    }
  },

  async clearWallpapers(): Promise<boolean> {
    try {
      const dirInfo = await FileSystem.getInfoAsync(WALLPAPERS_DIR);
      if (dirInfo.exists) {
        await FileSystem.deleteAsync(WALLPAPERS_DIR, { idempotent: true });
        await this.ensureDirectoryExists(WALLPAPERS_DIR);
      }
      return true;
    } catch (error) {
      console.error('Clear wallpapers error:', error);
      return false;
    }
  },
};
