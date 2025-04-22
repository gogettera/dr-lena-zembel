
import { useEffect } from 'react';

/**
 * Hook to preload images with improved performance characteristics
 * @param imagePaths Array of image URLs to preload
 * @param priority Optional priority level (high, medium, low)
 */
export const usePreloadImages = (
  imagePaths: string[],
  priority: 'high' | 'medium' | 'low' = 'medium'
) => {
  useEffect(() => {
    if (!imagePaths.length) return;

    // Filter out any invalid paths
    const validPaths = imagePaths.filter(Boolean);
    if (!validPaths.length) return;

    // Create an AbortController to cancel any pending preloads if the component unmounts
    const controller = new AbortController();
    const signal = controller.signal;

    const preloadImages = async () => {
      const promises = validPaths.map(path => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          
          // Set importance based on priority
          if ('importance' in img) {
            (img as any).importance = priority;
          }
          
          // Add event listeners to track load status
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve anyway to not block other images
          
          // Start loading the image
          img.src = path;
          
          // Check if signal is aborted
          if (signal.aborted) {
            resolve();
            return;
          }
        });
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error preloading images:', error);
        }
      }
    };

    // For high priority images, preload immediately
    if (priority === 'high') {
      preloadImages();
    } else {
      // For medium/low priority, use requestIdleCallback or setTimeout
      const timeoutDuration = priority === 'medium' ? 100 : 1000;
      
      if ('requestIdleCallback' in window) {
        const idleCallbackId = (window as any).requestIdleCallback(
          () => {
            if (!signal.aborted) {
              preloadImages();
            }
          },
          { timeout: priority === 'medium' ? 1000 : 3000 }
        );
        
        // Clean up if component unmounts
        return () => {
          controller.abort();
          if ('cancelIdleCallback' in window) {
            (window as any).cancelIdleCallback(idleCallbackId);
          }
        };
      } else {
        // Fallback to setTimeout for browsers that don't support requestIdleCallback
        const timeoutId = setTimeout(() => {
          if (!signal.aborted) {
            preloadImages();
          }
        }, timeoutDuration);
        
        // Clean up if component unmounts
        return () => {
          controller.abort();
          clearTimeout(timeoutId);
        };
      }
    }
    
    // Clean up function
    return () => {
      controller.abort();
    };
  }, [imagePaths, priority]);
};
