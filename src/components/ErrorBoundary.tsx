import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  showHomeButton?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // trackError(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">
                      {this.props.fallbackTitle || 'Something went wrong'}
                    </h1>
                    <p className="text-sm text-white/80">
                      We're sorry for the inconvenience
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  An unexpected error occurred. This has been logged and our team will investigate. 
                  You can try refreshing the page or returning to the home screen.
                </p>

                {/* Error Details (only in development) */}
                {import.meta.env.DEV && this.state.error && (
                  <details className="mt-4">
                    <summary className="text-xs font-semibold text-slate-500 cursor-pointer hover:text-slate-700 transition-colors">
                      Technical Details (Development Only)
                    </summary>
                    <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-xs font-mono text-red-600 mb-2">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo && (
                        <pre className="text-[10px] font-mono text-slate-600 overflow-auto max-h-40">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={this.handleReload}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Page
                  </Button>
                  {this.props.showHomeButton && (
                    <Button
                      onClick={this.handleGoHome}
                      variant="outline"
                      className="flex-1"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Support Link */}
            <p className="text-center text-xs text-slate-400 mt-4">
              Need help?{' '}
              <a href="/support" className="text-indigo-600 hover:text-indigo-700 underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Convenience wrapper for different sections
export const AppErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallbackTitle="Application Error" showHomeButton={true}>
    {children}
  </ErrorBoundary>
);

export const EditorErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallbackTitle="Editor Error" showHomeButton={true}>
    {children}
  </ErrorBoundary>
);

export const CRMErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallbackTitle="CRM Error" showHomeButton={true}>
    {children}
  </ErrorBoundary>
);
