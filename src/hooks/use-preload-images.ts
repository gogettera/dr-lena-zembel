
import { useEffect } from 'react';

/**
 * Hook to preload images
 * @param imagePaths Array of image URLs to preload
 * @param priority Optional priority level (high, medium, low)
 */
export const usePreloadImages = (
  imagePaths: string[],
  priority: 'high' | 'medium' | 'low' = 'medium'
) => {
  useEffect(() => {
    if (!imagePaths.length) return;

    const preloadImages = () => {
      imagePaths.forEach((path) => {
        if (!path) return;
        
        const img = new Image();
        
        // Set importance based on priority
        if ('importance' in img) {
          (img as any).importance = priority;
        }
        
        img.src = path;
      });
    };

    // For high priority images, preload immediately
    if (priority === 'high') {
      preloadImages();
    } else {
      // For medium/low priority, use requestIdleCallback
      if ('requestIdleCallback' in window) {
        // @ts-ignore - TypeScript doesn't have types for requestIdleCallback
        window.requestIdleCallback(preloadImages, { 
          timeout: priority === 'medium' ? 1000 : 3000 
        });
      } else {
        // Fallback to setTimeout for browsers that don't support requestIdleCallback
        const delay = priority === 'medium' ? 100 : 1000;
        setTimeout(preloadImages, delay);
      }
    }
  }, [imagePaths, priority]);
};
