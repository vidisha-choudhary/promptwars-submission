import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in frontend application:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="glass-card error-card fade-in">
            <h1 className="error-title">Something went wrong</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
              An unexpected client-side error has occurred. Please reload the page or click below.
            </p>
            {this.state.error && (
              <pre
                style={{
                  textAlign: 'left',
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '12px',
                  overflowX: 'auto',
                  marginBottom: 'var(--spacing-md)',
                  color: 'var(--error)',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <button className="btn-primary" onClick={this.handleReset}>
              Return to Safety
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
