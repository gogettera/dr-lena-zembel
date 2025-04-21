
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
  ...props
}: EnhancedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);

  // If priority is true, preload the image
  usePreloadImages(priority ? [src] : []);

  // Setup IntersectionObserver for lazy loading
  useEffect(() => {
    if (!priority && 'IntersectionObserver' in window) {
      const element = document.getElementById(`image-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
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
  }, [src, priority]);

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
          <Skeleton
            className={cn(
              "absolute inset-0 z-10",
              roundedClasses[rounded],
              placeholderColor
            )}
          />
        )}
        {isVisible && (
          <img
            id={`image-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
            src={src}
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
