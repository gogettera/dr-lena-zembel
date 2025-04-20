
import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage = ({ src, alt, className, ...props }: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn('w-full h-auto', className)}
      {...props}
    />
  );
};

export default OptimizedImage;
