
import { useState, useEffect } from 'react';

type ImageFormat = 'original' | 'webp' | 'avif';

interface ResponsiveImageOptions {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormat;
  breakpoints?: number[];
}

interface ResponsiveImageResult {
  srcSet: string;
  src: string;
  sizes: string;
  type: string;
}

/**
 * Hook to generate responsive image attributes for modern web
 */
export const useResponsiveImage = ({
  src,
  width,
  height,
  quality = 80,
  format = 'webp',
  breakpoints = [640, 750, 828, 1080, 1200, 1920]
}: ResponsiveImageOptions): ResponsiveImageResult => {
  const [result, setResult] = useState<ResponsiveImageResult>({
    srcSet: '',
    src,
    sizes: '100vw',
    type: 'image/jpeg'
  });

  useEffect(() => {
    if (!src) return;

    // Get image extension
    const extension = src.split('.').pop()?.toLowerCase() || 'jpg';
    
    // Determine MIME type based on format or original image extension
    let mimeType = 'image/jpeg';
    
    if (format === 'webp') {
      mimeType = 'image/webp';
    } else if (format === 'avif') {
      mimeType = 'image/avif';
    } else if (extension === 'png') {
      mimeType = 'image/png';
    } else if (extension === 'svg') {
      mimeType = 'image/svg+xml';
    } else if (extension === 'gif') {
      mimeType = 'image/gif';
    }

    // For SVG, we don't need responsive handling
    if (extension === 'svg') {
      setResult({
        srcSet: '',
        src,
        sizes: '',
        type: mimeType
      });
      return;
    }

    // Generate srcSet for different viewport sizes
    const srcSetEntries = breakpoints.map(bp => {
      // Skip generating srcset for breakpoints larger than original image
      if (width && bp > width) return '';
      
      // Construct URL for each breakpoint
      // This is a simplified example - adapt based on your image service
      const url = `${src}?width=${bp}&quality=${quality}${format !== 'original' ? `&format=${format}` : ''}`;
      return `${url} ${bp}w`;
    }).filter(Boolean);

    // Default source should be optimized too if width/height are provided
    let optimizedSrc = src;
    if (width && height) {
      optimizedSrc = `${src}?width=${width}&height=${height}&quality=${quality}${format !== 'original' ? `&format=${format}` : ''}`;
    }

    setResult({
      srcSet: srcSetEntries.join(', '),
      src: optimizedSrc,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      type: mimeType
    });
  }, [src, width, height, quality, format, breakpoints]);

  return result;
};
