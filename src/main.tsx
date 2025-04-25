
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
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
 * Performance monitoring with Web Vitals
 */
const reportWebVitals = () => {
  if (process.env.NODE_ENV === 'production') {
    import('web-vitals').then(({ onFCP, onLCP, onCLS, onFID, onTTFB }) => {
      // Core Web Vitals
      onLCP(metric => console.log('LCP:', metric.value));
      onFID(metric => console.log('FID:', metric.value));
      onCLS(metric => console.log('CLS:', metric.value));
      
      // Additional metrics
      onFCP(metric => console.log('FCP:', metric.value));
      onTTFB(metric => console.log('TTFB:', metric.value));
    });
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
};

// Initialize the application
mountApp();
