
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import SimpleErrorBoundary from './components/SimpleErrorBoundary';
import './index.css';

console.log('Starting application...');

const mountApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root element not found!');
    return;
  }
  
  console.log('Mounting React app to root element');
  const root = ReactDOM.createRoot(container);
  
  const appElement = (
    <React.StrictMode>
      <SimpleErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SimpleErrorBoundary>
    </React.StrictMode>
  );
  
  root.render(appElement);
  console.log('React app mounted successfully');
};

mountApp();
