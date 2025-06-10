
import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'image' | 'button' | 'custom';
  lines?: number;
  className?: string;
  children?: React.ReactNode;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  lines = 3,
  className,
  children
}) => {
  if (children) {
    return <>{children}</>;
  }

  switch (variant) {
    case 'card':
      return (
        <div className={cn('space-y-3', className)}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );

    case 'text':
      return (
        <div className={cn('space-y-2', className)}>
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                'h-4',
                index === lines - 1 ? 'w-3/4' : 'w-full'
              )}
            />
          ))}
        </div>
      );

    case 'avatar':
      return (
        <div className={cn('flex items-center space-x-4', className)}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );

    case 'image':
      return (
        <Skeleton className={cn('aspect-video w-full rounded-lg', className)} />
      );

    case 'button':
      return (
        <Skeleton className={cn('h-10 w-[120px] rounded-md', className)} />
      );

    case 'custom':
      return (
        <Skeleton className={className} />
      );

    default:
      return (
        <Skeleton className={cn('h-4 w-full', className)} />
      );
  }
};
