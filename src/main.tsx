
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AccessibleLayout from './components/layout/AccessibleLayout';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AccessibleLayout>
        <App />
      </AccessibleLayout>
    </QueryClientProvider>
  </React.StrictMode>,
);
