
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
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(src);
  
  // If priority is true, preload the image
  usePreloadImages(priority ? [src] : []);

  // Extract dimensions from props
  const imgWidth = width;
  const imgHeight = height;

  // Determine if we're dealing with an absolute URL or a relative path
  const isAbsoluteUrl = src.startsWith('http') || src.startsWith('//');
  
  // If using Lovable's upload service, we can add dimensions query params
  // for automatic resizing (assuming a resize service is available)
  useEffect(() => {
    if (!isAbsoluteUrl && src.includes('/lovable-uploads/') && imgWidth && imgHeight) {
      // Append dimensions to URL for automatic server-side resizing
      // This is a placeholder - actual implementation depends on your image service
      // setImgSrc(`${src}?width=${imgWidth}&height=${imgHeight}`);
    }
  }, [src, imgWidth, imgHeight, isAbsoluteUrl]);

  // Determine loading strategy
  const loadingAttribute = priority ? 'eager' : 'lazy';

  if (hasError) {
    return fallback || (
      <div 
        className={cn(
          "bg-gray-100 flex items-center justify-center rounded overflow-hidden", 
          className
        )}
        style={{ 
          width: imgWidth ? `${imgWidth}px` : '100%',
          height: imgHeight ? `${imgHeight}px` : '240px',
          aspectRatio: imgWidth && imgHeight ? `${imgWidth}/${imgHeight}` : undefined
        }}
      >
        <span className="text-sm text-gray-500">Failed to load image</span>
      </div>
    );
  }

  return (
    <div 
      className="relative overflow-hidden w-full h-full"
    >
      {isLoading && (
        <Skeleton 
          className={cn(
            "absolute inset-0 z-10",
            className
          )} 
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
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
    </div>
  );
};

export default OptimizedImage;
