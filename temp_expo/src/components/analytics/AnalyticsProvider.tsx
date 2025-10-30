// Analytics context provider

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { analytics } from '@/services/analytics/tracker';
import { AmplitudeTracker } from '@/services/analytics/amplitude';
import { initSentry } from '@/services/analytics/sentry';
import { asyncStorage } from '@/services/storage/async-storage';
import { STORAGE_KEYS } from '@/utils/constants';
import { AnalyticsConfig } from '@/types/analytics.types';

interface AnalyticsContextValue {
  analyticsEnabled: boolean;
  setAnalyticsEnabled: (enabled: boolean) => void;
  consentGiven: boolean;
  setConsentGiven: (consent: boolean) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [analyticsEnabled, setAnalyticsEnabledState] = useState(false);
  const [consentGiven, setConsentGivenState] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load analytics consent from storage
  useEffect(() => {
    const loadConsent = async () => {
      const config = await asyncStorage.get<AnalyticsConfig>(STORAGE_KEYS.ANALYTICS_CONSENT);

      if (config) {
        // Ensure boolean types (AsyncStorage might return strings)
        const consentGiven = Boolean(config.consentGiven);
        const enabled = Boolean(config.enabled);

        setConsentGivenState(consentGiven);
        setAnalyticsEnabledState(enabled && consentGiven);
      } else {
        // Default: analytics disabled until consent given
        setConsentGivenState(false);
        setAnalyticsEnabledState(false);
      }
    };

    loadConsent();
  }, []);

  // Initialize analytics services
  useEffect(() => {
    if (consentGiven && !initialized) {
      const initializeAnalytics = async () => {
        // Register Amplitude tracker
        const amplitudeTracker = new AmplitudeTracker();
        const amplitudeApiKey = process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY || '';

        if (amplitudeApiKey) {
          await amplitudeTracker.init(amplitudeApiKey);
          analytics.registerTracker(amplitudeTracker);
        }

        // Initialize Sentry
        const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN || '';
        if (sentryDsn) {
          initSentry({
            dsn: sentryDsn,
            environment: __DEV__ ? 'development' : 'production',
            debug: __DEV__,
          });
        }

        analytics.setEnabled(true);
        analytics.setDebugMode(__DEV__);

        setInitialized(true);
      };

      initializeAnalytics();
    } else if (!consentGiven && initialized) {
      // Disable analytics if consent is revoked
      analytics.setEnabled(false);
      analytics.reset();
      setInitialized(false);
    }
  }, [consentGiven, initialized]);

  const setAnalyticsEnabled = async (enabled: boolean) => {
    setAnalyticsEnabledState(enabled);
    analytics.setEnabled(enabled);

    const config: AnalyticsConfig = {
      enabled: Boolean(enabled),
      debugMode: Boolean(__DEV__),
      consentGiven: Boolean(consentGiven),
    };

    await asyncStorage.set(STORAGE_KEYS.ANALYTICS_CONSENT, config);
  };

  const setConsentGiven = async (consent: boolean) => {
    const consentBool = Boolean(consent);
    setConsentGivenState(consentBool);

    const config: AnalyticsConfig = {
      enabled: consentBool,
      debugMode: Boolean(__DEV__),
      consentGiven: consentBool,
    };

    await asyncStorage.set(STORAGE_KEYS.ANALYTICS_CONSENT, config);

    if (consentBool) {
      setAnalyticsEnabledState(true);
    } else {
      setAnalyticsEnabledState(false);
      analytics.reset();
    }
  };

  const value: AnalyticsContextValue = {
    analyticsEnabled,
    setAnalyticsEnabled,
    consentGiven,
    setConsentGiven,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
