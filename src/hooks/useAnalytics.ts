// Analytics hook for tracking events throughout the app

import { useCallback } from 'react';
import { analytics } from '@/services/analytics/tracker';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';

export const useAnalytics = () => {
  const track = useCallback(
    (eventName: string, properties?: Record<string, unknown>) => {
      analytics.track(eventName, properties);
    },
    []
  );

  const screen = useCallback(
    (screenName: string, properties?: Record<string, unknown>) => {
      analytics.screen(screenName, properties);
    },
    []
  );

  const trackPerformance = useCallback(
    (metricName: string, value: number, unit: 'ms' | 'fps' | 'mb') => {
      analytics.trackPerformance({ metricName, value, unit });
    },
    []
  );

  const trackError = useCallback(
    (error: Error, context?: Record<string, unknown>) => {
      analytics.trackError(error, context);
    },
    []
  );

  // Convenience methods for common events
  const trackSignatureEvent = useCallback(
    (
      action:
        | 'started'
        | 'saved'
        | 'cleared'
        | 'viewed'
        | 'deleted'
        | 'save_failed',
      properties?: Record<string, unknown>
    ) => {
      const eventMap = {
        started: ANALYTICS_EVENTS.SIGNATURE_STARTED,
        saved: ANALYTICS_EVENTS.SIGNATURE_SAVED,
        cleared: ANALYTICS_EVENTS.SIGNATURE_CLEARED,
        viewed: ANALYTICS_EVENTS.SIGNATURE_VIEWED,
        deleted: ANALYTICS_EVENTS.SIGNATURE_DELETED,
        save_failed: ANALYTICS_EVENTS.ERROR_OCCURRED,
      };

      track(eventMap[action], properties);
    },
    [track]
  );

  const trackWallpaperEvent = useCallback(
    (
      action: 'template_selected' | 'color_changed' | 'saved' | 'set',
      properties?: Record<string, unknown>
    ) => {
      const eventMap = {
        template_selected: ANALYTICS_EVENTS.TEMPLATE_SELECTED,
        color_changed: ANALYTICS_EVENTS.COLOR_CHANGED,
        saved: ANALYTICS_EVENTS.WALLPAPER_SAVED,
        set: ANALYTICS_EVENTS.WALLPAPER_SET,
      };

      track(eventMap[action], properties);
    },
    [track]
  );

  const trackAuthEvent = useCallback(
    (
      action:
        | 'signup'
        | 'login'
        | 'sync_triggered'
        | 'sync_completed'
        | 'sync_failed',
      properties?: Record<string, unknown>
    ) => {
      const eventMap = {
        signup: ANALYTICS_EVENTS.SIGNUP_COMPLETED,
        login: ANALYTICS_EVENTS.LOGIN_COMPLETED,
        sync_triggered: ANALYTICS_EVENTS.SYNC_TRIGGERED,
        sync_completed: ANALYTICS_EVENTS.SYNC_COMPLETED,
        sync_failed: ANALYTICS_EVENTS.SYNC_FAILED,
      };

      track(eventMap[action], properties);
    },
    [track]
  );

  const trackPremiumEvent = useCallback(
    (
      action:
        | 'paywall_viewed'
        | 'subscription_started'
        | 'subscription_completed'
        | 'subscription_canceled',
      properties?: Record<string, unknown>
    ) => {
      const eventMap = {
        paywall_viewed: ANALYTICS_EVENTS.PAYWALL_VIEWED,
        subscription_started: ANALYTICS_EVENTS.SUBSCRIPTION_STARTED,
        subscription_completed: ANALYTICS_EVENTS.SUBSCRIPTION_COMPLETED,
        subscription_canceled: ANALYTICS_EVENTS.SUBSCRIPTION_CANCELED,
      };

      track(eventMap[action], properties);
    },
    [track]
  );

  return {
    track,
    screen,
    trackPerformance,
    trackError,
    trackSignatureEvent,
    trackWallpaperEvent,
    trackAuthEvent,
    trackPremiumEvent,
  };
};
