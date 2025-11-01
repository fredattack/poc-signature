// Hook for detecting device orientation changes

import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export type Orientation = 'portrait' | 'landscape';

export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(() => {
    const { width, height } = Dimensions.get('window');
    return width < height ? 'portrait' : 'landscape';
  });

  useEffect(() => {
    const onChange = ({
      window,
    }: {
      window: { width: number; height: number };
    }) => {
      const isPortrait = window.width < window.height;
      setOrientation(isPortrait ? 'portrait' : 'landscape');
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  return orientation;
};
