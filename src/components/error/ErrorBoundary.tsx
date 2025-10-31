// Global error boundary component

import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useThemeTokens } from '@/theme';
import type { Tokens } from '@/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

type ThemedProps = Props & {
  theme: ReturnType<typeof useThemeTokens>;
};

class ErrorBoundaryBase extends Component<ThemedProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error tracking service (e.g., Sentry)
    console.error('Error caught by boundary:', error, errorInfo);

    // TODO: Send to Sentry
    // Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const styles = createStyles(this.props.theme);

      return (
        <View style={styles.container}>
          <Text style={styles.emoji}>😞</Text>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            We're sorry for the inconvenience. Please try restarting the app.
          </Text>

          {__DEV__ && this.state.error && (
            <View style={styles.errorDetails}>
              <Text style={styles.errorTitle}>Error Details (Dev Only):</Text>
              <Text style={styles.errorText}>{this.state.error.toString()}</Text>
            </View>
          )}

          <Button
            title="Try Again"
            onPress={this.handleReset}
            variant="primary"
            fullWidth
          />
        </View>
      );
    }

    return this.props.children;
  }
}

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const titleTypography = {
    fontSize: tokens.typography.displayM.fontSize,
    lineHeight: tokens.typography.displayM.lineHeight,
    fontWeight: tokens.typography.displayM.fontWeight,
    letterSpacing: tokens.typography.displayM.letterSpacing,
  };

  const bodyTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: tokens.typography.caption.fontWeight,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  const labelTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: tokens.spacing.lg,
      backgroundColor: colors.surface.background,
    },
    emoji: {
      fontSize: 64,
      marginBottom: tokens.spacing.lg,
    },
    title: {
      ...titleTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.md,
      textAlign: 'center',
    },
    message: {
      ...bodyTypography,
      color: colors.text.secondary,
      textAlign: 'center',
      marginBottom: tokens.spacing.lg,
    },
    errorDetails: {
      backgroundColor: colors.surface.card,
      padding: tokens.spacing.md,
      borderRadius: tokens.radii.regular,
      marginBottom: tokens.spacing.lg,
      width: '100%',
      ...tokens.elevation.level1,
    },
    errorTitle: {
      ...labelTypography,
      color: colors.feedback.critical,
      marginBottom: tokens.spacing.xs,
    },
    errorText: {
      ...captionTypography,
      color: colors.text.secondary,
      fontFamily: 'monospace',
    },
  });
};

export const ErrorBoundary: React.FC<Props> = (props) => {
  const theme = useThemeTokens();
  return <ErrorBoundaryBase {...props} theme={theme} />;
};
