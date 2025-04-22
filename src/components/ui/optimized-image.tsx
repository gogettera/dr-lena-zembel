
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { usePreloadImages } from '@/hooks/use-preload-images';

interface OptimizedImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fallback?: React.ReactNode;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  eager?: boolean;
  aspectRatio?: number;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  width,
  height,
  priority = false,
  className,
  fallback,
  objectFit = 'cover',
  eager = false,
  aspectRatio,
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority && !eager);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(src || '');
  const [isVisible, setIsVisible] = useState(priority || eager);
  const uniqueId = `img-${(src || '').replace(/[^a-zA-Z0-9]/g, '')}-${Math.floor(Math.random() * 1000)}`;
  
  // If priority is true, preload the image
  usePreloadImages(priority && src ? [src] : []);

  // Try to convert to WebP format if appropriate
  useEffect(() => {
    // Set imgSrc to src (or empty string if src is null/undefined)
    setImgSrc(src || '');
    
    // Don't try to convert SVGs or already WebP images or null/undefined srcs
    if (src && !src.includes('?format=') && !src.endsWith('.svg') && !src.endsWith('.webp')) {
      // This is hypothetical - you would need a backend service that can convert images
      const hasParams = src.includes('?');
      const webpSrc = `${src}${hasParams ? '&' : '?'}format=webp`;
      
      // Only for demonstration. In reality, you'd check browser support or use a service
      if (hasModernImageSupport()) {
        setImgSrc(webpSrc);
      }
    }
  }, [src]);

  // Setup IntersectionObserver for lazy loading
  useEffect(() => {
    if (!priority && !eager && 'IntersectionObserver' in window) {
      const element = document.getElementById(uniqueId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px' }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }
    
    return undefined;
  }, [uniqueId, priority, eager]);

  // Helper function to check for modern image format support
  const hasModernImageSupport = () => {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d')) && 
           canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Determine loading strategy based on priority
  const loadingAttribute = priority || eager ? 'eager' : 'lazy';

  // Create proper aspect ratio style if both dimensions provided
  const aspectRatioStyle = (width && height) ? 
    { aspectRatio: `${width}/${height}` } : 
    (aspectRatio ? { aspectRatio: aspectRatio } : {});

  // Create a placeholder while waiting for the image to load
  const renderPlaceholder = () => (
    <Skeleton 
      className={cn(
        "absolute inset-0 z-10",
        className
      )} 
    />
  );

  // Create error fallback
  const renderError = () => (
    fallback || (
      <div 
        className={cn(
          "bg-gray-100 flex items-center justify-center rounded overflow-hidden", 
          className
        )}
        style={{ 
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '240px',
          ...aspectRatioStyle
        }}
      >
        <span className="text-sm text-gray-500">Failed to load image</span>
      </div>
    )
  );

  // If src is null or undefined, return error fallback
  if (!src) {
    return renderError();
  }

  if (hasError) {
    return renderError();
  }

  return (
    <div 
      id={uniqueId}
      className="relative overflow-hidden w-full h-full"
      style={aspectRatioStyle}
    >
      {isLoading && renderPlaceholder()}
      
      {isVisible && (
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loadingAttribute}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFit ? `object-${objectFit}` : 'object-cover',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
