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
  Text,
  View,
} from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
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
  height?: number;
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
  height = CANVAS_HEIGHT,
}) => {
  const [paths, setPaths] = useState<CanvasPath[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStartedDrawing, setHasStartedDrawing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentDrawingPath, setCurrentDrawingPath] = useState<
    { x: number; y: number }[]
  >([]);
  const currentPath = useRef(Skia.Path.Make());
  const currentPoints = useRef<{ x: number; y: number }[]>([]);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const hintOpacity = useSharedValue(0.5);

  // Pulse animation for hint overlay
  useEffect(() => {
    if (!hasStartedDrawing) {
      hintOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1500 }),
          withTiming(0.5, { duration: 1500 })
        ),
        -1,
        true
      );
    } else {
      hintOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [hasStartedDrawing, hintOpacity]);

  useEffect(() => {
    if (clearSignal !== undefined) {
      setPaths([]);
      currentPath.current = Skia.Path.Make();
      currentPoints.current = [];
      setCurrentDrawingPath([]);
      setIsDrawing(false);
      setHasStartedDrawing(false);
      setIsComplete(false);
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
    setIsComplete(true);

    currentPath.current = Skia.Path.Make();
    currentPoints.current = [];
    setCurrentDrawingPath([]);
    setIsDrawing(false);
  }, [color, onStrokeComplete]);

  const handleTouchStart = useCallback(
    (event: GestureResponderEvent) => {
      const point = getTouchPoint(event);
      if (!point) {
        return;
      }

      if (!hasStartedDrawing) {
        setHasStartedDrawing(true);
      }

      currentPath.current = Skia.Path.Make();
      currentPath.current.moveTo(point.x, point.y);
      currentPoints.current = [point];
      setCurrentDrawingPath([point]);
      setIsDrawing(true);
      onBeginStroke?.();
    },
    [hasStartedDrawing, onBeginStroke]
  );

  const handleTouchMove = useCallback((event: GestureResponderEvent) => {
    const point = getTouchPoint(event);
    if (!point) {
      return;
    }

    currentPath.current.lineTo(point.x, point.y);
    currentPoints.current.push(point);

    // Force re-render by updating state with current drawing path
    setCurrentDrawingPath([...currentPoints.current]);
  }, []);

  const handleTouchEnd = useCallback(() => {
    completeStroke();
    onEndStroke?.();
  }, [completeStroke, onEndStroke]);

  const handleTouchCancel = useCallback(() => {
    currentPoints.current = [];
    currentPath.current = Skia.Path.Make();
    setCurrentDrawingPath([]);
    setIsDrawing(false);
    onEndStroke?.();
  }, [onEndStroke]);

  const renderCompletedPaths = useMemo(
    () =>
      paths.map((pathData, index) => {
        const skiaPath = Skia.Path.Make();
        if (pathData.points.length > 0 && pathData.points[0]) {
          skiaPath.moveTo(pathData.points[0].x, pathData.points[0].y);
          for (let i = 1; i < pathData.points.length; i++) {
            const point = pathData.points[i];
            if (point) {
              skiaPath.lineTo(point.x, point.y);
            }
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

  const animatedHintStyle = useAnimatedStyle(() => ({
    opacity: hintOpacity.value,
  }));

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
            height,
          },
        ]}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        {renderCompletedPaths}
        {isDrawing && currentDrawingPath.length > 0 && (
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

      {/* Hint Overlay - Shows when canvas is empty */}
      {!hasStartedDrawing && (
        <Animated.View
          style={[styles.hintOverlay, animatedHintStyle]}
          pointerEvents="none"
        >
          <Text style={styles.hintIcon}>✍️</Text>
          <Text style={styles.hintText}>Draw here</Text>
          <Text style={styles.hintSubtext}>Touch & drag with finger</Text>
        </Animated.View>
      )}

      {/* Checkmark - Shows when signature is complete */}
      {isComplete && paths.length > 0 && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={styles.checkmark}
          pointerEvents="none"
        >
          <Text style={styles.checkmarkText}>✓</Text>
        </Animated.View>
      )}
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
    checkmark: {
      alignItems: 'center',
      backgroundColor: colors.surface.card,
      borderRadius: 20,
      bottom: 12,
      height: 40,
      justifyContent: 'center',
      position: 'absolute',
      right: 12,
      width: 40,
      ...tokens.elevation.level2,
    },
    checkmarkText: {
      color: colors.brand.primary,
      fontSize: 24,
      fontWeight: '600' as const,
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
    hintIcon: {
      fontSize: 32,
      marginBottom: tokens.spacing.xs,
    },
    hintOverlay: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    hintSubtext: {
      color: colors.text.tertiary,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.caption.fontWeight,
      marginTop: tokens.spacing.xs,
    },
    hintText: {
      color: colors.text.secondary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: '500' as const,
    },
  });
};
