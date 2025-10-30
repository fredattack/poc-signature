// Sentry error tracking initialization

/**
 * Sentry Error Tracking
 *
 * To enable Sentry:
 * 1. Install: npm install @sentry/react-native
 * 2. Add SENTRY_DSN to .env
 * 3. Run: npx @sentry/wizard@latest -i reactNative
 * 4. Uncomment the implementation below
 */

export interface SentryConfig {
  dsn: string;
  environment?: string;
  enableInExpoDevelopment?: boolean;
  debug?: boolean;
}

export const initSentry = (config: SentryConfig): void => {
  // Uncomment when Sentry is installed:
  /*
  try {
    const Sentry = require('@sentry/react-native');

    Sentry.init({
      dsn: config.dsn,
      environment: config.environment || (__DEV__ ? 'development' : 'production'),
      enableInExpoDevelopment: config.enableInExpoDevelopment ?? false,
      debug: config.debug ?? __DEV__,
      tracesSampleRate: 1.0,
      attachScreenshot: true,
      attachStacktrace: true,
    });

    console.log('[Sentry] Initialized');
  } catch (error) {
    console.error('[Sentry] Init error:', error);
  }
  */
  console.warn('[Sentry] Not installed. Install @sentry/react-native to enable error tracking.');
};

export const captureException = (error: Error, context?: Record<string, any>): void => {
  // Uncomment when Sentry is installed:
  /*
  try {
    const Sentry = require('@sentry/react-native');
    Sentry.captureException(error, {
      contexts: context,
    });
  } catch (err) {
    console.error('[Sentry] Capture exception error:', err);
  }
  */
  console.error('[Sentry] Error captured (Sentry not installed):', error, context);
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info'): void => {
  // Uncomment when Sentry is installed:
  /*
  try {
    const Sentry = require('@sentry/react-native');
    Sentry.captureMessage(message, level);
  } catch (error) {
    console.error('[Sentry] Capture message error:', error);
  }
  */
  console.log(`[Sentry] Message (${level}):`, message);
};

export const setUser = (user: { id: string; email?: string; username?: string }): void => {
  // Uncomment when Sentry is installed:
  /*
  try {
    const Sentry = require('@sentry/react-native');
    Sentry.setUser(user);
  } catch (error) {
    console.error('[Sentry] Set user error:', error);
  }
  */
};

export const clearUser = (): void => {
  // Uncomment when Sentry is installed:
  /*
  try {
    const Sentry = require('@sentry/react-native');
    Sentry.setUser(null);
  } catch (error) {
    console.error('[Sentry] Clear user error:', error);
  }
  */
};

export const addBreadcrumb = (breadcrumb: { message: string; category?: string; level?: string; data?: any }): void => {
  // Uncomment when Sentry is installed:
  /*
  try {
    const Sentry = require('@sentry/react-native');
    Sentry.addBreadcrumb(breadcrumb);
  } catch (error) {
    console.error('[Sentry] Add breadcrumb error:', error);
  }
  */
};
