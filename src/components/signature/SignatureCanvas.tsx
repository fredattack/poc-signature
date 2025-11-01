// Signature canvas with 60fps Skia rendering

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  type GestureResponderEvent,
  type View as RNView,
  StyleSheet,
  View,
} from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { CanvasPath, SignatureColor } from '@/types/signature.types';
import {
  CANVAS_HEIGHT,
  CANVAS_STROKE_WIDTH,
  CANVAS_WIDTH,
} from '@/utils/constants';
import { useThemeTokens } from '@/theme';

export interface SignatureCanvasProps {
  color: SignatureColor;
  onStrokeComplete: (path: CanvasPath) => void;
  captureRef?:
    | React.RefObject<RNView | null>
    | React.MutableRefObject<RNView | null>;
  clearSignal?: number;
  onBeginStroke?: () => void;
  onEndStroke?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CANVAS_ACTUAL_WIDTH = Math.min(SCREEN_WIDTH - 32, CANVAS_WIDTH);

const getTouchPoint = (
  event: GestureResponderEvent
): { x: number; y: number } | null => {
  const touch = event.nativeEvent.touches?.[0] ??
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

const SIGNATURE_HEX: Record<SignatureColor, string> = {
  [SignatureColor.Black]: '#000000',
  [SignatureColor.Blue]: '#2563EB',
  [SignatureColor.Red]: '#DC2626',
  [SignatureColor.White]: '#FFFFFF',
};

const getColorHex = (color: SignatureColor): string =>
  SIGNATURE_HEX[color] ?? '#000000';

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  color,
  onStrokeComplete,
  captureRef,
  clearSignal,
  onBeginStroke,
  onEndStroke,
}) => {
  const [paths, setPaths] = useState<CanvasPath[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const currentPath = useRef(Skia.Path.Make());
  const currentPoints = useRef<{ x: number; y: number }[]>([]);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    if (clearSignal !== undefined) {
      setPaths([]);
      currentPath.current = Skia.Path.Make();
      currentPoints.current = [];
      setIsDrawing(false);
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
    setIsDrawing(false);
  }, [color, onStrokeComplete]);

  const handleTouchStart = useCallback(
    (event: GestureResponderEvent) => {
      const point = getTouchPoint(event);
      if (!point) {
        return;
      }

      currentPath.current = Skia.Path.Make();
      currentPath.current.moveTo(point.x, point.y);
      currentPoints.current = [point];
      setIsDrawing(true);
      onBeginStroke?.();
    },
    [onBeginStroke]
  );

  const handleTouchMove = useCallback((event: GestureResponderEvent) => {
    const point = getTouchPoint(event);
    if (!point) {
      return;
    }

    currentPath.current.lineTo(point.x, point.y);
    currentPoints.current.push(point);

    // Force re-render to show current drawing path
    setIsDrawing(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    completeStroke();
    onEndStroke?.();
  }, [completeStroke, onEndStroke]);

  const handleTouchCancel = useCallback(() => {
    currentPoints.current = [];
    currentPath.current = Skia.Path.Make();
    setIsDrawing(false);
    onEndStroke?.();
  }, [onEndStroke]);

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
    <View
      style={styles.container}
      ref={captureRef}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={() => {
        // Prevent parent scroll when touching canvas
        return true;
      }}
    >
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
        onTouchCancel={handleTouchCancel}
      >
        {renderCompletedPaths}
        {isDrawing && currentPoints.current.length > 0 && (
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

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
  const borderColor =
    mode === 'dark' ? 'rgba(244, 244, 244, 0.16)' : 'rgba(35, 35, 35, 0.12)';

  return StyleSheet.create({
    canvas: {
      backgroundColor: colors.surface.background,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.surface.card,
      borderColor,
      borderRadius: tokens.radii.generous,
      borderWidth: 2,
      justifyContent: 'center',
      overflow: 'hidden',
      ...tokens.elevation.level1,
    },
  });
};
