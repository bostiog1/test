import React from "react";
import { useNavigate } from "react-router-dom";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryCore extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error);
    // Reset error state when navigation occurs
    window.addEventListener("popstate", this.handleReset);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.handleReset);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <DefaultErrorFallback
            error={this.state.error}
            onReset={this.handleReset}
          />
        )
      );
    }
    return this.props.children;
  }
}

const DefaultErrorFallback = ({
  error,
  onReset,
}: {
  error?: Error;
  onReset: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">
          Oops! Something went wrong.
        </h1>
        {error && (
          <details className="mb-4 text-left text-sm text-gray-700 dark:text-gray-300">
            <summary className="cursor-pointer mb-2">Error details</summary>
            <code className="block p-2 bg-gray-200 dark:bg-gray-800 rounded overflow-x-auto">
              {error.message}
            </code>
          </details>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>

          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            onClick={() => {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundaryCore>{children}</ErrorBoundaryCore>;
};
