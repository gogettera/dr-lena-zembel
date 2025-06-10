
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { webVitalsTracker } from '@/utils/performance/webVitals';
import { logger } from '@/utils/logger';
import './index.css';

/**
 * Configure the QueryClient with optimized settings
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 1                  // Reduce retries
    },
  },
});

/**
 * Enhanced performance monitoring with Web Vitals
 */
const reportWebVitals = () => {
  if (process.env.NODE_ENV === 'production') {
    // Web Vitals are automatically tracked by webVitalsTracker
    logger.info('Web Vitals tracking initialized');
  }
};

/**
 * Create the React root and render the app
 */
const mountApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root element not found!');
    return;
  }
  
  const root = ReactDOM.createRoot(container);
  
  const appElement = (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
  
  root.render(appElement);
  
  // Initialize performance monitoring
  reportWebVitals();
  
  // Clean up performance observers on page unload
  window.addEventListener('beforeunload', () => {
    webVitalsTracker.disconnect();
  });
};

// Initialize the application
mountApp();
