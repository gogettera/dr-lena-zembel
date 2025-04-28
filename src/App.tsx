
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import LanguageRoute from '@/components/LanguageRoute';
import Index from '@/pages/Index';
import LanguageHome from '@/pages/LanguageHome';
import TreatmentPage from '@/pages/TreatmentPage';
import LanguageTreatmentPage from '@/pages/LanguageTreatmentPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import BotoxTreatmentsPage from '@/pages/BotoxTreatmentsPage';
import NotFound from '@/pages/NotFound';
import AccessibilityStatementPage from '@/pages/AccessibilityStatementPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import { setupDirectionByLanguage } from '@/utils/direction';
import { getBrowserLanguage } from '@/utils/languageRoutes';
import { Skeleton } from '@/components/ui/skeleton';
import ResourcePrefetcher from '@/components/ResourcePrefetcher';
import { applyMetaTags } from '@/utils/meta-utils';

import './App.css';

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

function AppEffects() {
  const location = useLocation();

  useEffect(() => {
    const start = performance.now();
    
    try {
      const browserLang = getBrowserLanguage();
      setupDirectionByLanguage(browserLang);

      if ('loading' in HTMLImageElement.prototype) {
        document.documentElement.classList.add('has-native-lazyload');
      }

      window.addEventListener('online', () => {
        document.documentElement.classList.remove('is-offline');
      });

      window.addEventListener('offline', () => {
        document.documentElement.classList.add('is-offline');
      });
      
      if ('web-vitals' in window) {
        import('web-vitals').then(({ onFCP }) => {
          onFCP(metric => {
            console.log('FCP:', metric);
          });
        });
      }
      
      const end = performance.now();
      console.log(`App setup time: ${end - start}ms`);
    } catch (error) {
      console.error("Error in App setup:", error);
    }
    
    return () => {
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);

  useEffect(() => {
    applyMetaTags();
    
    const existingStatusMeta = document.querySelector('meta[name="http-status"]');
    if (existingStatusMeta) {
      existingStatusMeta.setAttribute('content', '200');
    }
    
    console.log(`Page navigation: ${location.pathname}`);
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
      }, { timeout: 1000 });
    }
  }, [location]);

  return null;
}

const AdminPanel = lazy(() => 
  import(/* webpackChunkName: "admin" */ '@/pages/AdminPanel')
);
const AdminRoute = lazy(() => 
  import(/* webpackChunkName: "admin-route" */ '@/components/AdminRoute')
);
const LoginPage = lazy(() => 
  import(/* webpackChunkName: "login" */ '@/pages/LoginPage')
);

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <AppEffects />
        <ResourcePrefetcher />
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Authentication routes */}
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

          {/* Legal routes */}
          <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:lang/terms-of-service" element={<TermsOfService />} />

          <Route path="/:lang" element={<LanguageRoute />}>
            <Route index element={<LanguageHome />} />
            
            {/* Specific route for Botox treatments */}
            <Route path="treatments/botox-treatments" element={<BotoxTreatmentsPage />} />
            
            {/* Generic treatment route */}
            <Route path="treatments/:treatmentType" element={<LanguageTreatmentPage />} />
            
            <Route path="preventive-medicine" element={<PreventiveMedicinePage />} />
            <Route path="accessibility-statement" element={<AccessibilityStatementPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
