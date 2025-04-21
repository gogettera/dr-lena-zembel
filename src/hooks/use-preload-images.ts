
import { useEffect } from 'react';

/**
 * Hook to preload images to improve page load performance
 * 
 * @param imageSrcs Array of image URLs to preload
 * @param priority Whether to load the images with high priority
 */
export const usePreloadImages = (
  imageSrcs: string[], 
  priority: boolean = false
): void => {
  useEffect(() => {
    // Skip if no images or if not in browser environment
    if (!imageSrcs.length || typeof window === 'undefined') {
      return;
    }

    const preloadImages = async () => {
      const promises = imageSrcs.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          
          // If priority is true, use higher fetch priority
          if (priority && 'fetchPriority' in HTMLImageElement.prototype) {
            // TypeScript doesn't recognize fetchPriority yet
            (img as any).fetchPriority = 'high';
          }
          
          img.onload = () => resolve();
          img.onerror = () => {
            console.warn(`Failed to preload image: ${src}`);
            resolve(); // Resolve anyway to not block other images
          };
          
          img.src = src;
        });
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, [imageSrcs, priority]);
};
