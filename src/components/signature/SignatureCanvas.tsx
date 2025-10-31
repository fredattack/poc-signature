// Signature canvas with 60fps Skia rendering

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  type GestureResponderEvent,
  type View as RNView,
} from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { SignatureColor, CanvasPath } from '@/types/signature.types';
import { colors } from '@/constants/colors';
import { CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_STROKE_WIDTH } from '@/utils/constants';

export interface SignatureCanvasProps {
  color: SignatureColor;
  onStrokeComplete: (path: CanvasPath) => void;
  captureRef?: React.RefObject<RNView>;
  clearSignal?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CANVAS_ACTUAL_WIDTH = Math.min(SCREEN_WIDTH - 32, CANVAS_WIDTH);

const getTouchPoint = (event: GestureResponderEvent): { x: number; y: number } | null => {
  const touch =
    event.nativeEvent.touches?.[0] ??
    event.nativeEvent.changedTouches?.[0] ?? {
      locationX: event.nativeEvent.locationX,
      locationY: event.nativeEvent.locationY,
    };

  if (touch == null) {
    return null;
  }

  return {
    x: touch.locationX,
    y: touch.locationY,
  };
};

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
  onStrokeComplete,
  captureRef,
  clearSignal,
}) => {
  const [paths, setPaths] = useState<CanvasPath[]>([]);
  const currentPath = useRef(Skia.Path.Make());
  const currentPoints = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (clearSignal !== undefined) {
      setPaths([]);
      currentPath.current = Skia.Path.Make();
      currentPoints.current = [];
    }
  }, [clearSignal]);

  const completeStroke = useCallback(() => {
    if (currentPoints.current.length === 0) {
      return;
    }

    const newPath: CanvasPath = {
      points: [...currentPoints.current],
      color,
    };

    setPaths((prev) => [...prev, newPath]);
    onStrokeComplete(newPath);

    currentPath.current = Skia.Path.Make();
    currentPoints.current = [];
  }, [color, onStrokeComplete]);

  const handleTouchStart = useCallback((event: GestureResponderEvent) => {
    const point = getTouchPoint(event);
    if (!point) {
      return;
    }

    currentPath.current = Skia.Path.Make();
    currentPath.current.moveTo(point.x, point.y);
    currentPoints.current = [point];
  }, []);

  const handleTouchMove = useCallback((event: GestureResponderEvent) => {
    const point = getTouchPoint(event);
    if (!point) {
      return;
    }

    currentPath.current.lineTo(point.x, point.y);
    currentPoints.current.push(point);

    // trigger repaint
    setPaths((prev) => [...prev]);
  }, []);

  const handleTouchEnd = useCallback(() => {
    completeStroke();
  }, [completeStroke]);

  const renderCompletedPaths = useMemo(
    () =>
      paths.map((pathData, index) => {
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
      }),
    [paths]
  );

  return (
    <View style={styles.container} ref={captureRef}>
      <Canvas
        style={[
          styles.canvas,
          {
            width: CANVAS_ACTUAL_WIDTH,
            height: CANVAS_HEIGHT,
          },
        ]}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderCompletedPaths}
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
