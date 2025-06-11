
import { useMemo } from 'react';
import { getOptimizedImageUrl } from '@/utils/image-loader';

interface ResponsiveImageOptions {
  src: string;
  width?: number;
  height?: number;
  quality?: 'low' | 'medium' | 'high' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png' | 'gif' | 'original';
}

interface ResponsiveImageResult {
  src: string;
  srcSet: string;
  sizes: string;
  type: string;
}

export const useResponsiveImage = ({
  src,
  width,
  height,
  quality = 'high',
  format = 'auto'
}: ResponsiveImageOptions): ResponsiveImageResult => {
  
  return useMemo(() => {
    if (!src) {
      return {
        src: '',
        srcSet: '',
        sizes: '',
        type: 'image/jpeg'
      };
    }

    // Handle 'original' format by detecting from URL
    let actualFormat: 'auto' | 'webp' | 'avif' | 'jpg' | 'png' | 'gif' = format as any;
    if (format === 'original') {
      const extension = src.split('.').pop()?.toLowerCase();
      if (extension === 'png') actualFormat = 'png';
      else if (extension === 'gif') actualFormat = 'gif';
      else if (extension === 'webp') actualFormat = 'webp';
      else actualFormat = 'jpg';
    }

    // Generate different sizes for responsive images
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    const srcSetEntries: string[] = [];

    sizes.forEach(size => {
      if (!width || size <= width * 2) { // Don't generate sizes larger than 2x the target
        const optimizedUrl = getOptimizedImageUrl({
          src,
          width: size,
          height: height ? Math.round((height * size) / (width || size)) : undefined,
          quality,
          format: actualFormat
        });
        srcSetEntries.push(`${optimizedUrl} ${size}w`);
      }
    });

    // Generate the main src URL
    const mainSrc = getOptimizedImageUrl({
      src,
      width,
      height,
      quality,
      format: actualFormat
    });

    // Default sizes attribute for responsive behavior
    const sizesAttr = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

    // Determine MIME type based on format
    let mimeType = 'image/jpeg';
    if (actualFormat === 'webp') mimeType = 'image/webp';
    else if (actualFormat === 'avif') mimeType = 'image/avif';
    else if (actualFormat === 'png') mimeType = 'image/png';
    else if (actualFormat === 'gif') mimeType = 'image/gif';

    return {
      src: mainSrc,
      srcSet: srcSetEntries.join(', '),
      sizes: sizesAttr,
      type: mimeType
    };
  }, [src, width, height, quality, format]);
};
