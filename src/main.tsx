
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import SimpleErrorBoundary from './components/SimpleErrorBoundary';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1
    },
  },
});

const mountApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root element not found!');
    return;
  }
  
  const root = ReactDOM.createRoot(container);
  
  const appElement = (
    <React.StrictMode>
      <SimpleErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </SimpleErrorBoundary>
    </React.StrictMode>
  );
  
  root.render(appElement);
};

mountApp();
