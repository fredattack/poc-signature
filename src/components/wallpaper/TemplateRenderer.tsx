// Template renderer using react-native-svg

import React, { useMemo } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Svg, { Text, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Signature } from '@/types/signature.types';
import { WallpaperOptions } from '@/types/wallpaper.types';
import { Template, TemplateLayout } from '@/types/template.types';
import { getTemplateById } from '@/constants/templates';
import { formatDate, formatLocation } from '@/utils/formatters';
import { WALLPAPER_STANDARD_RESOLUTION } from '@/utils/constants';
import { useThemeTokens } from '@/theme';

export interface TemplateRendererProps {
  signature: Signature;
  options: WallpaperOptions;
  width?: number;
  height?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DEFAULT_WIDTH = Math.min(SCREEN_WIDTH - 32, 375);
const DEFAULT_HEIGHT = (DEFAULT_WIDTH * 16) / 9; // 16:9 aspect ratio for preview

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  signature,
  options,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
}) => {
  const template = getTemplateById(options.templateId);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!template) {
    return null;
  }

  const backgroundColor = options.backgroundColor || template.style.backgroundColor;
  const textColor = options.textColor || template.style.textColor;
  const gradient = template.style.gradient;

  const renderBackground = () => {
    if (gradient) {
      return (
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient
              id="grad"
              x1={gradient.start.x}
              y1={gradient.start.y}
              x2={gradient.end.x}
              y2={gradient.end.y}
            >
              {gradient.colors.map((color, index) => (
                <Stop
                  key={index}
                  offset={index / (gradient.colors.length - 1)}
                  stopColor={color}
                  stopOpacity="1"
                />
              ))}
            </LinearGradient>
          </Defs>
          <Rect width={width} height={height} fill="url(#grad)" />
        </Svg>
      );
    }

    return <View style={[styles.background, { backgroundColor }]} />;
  };

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Background */}
      {renderBackground()}

      {/* Signature Image */}
      {signature.signatureImagePath && (
        <View style={styles.signatureContainer}>
          <Image
            source={{ uri: signature.signatureImagePath }}
            style={styles.signatureImage}
            resizeMode="contain"
          />
        </View>
      )}

      {/* Overlay Content */}
      <View style={styles.overlay}>
        {/* Celebrity Name */}
        <View style={styles.nameContainer}>
          <Svg width={width} height={80}>
            <Text
              x={width / 2}
              y={40}
              fontSize={32}
              fontWeight="bold"
              fill={textColor}
              textAnchor="middle"
            >
              {signature.celebrityName}
            </Text>
          </Svg>
        </View>

        {/* Date and Location */}
        {(options.showDate || options.showLocation) && (
          <View style={styles.metadataContainer}>
            <Svg width={width} height={60}>
              {options.showDate && (
                <Text
                  x={width / 2}
                  y={20}
                  fontSize={16}
                  fill={textColor}
                  textAnchor="middle"
                  opacity={0.8}
                >
                  {formatDate(signature.capturedAt)}
                </Text>
              )}
              {options.showLocation && signature.location && (
                <Text
                  x={width / 2}
                  y={45}
                  fontSize={14}
                  fill={textColor}
                  textAnchor="middle"
                  opacity={0.7}
                >
                  📍 {formatLocation(signature.location.city, signature.location.country)}
                </Text>
              )}
            </Svg>
          </View>
        )}
      </View>
    </View>
  );
};

const createStyles = ({
  tokens,
}: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: tokens.radii.generous,
    },
    background: {
      ...StyleSheet.absoluteFillObject,
    },
    overlay: {
      flex: 1,
      justifyContent: 'space-between',
      padding: tokens.spacing.md,
    },
    signatureContainer: {
      position: 'absolute',
      top: '30%',
      left: '10%',
      right: '10%',
      height: '40%',
    },
    signatureImage: {
      width: '100%',
      height: '100%',
    },
    nameContainer: {
      alignItems: 'center',
    },
    metadataContainer: {
      alignItems: 'center',
    },
  });
