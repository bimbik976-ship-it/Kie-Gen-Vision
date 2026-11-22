import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Unexpected application error.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('KieGen Creative Studio render error:', error, info);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-stone-50 px-5 py-10 text-stone-900">
        <div className="mx-auto max-w-xl rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <h1 className="text-base font-bold">KieGen Creative Studio mengalami error</h1>
          <p className="mt-2 text-sm text-stone-600">
            Tampilan tidak akan dibiarkan menjadi layar putih. Coba muat ulang aplikasi.
          </p>
          <pre className="mt-4 max-h-40 overflow-auto rounded-xl bg-rose-50 p-3 text-xs text-rose-700 whitespace-pre-wrap">
            {this.state.message}
          </pre>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-4 rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
}
