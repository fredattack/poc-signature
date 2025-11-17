import React from 'react';
import { ViewStyle } from 'react-native';
import {
  AppleLogo,
  ArrowsDownUp,
  Books,
  Camera,
  CaretDown,
  CaretLeft,
  CaretUp,
  Check,
  CheckCircle,
  Eye,
  EyeSlash,
  FacebookLogo,
  Gear,
  GoogleLogo,
  House,
  Info,
  InstagramLogo,
  Lock,
  MapPin,
  PencilLine,
  SmileyXEyes,
  TiktokLogo,
  Trash,
  TwitterLogo,
  Warning,
  X,
  XCircle,
} from 'phosphor-react-native';

// Map des icônes avec leurs noms en kebab-case
const ICON_MAP = {
  house: House,
  books: Books,
  gear: Gear,
  lock: Lock,
  'smiley-x-eyes': SmileyXEyes,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  warning: Warning,
  info: Info,
  'pencil-line': PencilLine,
  'map-pin': MapPin,
  camera: Camera,
  sort: ArrowsDownUp,
  check: Check,
  'chevron-down': CaretDown,
  'chevron-up': CaretUp,
  'chevron-left': CaretLeft,
  trash: Trash,
  eye: Eye,
  'eye-slash': EyeSlash,
  x: X,
  'google-logo': GoogleLogo,
  'apple-logo': AppleLogo,
  'facebook-logo': FacebookLogo,
  'twitter-logo': TwitterLogo,
  'instagram-logo': InstagramLogo,
  'tiktok-logo': TiktokLogo,
} as const;

export type IconName = keyof typeof ICON_MAP;
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type IconWeight =
  | 'thin'
  | 'light'
  | 'regular'
  | 'bold'
  | 'fill'
  | 'duotone';

interface IconComponentProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  weight?: IconWeight;
  style?: ViewStyle;
}

const SIZE_MAP: Record<Exclude<IconSize, number>, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

/**
 * Icon component using Phosphor Icons
 *
 * @example
 * ```tsx
 * <Icon name="house" size="md" color="#000" weight="bold" />
 * <Icon name="camera" size={24} />
 * <Icon name="lock" size="sm" weight="fill" />
 * ```
 */
export function Icon({
  name,
  size = 'md',
  color = '#000',
  weight = 'regular',
  style,
}: IconComponentProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const resolvedSize = typeof size === 'number' ? size : SIZE_MAP[size];

  return (
    <IconComponent
      size={resolvedSize}
      color={color}
      weight={weight}
      style={style}
    />
  );
}
