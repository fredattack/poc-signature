// Unified analytics tracking interface

import {
  AnalyticsEvent,
  PerformanceMetric,
  UserIdentity,
} from '@/types/analytics.types';

export interface AnalyticsTracker {
  init(apiKey: string, config?: Record<string, unknown>): Promise<void>;
  track(event: AnalyticsEvent): void;
  screen(screenName: string, properties?: Record<string, unknown>): void;
  identify(user: UserIdentity): void;
  reset(): void;
  setUserProperty(key: string, value: unknown): void;
}

class UnifiedAnalyticsTracker {
  private trackers: AnalyticsTracker[] = [];
  private enabled: boolean = false;
  private debugMode: boolean = false;

  constructor() {
    this.enabled = true;
    this.debugMode = __DEV__;
  }

  registerTracker(tracker: AnalyticsTracker): void {
    this.trackers.push(tracker);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setDebugMode(debugMode: boolean): void {
    this.debugMode = debugMode;
  }

  track(eventName: string, properties?: Record<string, unknown>): void {
    if (!this.enabled) {
      return;
    }

    const event: AnalyticsEvent = {
      name: eventName,
      properties: properties as Record<
        string,
        string | number | boolean | undefined
      >,
      timestamp: new Date(),
    };

    if (this.debugMode) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Track:', event);
    }

    this.trackers.forEach((tracker) => {
      try {
        tracker.track(event);
      } catch (error) {
        console.error('[Analytics] Track error:', error);
      }
    });
  }

  screen(screenName: string, properties?: Record<string, unknown>): void {
    if (!this.enabled) {
      return;
    }

    if (this.debugMode) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Screen:', screenName, properties);
    }

    this.trackers.forEach((tracker) => {
      try {
        tracker.screen(screenName, properties);
      } catch (error) {
        console.error('[Analytics] Screen error:', error);
      }
    });
  }

  identify(user: UserIdentity): void {
    if (!this.enabled) {
      return;
    }

    if (this.debugMode) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Identify:', user);
    }

    this.trackers.forEach((tracker) => {
      try {
        tracker.identify(user);
      } catch (error) {
        console.error('[Analytics] Identify error:', error);
      }
    });
  }

  reset(): void {
    if (this.debugMode) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Reset');
    }

    this.trackers.forEach((tracker) => {
      try {
        tracker.reset();
      } catch (error) {
        console.error('[Analytics] Reset error:', error);
      }
    });
  }

  setUserProperty(key: string, value: unknown): void {
    if (!this.enabled) {
      return;
    }

    if (this.debugMode) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Set User Property:', key, value);
    }

    this.trackers.forEach((tracker) => {
      try {
        tracker.setUserProperty(key, value);
      } catch (error) {
        console.error('[Analytics] Set User Property error:', error);
      }
    });
  }

  trackPerformance(metric: PerformanceMetric): void {
    if (!this.enabled) {
      return;
    }

    this.track('performance_metric', {
      metric_name: metric.metricName,
      value: metric.value,
      unit: metric.unit,
    });
  }

  trackError(error: Error, context?: Record<string, unknown>): void {
    if (!this.enabled) {
      return;
    }

    this.track('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      ...context,
    });
  }
}

export const analytics = new UnifiedAnalyticsTracker();
