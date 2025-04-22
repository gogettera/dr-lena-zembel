
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AccessibleLayout from './components/layout/AccessibleLayout';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { applyMetaTags } from './utils/meta-utils';

// Create a client
const queryClient = new QueryClient();

// Apply meta tags from the database
applyMetaTags().catch(console.error);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AccessibleLayout>
        <App />
      </AccessibleLayout>
    </QueryClientProvider>
  </React.StrictMode>,
);
