// Signature canvas with 60fps Skia rendering

import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, Path, Skia, TouchInfo, useTouchHandler } from '@shopify/react-native-skia';
import { SignatureColor, CanvasPath } from '@/types/signature.types';
import { colors } from '@/constants/colors';
import { CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_STROKE_WIDTH } from '@/utils/constants';

export interface SignatureCanvasProps {
  color: SignatureColor;
  onPathsChange: (paths: CanvasPath[]) => void;
  canvasRef?: React.RefObject<any>;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CANVAS_ACTUAL_WIDTH = Math.min(SCREEN_WIDTH - 32, CANVAS_WIDTH);

const getColorHex = (color: SignatureColor): string => {
  switch (color) {
    case SignatureColor.Black:
      return colors.signatureBlack;
    case SignatureColor.Blue:
      return colors.signatureBlue;
    case SignatureColor.Red:
      return colors.signatureRed;
    case SignatureColor.White:
      return colors.signatureWhite;
    default:
      return colors.signatureBlack;
  }
};

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  color,
  onPathsChange,
  canvasRef,
}) => {
  const [paths, setPaths] = React.useState<CanvasPath[]>([]);
  const currentPath = useRef(Skia.Path.Make());
  const currentPoints = useRef<{ x: number; y: number }[]>([]);

  const onTouch = useTouchHandler({
    onStart: (touchInfo: TouchInfo) => {
      const { x, y } = touchInfo;

      // Start new path
      currentPath.current = Skia.Path.Make();
      currentPath.current.moveTo(x, y);
      currentPoints.current = [{ x, y }];
    },
    onActive: (touchInfo: TouchInfo) => {
      const { x, y } = touchInfo;

      // Add point to current path
      currentPath.current.lineTo(x, y);
      currentPoints.current.push({ x, y });

      // Force re-render for smooth drawing
      setPaths((prevPaths) => [...prevPaths]);
    },
    onEnd: () => {
      // Save completed path
      const newPath: CanvasPath = {
        points: [...currentPoints.current],
        color,
      };

      const updatedPaths = [...paths, newPath];
      setPaths(updatedPaths);
      onPathsChange(updatedPaths);

      // Reset for next path
      currentPath.current = Skia.Path.Make();
      currentPoints.current = [];
    },
  });

  const clearCanvas = useCallback(() => {
    setPaths([]);
    onPathsChange([]);
    currentPath.current = Skia.Path.Make();
    currentPoints.current = [];
  }, [onPathsChange]);

  // Expose clear method via ref
  React.useImperativeHandle(canvasRef, () => ({
    clear: clearCanvas,
  }));

  return (
    <View style={styles.container} ref={canvasRef}>
      <Canvas
        style={[
          styles.canvas,
          {
            width: CANVAS_ACTUAL_WIDTH,
            height: CANVAS_HEIGHT,
          },
        ]}
        onTouch={onTouch}
      >
        {/* Render completed paths */}
        {paths.map((pathData, index) => {
          const skiaPath = Skia.Path.Make();
          if (pathData.points.length > 0) {
            skiaPath.moveTo(pathData.points[0].x, pathData.points[0].y);
            for (let i = 1; i < pathData.points.length; i++) {
              skiaPath.lineTo(pathData.points[i].x, pathData.points[i].y);
            }
          }

          return (
            <Path
              key={`path-${index}`}
              path={skiaPath}
              color={getColorHex(pathData.color)}
              style="stroke"
              strokeWidth={CANVAS_STROKE_WIDTH}
              strokeCap="round"
              strokeJoin="round"
            />
          );
        })}

        {/* Render current path being drawn */}
        {currentPoints.current.length > 0 && (
          <Path
            path={currentPath.current}
            color={getColorHex(color)}
            style="stroke"
            strokeWidth={CANVAS_STROKE_WIDTH}
            strokeCap="round"
            strokeJoin="round"
          />
        )}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  canvas: {
    backgroundColor: colors.background,
  },
});
