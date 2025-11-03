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
  backgroundColor?: string;
  paths?: CanvasPath[];
  onStrokeComplete: (path: CanvasPath) => void;
  captureRef?:
    | React.RefObject<RNView | null>
    | React.MutableRefObject<RNView | null>;
  clearSignal?: number;
  onBeginStroke?: () => void;
  onEndStroke?: () => void;
  height?: number;
  width?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CANVAS_ACTUAL_WIDTH = Math.min(SCREEN_WIDTH - 32, CANVAS_WIDTH);

const getTouchPoint = (
  event: GestureResponderEvent
): { x: number; y: number } | null => {
  const { locationX, locationY } = event.nativeEvent;

  if (locationX == null || locationY == null) {
    console.log(
      '[SignatureCanvas] Invalid touch point - locationX or locationY is null'
    );
    return null;
  }

  return {
    x: locationX,
    y: locationY,
  };
};

const SIGNATURE_HEX: Record<SignatureColor, string> = {
  [SignatureColor.Black]: '#000000',
  [SignatureColor.Blue]: '#2563EB',
  [SignatureColor.Red]: '#DC2626',
  [SignatureColor.White]: '#FFFFFF',
  [SignatureColor.SageGreen]: '#8A9A5B',
};

const getColorHex = (color: SignatureColor): string =>
  SIGNATURE_HEX[color] ?? '#000000';

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  color,
  backgroundColor,
  paths = [],
  onStrokeComplete,
  captureRef,
  clearSignal,
  onBeginStroke,
  onEndStroke,
  height = CANVAS_HEIGHT,
  width,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStartedDrawing, setHasStartedDrawing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentDrawingPath, setCurrentDrawingPath] = useState<
    { x: number; y: number }[]
  >([]);
  const currentPath = useRef(Skia.Path.Make());
  const currentPoints = useRef<{ x: number; y: number }[]>([]);
  const centeringOffsetRef = useRef({ offsetX: 0, offsetY: 0 });
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const hintOpacity = useSharedValue(0.5);

  // Pulse animation for hint overlay
  useEffect(() => {
    const hasContent = hasStartedDrawing || paths.length > 0;
    if (!hasContent) {
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
  }, [hasStartedDrawing, paths.length, hintOpacity]);

  useEffect(() => {
    if (clearSignal !== undefined) {
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

    onStrokeComplete(newPath);
    setIsComplete(true);

    currentPath.current = Skia.Path.Make();
    currentPoints.current = [];
    setCurrentDrawingPath([]);
    setIsDrawing(false);
  }, [color, onStrokeComplete]);

  const handleTouchStart = useCallback(
    (event: GestureResponderEvent) => {
      const rawPoint = getTouchPoint(event);
      console.log('[SignatureCanvas] Touch START:', rawPoint);

      if (!rawPoint) {
        console.log('[SignatureCanvas] Touch START - no valid point, aborting');
        return;
      }

      const point = {
        x: rawPoint.x - centeringOffsetRef.current.offsetX,
        y: rawPoint.y - centeringOffsetRef.current.offsetY,
      };

      if (!hasStartedDrawing) {
        console.log('[SignatureCanvas] First stroke - hiding hint');
        setHasStartedDrawing(true);
      }

      currentPath.current = Skia.Path.Make();
      currentPath.current.moveTo(point.x, point.y);
      currentPoints.current = [point];
      setCurrentDrawingPath([point]);
      setIsDrawing(true);
      console.log('[SignatureCanvas] Drawing started at', point);
      onBeginStroke?.();
    },
    [hasStartedDrawing, onBeginStroke]
  );

  const handleTouchMove = useCallback((event: GestureResponderEvent) => {
    const rawPoint = getTouchPoint(event);

    if (!rawPoint) {
      console.log('[SignatureCanvas] Touch MOVE - no valid point, skipping');
      return;
    }

    const point = {
      x: rawPoint.x - centeringOffsetRef.current.offsetX,
      y: rawPoint.y - centeringOffsetRef.current.offsetY,
    };

    currentPath.current.lineTo(point.x, point.y);
    currentPoints.current.push(point);

    // Force re-render by updating state with current drawing path
    setCurrentDrawingPath([...currentPoints.current]);
    console.log(
      '[SignatureCanvas] Touch MOVE - points:',
      currentPoints.current.length
    );
  }, []);

  const handleTouchEnd = useCallback(() => {
    console.log(
      '[SignatureCanvas] Touch END - completing stroke with',
      currentPoints.current.length,
      'points'
    );
    completeStroke();
    onEndStroke?.();
  }, [completeStroke, onEndStroke]);

  const handleTouchCancel = useCallback(() => {
    console.log('[SignatureCanvas] Touch CANCEL - clearing current stroke');
    currentPoints.current = [];
    currentPath.current = Skia.Path.Make();
    setCurrentDrawingPath([]);
    setIsDrawing(false);
    onEndStroke?.();
  }, [onEndStroke]);

  const calculatePathsBounds = useCallback(
    (
      allPaths: CanvasPath[]
    ): { minX: number; maxX: number; minY: number; maxY: number } | null => {
      if (allPaths.length === 0) {
        return null;
      }

      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;

      for (const pathData of allPaths) {
        for (const point of pathData.points) {
          minX = Math.min(minX, point.x);
          maxX = Math.max(maxX, point.x);
          minY = Math.min(minY, point.y);
          maxY = Math.max(maxY, point.y);
        }
      }

      return { minX, maxX, minY, maxY };
    },
    []
  );

  const getCenteringOffset = useCallback(
    (canvasWidth: number, canvasHeight: number) => {
      const bounds = calculatePathsBounds(paths);
      if (!bounds) {
        return { offsetX: 0, offsetY: 0 };
      }

      const signatureWidth = bounds.maxX - bounds.minX;
      const signatureHeight = bounds.maxY - bounds.minY;
      const signatureCenterX = bounds.minX + signatureWidth / 2;
      const signatureCenterY = bounds.minY + signatureHeight / 2;

      const canvasCenterX = canvasWidth / 2;
      const canvasCenterY = canvasHeight / 2;

      return {
        offsetX: canvasCenterX - signatureCenterX,
        offsetY: canvasCenterY - signatureCenterY,
      };
    },
    [paths, calculatePathsBounds]
  );

  const centeringOffset = useMemo(
    () => getCenteringOffset(width ?? CANVAS_ACTUAL_WIDTH, height),
    [width, height, getCenteringOffset]
  );

  useEffect(() => {
    centeringOffsetRef.current = centeringOffset;
  }, [centeringOffset]);

  const renderCompletedPaths = useMemo(
    () =>
      paths.map((pathData, index) => {
        const skiaPath = Skia.Path.Make();
        if (pathData.points.length > 0 && pathData.points[0]) {
          const firstPoint = pathData.points[0];
          skiaPath.moveTo(
            firstPoint.x + centeringOffset.offsetX,
            firstPoint.y + centeringOffset.offsetY
          );
          for (let i = 1; i < pathData.points.length; i++) {
            const point = pathData.points[i];
            if (point) {
              skiaPath.lineTo(
                point.x + centeringOffset.offsetX,
                point.y + centeringOffset.offsetY
              );
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
    [paths, centeringOffset]
  );

  const animatedHintStyle = useAnimatedStyle(() => ({
    opacity: hintOpacity.value,
  }));

  return (
    <View
      style={styles.container}
      ref={captureRef}
      onStartShouldSetResponder={() => false} // Let children handle
    >
      {/* Canvas - RENDERING ONLY, no touch handlers */}
      <Canvas
        style={[
          styles.canvas,
          {
            width: width ?? CANVAS_ACTUAL_WIDTH,
            height,
            backgroundColor: backgroundColor ?? theme.colors.surface.background,
          },
        ]}
      >
        {renderCompletedPaths}
        {isDrawing &&
          currentDrawingPath.length > 0 &&
          (() => {
            const renderPath = Skia.Path.Make();
            if (currentPoints.current.length > 0 && currentPoints.current[0]) {
              const firstPoint = currentPoints.current[0];
              renderPath.moveTo(
                firstPoint.x + centeringOffset.offsetX,
                firstPoint.y + centeringOffset.offsetY
              );
              for (let i = 1; i < currentPoints.current.length; i++) {
                const point = currentPoints.current[i];
                if (point) {
                  renderPath.lineTo(
                    point.x + centeringOffset.offsetX,
                    point.y + centeringOffset.offsetY
                  );
                }
              }
            }
            return (
              <Path
                path={renderPath}
                color={getColorHex(color)}
                style="stroke"
                strokeWidth={CANVAS_STROKE_WIDTH}
                strokeCap="round"
                strokeJoin="round"
              />
            );
          })()}
      </Canvas>

      {/* TRANSPARENT TOUCH OVERLAY - Captures all touch events */}
      <View
        style={StyleSheet.absoluteFill}
        onStartShouldSetResponder={() => {
          console.log(
            '[SignatureCanvas] onStartShouldSetResponder - returning true'
          );
          return true;
        }}
        onMoveShouldSetResponder={() => {
          console.log(
            '[SignatureCanvas] onMoveShouldSetResponder - returning true'
          );
          return true;
        }}
        onResponderGrant={handleTouchStart}
        onResponderMove={handleTouchMove}
        onResponderRelease={handleTouchEnd}
        onResponderTerminate={handleTouchCancel}
        onResponderTerminationRequest={() => {
          console.log(
            '[SignatureCanvas] onResponderTerminationRequest - returning false (keep control)'
          );
          return false; // Don't give up touches
        }}
      />

      {/* Hint Overlay - Shows when canvas is empty, doesn't interfere with touches */}
      {!hasStartedDrawing && paths.length === 0 && (
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
    canvas: {},
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
