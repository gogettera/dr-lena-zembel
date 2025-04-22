
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AccessibleLayout from './components/layout/AccessibleLayout';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccessibleLayout>
      <App />
    </AccessibleLayout>
  </React.StrictMode>,
);
