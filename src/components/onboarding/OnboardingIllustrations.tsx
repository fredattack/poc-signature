// Onboarding slide illustrations using SVG

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { useThemeTokens } from '@/theme';

const ILLUSTRATION_SIZE = 200;
const useIllustrationPalette = () => {
  const { colors, mode } = useThemeTokens();

  const borderColor =
    mode === 'dark' ? 'rgba(244, 244, 244, 0.16)' : 'rgba(35, 35, 35, 0.12)';

  return {
    paper: colors.surface.card,
    canvas: colors.surface.background,
    phone: colors.surface.backgroundTint,
    border: borderColor,
    primary: colors.brand.primary,
    primaryDark: colors.brand.primaryShade,
    accent: colors.brand.accent,
    textOnAccent: colors.text.inverse,
  };
};

export const CaptureIllustration: React.FC = () => {
  const palette = useIllustrationPalette();

  return (
    <View style={styles.container}>
      <Svg
        width={ILLUSTRATION_SIZE}
        height={ILLUSTRATION_SIZE}
        viewBox="0 0 200 200"
      >
        {/* Canvas/Paper */}
        <Rect
          x="30"
          y="40"
          width="140"
          height="120"
          rx="8"
          fill={palette.paper}
          stroke={palette.border}
          strokeWidth="2"
        />

        {/* Signature curve */}
        <Path
          d="M 50 100 Q 80 70, 110 90 T 150 80"
          stroke={palette.primary}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Pen */}
        <G transform="translate(145, 65) rotate(-45)">
          <Rect
            x="0"
            y="0"
            width="8"
            height="30"
            rx="4"
            fill={palette.primary}
          />
          <Circle cx="4" cy="32" r="3" fill={palette.primaryDark} />
        </G>
      </Svg>
    </View>
  );
};

export const WallpaperIllustration: React.FC = () => {
  const palette = useIllustrationPalette();

  return (
    <View style={styles.container}>
      <Svg
        width={ILLUSTRATION_SIZE}
        height={ILLUSTRATION_SIZE}
        viewBox="0 0 200 200"
      >
        {/* Phone mockup */}
        <Rect
          x="50"
          y="20"
          width="100"
          height="160"
          rx="12"
          fill={palette.phone}
          stroke={palette.border}
          strokeWidth="2"
        />

        {/* Screen area with gradient effect */}
        <Rect
          x="55"
          y="30"
          width="90"
          height="140"
          rx="8"
          fill={palette.primary}
          opacity="0.2"
        />

        {/* Signature on wallpaper */}
        <Path
          d="M 70 90 Q 90 70, 110 85 T 130 80"
          stroke={palette.primary}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Template decoration dots */}
        <Circle cx="75" cy="50" r="3" fill={palette.primary} opacity="0.3" />
        <Circle cx="125" cy="55" r="3" fill={palette.primary} opacity="0.3" />
        <Circle cx="70" cy="150" r="3" fill={palette.primary} opacity="0.3" />
        <Circle cx="130" cy="145" r="3" fill={palette.primary} opacity="0.3" />
      </Svg>
    </View>
  );
};

export const CollectionIllustration: React.FC = () => {
  const palette = useIllustrationPalette();

  return (
    <View style={styles.container}>
      <Svg
        width={ILLUSTRATION_SIZE}
        height={ILLUSTRATION_SIZE}
        viewBox="0 0 200 200"
      >
        {/* Grid of signature cards */}
        <Rect
          x="30"
          y="40"
          width="60"
          height="60"
          rx="6"
          fill={palette.paper}
          stroke={palette.border}
          strokeWidth="2"
        />
        <Rect
          x="110"
          y="40"
          width="60"
          height="60"
          rx="6"
          fill={palette.paper}
          stroke={palette.border}
          strokeWidth="2"
        />
        <Rect
          x="30"
          y="115"
          width="60"
          height="60"
          rx="6"
          fill={palette.paper}
          stroke={palette.border}
          strokeWidth="2"
        />
        <Rect
          x="110"
          y="115"
          width="60"
          height="60"
          rx="6"
          fill={palette.paper}
          stroke={palette.border}
          strokeWidth="2"
        />

        {/* Mini signatures in cards */}
        <Path
          d="M 40 60 Q 50 55, 60 62 T 75 60"
          stroke={palette.primary}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M 120 60 Q 130 55, 140 62 T 155 60"
          stroke={palette.primary}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M 40 135 Q 50 130, 60 137 T 75 135"
          stroke={palette.primary}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M 120 135 Q 130 130, 140 137 T 155 135"
          stroke={palette.primary}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Star badge on one card */}
        <Circle cx="85" cy="50" r="10" fill={palette.accent} />
        <Path
          d="M 85 45 L 87 50 L 92 50 L 88 53 L 90 58 L 85 55 L 80 58 L 82 53 L 78 50 L 83 50 Z"
          fill={palette.textOnAccent}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
