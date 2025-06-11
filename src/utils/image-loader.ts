import { isUrlAccessible } from './fileUtils';

type ImageFormat = 'auto' | 'webp' | 'avif' | 'jpg' | 'png' | 'gif' | 'original';
type ImageQuality = 'low' | 'medium' | 'high' | number;

interface ImageLoaderOptions {
  src: string;
  width?: number;
  height?: number;
  quality?: ImageQuality;
  format?: ImageFormat;
}

// Map quality strings to numeric values
const qualityMap = {
  low: 60,
  medium: 80,
  high: 90
};

/**
 * Determines if browser supports a particular image format
 */
export const supportsImageFormat = (format: string): boolean => {
  try {
    // For server-side rendering
    if (typeof document === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    if (!canvas.getContext) return false;
    
    if (format === 'webp') {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    
    if (format === 'avif') {
      // No reliable client-side detection for AVIF, use server hinting instead
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Optimizes an image URL for delivery
 */
export const getOptimizedImageUrl = ({
  src,
  width,
  height,
  quality = 'high',
  format = 'auto'
}: ImageLoaderOptions): string => {
  if (!src) return '';
  
  // Don't process external URLs (e.g., CDN URLs that handle their own optimization)
  if (src.startsWith('http') && !src.includes(window.location.hostname)) {
    return src;
  }
  
  // Don't process SVGs as they're already optimized vector graphics
  if (src.endsWith('.svg')) {
    return src;
  }
  
  try {
    // Parse the source URL
    const url = new URL(src, window.location.origin);
    const params = new URLSearchParams(url.search);
    
    // Add dimensions if provided
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    
    // Add quality parameter
    const qualityValue = typeof quality === 'string' ? qualityMap[quality] : quality;
    params.set('q', qualityValue.toString());
    
    // Determine best format
    if (format === 'auto') {
      if (supportsImageFormat('avif')) {
        params.set('fm', 'avif');
      } else if (supportsImageFormat('webp')) {
        params.set('fm', 'webp');
      }
    } else if (format !== 'original') {
      params.set('fm', format);
    }
    
    // Update URL with parameters
    url.search = params.toString();
    return url.toString();
  } catch (e) {
    // If URL parsing fails, append basic parameters with simple string concatenation
    const separator = src.includes('?') ? '&' : '?';
    let result = src;
    
    if (width) result += `${separator}w=${width}`;
    if (height) result += `${result.includes('?') ? '&' : '?'}h=${height}`;
    
    // Add quality
    const qualityValue = typeof quality === 'string' ? qualityMap[quality] : quality;
    result += `${result.includes('?') ? '&' : '?'}q=${qualityValue}`;
    
    // Add format if needed
    if (format === 'auto' && supportsImageFormat('webp')) {
      result += `${result.includes('?') ? '&' : '?'}fm=webp`;
    } else if (format !== 'auto' && format !== 'original') {
      result += `${result.includes('?') ? '&' : '?'}fm=${format}`;
    }
    
    return result;
  }
};

/**
 * Preloads critical images for faster LCP
 */
export const preloadCriticalImages = async (imagePaths: string[]): Promise<void> => {
  if (!imagePaths.length) return;
  
  const filteredPaths = await Promise.all(
    imagePaths.map(async (path) => {
      const isAccessible = await isUrlAccessible(path);
      return isAccessible ? path : null;
    })
  );
  
  const validPaths = filteredPaths.filter(Boolean) as string[];
  
  validPaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    link.fetchPriority = 'high';
    
    document.head.appendChild(link);
  });
};

/**
 * Dynamically generates responsive sizes attribute based on layout
 */
export const getResponsiveSizes = (
  layout: 'fill' | 'responsive' | 'intrinsic' | 'fixed' = 'responsive',
  containerWidth?: number
): string => {
  switch (layout) {
    case 'fill':
      return '100vw';
    case 'responsive':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'intrinsic':
      if (containerWidth) {
        return `(max-width: 640px) 100vw, ${containerWidth}px`;
      }
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'fixed':
      if (containerWidth) {
        return `${containerWidth}px`;
      }
      return '100vw';
    default:
      return '100vw';
  }
};

}
