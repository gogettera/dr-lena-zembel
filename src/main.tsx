
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AccessibleLayout from './components/layout/AccessibleLayout';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { applyMetaTags } from './utils/meta-utils';

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

// Apply meta tags from the database
applyMetaTags().catch(console.error);

// Custom event to measure First Input Delay
const reportWebVitals = () => {
  try {
    const onFID = (metric: any) => {
      // Send to analytics or log
      console.log('FID:', metric);
    };

    // Check if web vitals are available
    if ('web-vitals' in window) {
      (window as any)['web-vitals'].getFID(onFID);
    }
  } catch (error) {
    console.error('Error measuring web vitals:', error);
  }
};

// Initialize performance monitoring
reportWebVitals();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AccessibleLayout>
        <App />
      </AccessibleLayout>
    </QueryClientProvider>
  </React.StrictMode>,
);
