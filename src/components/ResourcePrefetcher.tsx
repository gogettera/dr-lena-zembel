
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define critical assets for each route
const routeAssets: Record<string, string[]> = {
  // Home page critical assets
  '/': [
    '/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png',
    '/lovable-uploads/c1007b41-5fb4-451a-a540-744c4643c25e.png',
  ],
  // Children dentistry page
  '/he/treatments/children-dentistry': [
    '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg',
  ],
  // Add other routes as needed
};

const ResourcePrefetcher = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Current route assets
    const currentRouteAssets = routeAssets[location.pathname] || [];
    
    // Immediately prefetch current route's critical assets
    currentRouteAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = asset.endsWith('.js') ? 'script' : 'image';
      link.href = asset;
      document.head.appendChild(link);
    });
    
    // Find potential next routes based on current route
    let potentialNextRoutes: string[] = [];
    
    if (location.pathname === '/') {
      // From home, users might navigate to treatments
      potentialNextRoutes = ['/he/treatments/children-dentistry', '/he/treatments/orthodontics'];
    } else if (location.pathname.includes('/treatments/')) {
      // From a treatment page, users might navigate to other treatments or home
      potentialNextRoutes = ['/'];
    }
    
    // Use requestIdleCallback to prefetch potential next routes when browser is idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        potentialNextRoutes.forEach(route => {
          const routeAssetsList = routeAssets[route] || [];
          
          routeAssetsList.forEach(asset => {
            // Check if already preloaded
            if (!document.querySelector(`link[rel="prefetch"][href="${asset}"]`)) {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.as = asset.endsWith('.js') ? 'script' : 'image';
              link.href = asset;
              document.head.appendChild(link);
            }
          });
        });
      }, { timeout: 2000 });
    }
  }, [location.pathname]);
  
  return null; // This component doesn't render anything
};

export default ResourcePrefetcher;
