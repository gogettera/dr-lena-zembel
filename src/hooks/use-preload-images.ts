
import { useEffect } from 'react';
import { isUrlAccessible } from '@/utils/fileUtils';
import { logger } from '@/utils/logger';

interface PreloadOptions {
  priority?: 'high' | 'low' | 'auto';
  as?: 'image' | 'script' | 'style';
  crossOrigin?: 'anonymous' | 'use-credentials';
}

export const usePreloadImages = (
  imagePaths: string[],
  options: PreloadOptions = {}
) => {
  useEffect(() => {
    if (!imagePaths.length) return;

    const { priority = 'auto', as = 'image', crossOrigin = 'anonymous' } = options;

    const preloadImage = async (path: string) => {
      try {
        // Check if image is accessible before preloading
        const isAccessible = await isUrlAccessible(path);
        if (!isAccessible) {
          logger.debug(`Skipping preload for inaccessible image: ${path}`);
          return;
        }

        // Check if already preloaded
        const existingLink = document.querySelector(`link[rel="preload"][href="${path}"]`);
        if (existingLink) {
          return;
        }

        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = path;
        link.as = as;
        
        if (crossOrigin) {
          link.crossOrigin = crossOrigin;
        }

        // Set fetchpriority if supported
        if ('fetchpriority' in HTMLLinkElement.prototype) {
          (link as any).fetchpriority = priority;
        }

        // Add error handling
        link.onerror = () => {
          logger.warn(`Failed to preload image: ${path}`);
        };

        link.onload = () => {
          logger.debug(`Successfully preloaded image: ${path}`);
        };

        document.head.appendChild(link);

      } catch (error) {
        logger.warn(`Error preloading image ${path}:`, error);
      }
    };

    // Preload images with a small delay to avoid blocking critical resources
    const preloadPromises = imagePaths.map((path, index) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          preloadImage(path).finally(() => resolve());
        }, index * 50); // Stagger preloads by 50ms
      });
    });

    Promise.all(preloadPromises).catch(error => {
      logger.warn('Error in batch image preloading:', error);
    });

    // Cleanup function to remove preload links when component unmounts
    return () => {
      imagePaths.forEach(path => {
        const link = document.querySelector(`link[rel="preload"][href="${path}"]`);
        if (link) {
          document.head.removeChild(link);
        }
      });
    };
  }, [imagePaths, options]);
};
