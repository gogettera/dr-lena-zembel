
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { usePreloadImages } from '@/hooks/use-preload-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface EnhancedImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallback?: React.ReactNode;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: number;
  className?: string;
  wrapperClassName?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  loading?: 'eager' | 'lazy';
  hasPlaceholder?: boolean;
  placeholderColor?: string;
  hover?: 'none' | 'zoom' | 'lift' | 'brighten' | 'darken';
  loadingStrategy?: 'eager' | 'lazy' | 'auto';
  useNextGenFormat?: boolean;
}

const EnhancedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  fallback,
  objectFit = 'cover',
  aspectRatio,
  className,
  wrapperClassName,
  rounded = 'md',
  loading,
  hasPlaceholder = true,
  placeholderColor = 'bg-gray-100',
  hover = 'none',
  loadingStrategy,
  useNextGenFormat = true,
  ...props
}: EnhancedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [imgSrc, setImgSrc] = useState(src);
  const uniqueId = `image-${src.replace(/[^a-zA-Z0-9]/g, '')}-${Math.floor(Math.random() * 1000)}`;

  // If priority is true, preload the image
  usePreloadImages(priority ? [src] : []);

  // Convert to WebP format if supported and enabled
  useEffect(() => {
    if (useNextGenFormat && src && !src.includes('?format=') && !src.endsWith('.svg') && !src.endsWith('.webp')) {
      // Add a webp parameter to the URL if the backend supports it
      // This is a hypothetical implementation - adjust based on your image processing backend
      const hasParams = src.includes('?');
      const webpSrc = `${src}${hasParams ? '&' : '?'}format=webp`;
      setImgSrc(webpSrc);
    } else {
      setImgSrc(src);
    }
  }, [src, useNextGenFormat]);

  // Setup IntersectionObserver for lazy loading
  useEffect(() => {
    if (!priority && 'IntersectionObserver' in window) {
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
  }, [uniqueId, priority]);

  // Determine loading strategy
  const imgLoading = loading || (priority ? 'eager' : 'lazy');

  // Round class mapping
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };

  // Hover effect classes
  const hoverClasses = {
    none: '',
    zoom: 'hover:scale-105 transition-transform duration-300',
    lift: 'hover:-translate-y-1 transition-transform duration-300',
    brighten: 'hover:brightness-110 transition-all duration-300',
    darken: 'hover:brightness-90 transition-all duration-300',
  };

  const renderImage = () => {
    if (hasError) {
      return fallback || (
        <div
          className={cn(
            "flex items-center justify-center bg-gray-100",
            roundedClasses[rounded],
            className
          )}
          style={{
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : '100%',
          }}
        >
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      );
    }

    return (
      <>
        {isLoading && hasPlaceholder && (
          <div
            className={cn(
              "absolute inset-0 z-10",
              roundedClasses[rounded],
              placeholderColor
            )}
            style={{
              width: width ? `${width}px` : '100%',
              height: height ? `${height}px` : '100%',
            }}
            aria-hidden="true"
          />
        )}
        {isVisible && (
          <img
            id={uniqueId}
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            loading={imgLoading}
            decoding={priority ? "sync" : "async"}
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
            className={cn(
              'w-full h-full transition-opacity duration-300',
              objectFit ? `object-${objectFit}` : 'object-cover',
              roundedClasses[rounded],
              hoverClasses[hover],
              isLoading ? 'opacity-0' : 'opacity-100',
              className
            )}
            {...props}
          />
        )}
      </>
    );
  };

  if (aspectRatio) {
    return (
      <div className={cn("overflow-hidden relative", roundedClasses[rounded], wrapperClassName)}>
        <AspectRatio ratio={aspectRatio}>
          {renderImage()}
        </AspectRatio>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName, roundedClasses[rounded])}>
      {renderImage()}
    </div>
  );
};

export { EnhancedImage };
