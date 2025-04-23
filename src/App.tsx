
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { applyMetaTags } from '@/utils/meta-utils';

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

// This wrapper handles global effects like applying meta tags on route change
function AppEffects() {
  const location = useLocation();

  useEffect(() => {
    // Setup directionality by language on load (already in original App)
    try {
      const browserLang = getBrowserLanguage();
      setupDirectionByLanguage(browserLang);

      // Native lazy loading for images
      if ('loading' in HTMLImageElement.prototype) {
        document.documentElement.classList.add('has-native-lazyload');
      }

      // Listen for network status changes
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

  // Apply SEO/meta tags on every route change
  useEffect(() => {
    // This ensures Google sees fresh meta tags on every SPA navigation:
    applyMetaTags();
    
    // Reset any previously set HTTP status meta tag when navigating to a new page
    // Only 404 pages should have a 404 status
    const existingStatusMeta = document.querySelector('meta[name="http-status"]');
    if (existingStatusMeta) {
      existingStatusMeta.setAttribute('content', '200');
    }
  }, [location]);

  return null;
}

// Lazy load admin components which aren't needed on first render
const AdminPanel = lazy(() => import('@/pages/AdminPanel'));
const AdminRoute = lazy(() => import('@/components/AdminRoute'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <AppEffects />
        {/* ResourcePrefetcher improves navigation performance by preloading assets */}
        <ResourcePrefetcher />
        <Routes>
          {/* Root route - redirects to browser language or default to Hebrew */}
          <Route path="/" element={<Index />} />

          {/* Login page */}
          <Route 
            path="/login" 
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<PageLoader />}>
                  <LoginPage />
                </Suspense>
              </ErrorBoundary>
            } 
          />

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
