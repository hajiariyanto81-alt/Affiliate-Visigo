import React from 'react';

const BaseComponent = (React as any).Component;

export class ErrorBoundary extends BaseComponent {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    const { hasError, error } = (this as any).state;
    if (hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Ups, ada kendala teknis!</h1>
            <p className="text-slate-600 mb-8 text-sm">
              Terjadi kesalahan saat memuat halaman di browser kamu. Silakan coba refresh halaman atau buka di tab baru jika masalah berlanjut.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              Terjadi Kesalahan - Refresh
            </button>
            {error && (
              <details className="mt-4 text-left">
                <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600">Lihat Error (Detail)</summary>
                <pre className="mt-2 p-3 bg-red-50 text-red-600 text-[10px] overflow-auto rounded-lg border border-red-100">
                  {error.stack || error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
