import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AccessibleLayout from './components/layout/AccessibleLayout';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Reduce unnecessary network requests
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1, // Reduce retries to improve performance
    },
  },
});

// Custom function to measure and report performance metrics
const reportWebVitals = () => {
  // Only load web-vitals when needed
  if (process.env.NODE_ENV === 'production') {
    import('web-vitals').then(({ onFCP, onLCP, onCLS, onFID, onTTFB }) => {
      // First Contentful Paint
      onFCP(metric => {
        console.log('FCP:', metric.value);
        // Send to analytics
      });
      
      // Largest Contentful Paint
      onLCP(metric => {
        console.log('LCP:', metric.value);
        // Send to analytics
      });
      
      // Cumulative Layout Shift
      onCLS(metric => {
        console.log('CLS:', metric.value);
        // Send to analytics
      });
      
      // First Input Delay
      onFID(metric => {
        console.log('FID:', metric.value);
        // Send to analytics
      });
      
      // Time to First Byte
      onTTFB(metric => {
        console.log('TTFB:', metric.value);
        // Send to analytics
      });
    });
  }
};

// Create root with concurrent mode for better performance
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Use createRoot instead of render for better performance
root.render(
  // Disable StrictMode in production to avoid double-rendering
  process.env.NODE_ENV !== 'production' ? (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </QueryClientProvider>
    </React.StrictMode>
  ) : (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </QueryClientProvider>
  )
);

// Initialize performance monitoring
reportWebVitals();
