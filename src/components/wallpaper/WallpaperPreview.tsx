// Wallpaper preview with real-time updates

import React, { useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TemplateRenderer } from './TemplateRenderer';
import { Signature } from '@/types/signature.types';
import { WallpaperOptions } from '@/types/wallpaper.types';
import { useThemeTokens } from '@/theme';

export interface WallpaperPreviewProps {
  signature: Signature;
  options: WallpaperOptions;
  onRefReady?: (ref: React.RefObject<unknown>) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PREVIEW_WIDTH = Math.min(SCREEN_WIDTH - 32, 375);
const PREVIEW_HEIGHT = (PREVIEW_WIDTH * 16) / 9;

export const WallpaperPreview: React.FC<WallpaperPreviewProps> = ({
  signature,
  options,
  onRefReady,
}) => {
  const viewRef = useRef(null);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Notify parent when ref is ready
  useEffect(() => {
    if (viewRef.current && onRefReady) {
      onRefReady(viewRef);
    }
  }, [onRefReady]);

  // Animate on option changes
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(1, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View ref={viewRef} style={styles.previewContainer}>
        <TemplateRenderer
          signature={signature}
          options={options}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
        />
      </View>
    </Animated.View>
  );
};

const createStyles = ({ colors, tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: tokens.spacing.md,
    },
    previewContainer: {
      backgroundColor: colors.surface.card,
      borderRadius: tokens.radii.generous,
      overflow: 'hidden',
      ...tokens.elevation.level3,
    },
  });
