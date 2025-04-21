
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Disable React.StrictMode in production to prevent double mounting
const root = createRoot(document.getElementById('root')!);

// Defer non-critical initialization
const initApp = () => {
  root.render(<App />);
};

// Check if the browser is idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(initApp);
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initApp, 1);
}
