// Auto screen view tracking component

import { useEffect } from 'react';
import { usePathname } from 'expo-router';
import { useAnalytics } from '@/hooks/useAnalytics';

export const ScreenTracker: React.FC = () => {
  const pathname = usePathname();
  const { screen } = useAnalytics();

  useEffect(() => {
    if (pathname) {
      // Extract screen name from pathname
      const screenName =
        pathname === '/'
          ? 'Home'
          : pathname.replace(/^\//, '').replace(/-/g, ' ');

      screen(screenName, {
        path: pathname,
      });
    }
  }, [pathname, screen]);

  return null;
};
