
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define critical assets for each route
const routeAssets: Record<string, string[]> = {
  // Home page critical assets
  '/': [
    '/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png',
    '/lovable-uploads/c1007b41-5fb4-451a-a540-744c4643c25e.png',
    '/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png',
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
    // Get the connection type if available
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    const isSaveDataEnabled = connection?.saveData;
    const isSlowConnection = connection?.effectiveType === '2g' || 
                            connection?.effectiveType === 'slow-2g';
    
    // Don't prefetch on slow connections or when save-data is enabled
    if (isSaveDataEnabled || isSlowConnection) {
      console.log('Prefetching disabled due to slow connection or save-data');
      return;
    }
    
    // Current route assets
    const currentRouteAssets = routeAssets[location.pathname] || [];
    
    // Function to prefetch assets with priority
    const prefetchAsset = (asset: string, importance: 'high' | 'low' | 'auto' = 'auto') => {
      // Skip if already prefetched
      if (document.querySelector(`link[rel="prefetch"][href="${asset}"]`)) {
        return;
      }
      
      const link = document.createElement('link');
      if (asset.endsWith('.js')) {
        link.rel = 'prefetch';
        link.as = 'script';
      } else if (asset.endsWith('.css')) {
        link.rel = 'prefetch';
        link.as = 'style';
      } else {
        link.rel = 'preload';
        link.as = 'image';
        
        // Set fetchpriority if supported
        if ('fetchpriority' in HTMLLinkElement.prototype) {
          (link as any).fetchpriority = importance;
        }
      }
      link.href = asset;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };
    
    // Immediately prefetch current route's critical assets
    currentRouteAssets.forEach(asset => {
      prefetchAsset(asset, 'high');
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
            prefetchAsset(asset, 'low');
          });
        });
      }, { timeout: 2000 });
    }
    
    // Connection change listener
    const handleConnectionChange = () => {
      if (connection?.saveData || connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
        // Remove prefetch links if connection becomes slow
        document.querySelectorAll('link[rel="prefetch"]').forEach(el => el.remove());
      }
    };
    
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }
    
    return () => {
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, [location.pathname]);
  
  return null; // This component doesn't render anything
};

export default ResourcePrefetcher;
