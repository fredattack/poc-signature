// Template entity types

export enum TemplateLayout {
  Minimal = 'minimal',
  Elegant = 'elegant',
  Modern = 'modern',
  Colorful = 'colorful',
  Dark = 'dark',
}

export interface TemplatePosition {
  x: number | string; // can be absolute (100) or percentage ('50%')
  y: number | string;
}

export interface TemplateStyle {
  backgroundColor: string;
  textColor: string;
  accentColor?: string;
  gradient?: {
    colors: string[];
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
}

export interface Template {
  id: string;
  name: string;
  layout: TemplateLayout;
  isPremium: boolean;
  thumbnailUrl: string;
  signaturePosition: TemplatePosition;
  signatureMaxWidth: number;
  signatureMaxHeight: number;
  style: TemplateStyle;
  showDateByDefault: boolean;
  showLocationByDefault: boolean;
  datePosition?: TemplatePosition;
  locationPosition?: TemplatePosition;
}

export interface TemplateConfig {
  id: string;
  name: string;
  layout: TemplateLayout;
  isPremium: boolean;
  style: TemplateStyle;
}
