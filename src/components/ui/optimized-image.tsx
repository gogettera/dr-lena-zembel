
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className,
  fallback,
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback || (
      <div className={cn("bg-gray-100 flex items-center justify-center", className)}>
        <span className="text-sm text-gray-500">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className={cn("absolute inset-0", className)} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={cn(
          'w-full h-auto transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
