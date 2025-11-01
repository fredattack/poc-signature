// Amplitude SDK wrapper (optional - install when needed)

import { AnalyticsTracker } from './tracker';
import { AnalyticsEvent, UserIdentity } from '@/types/analytics.types';

/**
 * Amplitude Analytics Tracker
 *
 * To enable Amplitude:
 * 1. Install: npm install @amplitude/analytics-react-native
 * 2. Add AMPLITUDE_API_KEY to .env
 * 3. Uncomment the implementation below
 */

export class AmplitudeTracker implements AnalyticsTracker {
  private initialized: boolean = false;

  async init(
    _apiKey: string,
    _config?: Record<string, unknown>
  ): Promise<void> {
    // Uncomment when Amplitude is installed:
    /*
    try {
      const amplitude = require('@amplitude/analytics-react-native');
      await amplitude.init(apiKey, {
        ...config,
        trackingOptions: {
          ipAddress: false, // GDPR compliance
        },
      });
      this.initialized = true;
      console.log('[Amplitude] Initialized');
    } catch (error) {
      console.error('[Amplitude] Init error:', error);
    }
    */
    console.warn(
      '[Amplitude] Not installed. Install @amplitude/analytics-react-native to enable.'
    );
    return Promise.resolve();
  }

  track(_event: AnalyticsEvent): void {
    if (!this.initialized) {
      return;
    }

    // Uncomment when Amplitude is installed:
    /*
    try {
      const amplitude = require('@amplitude/analytics-react-native');
      amplitude.track(event.name, event.properties);
    } catch (error) {
      console.error('[Amplitude] Track error:', error);
    }
    */
  }

  screen(screenName: string, properties?: Record<string, unknown>): void {
    if (!this.initialized) {
      return;
    }

    // Amplitude doesn't have a dedicated screen method, use track instead
    this.track({
      name: 'screen_viewed',
      properties: {
        screen_name: screenName,
        ...properties,
      },
    });
  }

  identify(_user: UserIdentity): void {
    if (!this.initialized) {
      return;
    }

    // Uncomment when Amplitude is installed:
    /*
    try {
      const amplitude = require('@amplitude/analytics-react-native');
      const identify = new amplitude.Identify();

      identify.set('email', user.email);
      identify.set('is_premium', user.isPremium);

      if (user.signatureCount !== undefined) {
        identify.set('signature_count', user.signatureCount);
      }

      amplitude.identify(user.userId, identify);
    } catch (error) {
      console.error('[Amplitude] Identify error:', error);
    }
    */
  }

  reset(): void {
    if (!this.initialized) {
      return;
    }

    // Uncomment when Amplitude is installed:
    /*
    try {
      const amplitude = require('@amplitude/analytics-react-native');
      amplitude.reset();
    } catch (error) {
      console.error('[Amplitude] Reset error:', error);
    }
    */
  }

  setUserProperty(_key: string, _value: unknown): void {
    if (!this.initialized) {
      return;
    }

    // Uncomment when Amplitude is installed:
    /*
    try {
      const amplitude = require('@amplitude/analytics-react-native');
      const identify = new amplitude.Identify();
      identify.set(key, value);
      amplitude.identify(identify);
    } catch (error) {
      console.error('[Amplitude] Set User Property error:', error);
    }
    */
  }
}
