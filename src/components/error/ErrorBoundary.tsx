// Global error boundary component

import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useThemeTokens } from '@/theme';
import type { Tokens as _Tokens } from '@/theme';

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
  constructor(props: ThemedProps) {
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

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
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

  override render() {
    if (this.state.hasError) {
      const styles = createStyles(this.props.theme);

      return (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Icon
              name="smiley-x-eyes"
              size={64}
              color={this.props.theme.colors.feedback.critical}
            />
          </View>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            We&apos;re sorry for the inconvenience. Please try restarting the
            app.
          </Text>

          {__DEV__ && this.state.error && (
            <View style={styles.errorDetails}>
              <Text style={styles.errorTitle}>Error Details (Dev Only):</Text>
              <Text style={styles.errorText}>
                {this.state.error.toString()}
              </Text>
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
      alignItems: 'center',
      backgroundColor: colors.surface.background,
      flex: 1,
      justifyContent: 'center',
      padding: tokens.spacing.lg,
    },
    errorDetails: {
      backgroundColor: colors.surface.card,
      borderRadius: tokens.radii.regular,
      marginBottom: tokens.spacing.lg,
      padding: tokens.spacing.md,
      width: '100%',
      ...tokens.elevation.level1,
    },
    errorText: {
      ...captionTypography,
      color: colors.text.secondary,
      fontFamily: 'monospace',
    },
    errorTitle: {
      ...labelTypography,
      color: colors.feedback.critical,
      marginBottom: tokens.spacing.xs,
    },
    iconContainer: {
      marginBottom: tokens.spacing.lg,
    },
    message: {
      ...bodyTypography,
      color: colors.text.secondary,
      marginBottom: tokens.spacing.lg,
      textAlign: 'center',
    },
    title: {
      ...titleTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.md,
      textAlign: 'center',
    },
  });
};

export const ErrorBoundary: React.FC<Props> = (props) => {
  const theme = useThemeTokens();
  return <ErrorBoundaryBase {...props} theme={theme} />;
};
