
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Layout components
import AccessibleLayout from '@/components/layout/AccessibleLayout';
import LanguageRoute from '@/components/LanguageRoute';
import ResourcePrefetcher from '@/components/ResourcePrefetcher';

// Routes configuration
import { rootRoutes, languageRoutes } from '@/config/routes';

// UI components
import { Skeleton } from '@/components/ui/skeleton';
import NotFound from '@/pages/NotFound';

// Lazy loaded components (refer to rootRoutes for more)
import { lazy } from 'react';
const AdminRoute = lazy(() => 
  import(/* webpackChunkName: "admin-route" */ '@/components/AdminRoute')
);

// App styling
import './App.css';

/**
 * Error fallback component for error boundary
 */
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

/**
 * Loading skeleton for lazy loaded components
 */
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

/**
 * Main App component that sets up routing
 */
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <AccessibleLayout>
          <ResourcePrefetcher />
          <Routes>
            {/* Root level routes */}
            {rootRoutes.map((route) => {
              const RouteElement = route.element;
              
              // Handle routes that require lazy loading
              if (route.lazyLoaded) {
                return (
                  <Route 
                    key={route.path}
                    path={route.path} 
                    element={
                      <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense fallback={<PageLoader />}>
                          {route.requiredAuth ? (
                            <AdminRoute element={<RouteElement />} />
                          ) : (
                            <RouteElement />
                          )}
                        </Suspense>
                      </ErrorBoundary>
                    } 
                  />
                );
              }
              
              // Regular routes
              return (
                <Route 
                  key={route.path}
                  path={route.path} 
                  element={<RouteElement />} 
                />
              );
            })}

            {/* Language-specific routes */}
            <Route path="/:lang" element={<LanguageRoute />}>
              {languageRoutes.map((route) => {
                const RouteElement = route.element;
                return (
                  <Route 
                    key={route.path}
                    path={route.path} 
                    element={<RouteElement />} 
                  />
                );
              })}
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AccessibleLayout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
