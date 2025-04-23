
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import LanguageRoute from '@/components/LanguageRoute';
import Index from '@/pages/Index';
import LanguageHome from '@/pages/LanguageHome';
import TreatmentPage from '@/pages/TreatmentPage';
import LanguageTreatmentPage from '@/pages/LanguageTreatmentPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import NotFound from '@/pages/NotFound';
import AccessibilityStatementPage from '@/pages/AccessibilityStatementPage';
import { useEffect, lazy, Suspense } from 'react';
import { setupDirectionByLanguage } from '@/utils/direction';
import { getBrowserLanguage } from '@/utils/languageRoutes';
import { Skeleton } from '@/components/ui/skeleton';
import ResourcePrefetcher from '@/components/ResourcePrefetcher';

// Lazy load admin components which aren't needed on first render
const AdminPanel = lazy(() => import('@/pages/AdminPanel'));
const AdminRoute = lazy(() => import('@/components/AdminRoute'));

import './App.css';

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-dental-navy">Something went wrong</h2>
        <p className="mb-4 text-gray-600">
          The application encountered an error. Please try refreshing the page.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="rounded-full bg-dental-navy px-6 py-2 text-white transition-colors hover:bg-dental-orange"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

// Loading fallback for lazy components
const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-full max-w-md p-6">
      <Skeleton className="h-12 w-3/4 mb-6" />
      <Skeleton className="h-4 w-full mb-3" />
      <Skeleton className="h-4 w-5/6 mb-3" />
      <Skeleton className="h-4 w-4/6 mb-8" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  </div>
);

function App() {
  // Setup initial direction based on browser language
  useEffect(() => {
    try {
      const browserLang = getBrowserLanguage();
      setupDirectionByLanguage(browserLang);
      
      // Add support for native lazy loading to image elements
      if ('loading' in HTMLImageElement.prototype) {
        document.documentElement.classList.add('has-native-lazyload');
      }
      
      // Listen for network status changes to improve offline experience
      window.addEventListener('online', () => {
        document.documentElement.classList.remove('is-offline');
      });
      
      window.addEventListener('offline', () => {
        document.documentElement.classList.add('is-offline');
      });
    } catch (error) {
      console.error("Error in App setup:", error);
    }
    
    return () => {
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        {/* ResourcePrefetcher improves navigation performance by preloading assets */}
        <ResourcePrefetcher />
        
        <Routes>
          {/* Root route - redirects to browser language or default to Hebrew */}
          <Route path="/" element={<Index />} />
          
          {/* Lazy load admin section with its own error boundary */}
          <Route 
            path="/admin" 
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<PageLoader />}>
                  <AdminRoute element={<AdminPanel />} />
                </Suspense>
              </ErrorBoundary>
            } 
          />
          
          <Route path="/accessibility-statement" element={<AccessibilityStatementPage />} />
          
          {/* Language-specific routes */}
          <Route path="/:lang" element={<LanguageRoute />}>
            <Route index element={<LanguageHome />} />
            <Route path="treatments/:treatmentType" element={<LanguageTreatmentPage />} />
            <Route path="preventive-medicine" element={<PreventiveMedicinePage />} />
            <Route path="accessibility-statement" element={<AccessibilityStatementPage />} />
          </Route>

          {/* Catch all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
