
import React, { useEffect } from 'react';

interface ResourcePrefetcherProps {
  resources: string[];
  children: React.ReactNode;
}

/**
 * A component that prefetches resources (such as JSON files) when mounted.
 * This is a custom implementation to replace the missing export from react-prefetch package.
 */
export const ResourcePrefetcher: React.FC<ResourcePrefetcherProps> = ({ 
  resources, 
  children 
}) => {
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
    
    // Function to prefetch resources
    const prefetchResource = (resource: string) => {
      // Skip if already prefetched
      if (document.querySelector(`link[rel="prefetch"][href="${resource}"]`)) {
        return;
      }
      
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      link.as = resource.endsWith('.json') ? 'fetch' : 'document';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      console.log(`Prefetched: ${resource}`);
    };
    
    // Prefetch all resources
    resources.forEach(resource => {
      prefetchResource(resource);
    });
    
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
  }, [resources]);
  
  return <>{children}</>;
};
