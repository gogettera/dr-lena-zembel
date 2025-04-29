
import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useParams } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { useLanguage } from '@/contexts/LanguageContext';
import { ResourcePrefetcher } from '@/components/resource-prefetcher';
import { languages, defaultLanguage } from '@/config/i18n';
import { createLocalizedRoutes, extractPathWithoutLanguage } from '@/config/routes';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DefaultLayout from '@/layouts/DefaultLayout';
import LandingLayout from '@/layouts/LandingLayout';
import MinimalLayout from '@/layouts/MinimalLayout';

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

// Loading state component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-dental-navy">Loading...</div>
  </div>
);

// Language-specific routes component
const LanguageRoutes = () => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    // If the URL language is valid and different from current language setting
    if (lang && languages.includes(lang as any) && lang !== language) {
      setLanguage(lang as any);
    }
  }, [lang, language, setLanguage]);
  
  // If language is not supported, redirect to default language
  if (lang && !languages.includes(lang as any)) {
    return <Navigate to={`/${defaultLanguage}`} replace />;
  }
  
  // Get current path without language prefix
  const currentPath = extractPathWithoutLanguage(location.pathname);
  
  // Get routes for current language
  const routes = createLocalizedRoutes(language);
  
  return (
    <Routes>
      {Object.entries(routes).map(([path, config]) => {
        const LazyComponent = React.lazy(config.component);
        const layoutType = config.layout || 'default';
        
        let LayoutComponent: React.FC<any>;
        switch (layoutType) {
          case 'landing':
            LayoutComponent = LandingLayout;
            break;
          case 'minimal':
            LayoutComponent = MinimalLayout;
            break;
          default:
            LayoutComponent = DefaultLayout;
        }
        
        return (
          <Route
            key={path}
            path={path === '/' ? '' : path}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <LayoutComponent meta={config.meta}>
                  <LazyComponent />
                </LayoutComponent>
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
};

// Root component to handle language detection and redirection
const RootRouter = () => {
  const { language } = useLanguage();
  const location = useLocation();
  
  // Direct root path - redirect to language-specific home
  if (location.pathname === '/') {
    return <Navigate to={`/${language}`} replace />;
  }
  
  return (
    <Routes>
      {/* Language-specific routes */}
      <Route path="/:lang/*" element={<LanguageRoutes />} />
      
      {/* Fallback redirect to default language */}
      <Route path="*" element={<Navigate to={`/${defaultLanguage}`} replace />} />
    </Routes>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ResourcePrefetcher resources={languages.map((lang) => `/locales/${lang}.json`)}>
              <RootRouter />
            </ResourcePrefetcher>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
