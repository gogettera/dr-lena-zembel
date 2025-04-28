
import React, { useEffect } from 'react';

interface ResourcePrefetcherProps {
  resources: string[];
  children: React.ReactNode;
}

// This component will be used to prefetch resources
export const ResourcePrefetcher: React.FC<ResourcePrefetcherProps> = ({ resources, children }) => {
  useEffect(() => {
    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    });
  }, [resources]);

  return <>{children}</>;
};
