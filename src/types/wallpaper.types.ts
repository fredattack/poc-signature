// Wallpaper entity types

export interface WallpaperOptions {
  templateId: string;
  backgroundColor?: string;
  textColor?: string;
  showDate: boolean;
  showLocation: boolean;
  customText?: string;
}

export interface Wallpaper {
  id: string;
  signatureId: string;
  templateId: string;
  options: WallpaperOptions;
  wallpaperImagePath: string;
  resolution: WallpaperResolution;
  createdAt: Date;
}

export enum WallpaperResolution {
  Standard = 'standard', // 1080x1920
  HD = 'hd', // 1440x2560 (Premium)
  UHD = 'uhd', // 2160x3840 (Premium)
}

export interface WallpaperGenerationParams {
  signatureId: string;
  templateId: string;
  options: WallpaperOptions;
  resolution: WallpaperResolution;
}
