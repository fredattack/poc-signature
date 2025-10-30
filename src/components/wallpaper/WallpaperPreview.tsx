// Wallpaper preview with real-time updates

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { TemplateRenderer } from './TemplateRenderer';
import { Signature } from '@/types/signature.types';
import { WallpaperOptions } from '@/types/wallpaper.types';
import { colors } from '@/constants/colors';
import { borderRadius } from '@/constants/spacing';

export interface WallpaperPreviewProps {
  signature: Signature;
  options: WallpaperOptions;
  onRefReady?: (ref: React.RefObject<any>) => void;
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  previewContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: colors.background,
  },
});
