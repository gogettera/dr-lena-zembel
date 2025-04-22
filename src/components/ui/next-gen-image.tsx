
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveImage } from '@/hooks/use-responsive-image';

interface NextGenImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  quality?: number;
}

export const NextGenImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = 'lazy',
  objectFit = 'cover',
  quality = 80,
}: NextGenImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Get responsive image attributes for WebP
  const webpImage = useResponsiveImage({
    src,
    width,
    height,
    quality,
    format: 'webp'
  });
  
  // Fallback to original format
  const originalImage = useResponsiveImage({
    src,
    width,
    height,
    quality,
    format: 'original'
  });

  if (error) {
    return (
      <div 
        className={cn(
          'bg-gray-100 flex items-center justify-center rounded',
          className
        )}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '240px',
          aspectRatio: width && height ? `${width} / ${height}` : undefined
        }}
      >
        <span className="text-sm text-gray-500">Image failed to load</span>
      </div>
    );
  }

  return (
    <picture className={cn('block w-full h-full')}>
      {/* WebP source */}
      <source
        srcSet={webpImage.srcSet}
        sizes={webpImage.sizes}
        type="image/webp"
      />
      
      {/* Original format fallback */}
      <source
        srcSet={originalImage.srcSet}
        sizes={originalImage.sizes}
        type={originalImage.type}
      />
      
      {/* Fallback image */}
      <img
        src={originalImage.src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          'w-full h-full transition-opacity duration-300',
          objectFit ? `object-${objectFit}` : 'object-cover',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100',
          className
        )}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined
        }}
      />
    </picture>
  );
};
