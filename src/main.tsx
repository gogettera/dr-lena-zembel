
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';

console.log('Starting dental clinic application...');

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dental-beige">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-dental-navy rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl font-bold">DZ</span>
        </div>
        <h1 className="text-2xl font-bold text-dental-navy mb-4">Something went wrong</h1>
        <p className="text-dental-navy/80 mb-6">
          {error?.message || 'An unexpected error occurred while loading the dental clinic website.'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="bg-dental-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

const mountApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root element not found!');
    return;
  }
  
  console.log('Mounting Dr. Zembel Dental Clinic app');
  const root = ReactDOM.createRoot(container);
  
  const appElement = (
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) => {
          console.error('Application error:', error, errorInfo);
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  root.render(appElement);
  console.log('Dr. Zembel Dental Clinic app mounted successfully');
};

mountApp();
