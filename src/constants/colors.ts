// Color palette

export const colors = {
  // Primary colors
  primary: '#6366F1', // Indigo
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  accent: '#EC4899', // Pink accent

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',

  // Text colors
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',

  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Signature colors
  signatureBlack: '#000000',
  signatureBlue: '#2563EB',
  signatureRed: '#DC2626',
  signatureWhite: '#FFFFFF',

  // Gradient colors
  gradientStart: '#6366F1',
  gradientEnd: '#EC4899',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

export type ColorKey = keyof typeof colors;

// Wallpaper template color presets
export const templateColorPresets = [
  { id: 'black', name: 'Black', value: '#000000' },
  { id: 'white', name: 'White', value: '#FFFFFF' },
  { id: 'indigo', name: 'Indigo', value: '#6366F1' },
  { id: 'purple', name: 'Purple', value: '#A855F7' },
  { id: 'pink', name: 'Pink', value: '#EC4899' },
  { id: 'red', name: 'Red', value: '#EF4444' },
  { id: 'orange', name: 'Orange', value: '#F97316' },
  { id: 'yellow', name: 'Yellow', value: '#EAB308' },
  { id: 'green', name: 'Green', value: '#10B981' },
  { id: 'blue', name: 'Blue', value: '#3B82F6' },
  { id: 'cyan', name: 'Cyan', value: '#06B6D4' },
  { id: 'gray', name: 'Gray', value: '#6B7280' },
];
